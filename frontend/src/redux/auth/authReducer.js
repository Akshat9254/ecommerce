import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, CLEAR_ERROR, AUTO_LOGIN_REQUEST, AUTO_LOGIN_SUCCESS, AUTO_LOGIN_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAIL } from './actionsTypes'

const initialState = {
    user: null,
    loading: false,
    error: '',
    allUsers: []
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: return { ...state, loading: true }
        case LOGIN_SUCCESS: return { ...state, loading: false, user: action.payload }
        case LOGIN_FAILURE: return { ...state, loading: false, error: action.payload }

        case REGISTER_REQUEST: return { ...state, loading: true }
        case REGISTER_SUCCESS: return { ...state, loading: false, user: action.payload }
        case REGISTER_FAILURE: return { ...state, loading: false, error: action.payload }

        case CLEAR_ERROR: return { ...state, error: '' }

        case AUTO_LOGIN_REQUEST: return { ...state, loading: true }
        case AUTO_LOGIN_SUCCESS: return { ...state, loading: false, user: action.payload }
        case AUTO_LOGIN_FAIL: return { ...state, loading: false, error: action.payload }

        case GET_ALL_USERS_REQUEST: return { ...state, loading: true }
        case GET_ALL_USERS_SUCCESS: return { ...state, loading: false, success: true, allUsers: action.payload }
        case GET_ALL_USERS_FAIL: return { ...state, loading: false, error: action.payload }

        default: return state
    }
}

export default authReducer