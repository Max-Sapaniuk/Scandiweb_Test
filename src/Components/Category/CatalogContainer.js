import React from 'react';
import Product from "./Product/Product";

class CatalogContainer extends React.Component {
    render() {
        return (
            <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", columnGap: "20px", rowGap: "40px", margin: "0 100px 0 100px"}}>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
                {/*<Product/>*/}
                {/*<Product/>*/}
            </div>
        )
    }
}

export default CatalogContainer
