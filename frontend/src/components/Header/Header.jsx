import { AppBar, Autocomplete, Avatar, Box, Container, TextField, Toolbar, Typography } from '@mui/material';
import { Dashboard as DashboardIcon, ShoppingCartOutlined as ShoppingCartOutlinedIcon, ListAlt as ListAltIcon, Person as PersonIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
// import { Search, SearchIconWrapper, StyledInputBase } from './styles'
import { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import personImg from '../../assets/images/person-1.jpg'
import { getSearchedProducts } from '../../redux/product/actionCreator'
import { Link, useHistory } from 'react-router-dom';


const actions = [
    { icon: <DashboardIcon />, name: 'Dashboard' },
    { icon: <ListAltIcon />, name: 'Orders' },
    { icon: <PersonIcon />, name: 'Profile', },
    { icon: <ShoppingCartOutlinedIcon />, name: 'Cart' },
    { icon: <ExitToAppIcon />, name: 'Logout' },
]

const debounce = (func) => {
    let timer
    return function (...args) {
        const context = this
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            func.apply(context, args)
        }, 500)
    }
}

const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { searchOptions } = useSelector(state => state.product)
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        // if (user.role === 'admin') actions.unshift({ icon: <DashboardIcon />, name: 'Dashboard' })
    }, [user])

    const defaultProps = {
        options: searchOptions,
        getOptionLabel: (option) => option.name,
    };

    const [value, setValue] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    const func = (actionName) => {
        if (actionName === 'Dashboard') history.push(`/admin/${actionName.toLowerCase()}`)
        else history.push(`/${actionName.toLowerCase()}`)
    }



    const handleSearchChange = (e) => {
        const { value } = e.target
        dispatch(getSearchedProducts(value))
    }

    const optimizeSearch = useCallback(debounce(handleSearchChange), [])
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='sticky'>
                <Container>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                            <Link to='/' className='link'>
                                <Typography variant="h4" noWrap component="span" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'inline-block' } }}>
                                    Ecommerce
                                </Typography>
                            </Link>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: 'flex' }}>

                            {/* <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={optimizeSearch}
                                />
                            </Search> */}

                            <Autocomplete
                                {...defaultProps}
                                id="controlled-demo"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                    if (newValue) history.push(`/product/${newValue._id}`)
                                }}
                                noOptionsText='No options available.'
                                sx={{ width: '200px' }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Search something..." variant="standard" onChange={optimizeSearch} />

                                )}
                            />

                            {/* <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={(event) => setAnchorEl(event.currentTarget)}
                                endIcon={<KeyboardArrowDownOutlinedIcon />}
                                color='secondary'
                                variant='contained'
                            >
                                All Categories
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
                                <MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
                                <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
                            </Menu> */}
                        </Box>

                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                            <Link to='/allproducts' className='link'><Typography variant='h5'>All Products</Typography></Link>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                            <Backdrop open={isOpen} style={{ zIndex: 2 }} />
                            <SpeedDial
                                ariaLabel="SpeedDial tooltip example"
                                sx={{ position: 'absolute', top: 4, right: 16 }}
                                icon={<Avatar alt="Remy Sharp" src={personImg} />}
                                onClose={() => setIsOpen(false)}
                                onOpen={() => setIsOpen(true)}
                                open={isOpen}
                                direction='down'
                            >
                                {actions.map((action) => (
                                    <SpeedDialAction
                                        key={action.name}
                                        icon={action.icon}
                                        tooltipTitle={action.name}
                                        tooltipOpen
                                        onClick={() => func(action.name)}
                                    />
                                ))}
                            </SpeedDial>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
};



// function Options({text}) {
//     return (

//     )
// }

export default Header;
