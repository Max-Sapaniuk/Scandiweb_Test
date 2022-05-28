import {configureStore} from '@reduxjs/toolkit'
import mainReducer from "./mainReducer";
import productPageReducer from "./productPageReducer";

export default configureStore({reducer: {mainReducer, productPageReducer}})
