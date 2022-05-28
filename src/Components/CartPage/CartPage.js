import style from "./CartPage.module.css"
import {useSelector} from "react-redux";
import CartPageItem from "./CartPageItem";

function CartPage(props) {
    let productsInCart = useSelector((state) => state.mainReducer.productsInCart)
    let currency = useSelector((state) => state.mainReducer.currency.selected.label)
    let currencyId = 0
    if (Object.values(productsInCart).length !== 0) {
        for (let key of productsInCart[Object.keys(productsInCart)[0]].prices) {
            if (key.currency.label === currency) {
                break
            }
            currencyId++
        }
    }
    return (<div>
        <div className={style.heading}>CART</div>
        <div className={style.container}>
            <hr/>
            {Object.values(productsInCart).reduce((previousValue, currentValue) => previousValue + currentValue.number, 0) === 0
                ?
                null
                :
                <div>
                    {
                        Object.keys(productsInCart).map(val => <div><CartPageItem
                            key={val}
                            id={val}
                            data={productsInCart[val]}/>
                            <hr/>
                        </div>)
                    }
                </div>
            }
            <table>
                <tr>
                    <td>Tax 21%:</td>
                    <td>
                        <span>
                            ${Math.round((Object.values(productsInCart).reduce((previousValue, currentValue) => {
                            return previousValue + (currentValue.prices[currencyId].amount * currentValue.number)
                        }, 0) * 0.21) * 100) / 100}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Quantity:</td>
                    <td>
                        <span>
                            {Object.values(productsInCart).reduce((previousValue, currentValue) => previousValue + currentValue.number, 0)}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Total:</td>
                    <td>
                        <span>
                {`
                ${Object.values(productsInCart)[0].prices[currencyId].currency.symbol}${Math.round(Object.values(productsInCart)
                    .reduce((previousValue, currentValue) => {
                        return previousValue + (currentValue.prices[currencyId].amount * currentValue.number)
                    }, 0) * 100) / 100} 
                    `}
                    </span>
                    </td>
                </tr>
            </table>
            <button className={style.orderBtn}>Order</button>
        </div>
    </div>)
}

export default CartPage