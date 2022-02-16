import { ADD_PRODUCT, REMOVE_PRODUCT, UPDATE_CHARGES } from './actionTypes'

const initialState = {
    orderItems: [],
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    numberOfItems: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            const prevIdx = state.orderItems.findIndex(item => item.product === action.payload.productId)
            let prevQty = 0
            if (prevIdx !== -1) {
                prevQty = state.orderItems[prevIdx].quantity
                state.orderItems.splice(prevIdx, 1)
            }

            return { ...state, orderItems: [...state.orderItems, { product: action.payload.productId, name: action.payload.name, price: action.payload.price, image: action.payload.imgUrl, quantity: action.payload.qty + prevQty }], itemsPrice: state.itemsPrice + action.payload.price * (action.payload.qty + prevQty), numberOfItems: state.numberOfItems + action.payload.qty }

        case REMOVE_PRODUCT: let newOrderItems = state.orderItems.filter(item => item.product !== action.payload.productId)
            return { ...state, orderItems: newOrderItems, itemsPrice: state.itemsPrice - action.payload.price, numberOfItems: state.numberOfItems - action.payload.qty }

        case UPDATE_CHARGES:
            const newTaxPrice = state.itemsPrice * 0.18
            const newShippingPrice = state.itemsPrice < 500 ? 99 : 0
            const newTotalPrice = state.itemsPrice + newTaxPrice + newShippingPrice

            return { ...state, taxPrice: newTaxPrice, shippingPrice: newShippingPrice, totalPrice: newTotalPrice }

        default: return state
    }
}

export default cartReducer