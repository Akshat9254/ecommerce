import { Button, Card, Container, Divider, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import SendIcon from '@mui/icons-material/Send';
import { useHistory } from 'react-router-dom'

const CartSummary = () => {
    const history = useHistory()
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } = useSelector(state => state.cart)
    return (
        <Card sx={{ paddingY: 2 }}>
            <Container>
                <Grid container>
                    <Grid item md={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='subtitle1'>Total Price:</Typography>
                        <Typography variant='body1'>{itemsPrice}</Typography>
                    </Grid>
                    <Grid item md={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='subtitle1'>Tax:</Typography>
                        <Typography variant='body1'>{taxPrice.toFixed(2)}</Typography>
                    </Grid>
                    <Grid item md={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='subtitle1'>Shipping Charges:</Typography>
                        <Typography variant='body1'>{shippingPrice.toFixed(2)}</Typography>
                    </Grid>
                    <Grid item md={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='subtitle1'>Total:</Typography>
                        <Typography variant='h6'>{totalPrice}</Typography>
                    </Grid>
                    <Grid item xs={12}><Divider variant="fullWidth" sx={{ marginBottom: 2 }} /></Grid>
                    <Grid item md={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant='contained' endIcon={<SendIcon />} onClick={() => history.push('/shippinginfo')}>Checkout</Button>
                    </Grid>

                </Grid>
            </Container>

        </Card>
    )
};

export default CartSummary;
