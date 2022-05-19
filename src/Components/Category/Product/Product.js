import React from 'react';
import "./Product.css"

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isVisible: false};
    }

    render() {
        return (
            <div className={"productContainer"}
                 onMouseEnter={() => this.setState({isVisible: true})}
                 onMouseLeave={() => this.setState({isVisible: false})}>
                <a href="#">
                    <img src="./Image.png" alt="" className={"productImage"}/>
                    <div className={"productName"}>Apollo Running Short</div>
                    <div className={"productPrice"}>$50.00</div>
                </a>
                {
                    this.state.isVisible ?
                        <div className={"cartButton"}>
                            <a href="#sd">
                                <img src="./Common.svg" alt=""/>
                            </a>
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}

export default Product
