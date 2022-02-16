import { CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS_FAIL, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAIL, GET_SEARCHED_PRODUCTS_REQUEST, GET_SEARCHED_PRODUCTS_SUCCESS, GET_SEARCHED_PRODUCTS_FAIL, GET_ALL_PRODUCTS_ADMIN_REQUEST, GET_ALL_PRODUCTS_ADMIN_SUCCESS, GET_ALL_PRODUCTS_ADMIN_FAIL, ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS, ADD_REVIEW_FAIL, GET_PRODUCT_REVIEW_REQUEST, GET_PRODUCT_REVIEW_SUCCESS, GET_PRODUCT_REVIEW_FAIL } from './actionTypes'
import axios from 'axios'

const createProductRequest = () => {
    return {
        type: CREATE_PRODUCT_REQUEST
    }
}

const createProductSuccess = () => {
    return {
        type: CREATE_PRODUCT_SUCCESS
    }
}
const createProductFail = (err) => {
    return {
        type: CREATE_PRODUCT_FAIL,
        payload: err
    }
}


export const createProduct = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(createProductRequest())
            const config = {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            };
            const { data } = await axios.post('http://localhost:5000/api/product/admin/create', payload, config)
            console.log(data)
            dispatch(createProductSuccess())
        } catch (err) {
            dispatch(createProductFail(err))
        }
    }
}


const getAllProductsRequest = () => {
    return {
        type: GET_ALL_PRODUCTS_REQUEST
    }
}
const getAllProductsSuccess = (products) => {
    return {
        type: GET_ALL_PRODUCTS_SUCCESS,
        payload: products
    }
}
const getAllProductsFail = (err) => {
    return {
        type: GET_ALL_PRODUCTS_FAIL,
        payload: err
    }
}

export const getAllProducts = ({ category, price, page }) => {
    return async (dispatch) => {
        try {
            dispatch(getAllProductsRequest())
            const config = {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            };

            let url = `http://localhost:5000/api/product/all?price[gte]=${price[0]}&price[lte]=${price[1]}&page=${page}`
            if (category !== 'All') url = url.concat(`&category=${category}`)

            const { data } = await axios.get(url, config)
            dispatch(getAllProductsSuccess(data.allProducts))
        } catch (err) {
            dispatch(getAllProductsFail(err))
        }
    }
}

export const getAllProductsWithKeyword = (keyword) => {
    return async (dispatch) => {
        try {
            dispatch(getAllProductsRequest())
            const config = {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            };

            let url
            if (keyword) url = `http://localhost:5000/api/product/all?keyword=${keyword}`
            else url = `http://localhost:5000/api/product/all`

            const { data } = await axios.get(url, config)
            dispatch(getAllProductsSuccess(data.allProducts))
        } catch (err) {
            dispatch(getAllProductsFail(err))
        }

    }
}

export const getProduct = (productId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_PRODUCT_REQUEST })
            const config = {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            };

            const { data } = await axios.get(`http://localhost:5000/api/product/${productId}`, config)
            dispatch({ type: GET_PRODUCT_SUCCESS, payload: data.product })
        } catch (err) {
            dispatch({ type: GET_PRODUCT_FAIL, payload: err })
        }
    }
}

export const getSearchedProducts = (keyword) => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_SEARCHED_PRODUCTS_REQUEST })
            const config = {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            };

            let url
            if (keyword) url = `http://localhost:5000/api/product/all?keyword=${keyword}`
            else url = `http://localhost:5000/api/product/all`

            const { data } = await axios.get(url, config)
            dispatch({ type: GET_SEARCHED_PRODUCTS_SUCCESS, payload: data.allProducts })
        } catch (err) {
            dispatch({ type: GET_SEARCHED_PRODUCTS_FAIL, payload: err })
        }

    }
}

export const allProducts = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_ALL_PRODUCTS_ADMIN_REQUEST })
            const { data } = await axios.get('http://localhost:5000/api/product/admin/all', { withCredentials: true })
            dispatch({ type: GET_ALL_PRODUCTS_ADMIN_SUCCESS, payload: data.products })
        } catch (err) {
            dispatch({ type: GET_ALL_PRODUCTS_ADMIN_FAIL, payload: err.response.data.message })
        }
    }
}

export const addReview = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({ type: ADD_REVIEW_REQUEST })
            await axios.put('http://localhost:5000/api/product/review', payload, { withCredentials: true })
            dispatch({ type: ADD_REVIEW_SUCCESS })
        } catch (err) {
            dispatch({ type: ADD_REVIEW_FAIL, payload: err.response.data.message })
        }
    }
}

export const getProductReview = (productId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_PRODUCT_REVIEW_REQUEST })
            const { data } = await axios.get(`http://localhost:5000/api/product/review/${productId}`, { withCredentials: true })
            dispatch({ type: GET_PRODUCT_REVIEW_SUCCESS, payload: data.reviews })
        } catch (err) {
            dispatch({ type: GET_PRODUCT_REVIEW_FAIL, payload: err.response.data.message })
        }
    }
}