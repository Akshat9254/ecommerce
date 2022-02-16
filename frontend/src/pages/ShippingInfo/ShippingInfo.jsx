import { Alert as MuiAlert, Box, Button, Container, FormControl, InputAdornment, InputLabel, MenuItem, Select, Snackbar, TextareaAutosize, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import { Country, State, City } from 'country-state-city'
import { useSelector, useDispatch } from 'react-redux'
import { newOrder } from '../../redux/order/actionCreator'
import { CLEAR_ERROR } from '../../redux/order/actionTypes'


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

const Order = () => {
    const [inputObj, setInputObj] = useState({
        address: '', country: {}, city: {}, state: {}, pinCode: '', phoneNumber: ''
    })

    const { orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice } = useSelector(state => state.cart)
    const { loading, error: err, success } = useSelector(state => state.order)
    const dispatch = useDispatch()

    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)
    const [errOpen, setErrOpen] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)

    useEffect(() => {
        if (success) {
            setSuccessOpen(true)
            setInputObj({
                address: '', country: {}, city: {}, state: {}, pinCode: '', phoneNumber: ''
            })
        }
    }, [success])

    useEffect(() => {
        if (err) setErrOpen(true)
    }, [err])

    const handleInputChange = (e) => {
        const { name, value } = e.target

        setInputObj(prev => {
            return { ...prev, [name]: value }
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false);
        setError('')
    }

    const handleErrClose = (event, reason) => {
        if (reason === 'clickaway') return
        setErrOpen(false);
        dispatch({ type: CLEAR_ERROR })
    }

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') return
        setSuccessOpen(false);
    }



    const handleSubmit = () => {
        const { address, country: { name: countryName }, state: { name: stateName }, city: { name: cityName }, pinCode, phoneNumber } = inputObj
        if (!address || !countryName || !stateName || !cityName || !pinCode || !phoneNumber) {
            setError('Please enter all the fields')
            setOpen(true)
            return
        }


        if (phoneNumber.length !== 10 || !phoneNumber.match(/^[0-9]+$/)) {
            setError('Please put 10 digit mobile number')
            setOpen(true)
            return
        }

        const shippingInfo = {
            address,
            country: countryName,
            state: stateName,
            city: cityName,
            pinCode,
            phoneNumber
        }

        dispatch(newOrder({ shippingInfo, orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice }))
    }

    return (
        <>
            <Header />
            <Container sx={{ display: 'flex', justifyContent: 'center', paddingY: 6 }}>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>{error}</Alert>
                </Snackbar>

                <Snackbar open={errOpen} autoHideDuration={2000} onClose={handleErrClose}>
                    <Alert onClose={handleErrClose} severity="error" sx={{ width: '100%' }}>{err}</Alert>
                </Snackbar>

                <Snackbar open={successOpen} autoHideDuration={2000} onClose={handleSuccessClose}>
                    <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>Order Placed!</Alert>
                </Snackbar>

                <Box sx={{ width: { sm: '100%', md: '50%' }, paddingX: { sm: 4, md: 0 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TextareaAutosize minRows={4} name='address' placeholder="Address" style={{ width: '98%', marginBottom: '1rem' }}
                        value={inputObj.address} onChange={handleInputChange} />

                    <FormControl fullWidth margin='dense'>
                        <InputLabel id="country">Country</InputLabel>
                        <Select
                            labelId="country"
                            value={inputObj.country.name ? inputObj.country : ''}
                            label="Country"
                            onChange={handleInputChange}
                            name='country'
                            sx={{ marginBottom: '1rem' }}
                        >
                            {
                                Country.getAllCountries().map(country => <MenuItem key={country.isoCode} value={country}>{country.name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin='dense'>
                        <InputLabel id="state">State</InputLabel>
                        <Select
                            labelId="state"
                            value={inputObj.state.name ? inputObj.state : ''}
                            label="State"
                            onChange={handleInputChange}
                            name='state'
                            sx={{ marginBottom: '1rem' }}
                        >
                            {
                                State && State.getStatesOfCountry(inputObj.country.isoCode).map(state => <MenuItem key={state.isoCode} value={state}>{state.name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin='dense'>
                        <InputLabel id="city">City</InputLabel>
                        <Select
                            labelId="city"
                            value={inputObj.city.name ? inputObj.city : ''}
                            label="City"
                            onChange={handleInputChange}
                            name='city'
                            sx={{ marginBottom: '1rem' }}
                        >
                            {
                                City && City.getCitiesOfState(inputObj.country.isoCode, inputObj.state.isoCode).map(city => <MenuItem key={city.name} value={city}>{city.name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>

                    <TextField value={inputObj.pinCode} onChange={handleInputChange} name='pinCode' placeholder='Pin Code' sx={{ marginBottom: '1rem' }} fullWidth />

                    <TextField value={inputObj.phoneNumber} onChange={handleInputChange} name='phoneNumber' placeholder='Phone Number' sx={{ marginBottom: '1rem' }} fullWidth InputProps={{ startAdornment: <InputAdornment position="start">{inputObj.country && inputObj.country.phonecode}</InputAdornment> }} />

                    <Button variant='contained' onClick={handleSubmit} disabled={loading}>Place Order</Button>
                </Box>
            </Container>
            <Footer />
        </>
    )
}

export default Order