import { Container, Grid, Paper, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders } from '../../redux/order/actionCreator'
import { getAllUsers } from '../../redux/auth/actionCreator'
import { allProducts } from '../../redux/product/actionCreator'
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Doughnut, Line } from 'react-chartjs-2'
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"


// let lineState, doughnutState, doughnutState2


const AdminDashboard = () => {
    console.log('dashboard')
    const dispatch = useDispatch()
    const { allUsers, loading: authLoading } = useSelector(state => state.auth)
    const { products, loading: productLoading } = useSelector(state => state.product)
    const { allOrders, loading: orderLoading } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(getAllOrders())
        dispatch(getAllUsers())
        dispatch(allProducts())
    }, [dispatch])

    // useEffect(() => {

    // }, [allOrders, products, allUsers])

    // totalRevenue = allOrders.reduce((sum, current) => sum + current.totalPrice, 0)
    // const outOfStock = products.reduce((prev, current) => prev + (current.stock === 0 ? 1 : 0), 0)
    let processing = 0
    let shipped = 0
    let delivered = 0
    let totalRevenue = 0

    allOrders && allOrders.length > 0 && allOrders.forEach(order => {
        if (order.orderStatus === 'Processing') processing++
        else if (order.orderStatus === 'Shipped') shipped++
        else delivered++

        totalRevenue += order.totalPrice
    })

    let outOfStock = 0
    products && products.length > 0 && products.forEach(product => {
        if (product.stock === 0) outOfStock++
    })

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "Total Revenue",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalRevenue],
            },
        ],
    }

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [{
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock, products.length - outOfStock],
        }]
    }

    const doughnutState2 = {
        labels: ["Processing", "Shipped", "Delivered"],
        datasets: [{
            backgroundColor: ["#ef5350", "#ff9800", "#4caf50"],
            hoverBackgroundColor: ["#c62828", "#ed6c02", "#2e7d32"],
            data: [processing, shipped, delivered],
        }]
    }

    ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)


    return (
        <>
            <Header />
            <Container sx={{ paddingY: 8 }}>
                {
                    authLoading || productLoading || orderLoading ? <Typography variant='h2'>Loading...</Typography>
                        : <>
                            <Typography variant='h3' align='center' gutterBottom>Admin Dashboard</Typography>
                            <Grid container columnSpacing={2} rowSpacing={4}>
                                <Grid item xs={12} md={12}>
                                    <Paper sx={{ padding: 2 }}>
                                        <Typography variant='h5' align='center'>Total Revenue</Typography>
                                        <Typography variant='h4' align='center'>{totalRevenue}</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item sm={12} md={4}>
                                    <Paper sx={{ padding: 2 }}>
                                        <Typography variant='h5' align='center'>Products</Typography>
                                        <Typography variant='h4' align='center'>{products.length}</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item sm={12} md={4}>
                                    <Paper sx={{ padding: 2 }}>
                                        <Typography variant='h5' align='center'>Orders</Typography>
                                        <Typography variant='h4' align='center'>{allOrders.length}</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item sm={12} md={4}>
                                    <Paper sx={{ padding: 2 }}>
                                        <Typography variant='h5' align='center'>Users</Typography>
                                        <Typography variant='h4' align='center'>{allUsers.length}</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Line options={{ responsive: true }} data={lineState} />
                                </Grid>
                                <Grid item sm={12} md={6} p={4}>
                                    <Doughnut data={doughnutState} />
                                </Grid>
                                <Grid item sm={12} md={6} p={4}>
                                    <Doughnut data={doughnutState2} />
                                </Grid>
                            </Grid>
                        </>
                }

            </Container>
            <Footer />
        </>
    )
}

export default AdminDashboard