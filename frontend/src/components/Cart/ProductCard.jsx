import { Container, Grid, Paper, Typography } from "@mui/material";
// import productImg from '../../assets/images/product1.png'


const ProductCard = ({ product }) => {
    return (
        <Paper>
            <Container>
                <Grid container>
                    <Grid item md={4}>
                        <img src={product.image} alt='product' style={{ height: '8rem' }} />
                    </Grid>
                    <Grid item md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant='h6'>{product.name}</Typography>
                        <Typography variant='subtitle1'>Qty: {product.quantity}</Typography>
                        <Typography variant='subtitle1'>Price: {product.price}</Typography>
                    </Grid>
                    <Grid item md={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant='body1'>Rs. {product.quantity * product.price}</Typography>
                    </Grid>

                </Grid>
            </Container >
        </Paper >
    )
};

export default ProductCard;
