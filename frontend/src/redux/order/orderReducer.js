import { NEW_ORDER_REQUEST, NEW_ORDER_SUCCESS, NEW_ORDER_FAIL, CLEAR_ERROR, ALL_ORDERS_OF_A_USER_REQUEST, ALL_ORDERS_OF_A_USER_SUCCESS, ALL_ORDERS_OF_A_USER_FAIL, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, GET_ALL_ORDERS_FAIL } from './actionTypes'

const initialState = {
    loading: false,
    error: '',
    success: false,
    currentUserOrders: [],
    allOrders: []
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_ORDER_REQUEST: return { ...state, loading: true }
        case NEW_ORDER_SUCCESS: return { ...state, loading: false, success: true }
        case NEW_ORDER_FAIL: return { ...state, loading: false, error: action.payload }

        case CLEAR_ERROR: return { ...state, error: '' }

        case ALL_ORDERS_OF_A_USER_REQUEST: return { ...state, loading: true }
        case ALL_ORDERS_OF_A_USER_SUCCESS: return { ...state, loading: false, success: true, currentUserOrders: action.payload }
        case ALL_ORDERS_OF_A_USER_FAIL: return { ...state, loading: false, error: action.payload }

        case GET_ALL_ORDERS_REQUEST: return { ...state, loading: true }
        case GET_ALL_ORDERS_SUCCESS: return { ...state, loading: false, success: true, allOrders: action.payload }
        case GET_ALL_ORDERS_FAIL: return { ...state, loading: false, error: action.payload }

        default: return state
    }
}

export default orderReducer