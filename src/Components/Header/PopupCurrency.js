import {useDispatch, useSelector} from "react-redux";
import {actionChangeIsCurrencyPopUpOpen, actionSetCurrency} from "../../Redux/mainReducer";

function PopupCurrency(props) {
    let currency = useSelector(state => state.mainReducer.currency.all)
    let selectedCurrency = useSelector(state => state.mainReducer.currency.selected)
    let dispatch = useDispatch()
    return (
        <div style={{width: "115px", padding: "10px 0 10px 0", boxShadow: "0 0 10px 10px rgba(168, 172, 176, 0.19)", zIndex: "99"}}>
            {currency.map(currEl => {
                return (
                    <a href="#"
                       onClick={(event) => {
                           event.preventDefault()
                           dispatch(actionSetCurrency({
                               selected: currEl
                           }))
                           dispatch(actionChangeIsCurrencyPopUpOpen())
                       }}>
                        <div
                            style={selectedCurrency.label === currEl.label ?
                                {
                                    padding: "8px 0 8px 20px",
                                    backgroundColor: "#EEEEEE"
                                }
                                :
                                {
                                    padding: "8px 0 8px 20px",
                                }}>
                            {`${currEl.symbol} ${currEl.label}`}
                        </div>
                    </a>
                )
            })}
        </div>

    )
}

export default PopupCurrency