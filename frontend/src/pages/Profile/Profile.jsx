import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Button, Container, Grid, Typography } from '@mui/material'
import noAvatar from '../../assets/images/no-avatar.jpg'

const Profile = () => {
    return (
        <>
            <Header />
            <Container>
                <Grid container>
                    <Grid item sm={12} md={6}>
                        <Grid container alignItems='center' marginTop={3} spacing={3}>
                            <Grid item sm={12} md={6}>
                                <img src={noAvatar} alt='avatar' style={{ height: 300 }} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item sm={12} md={6}>
                        <Grid container direction='column' rowSpacing={1} marginTop={3} spacing={3} justifyContent="space-between" sx={{ height: '90%' }}>
                            <Grid item><Typography variant='body1'>Name: John Doe</Typography></Grid>
                            <Grid item><Typography variant='body1'>Email: john2@test.com</Typography></Grid>
                            <Grid item><Typography variant='body1'>Joined On: 12/02/2022</Typography></Grid>
                            <Grid item><Button variant='outlined'>My Orders</Button></Grid>
                            <Grid item><Button variant='outlined'>Edit Profile</Button></Grid>
                            <Grid item><Button variant='outlined'>Change Password</Button></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

export default Profile