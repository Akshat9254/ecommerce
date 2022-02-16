import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, AUTO_LOGIN_REQUEST, AUTO_LOGIN_SUCCESS, AUTO_LOGIN_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAIL } from './actionsTypes'
import axios from 'axios'

const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}

const loginFailure = (err) => {
    return {
        type: LOGIN_FAILURE,
        payload: err
    }
}

const registerRequest = () => {
    return {
        type: REGISTER_REQUEST
    }
}

const registerSuccess = (user) => {
    return {
        type: REGISTER_SUCCESS,
        payload: user
    }
}

const registerFailure = (err) => {
    return {
        type: REGISTER_FAILURE,
        payload: err
    }
}


export const loginUser = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(loginRequest())
            const config = {
                withCredentials: true
            }
            const res = await axios.post('http://localhost:5000/api/user/login', payload, config)
            dispatch(loginSuccess(res.data.user))
        } catch (err) {
            dispatch(loginFailure(err.response.data.message))
        }
    }
}

export const registerUser = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(registerRequest())
            const config = { headers: { "Content-Type": "multipart/form-data" } }
            const { data } = await axios.post('http://localhost:5000/api/user/register', payload, config)
            console.log(data.user)
            dispatch(registerSuccess(data.user))
        } catch (err) {
            dispatch(registerFailure(err))
        }
    }
}

export const autoLogin = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: AUTO_LOGIN_REQUEST })
            const { data } = await axios.get('http://localhost:5000/api/user/refresh', { withCredentials: true })
            dispatch({ type: AUTO_LOGIN_SUCCESS, payload: data.user })
        } catch (err) {
            dispatch({ type: AUTO_LOGIN_FAIL, payload: err.response.data.message })
        }
    }
}

export const getAllUsers = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_ALL_USERS_REQUEST })
            const { data } = await axios.get('http://localhost:5000/api/user/admin/all', { withCredentials: true })
            dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data.allUsers })
        } catch (err) {
            dispatch({ type: GET_ALL_USERS_FAIL, payload: err.response.data.message })
        }
    }
}