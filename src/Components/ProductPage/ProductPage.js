import {useParams} from "react-router-dom";
import style from "./ProductPage.module.css"
import {gql, useQuery} from "@apollo/client";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actionChangeAttribute, actionSetCurrentProduct, actionSetMainImage} from "../../Redux/productPageReducer";
import {Interweave} from "interweave";
import {actionAddProductsToCart} from "../../Redux/mainReducer";

function ProductPage(props) {
    let id = useParams().productId
    let dispatch = useDispatch()
    const getProd = gql`query {
	product(id: "${id}") {
	__typename @skip(if: true)
	id
    name
    inStock
    gallery
    description
    attributes {
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
    prices {
      __typename @skip(if: true)
      currency {
        __typename @skip(if: true)
        symbol
        label
      }
      amount
    }
    brand
  }
}`
    let prod = useQuery(getProd)
    let ProductPage = useSelector(state => state.productPageReducer)
    let currency = useSelector(state => state.mainReducer.currency.selected.label)


    useEffect(() => {
        if (!prod.loading && prod.data.product.id !== ProductPage.currentProduct.id) {
            dispatch(actionSetCurrentProduct({
                product: prod.data.product,
            }))
        }
    })

    if (prod.loading) return (<div>
        <img src="./Spinner-3.gif" alt=""/>
    </div>)

    return (<div className={style.container}>
        <div className={`${style.items} ${style.item1}`}>
            {ProductPage.currentProduct.gallery ? ProductPage.currentProduct.gallery.map((currentElement) => {
                return <a href="#">
                    <img src={currentElement}
                         alt=""
                         className={style.sideImages}
                         onClick={() => {
                             dispatch(actionSetMainImage({
                                 mainImage: currentElement
                             }))
                         }}
                    />
                </a>
            }) : null}
        </div>
        <div className={`${style.items} ${style.item2}`}>
            <img src={ProductPage.mainImage} alt="" className={style.mainImage}/>
        </div>
        <div className={`${style.items} ${style.item3}`}>
            <div style={{fontSize: "30px"}}><b>{ProductPage.currentProduct.brand}</b></div>
            <div style={{fontSize: "30px"}}>{ProductPage.currentProduct.name}</div>
            <div style={{margin: "40px 0 40px 0"}}>
                {
                    ProductPage.currentProduct.attributes ?
                        ProductPage.currentProduct.attributes.map((el) => {
                            switch (el.type) {
                                case "text":
                                    return (
                                        <div>
                                            <div style={{fontSize: "18px"}}><b>{el.name}:</b></div>
                                            {el.items.map((currVal =>
                                                    <a href="#"
                                                       onClick={event => {
                                                           event.preventDefault()
                                                           dispatch(actionChangeAttribute({
                                                               attrId: el.id,
                                                               newValue: currVal.id,
                                                           }))
                                                       }}>
                                                        <div
                                                            className={ProductPage.currentAttributes[el.id] === currVal.id
                                                                ?
                                                                style.activeText
                                                                :
                                                                null
                                                            }
                                                            style={{
                                                                display: "inline-block",
                                                                border: "1px solid black",
                                                                margin: "3px",
                                                                padding: "15px 25px 15px 25px",
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
                                            <div style={{fontSize: "18px"}}><b>{el.name}:</b></div>
                                            {el.items.map((currVal =>
                                                    <a href="#"
                                                       onClick={event => {
                                                           event.preventDefault()
                                                           dispatch(actionChangeAttribute({
                                                               attrId: el.id,
                                                               newValue: currVal.id,
                                                           }))
                                                       }}>
                                                        <div
                                                            className={`${style.colors} ${ProductPage.currentAttributes[el.id] === currVal.id
                                                                ?
                                                                style.activeSwatch
                                                                :
                                                                null}`
                                                            }>
                                                            <div
                                                                style={{
                                                                    width: "32px",
                                                                    height: "32px",
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
                        :
                        null
                }
            </div>
            <div style={{fontSize: "18px"}}><b>Price:</b></div>
            {
                ProductPage.currentProduct.prices ?
                    ProductPage.currentProduct.prices.map((currentPrice) => {
                        if (currentPrice.currency.label === currency)
                            return <div style={{fontSize: "24px", margin: "10px 0 20px 0"}}>
                                <b>{`${currentPrice.currency.symbol} ${currentPrice.amount}`}</b></div>
                    })
                    :
                    null
            }
            {
                ProductPage.currentProduct.inStock ?
                    <button
                        style={{
                            width: "300px",
                            height: "50px",
                            backgroundColor: "#5ECE7B",
                            color: "white",
                            border: "none",
                            cursor: "pointer"
                        }}
                        onClick={(event) => {
                            event.preventDefault()
                            dispatch(actionAddProductsToCart({
                                id: ProductPage.currentProduct.id,
                                attributes: ProductPage.currentProduct.attributes,
                                prices: ProductPage.currentProduct.prices,
                                selectedAttributes: ProductPage.currentAttributes,
                                gallery: ProductPage.currentProduct.gallery,
                            }))
                        }}>
                        ADD TO CART
                    </button>
                    :
                    <button style={{
                        width: "300px",
                        height: "50px",
                        backgroundColor: "#5ECE7B",
                        color: "white",
                        border: "none",
                        cursor: "not-allowed",
                        opacity: 0.5,
                    }} disabled>
                        OUT OF STOCK
                    </button>
            }
            <div style={{
                marginTop: "40px",
                fontFamily: 'Roboto',
                fontSize: "16px",
            }}>
                <Interweave content={ProductPage.currentProduct.description}/>
            </div>
        </div>
    </div>)
}

export default ProductPage
