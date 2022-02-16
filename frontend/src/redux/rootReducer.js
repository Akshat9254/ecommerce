import { combineReducers } from 'redux'
import authReducer from './auth/authReducer'
import productReducer from './product/productReducer'
import cartReducer from './cart/cartReducer'
import orderReducer from './order/orderReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer
})

export default rootReducer