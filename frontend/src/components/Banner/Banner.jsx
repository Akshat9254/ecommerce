import { Button, Container, Grid, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { Item, useStyles } from './styles'
import bannerImg from '../../assets/images/nike-black.png'
import Carousel from 'react-material-ui-carousel'

const Banner = () => {
    const styles = useStyles()
    return (
        <Box sx={{ backgroundColor: '#fff' }}>
            <Container>
                <Carousel animation='slide'>
                    <Grid container>
                        <Grid item xs={0} md={6}>
                            <Item>
                                <Typography variant='h2' gutterBottom component={'div'}>
                                    50% Off for Your First Shopping
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom component={'div'}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                </Typography>

                                <Link to='/' className='link'><Button variant='contained'>Shop Now</Button></Link>
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Item><img src={bannerImg} alt="banner" className={styles.bannerImg} /></Item>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={0} md={6}>
                            <Item>
                                <Typography variant='h2' gutterBottom component={'div'}>
                                    50% Off for Your First Shopping
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom component={'div'}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                </Typography>

                                <Link to='/' className='link'><Button variant='contained'>Shop Now</Button></Link>
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Item><img src={bannerImg} alt="banner" className={styles.bannerImg} /></Item>
                        </Grid>
                    </Grid>
                </Carousel>
            </Container>
        </Box>
    );
};

export default Banner;
