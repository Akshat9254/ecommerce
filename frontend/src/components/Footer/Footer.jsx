import { Box, Container, Grid, Typography } from "@mui/material";


const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#0c0e30', paddingY: 10 }}>
            <Container>
                <Grid container columnSpacing={6}>
                    <Grid item md={4}>
                        <Typography variant='h3' sx={{ color: '#fff' }} gutterBottom>Ecommerce</Typography>
                        <Typography variant='body2' sx={{ color: '#617b9c' }} align='justify'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Typography>
                    </Grid>
                    <Grid item md={4}>
                        <Grid container>
                            <Grid item md={6}>
                                <Typography variant='h5' sx={{ color: '#fff' }} gutterBottom>About Us</Typography>
                                <FooterLink label='Careers' />
                                <FooterLink label='Our Store' />
                                <FooterLink label='Our Cares' />
                                <FooterLink label='Terms & Conditons' />
                                <FooterLink label='Privacy Policy' />
                            </Grid>
                            <Grid item md={6}>
                                <Typography variant='h5' sx={{ color: '#fff' }} gutterBottom>Customer Care</Typography>
                                <FooterLink label='Help Center' />
                                <FooterLink label='How to Buy?' />
                                <FooterLink label='Track Your Order' />
                                <FooterLink label='Corporate & Bulk Purchasing' />
                                <FooterLink label='Returns & Refunds' />
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item md={4}>
                        <Typography variant='h5' sx={{ color: '#fff' }} gutterBottom>Contact Us</Typography>
                        <Typography variant='body2' sx={{ color: '#617b9c' }} gutterBottom align='justify'>70 Washington Square South, New York, NY 10012, United States</Typography>
                        <Typography variant='body2' sx={{ color: '#617b9c' }} gutterBottom align='justify'>Email: uilib.help@gmail.com</Typography>
                        <Typography variant='body2' sx={{ color: '#617b9c' }} gutterBottom align='justify'>Phone: +1 1123 456 780</Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
};


function FooterLink({ label }) {
    return (
        <Typography variant='body2' sx={{ color: '#617b9c' }} gutterBottom>{label}</Typography>
    )
}

export default Footer;
