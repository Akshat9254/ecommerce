import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import CartSummary from "./CartSummary";
import Header from "../Header/Header";
import { useSelector } from 'react-redux'

const Cart = () => {
    const { orderItems } = useSelector(state => state.cart)
    return (
        <>
            <Header />
            <Container sx={{ paddingY: 3 }}>
                {
                    orderItems.length === 0
                        ? <Typography variant='h1' sx={{ color: '#9e9e9e' }}>Cart is Empty...</Typography>
                        : <Grid container columnSpacing={2}>
                            <Grid item xs={12} md={9}>
                                <Grid container rowGap={2}>
                                    {
                                        orderItems.map(item => (
                                            <Grid key={item.product} item md={12}>
                                                <ProductCard product={item} />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <CartSummary />
                            </Grid>

                        </Grid>
                }

            </Container>
        </>

    )
};

export default Cart;
