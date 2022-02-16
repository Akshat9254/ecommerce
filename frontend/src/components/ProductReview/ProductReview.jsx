import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Rating, Typography } from "@mui/material";
import { format } from 'timeago.js'


const ProductReview = ({ review }) => {
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar><Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 48, height: 48 }} /></ListItemAvatar>
            <ListItemText
                primary={
                    <>
                        <Typography variant='subtitle1'>{review.name}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Rating name="half-rating-read" defaultValue={review.rating} precision={0.5} readOnly size='small' />
                            <Typography variant='body2' color="text.secondary">{format(review.date)}</Typography>
                        </Box>
                    </>
                }
                secondary={
                    <>
                        {review.comment}
                    </>
                }
            />
        </ListItem>
    )
};

export default ProductReview;
