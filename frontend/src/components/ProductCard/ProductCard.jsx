import { Button, Card, CardActions, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import { Link } from 'react-router-dom'
import { useStyles } from './styles'



const ProductCard = ({ name, price, rating, imgSrc, productId }) => {
    const styles = useStyles()

    return (
        <Link className="link" to={`/product/${productId}`}>
            <Card sx={{ width: 280 }} className={styles.card}>
                {/* <Chip label="20% OFF" color='primary' size='small' /> */}
                <CardMedia
                    component="img"
                    height="220"
                    src={imgSrc}
                    alt="product"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">{name}</Typography>
                    <Rating value={rating} precision={0.5} readOnly />
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Typography variant='subtitle1'>Rs.{price}</Typography>
                    <Button size="medium" sx={{ justifyItems: 'flex-end' }}>View</Button>
                </CardActions>
            </Card>
        </Link>
    )
};

export default ProductCard;
