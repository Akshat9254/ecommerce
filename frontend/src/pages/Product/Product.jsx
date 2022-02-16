import Header from "../../components/Header/Header";
import ProductInfo from "../../components/ProductInfo/ProductInfo";
import ProductSpecification from "../../components/ProductSpecification/ProductSpecification";
import ProductReview from "../../components/ProductReview/ProductReview";
import Footer from "../../components/Footer/Footer";
import { Alert as MuiAlert, Box, Button, Container, Divider, Grid, List, Rating, Snackbar, Tab, Tabs, TextField, Typography } from "@mui/material";

import Carousel from 'react-material-ui-carousel'
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct, addReview, getProductReview } from '../../redux/product/actionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_ERROR, CLEAR_SUCCESS } from '../../redux/product/actionTypes'


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

const Product = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { currentProduct, loading, success, error: err, currentProductReview } = useSelector(state => state.product)
    const [reviewObj, setReviewObj] = useState({ rating: 0, comment: '' })

    const [open, setOpen] = useState(false)
    const [errOpen, setErrOpen] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        dispatch(getProduct(id))
        dispatch(getProductReview(id))
    }, [dispatch, id])

    useEffect(() => {
        if (success) {
            setSuccessOpen(true)
            setReviewObj({ rating: 0, comment: '' })
            dispatch(getProductReview(id))
        }

        // dispatch(getProductReview(id))
    }, [success])

    useEffect(() => {
        if (err) setErrOpen(true)
    }, [err])

    const [value, setValue] = useState(0)

    const handleReviewChange = (e, newValue) => {
        const { name, value } = e.target
        if (name === 'comment') {
            setReviewObj(prevObj => {
                return { ...prevObj, [name]: value }
            })
        } else {
            setReviewObj(prevObj => {
                return { ...prevObj, [name]: newValue }
            })
        }
    }


    const handleReviewSubmit = () => {
        const { rating, comment } = reviewObj
        if (!rating || !comment) {
            setError('Rating and Comment must be provided')
            setOpen(true)
            return
        }

        dispatch(addReview({
            rating, comment,
            productId: id
        }))
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
        setSuccessOpen(false)
        dispatch({ type: CLEAR_SUCCESS })
    }

    return (
        <>
            <Header />
            <Container>
                {
                    loading || !currentProduct || currentProduct._id !== id ? <h1>Loading...</h1> :
                        <Grid container rowSpacing={8}>
                            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>{error}</Alert>
                            </Snackbar>

                            <Snackbar open={errOpen} autoHideDuration={2000} onClose={handleErrClose}>
                                <Alert onClose={handleErrClose} severity="error" sx={{ width: '100%' }}>{err}</Alert>
                            </Snackbar>

                            <Snackbar open={successOpen} autoHideDuration={2000} onClose={handleSuccessClose}>
                                <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>Review Added</Alert>
                            </Snackbar>
                            <Grid item xs={12}>
                                <Grid container alignItems='center' marginTop={3} spacing={3}>
                                    <Grid item sm={12} md={6}>
                                        <Carousel animation='slide'>
                                            {
                                                currentProduct.images.map((imgSrc, index) => <img key={index} src={imgSrc.url} alt='product' style={{ height: 350 }} />)
                                            }
                                        </Carousel>
                                    </Grid>
                                    <Grid item sm={12} md={6}>
                                        <ProductInfo name={currentProduct.name} rating={currentProduct.rating} numberOfReviews={currentProduct.numberOfReviews} price={currentProduct.price} stock={currentProduct.stock} productId={currentProduct._id} imgUrl={currentProduct.images[0].url} />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Tabs value={value} onChange={(e, newValue) => setValue(newValue)} aria-label="basic tabs example">
                                    <Tab label='Descrption' />
                                    <Tab label='Reviews' />
                                </Tabs>

                                <TabPanel value={value} index={0}>
                                    <ProductSpecification description={currentProduct.description} />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Typography variant='h6'>Reviews</Typography>

                                    <TextField label="Add a comment" variant="standard" margin="normal" value={reviewObj.comment} onChange={handleReviewChange} name='comment' autoComplete="off" />
                                    <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center' }} gutterBottom>Your Rating: <Rating precision={0.5} value={reviewObj.rating} onChange={handleReviewChange} name='rating' /></Typography>
                                    <Button variant='contained' onClick={handleReviewSubmit}>Add Review</Button>

                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {
                                            currentProductReview.length === 0
                                                ? <Typography variant="body1">No reviews yet...</Typography>
                                                : currentProductReview.map(review => (
                                                    <Box key={review._id}>
                                                        <ProductReview review={review} />
                                                        <Divider variant="inset" component="li" />
                                                    </Box>
                                                ))
                                        }


                                        {/* <ProductReview />
                                        <Divider variant="inset" component="li" />
                                        <ProductReview />
                                        <Divider variant="inset" component="li" />
                                        <ProductReview />
                                        <Divider variant="inset" component="li" /> */}
                                    </List>
                                </TabPanel>
                            </Grid>

                        </Grid>

                }

            </Container>
            <Footer />
        </>
    )
};

function TabPanel({ children, value, index, ...other }) {

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default Product;
