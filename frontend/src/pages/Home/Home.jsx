import ProductCard from "../../components/ProductCard/ProductCard";
import Header from '../../components/Header/Header'
import { responsive } from "./styles";
import Banner from '../../components/Banner/Banner';
import { Box, Container } from '@mui/material'
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import productImg1 from '../../assets/images/product1.png'
import productImg2 from '../../assets/images/product2.png'
import productImg3 from '../../assets/images/product3.png'
import Footer from "../../components/Footer/Footer";

const data = [productImg1, productImg2, productImg3, productImg1, productImg2, productImg3, productImg1, productImg2, productImg3]


const Home = () => {
    return (
        <>
            <Header />
            <Box sx={{ flexGrow: 1, backgroundColor: '#f6f9fc' }}>
                <Banner />
                <Container sx={{ marginY: '2rem' }}>

                    <MultiCarousel
                        swipeable={true}
                        draggable={true}
                        showDots={false}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={2000}
                        keyBoardControl={true}
                        customTransition="all 1s ease-in-out"
                        transitionDuration={2000}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-100-px"
                        centerMode={true}
                    >
                        {
                            data.map((img, index) => <ProductCard key={index} imgSrc={img} />)
                        }
                    </MultiCarousel>
                </Container>
            </Box>
            <Footer />
        </>
    )
};

export default Home;
