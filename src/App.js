import './App.css';
import Header from "./Components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Catalog from "./Components/Category/Catalog";
import {useDispatch, useSelector} from "react-redux";
import PopupCart from "./Components/Header/PopupCart";
import {useEffect} from "react";
import {gql, useQuery} from "@apollo/client";
import {actionChangeIsCartPopUpOpen, actionChangeIsCurrencyPopUpOpen, actionSetCurrency} from "./Redux/mainReducer";
import PopupCurrency from "./Components/Header/PopupCurrency";
import ProductPage from "./Components/ProductPage/ProductPage";
import CartPage from "./Components/CartPage/CartPage";

function App() {
    let isCartPopUpOpen = useSelector((state) => state.mainReducer.isCartPopUpOpen)
    let isCurrencyPopUpOpen = useSelector((state) => state.mainReducer.isCurrencyPopUpOpen)
    let currency = useSelector(state => state.mainReducer.currency)
    let dispatch = useDispatch()
    let allCurrency = useQuery(gql`query {
  currencies {
    label
    symbol
  }
}`)

    useEffect(() => {
        if (Object.keys(currency.all).length === 0 && !allCurrency.loading) {
            dispatch(actionSetCurrency({
                all: allCurrency.data.currencies,
                selected: allCurrency.data.currencies[0]
            }))
        }
    })

    return (
        <div>
            <div onClick={() => {
                if (isCurrencyPopUpOpen)
                    dispatch(actionChangeIsCurrencyPopUpOpen())
            }}>
                <Header/>
                <Routes>
                    <Route path="/all" element={<Catalog category={"All"}/>}/>
                    <Route path="/clothes" element={<Catalog category={"Clothes"}/>}/>
                    <Route path="/tech" element={<Catalog category={"Tech"}/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/all/:productId" element={<ProductPage/>}/>
                    <Route path="/clothes/:productId" element={<ProductPage/>}/>
                    <Route path="/tech/:productId" element={<ProductPage/>}/>
                </Routes>
            </div>
            {
                isCartPopUpOpen
                    ?
                    <div className={"popupCart"} style={{height: window.document.documentElement.scrollHeight - 80}}>
                        <div className={"popupInnerCart"}>
                            <PopupCart num={3}/>
                        </div>
                    </div>
                    :
                    null
            }
            {
                isCurrencyPopUpOpen
                    ?
                    <div className={"popupCurrency"}>
                        <PopupCurrency/>
                    </div>
                    :
                    null
            }
        </div>
    );
}

export default App;
