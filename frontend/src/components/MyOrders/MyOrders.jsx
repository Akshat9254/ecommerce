import { Box, Collapse, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrdersOfAUser } from '../../redux/order/actionCreator'

import moment from 'moment'

const MyOrders = () => {
    const dispatch = useDispatch()
    const { currentUserOrders, loading } = useSelector(state => state.order)
    useEffect(() => {
        dispatch(getAllOrdersOfAUser())
    }, [dispatch])
    return (
        <>
            <Header />
            <Container sx={{ paddingY: 6 }}>
                <Typography variant='h4' gutterBottom>My Orders</Typography>

                {
                    loading ? <Typography variant='h3' gutterBottom>Loading...</Typography>
                        : <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell align="center">Order ID #</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center">Date of Purchase</TableCell>
                                        <TableCell align="center">Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentUserOrders.map((order) => (
                                        <Row key={order._id} order={order} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                }


            </Container>

            <Footer />
        </>
    )
};


function Row({ order }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="center">{order._id}</TableCell>
                <TableCell align="center">{order.orderStatus}</TableCell>
                <TableCell align="center">{moment(order.createdAt).format('DD/MM/YYYY')}</TableCell>
                <TableCell align="center">{order.totalPrice}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >S.No</TableCell>
                                        <TableCell >Name</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.orderItems.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">{index + 1}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell align="right">{item.price}</TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                            <TableCell align="right">{item.price * item.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}


export default MyOrders;
