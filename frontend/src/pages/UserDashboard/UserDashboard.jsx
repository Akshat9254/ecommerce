import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer'
// import MyOrders from '../../components/MyOrders/MyOrders'
import Cart from '../../components/Cart/Cart'
import { Box, Card, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useState } from 'react'


const UserDashboard = () => {
  const [value, setValue] = useState(0)

  return (
    <>
      <Header />
      <Container sx={{ height: '95vh', paddingY: 6 }}>
        <Grid container columnSpacing={2}>
          <Grid item md={3}>
            <Card>
              <Container sx={{ paddingY: 4 }}>
                <Typography variant='h6' align='center'>Dashboard</Typography>
                <Tabs
                  orientation="vertical"
                  value={value}
                  onChange={(e, newValue) => setValue(newValue)}
                  aria-label="Vertical tabs example"
                >
                  <Tab label='My Orders' />
                  <Tab label='My Profile' />
                  <Tab label='Cart' />
                </Tabs>
              </Container>
            </Card>
          </Grid>
          <Grid item md={9}>
            <TabPanel value={value} index={0}>
              <Cart />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Cart />
            </TabPanel>
          </Grid>

        </Grid>
      </Container>
      <Footer />
    </>
  )
};

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>{children}</Box>
      )}
    </div>
  );
}

export default UserDashboard;
