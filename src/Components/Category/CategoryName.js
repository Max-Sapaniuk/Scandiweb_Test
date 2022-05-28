import React from 'react';
import "./CategoryName.css"

class CategoryName extends React.Component {
    render() {
        return (
            <div className={"containerCategoryName"}>
                {this.props.name}
            </div>
        )
    }
}

export default CategoryName