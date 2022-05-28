import "./Product.css"
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actionAddProductsToCart} from "../../../Redux/mainReducer";
import {Link, NavLink} from "react-router-dom";

function Product(props) {
    let [isVisible, changeVisible = (newVal) => isVisible = newVal] = useState(false)
    let selectedCurrency = useSelector(state => state.mainReducer.currency.selected)
    let dispatch = useDispatch()
    return (
        <Link to={`${props.id}`} className={`productContainer ${props.inStock ? null : "outOfStock"}`}
              onMouseEnter={() => changeVisible(true)}
              onMouseLeave={() => changeVisible(false)}>
            <div style={{width: "350px", height: "400px", textAlign: "center"}}>
                <img src={props.gallery[0]} alt="Prod Image" className={"productImage"}/>
            </div>
            {
                props.inStock ?
                    null
                    :
                    <div style={{
                        position: "absolute",
                        left: "50%",
                        top: "200px",
                        transform: "translateX(-50%)",
                        fontWeight: "400",
                        fontSize: "24px",
                    }}>
                        OUT OF STOCK
                    </div>
            }
            <div className={"productName"}>{props.name}</div>
            <div className={"productPrice"}>
                {
                    Object.values(props.prices).map(value => {
                        if (value.currency.label === selectedCurrency.label) {
                            return `${value.currency.symbol} ${value.amount}`
                        }
                        return <div></div>
                    })
                }
            </div>
            {
                isVisible && props.inStock ?
                    <div className={"cartButton"}>
                        <a href="#" onClick={(event) => {
                            event.preventDefault()
                            dispatch(actionAddProductsToCart({
                                id: props.id,
                                attributes: props.attributes,
                                prices: props.prices,
                                gallery: props.gallery
                            }))
                        }
                        }>
                            <img src="/images/Common.svg" alt=""/>
                        </a>
                    </div>
                    :
                    null
            }
        </Link>
    )
}

export default Product
