import axios from 'axios'
import { NEW_ORDER_REQUEST, NEW_ORDER_SUCCESS, NEW_ORDER_FAIL, ALL_ORDERS_OF_A_USER_REQUEST, ALL_ORDERS_OF_A_USER_SUCCESS, ALL_ORDERS_OF_A_USER_FAIL, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, GET_ALL_ORDERS_FAIL } from './actionTypes'

export const newOrder = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({ type: NEW_ORDER_REQUEST })
            await axios.post('http://localhost:5000/api/order/new', payload, { withCredentials: true })
            dispatch({ type: NEW_ORDER_SUCCESS })
        } catch (err) {
            dispatch({ type: NEW_ORDER_FAIL, payload: err.response.data.message })
        }
    }
}

export const getAllOrdersOfAUser = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: ALL_ORDERS_OF_A_USER_REQUEST })
            const { data } = await axios.get('http://localhost:5000/api/order/me', { withCredentials: true })
            dispatch({ type: ALL_ORDERS_OF_A_USER_SUCCESS, payload: data.allOrders })
        } catch (err) {
            dispatch({ type: ALL_ORDERS_OF_A_USER_FAIL, payload: err.response.data.message })
        }
    }
}

export const getAllOrders = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_ALL_ORDERS_REQUEST })
            const { data } = await axios.get('http://localhost:5000/api/order/admin/all', { withCredentials: true })
            dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data.allOrders })
        } catch (err) {
            dispatch({ type: GET_ALL_ORDERS_FAIL, payload: err.response.data.message })
        }
    }
}