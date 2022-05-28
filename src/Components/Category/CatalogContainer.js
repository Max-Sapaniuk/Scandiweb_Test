import Product from "./Product/Product";

function CatalogContainer(props) {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            columnGap: "20px",
            rowGap: "40px",
            margin: "0 100px 0 100px"
        }}>
            {
                props.allProducts.data.category.products.map((currentProd) => {
                    return (
                        <Product
                            key={currentProd.id}
                            id={currentProd.id}
                            name={currentProd.name}
                            gallery={currentProd.gallery}
                            inStock={currentProd.inStock}
                            prices={currentProd.prices}
                            attributes={currentProd.attributes}
                        />
                    )
                })
            }
        </div>
    )
}

export default CatalogContainer
