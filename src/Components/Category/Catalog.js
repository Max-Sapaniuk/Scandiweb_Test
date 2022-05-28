import CategoryName from "./CategoryName";
import CatalogContainer from "./CatalogContainer";
import {gql, useQuery} from "@apollo/client";

function Catalog(props) {
    const getAllProd = gql`query {
                                    category(input: {title: "${props.category.toLowerCase()}"}) {
                                        products {
                                              __typename @skip(if: true)
                                            id
                                            name
                                            inStock
                                            gallery
                                            prices {
                                                  __typename @skip(if: true)
                                                currency {
                                                      __typename @skip(if: true)
                                                    label
                                                    symbol
                                                }
                                              amount
                                            }
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
                                        }
                                    }
                                  }`
    let allProducts = useQuery(getAllProd)

    if (allProducts.error)
        return <div>ERRON DON DON</div>

    return (
        <div>
            <CategoryName name={props.category}/>
            {
                allProducts.loading
                    ?
                    <div style={{textAlign: "center"}}><img src="/images/Spinner-3.gif" alt=""/></div>
                    :
                    <CatalogContainer allProducts={allProducts}/>
            }
        </div>
    )
}

export default Catalog