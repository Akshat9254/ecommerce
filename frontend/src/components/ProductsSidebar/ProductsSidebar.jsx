import { Card, Checkbox, Container, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Rating, Slider, Typography } from '@mui/material'

// const appendQuery = (url, queryObj) => {
//     for (let key in queryObj) {
//         if (typeof queryObj[key] === 'object') {
//             // url = url.concat(`?price[lt]=${queryObj[key][0]}&price[gt]=${queryObj[key][1]}`)
//         } else {
//             if (queryObj[key])
//                 url = url.concat(`?${key}=${queryObj[key]}`)
//         }
//     }

//     return url
// }

const categories = ['All', 'Mobiles', 'Electronics', 'Clothing', 'Home Appliance']


const ProductsSidebar = ({ filter, setFilter }) => {
    const handleFilterChange = (e, newValue) => {
        const { name } = e.target
        setFilter(prev => {
            return { ...prev, [name]: newValue }
        })

    }
    return (
        <Card sx={{ paddingY: 2 }}>
            <Container>
                <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Categories</Typography>
                        <List dense>
                            {categories.map(value => (
                                <CategoryListItem value={value} filter={filter} handleFilterChange={handleFilterChange} key={value} />
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12}><Divider variant="fullWidth" /></Grid>


                    <Grid item xs={12}>
                        <Typography variant='h6'>Price Range</Typography>
                        <Slider
                            value={filter.price}
                            name='price'
                            onChange={(e, newValue) => handleFilterChange(e, newValue)}
                            valueLabelDisplay="auto"
                            max={400000}
                        />
                    </Grid>
                    <Grid item xs={12}><Divider variant="fullWidth" /></Grid>

                    <Grid item xs={12}>
                        <Typography variant='h6'>Ratings Above</Typography>
                        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {[1, 2, 3, 4, 5].map((value) => {
                                return (
                                    <ListItem
                                        key={value}
                                        secondaryAction={<Checkbox edge="end" name='rating'
                                            onChange={(e) => handleFilterChange(e, value)}
                                            checked={value === filter.rating} />}
                                        disablePadding
                                    >
                                        <ListItemButton>
                                            <Rating name="half-rating-read" defaultValue={value} precision={0.5} readOnly />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Grid>

                </Grid>
            </Container>
        </Card>
    )
};


function CategoryListItem({ value, filter, handleFilterChange }) {
    return (
        <ListItem
            secondaryAction={<Checkbox edge="end"
                name='category'
                onChange={(e) => handleFilterChange(e, value)}
                checked={value === filter.category} />}
            disablePadding
        >
            <ListItemButton><ListItemText primary={value} /></ListItemButton>
        </ListItem>
    )
}

export default ProductsSidebar;
