import { CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS_FAIL, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAIL, GET_SEARCHED_PRODUCTS_REQUEST, GET_SEARCHED_PRODUCTS_SUCCESS, GET_SEARCHED_PRODUCTS_FAIL, GET_ALL_PRODUCTS_ADMIN_REQUEST, GET_ALL_PRODUCTS_ADMIN_SUCCESS, GET_ALL_PRODUCTS_ADMIN_FAIL, ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS, ADD_REVIEW_FAIL, CLEAR_ERROR, GET_PRODUCT_REVIEW_REQUEST, GET_PRODUCT_REVIEW_SUCCESS, GET_PRODUCT_REVIEW_FAIL, CLEAR_SUCCESS } from './actionTypes'

const initialState = {
    loading: false,
    error: '',
    productsArr: [],
    currentProduct: null,
    searchOptions: [],
    products: [],
    success: false,
    currentProductReview: []
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST: return { ...state, loading: true }
        case CREATE_PRODUCT_SUCCESS: return { ...state, loading: false }
        case CREATE_PRODUCT_FAIL: return { ...state, loading: false, error: action.payload }

        case GET_ALL_PRODUCTS_REQUEST: return { ...state, loading: true }
        case GET_ALL_PRODUCTS_SUCCESS: return { ...state, loading: false, productsArr: action.payload }
        case GET_ALL_PRODUCTS_FAIL: return { ...state, loading: false, error: action.payload }

        case GET_PRODUCT_REQUEST: return { ...state, loading: true }
        case GET_PRODUCT_SUCCESS: return { ...state, loading: false, currentProduct: action.payload }
        case GET_PRODUCT_FAIL: return { ...state, loading: false, error: action.payload }

        case GET_SEARCHED_PRODUCTS_REQUEST: return { ...state, loading: true }
        case GET_SEARCHED_PRODUCTS_SUCCESS: return { ...state, loading: false, searchOptions: action.payload }
        case GET_SEARCHED_PRODUCTS_FAIL: return { ...state, loading: false, error: action.payload }

        case GET_ALL_PRODUCTS_ADMIN_REQUEST: return { ...state, loading: true }
        case GET_ALL_PRODUCTS_ADMIN_SUCCESS: return { ...state, loading: false, products: action.payload }
        case GET_ALL_PRODUCTS_ADMIN_FAIL: return { ...state, loading: false, error: action.payload }

        case ADD_REVIEW_REQUEST: return { ...state, loading: true }
        case ADD_REVIEW_SUCCESS: return { ...state, loading: false, success: true }
        case ADD_REVIEW_FAIL: return { ...state, loading: false, error: action.payload }

        case GET_PRODUCT_REVIEW_REQUEST: return { ...state, loading: true }
        case GET_PRODUCT_REVIEW_SUCCESS: return { ...state, loading: false, currentProductReview: action.payload }
        case GET_PRODUCT_REVIEW_FAIL: return { ...state, loading: false, error: action.payload }

        case CLEAR_ERROR: return { ...state, error: '' }
        case CLEAR_SUCCESS: return { ...state, success: false }

        default: return state
    }
}

export default productReducer