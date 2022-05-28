import {createAction, createReducer} from "@reduxjs/toolkit";

const setCurrentProduct = "SetCurrentProduct"
const setMainImage = "SetMainImage"
const changeAttribute = "ChangeAttribute"

let initialState = {
    currentProduct: {},
    mainImage: "",
    currentAttributes: {},
}

const productPageReducer = createReducer(initialState, {
    [setCurrentProduct]: (state, action) => {
        state.currentProduct = action.payload.product
        state.mainImage = state.currentProduct.gallery[0]
        state.currentAttributes = {}
        state.currentProduct.attributes.forEach(element => {
            state.currentAttributes[element.id] = element.items[0].id
        })
    },
    [setMainImage]: (state, action) => {
        state.mainImage = action.payload.mainImage
    },
    [changeAttribute]: (state, action) => {
        state.currentAttributes[action.payload.attrId] = action.payload.newValue
    }
})

export const actionSetCurrentProduct = createAction(setCurrentProduct)
export const actionSetMainImage = createAction(setMainImage)
export const actionChangeAttribute = createAction(changeAttribute)

export default productPageReducer