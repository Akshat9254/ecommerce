import { Avatar, AvatarGroup, Button, Container, FormControl, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Select, TextareaAutosize, TextField, Typography } from '@mui/material';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProduct } from '../../redux/product/actionCreator'
import Header from '../../components/Header/Header'

const CreateProduct = () => {
    const dispatch = useDispatch()

    const [inputObj, setInputObj] = useState({
        name: '',
        description: '',
        category: 'Electronics',
        price: 0,
        stock: 0
    })

    const [images, setImages] = useState([])

    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target

        if (name === 'images') {
            setLoading(true)
            setImages([])

            const files = Array.from(e.target.files)
            files.forEach(file => {
                const reader = new FileReader()

                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setImages((oldArr) => {
                            return [...oldArr, reader.result]
                        })
                    }
                }

                reader.readAsDataURL(file)
            })

            setLoading(false)
        } else {
            setInputObj((prevObj) => {
                return { ...prevObj, [name]: value }
            })
        }
    }

    const handleSubmit = () => {
        const { name, price, description, category, stock } = inputObj
        if (!name || !price || !description || !category || !stock || !images.length) return

        const formData = new FormData()
        formData.set('name', name)
        formData.set('price', price)
        formData.set('stock', stock)
        formData.set('description', description)
        formData.set('category', category)

        images.forEach((image) => {
            formData.append("images", image);
        });

        dispatch(createProduct(formData))
        // setInputObj({
        //     name: '',
        //     description: '',
        //     category: 'Electronics',
        //     price: 0,
        //     stock: 0
        // })

        // setImages([])
    }

    return (
        <>
            <Header />
            <Typography variant='h3' align='center' gutterBottom>Create Product</Typography>
            <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Paper sx={{ width: 400, padding: 4 }}>
                    <TextField name='name' label='Product Name' value={inputObj.name} onChange={handleInputChange} fullWidth margin='normal' />
                    <TextField name='price' label='Product Price' value={inputObj.price} onChange={handleInputChange} fullWidth margin='normal' type='number' />
                    <TextField name='stock' label='Number of Stocks' value={inputObj.stock} onChange={handleInputChange} fullWidth margin='normal' type='number' />

                    <FormControl fullWidth sx={{ marginY: '1rem' }}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='category'
                            value={inputObj.category}
                            label="Category"
                            onChange={handleInputChange}
                        >
                            <MenuItem value='Electronics'>Electronics</MenuItem>
                            <MenuItem value='Clothing'>Clothing</MenuItem>
                            <MenuItem value='Home Appliance'>Home Appliance</MenuItem>
                        </Select>
                    </FormControl>
                    <TextareaAutosize minRows={4} name='description' placeholder="Product Description" style={{ width: '98%', marginBottom: '1rem' }}
                        value={inputObj.description} onChange={handleInputChange} />


                    <input type='file' multiple accept="image/*" id='product-image' name='images' style={{ display: 'none' }} onChange={handleInputChange} />
                    <label htmlFor="product-image">
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <AvatarGroup max={4} variant='rounded' sx={{ marginRight: 2 }}>
                                        {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" /> */}
                                        {
                                            images.map((image, index) => <Avatar key={index} alt='product image' src={image} />)
                                        }
                                    </AvatarGroup>
                                </ListItemAvatar>
                                <ListItemText primary='Upload Product Pictures' />
                            </ListItem>
                        </List>
                    </label>

                    <Button variant='contained' size='large' disabled={loading} onClick={handleSubmit}>Submit</Button>
                </Paper>

            </Container>
        </>
    )
};

export default CreateProduct;
