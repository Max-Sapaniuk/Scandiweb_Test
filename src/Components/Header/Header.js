import React from 'react';
import { NavLink} from "react-router-dom";
import "./Header.css"

class Header extends React.Component {
    render() {
        return (
            <div className={"header"}>
                <div className={"headerItem"}>
                    <NavLink className={"headerLink"} to="/women">WOMEN</NavLink>
                    <NavLink className={"headerLink"} to="/men">MEN</NavLink>
                    <NavLink className={"headerLink"} to="/kids">KIDS</NavLink>
                </div>
                <div className={"headerItem"}>
                    <img src="./logo.svg" width={"30px"} height={"30px"} alt=""/>
                </div>
                <div className={`headerItem headerMenu`}>
                    <div className={"headerMenuItem"}>
                        <img src="./dollar.svg" width={"25px"} height={"25px"} alt=""/>
                        <img src="./angle-down.svg" width={"15px"} height={"15px"} alt=""/>
                    </div>
                    <div className={"headerMenuItem"}>
                        <img src="./shopping-cart.svg" width={"25px"} height={"25px"} alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header