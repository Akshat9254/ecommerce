import { Alert as MuiAlert, Box, Button, ButtonGroup, Grid, Rating, Slide, Snackbar, Typography } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useState } from 'react'
import { ADD_PRODUCT, UPDATE_CHARGES } from '../../redux/cart/actionTypes'
import { useDispatch } from 'react-redux'
import React from 'react'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

const ProductInfo = ({ productId, name, rating, numberOfReviews, price, stock, imgUrl }) => {
    const [qty, setQty] = useState(stock > 0 ? 1 : 0)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const transition = (props) => (<Slide {...props} direction="left" />)

    const addToCart = () => {
        dispatch({
            type: ADD_PRODUCT,
            payload: { productId, name, price, imgUrl, qty }
        })

        dispatch({ type: UPDATE_CHARGES })
        setOpen(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false);
    }
    return (
        <>
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} TransitionComponent={transition}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Product Added To Cart
                </Alert>
            </Snackbar>
            <Grid container direction='column' rowSpacing={1}>
                <Grid item><Typography variant='h4'>{name}</Typography></Grid>
                <Grid item>
                    <Typography variant='subtitle1'>Brand: {name?.split(' ')[0]}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Typography variant='subtitle1'>Rated: </Typography>
                        <Rating name="half-rating-read" value={rating} precision={0.5} readOnly size='small' />
                        <Typography variant='subtitle1'> {`(${numberOfReviews} reviews)`}</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Typography variant='h5'>Rs. {price}</Typography>
                    <Typography variant='subtitle1' sx={{ color: stock > 0 ? '#2e7d32' : '#d32f2f' }} >{stock > 0 ? 'Stock Available' : 'Out of Stock'}</Typography>

                </Grid>

                <Grid item marginBottom={3}>
                    <ButtonGroup>
                        <Button variant='contained' size='small' disabled={stock === 0 || qty === 1} onClick={() => setQty((prevQty) => prevQty - 1)}><RemoveIcon size='small' /></Button>
                        <Button variant='outlined' size='small'>{qty}</Button>
                        <Button variant='contained' size='small' disabled={stock === 0 || qty === stock} onClick={() => setQty((prevQty) => prevQty + 1)}><AddIcon size='small' /></Button>
                    </ButtonGroup>
                </Grid>
                <Grid item><Button variant='contained' size='medium' disabled={stock === 0} onClick={addToCart}>Add to Cart</Button></Grid>
                <Grid item><Typography variant='subtitle1'>Sold By: Mobile Store</Typography></Grid>
            </Grid>
        </>
    )
};

export default ProductInfo;
