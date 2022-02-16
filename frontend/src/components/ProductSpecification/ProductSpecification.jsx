import { Typography } from '@mui/material';

const ProductSpecification = ({ description }) => {
    return (
        <>
            <Typography variant='h6'>Description</Typography>
            <Typography variant='body2'>{description}</Typography>
            {/* <Typography variant='body2'>Model: S450</Typography>
            <Typography variant='body2'>Wireless Bluetooth Headset</Typography>
            <Typography variant='body2'>FM Frequency Response: 87.5 - 108 MHz</Typography>
            <Typography variant='body2'>Feature: FM Radio, Card Supported (Micro SD / TF)</Typography>
            <Typography variant='body2'>Made in China</Typography> */}
        </>
    );
};

export default ProductSpecification;
