import {NavLink} from "react-router-dom";
import "./Header.css"
import {useDispatch, useSelector} from "react-redux";
import {actionChangeIsCartPopUpOpen, actionChangeIsCurrencyPopUpOpen} from "../../Redux/mainReducer";

function Header() {
    let dispatch = useDispatch()
    let selectedCurrency = useSelector(state => state.mainReducer.currency.selected)
    let productsInCart = useSelector((state) => state.mainReducer.productsInCart)
    let isCartPopUpOpen = useSelector(state => state.mainReducer.isCartPopUpOpen)
    let isCurrencyPopUpOpen = useSelector(state => state.mainReducer.isCurrencyPopUpOpen)
    return (
        <div className={"header"}>
            <div className={"headerItem1"}>
                <NavLink className={"headerLink"} to="/all" onClick={() => {
                    if (isCartPopUpOpen)
                        dispatch(actionChangeIsCartPopUpOpen())
                    // if (isCurrencyPopUpOpen)
                    //     dispatch(actionChangeIsCurrencyPopUpOpen())
                }}>ALL</NavLink>
                <NavLink className={"headerLink"} to="/clothes" onClick={() => {
                    if (isCartPopUpOpen)
                        dispatch(actionChangeIsCartPopUpOpen())
                    // if (isCurrencyPopUpOpen)
                    //     dispatch(actionChangeIsCurrencyPopUpOpen())
                }}>CLOTHES</NavLink>
                <NavLink className={"headerLink"} to="/tech" onClick={() => {
                    if (isCartPopUpOpen)
                        dispatch(actionChangeIsCartPopUpOpen())
                    // if (isCurrencyPopUpOpen)
                    //     dispatch(actionChangeIsCurrencyPopUpOpen())
                }}>TECH</NavLink>
            </div>
            <div className={"headerItem2"}>
                <img src={"/images/logo.svg"} width={"30px"} height={"30px"} alt=""/>
            </div>
            <div className={`headerItem3 headerMenu`}>
                <div className={"headerMenuItem"}>
                    <a href="#" onClick={(event) => {
                        event.preventDefault()
                        if (!isCurrencyPopUpOpen)
                            dispatch(actionChangeIsCurrencyPopUpOpen())
                        if (isCartPopUpOpen)
                            dispatch(actionChangeIsCartPopUpOpen())
                    }}>
                        <span style={{fontSize: "25px", fontWeight: "600"}}>{selectedCurrency.symbol}</span>
                        {isCurrencyPopUpOpen ?
                            <img src="/images/angle-up.svg" width={"15px"} height={"15px"} alt=""/>
                            :
                            <img src="/images/angle-down.svg" width={"15px"} height={"15px"} alt=""/>
                        }
                    </a>
                </div>
                <div className={"headerMenuItem"}>
                    <a href={"#"} onClick={
                        (event) => {
                            event.preventDefault()
                            dispatch(actionChangeIsCartPopUpOpen())
                            // if (isCurrencyPopUpOpen)
                            //     dispatch(actionChangeIsCurrencyPopUpOpen())
                        }
                    }>
                        <img src="/images/shopping-cart.svg" width={"25px"} height={"25px"} alt=""/>
                        {Object.values(productsInCart).reduce((previousValue, currentValue) => previousValue + currentValue.number, 0) === 0 ?
                            null
                            :
                            <div style={{
                                position: "absolute",
                                bottom: "15px",
                                left: "70px",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                backgroundColor: "black",
                                color: "white",
                                padding: "6px",
                                borderRadius: "50%"
                            }}>
                                <b>{Object.values(productsInCart).reduce((previousValue, currentValue) => previousValue + currentValue.number, 0)}</b>
                            </div>
                        }
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Header