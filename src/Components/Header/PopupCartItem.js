import {gql, useQuery} from "@apollo/client";
import style from "./PopupCartItem.module.css"
import {useDispatch, useSelector} from "react-redux";
import mainReducer, {
    actionAddProductsToCart,
    actionChangeProductAttribute,
    actionRemoveProductsFromCart
} from "../../Redux/mainReducer";

function PopupCartItem(props) {
    let dispatch = useDispatch()
    let productsInCart = useSelector(state => state.mainReducer.productsInCart)
    let currencyId = 0
    let currency = useSelector((state) => state.mainReducer.currency.selected.label)
    if (Object.values(productsInCart).length !== 0) {
        for (let key of productsInCart[Object.keys(productsInCart)[0]].prices) {
            if (key.currency.label === currency) {
                break
            }
            currencyId++
        }
    }
    let prod = useQuery(gql`query prod{
                                product(id: "${props.id}") {
                                    __typename @skip(if: true)
                                    id
                                    name
                                    prices{
                                                                        __typename @skip(if: true)

                                        currency {
                                                                            __typename @skip(if: true)

                                            label
                                            symbol
                                        }
                                        amount
                                    }
                                    attributes{
                                                                        __typename @skip(if: true)

                                        id
                                        name
                                        type
                                        items {
                                                                            __typename @skip(if: true)

                                            displayValue
                                            value
                                            id
                                        }
                                    }
                                    gallery
                                }                         
                            }`)
    if (prod.loading)
        return <div><img src="./Spinner-3.svg" alt=""/></div>

    return (
        <div className={style.container}>
            <div className={`${style.item} ${style.data}`}>
                <div style={{fontSize: "16px", marginBottom: "4px"}}>{prod.data.product.name}</div>
                <div style={{
                    fontWeight: "700",
                    fontSize: "16px",
                    marginBottom: "4px",
                    marginTop: "4px"
                }}>{prod.data.product.prices[currencyId].amount} {prod.data.product.prices[currencyId].currency.symbol}</div>
                <div style={{marginBottom: "4px", marginTop: "4px"}}>
                    {
                        prod.data.product.attributes.map((el) => {
                            switch (el.type) {
                                case "text":
                                    return (
                                        <div>
                                            <div style={{fontSize: "14px"}}>{el.name}:</div>
                                            {el.items.map((currVal =>
                                                    <a href="#"
                                                       onClick={event => {
                                                           event.preventDefault()
                                                           dispatch(actionChangeProductAttribute({
                                                               id: prod.data.product.id,
                                                               attrId: el.id,
                                                               newValue: currVal.id,
                                                           }))
                                                       }}>
                                                        <div
                                                            className={productsInCart[prod.data.product.id].attributes[el.id] === currVal.id
                                                                ?
                                                                style.activeText
                                                                :
                                                                null
                                                            }
                                                            style={{
                                                                display: "inline-block",
                                                                border: "1px solid black",
                                                                margin: "3px",
                                                                padding: "3px",
                                                            }}
                                                        >{currVal.displayValue}</div>
                                                    </a>
                                            ))
                                            }
                                        </div>
                                    )
                                case "swatch":
                                    return (
                                        <div>
                                            <div style={{fontSize: "14px"}}>{el.name}:</div>
                                            {el.items.map((currVal =>
                                                    <a href="#"
                                                       onClick={event => {
                                                           event.preventDefault()
                                                           dispatch(actionChangeProductAttribute({
                                                               id: prod.data.product.id,
                                                               attrId: el.id,
                                                               newValue: currVal.id,
                                                           }))
                                                       }}>
                                                        <div
                                                             className={`${style.colors} ${productsInCart[prod.data.product.id].attributes[el.id] === currVal.id
                                                                 ?
                                                                 style.activeSwatch
                                                                 :
                                                                 null}
                                                                `
                                                             }>
                                                            <div
                                                                style={{
                                                                    width: "16px",
                                                                    height: "16px",
                                                                    backgroundColor: currVal.value,
                                                                }}
                                                            />
                                                        </div>
                                                    </a>
                                            ))}
                                        </div>
                                    )
                                default:
                                    console.log("Error, unknown type: ", el.type)
                            }
                        })
                    }
                </div>
            </div>
            <div className={`${style.item} ${style.number}`}>
                <a href="#" onClick={event => {
                    event.preventDefault()
                    dispatch(actionAddProductsToCart({id: props.id}))
                }}>
                    <div style={{
                        border: "2px solid black",
                        width: "24px",
                        height: "24px",
                        fontSize: "30px",
                        lineHeight: "24px",
                        padding: "auto",
                        textAlign: "center"
                    }}>+
                    </div>
                </a>
                <div>{props.data.number}</div>
                <a href="#" onClick={event => {
                    event.preventDefault()
                    dispatch(actionRemoveProductsFromCart({id: props.id}))
                }}>
                    <div style={{
                        border: "2px solid black",
                        width: "24px",
                        height: "24px",
                        fontSize: "30px",
                        lineHeight: "24px",
                        padding: "auto",
                        textAlign: "center"
                    }}>-
                    </div>
                </a>
            </div>
            <div className={`${style.item}`}>
                <img src={prod.data.product.gallery[0]} alt="" className={style.image}/>
            </div>
        </div>
    )
}

export default PopupCartItem