import {createAction, createReducer} from "@reduxjs/toolkit";

const changeIsCartPopUpOpen = "ChangeIsCartPopUpOpen"
const changeIsCurrencyPopUpOpen = "ChangeIsCurrencyPopUpOpen"
const addProductsToCart = "AddProductsToCart"
const removeProductsFromCart = "RemoveProductsFromCart"
const changeProductAttribute = "ChangeProductAttribute"
const setCurrency = "SetCurrency"
const nextImage = "NextImage"
const prevImage = "PrevImage"

let initialState = {
    isCartPopUpOpen: false,
    isCurrencyPopUpOpen: false,
    currency: {
        all: {},
        selected: {}
    },
    productsInCart: {},
}

const mainReducer = createReducer(initialState, {
    [changeIsCartPopUpOpen]: (state, action) => {
        state.isCartPopUpOpen = !state.isCartPopUpOpen
    },
    [changeIsCurrencyPopUpOpen]: (state, action) => {
        state.isCurrencyPopUpOpen = !state.isCurrencyPopUpOpen
    },
    [addProductsToCart]: (state, action) => {
        if (state.productsInCart[action.payload.id] === undefined) {
            state.productsInCart[action.payload.id] = {}
            state.productsInCart[action.payload.id].number = 1
            state.productsInCart[action.payload.id].prices = action.payload.prices
            state.productsInCart[action.payload.id].attributes = {}
            state.productsInCart[action.payload.id].gallery = action.payload.gallery
            state.productsInCart[action.payload.id].currentImage = action.payload.currentImage ? action.payload.currentImage : 0
            if (action.payload.selectedAttributes) {
                for (let i in action.payload.attributes) {
                    state.productsInCart[action.payload.id].attributes[action.payload.attributes[i].id] = action.payload.selectedAttributes[action.payload.attributes[i].id]
                }
            } else {
                for (let i in action.payload.attributes) {
                    state.productsInCart[action.payload.id].attributes[action.payload.attributes[i].id] = action.payload.attributes[i].items[0].id
                }
            }

        } else {
            state.productsInCart[action.payload.id].number = (state.productsInCart[action.payload.id].number === undefined)
                ?
                1
                :
                state.productsInCart[action.payload.id].number + 1
        }
    },
    [removeProductsFromCart]: (state, action) => {
        state.productsInCart[action.payload.id].number -= 1
        if (state.productsInCart[action.payload.id].number === 0)
            delete state.productsInCart[action.payload.id]
    },
    [changeProductAttribute]: (state, action) => {
        state.productsInCart[action.payload.id].attributes[action.payload.attrId] = action.payload.newValue
    },
    [setCurrency]: (state, action) => {
        if (Object.keys(state.currency.all).length === 0) {
            state.currency.all = action.payload.all
        }
        state.currency.selected = action.payload.selected
    },
    [nextImage]: (state, action) => {
        if ((state.productsInCart[action.payload.id].currentImage + 1) < state.productsInCart[action.payload.id].gallery.length)
            state.productsInCart[action.payload.id].currentImage += 1
        else
            state.productsInCart[action.payload.id].currentImage = 0
    },
    [prevImage]: (state, action) => {
        if ((state.productsInCart[action.payload.id].currentImage - 1) >= 0)
            state.productsInCart[action.payload.id].currentImage -= 1
        else
            state.productsInCart[action.payload.id].currentImage = state.productsInCart[action.payload.id].gallery.length - 1

    },
})

export const actionChangeIsCartPopUpOpen = createAction(changeIsCartPopUpOpen)
export const actionChangeIsCurrencyPopUpOpen = createAction(changeIsCurrencyPopUpOpen)
export const actionAddProductsToCart = createAction(addProductsToCart)
export const actionRemoveProductsFromCart = createAction(removeProductsFromCart)
export const actionChangeProductAttribute = createAction(changeProductAttribute)
export const actionSetCurrency = createAction(setCurrency)
export const actionNextImage = createAction(nextImage)
export const actionPrevImage = createAction(prevImage)

export default mainReducer