import React from 'react';
import CategoryName from "./CategoryName";
import CatalogContainer from "./CatalogContainer";

class Men extends React.Component {
    render() {
        return (
            <div>
                <CategoryName/>
                <CatalogContainer/>
            </div>
        )
    }
}

export default Men