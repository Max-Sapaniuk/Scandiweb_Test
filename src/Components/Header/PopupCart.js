import {useDispatch, useSelector} from "react-redux";
import PopupCartItem from "./PopupCartItem";
import {Link} from "react-router-dom";
import {actionChangeIsCartPopUpOpen} from "../../Redux/mainReducer";

function PopupCart(props) {
    let dispatch = useDispatch()
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
    return (
        <div>
            <div style={{fontSize: "16px", margin: "32px 0 32px 16px"}}><b>My bag,</b>
                {Object.values(productsInCart).reduce((previousValue, currentValue) => previousValue + currentValue.number, 0)} items
            </div>
            {Object.values(productsInCart).reduce((previousValue, currentValue) => previousValue + currentValue.number, 0) === 0
                ?
                null
                :
                <div>
                    {
                        Object.keys(productsInCart).map(val => <PopupCartItem
                            key={val}
                            id={val}
                            data={productsInCart[val]}/>)
                    }
                    <div style={{fontSize: "16px", margin: "32px 16px 32px 16px"}}>
                        Total <span style={{float: "right", fontWeight: "bold"}}>
                {`
                ${Object.values(productsInCart)[0].prices[currencyId].currency.symbol}
                ${Math.round(Object.values(productsInCart)
                    .reduce((previousValue, currentValue) => {
                        return previousValue + (currentValue.prices[currencyId].amount * currentValue.number)
                    }, 0) * 100) / 100} 
                    `}
            </span>
                    </div>
                    <div style={{fontSize: "16px", margin: "32px 16px 32px 16px"}}>
                        <Link to="/cart">
                            <button
                                onClick={() => {
                                    dispatch(actionChangeIsCartPopUpOpen())
                                }
                                }
                                style={{
                                    padding: "16px 32px",
                                    background: "#FFFFFF",
                                    border: "1px solid #1D1F22",
                                    cursor: "pointer",
                                }}><span style={{
                                fontStyle: "normal",
                                fontWeight: "600",
                                fontSize: "14px",
                                lineHeight: "120%",
                            }}>VIEW BAG</span></button>
                        </Link>
                        <button style={{
                            padding: "16px 32px",
                            background: "#5ECE7B",
                            border: "1px solid #5ECE7B",
                            float: "right",
                            cursor: "pointer",
                        }}><span style={{
                            fontStyle: "normal",
                            fontWeight: "600",
                            fontSize: "14px",
                            lineHeight: "120%",
                            color: "#FFFFFF",
                        }}>CHECK OUT</span></button>
                    </div>
                </div>
            }
        </div>

    )
}

export default PopupCart