import Header from "../../components/Header/Header";
import ProductsSidebar from "../../components/ProductsSidebar/ProductsSidebar";
import { Container, Divider, Drawer, Grid, Hidden, Typography } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material';
import ProductCard from "../../components/ProductCard/ProductCard";

import { useEffect, useState } from "react";
import { getAllProducts } from '../../redux/product/actionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { useStyles } from './styles'

const AllProduct = () => {
    // const debounce = (func) => {
    //     let timer
    //     return function (...args) {
    //         const context = this
    //         if (timer) clearTimeout(timer)
    //         timer = setTimeout(() => {
    //             timer = null
    //             func.apply(context, args)
    //         }, 500)
    //     }
    // }

    const dispatch = useDispatch()
    const styles = useStyles()
    const [open, setOpen] = useState(false)

    const [filter, setFilter] = useState({
        category: 'All',
        rating: 1,
        price: [0, 400000],
        page: 1
    })

    const handleSearchChange = () => {
        dispatch(getAllProducts(filter))
    }

    // const optimizeSearch = useCallback(debounce(handleSearchChange), [])

    useEffect(() => {
        handleSearchChange()
    }, [dispatch, filter, handleSearchChange])

    const { productsArr } = useSelector(state => state.product)


    return (
        <>
            <Header />
            <Container sx={{ paddingY: 8 }}>
                <Typography variant='h3' align='center' sx={{ marginTop: 4 }}>All Products</Typography>
                <Divider variant='middle' light={true} />

                <Hidden lgUp>
                    <MenuIcon fontSize='large' sx={{ marginTop: 2, marginLeft: 2 }} onClick={() => setOpen(true)} />
                    <Drawer
                        anchor='left'
                        open={open}
                        onClose={() => setOpen(false)}
                    >
                        <ProductsSidebar filter={filter} setFilter={setFilter} />
                    </Drawer>
                </Hidden>

                <Grid container columnSpacing={10} sx={{ marginTop: 8 }}>
                    <Grid item sm={0} lg={3} className={styles.sidebar}>
                        <ProductsSidebar filter={filter} setFilter={setFilter} />
                    </Grid>

                    <Grid item xs={12} lg={9}>
                        <Grid container columnSpacing={10} rowSpacing={5} justifyContent='center'>
                            {
                                productsArr.map(product => (
                                    <Grid item xs={12} sm={6} md={4} key={product._id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <ProductCard name={product.name} price={product.price} rating={product.rating} imgSrc={product.images[0].url} productId={product._id} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                </Grid>

            </Container>
        </>
    )
};

export default AllProduct;
