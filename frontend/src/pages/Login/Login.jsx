import { Alert as MuiAlert, Avatar, Box, Button, Card, CardActions, CardContent, Grid, List, ListItem, ListItemAvatar, ListItemText, Snackbar, Tab, Tabs, TextField } from "@mui/material";
import { styled } from '@mui/material/styles'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../../redux/auth/actionCreator'
import noAvatar from '../../assets/images/no-avatar.jpg'
import { useHistory } from "react-router-dom";
import { CLEAR_ERROR } from '../../redux/auth/actionsTypes'


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

const TabPanel = ({ children, value, index, ...other }) => {

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}))



const Login = () => {
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const { user, error, loading } = useSelector(state => state.auth)
    useEffect(() => {
        if (error) setOpen(true)
        if (user) history.push('/')
    }, [user, error, history])

    const [value, setValue] = useState(0);
    const [loginInput, setLoginInput] = useState({ email: '', password: '' })
    const [registerInput, setRegisterInput] = useState({ name: '', email: '', password: '', avatar: noAvatar })
    const [avatarPreview, setAvatarPreview] = useState(noAvatar)

    const dispatch = useDispatch()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false);
        dispatch({ type: CLEAR_ERROR })
    }

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target
        setLoginInput((prev) => ({ ...prev, [name]: value }))
    }

    const handleRegisterInputChange = (e) => {
        const { name, value } = e.target
        if (name === 'avatar') {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setRegisterInput((prev) => ({ ...prev, [name]: reader.result }))
                }
            }

            reader.readAsDataURL(e.target.files[0])
        } else {
            setRegisterInput((prev) => ({ ...prev, [name]: value }))
        }


    }

    const handleLoginSubmit = () => {
        dispatch(loginUser(loginInput))
        setLoginInput({ email: '', password: '' })
    }

    const handleRegisterSubmit = () => {
        if (!registerInput.avatar) {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setRegisterInput((prev) => ({ ...prev, avatar: reader.result }))
                }
            }

            reader.readAsDataURL(noAvatar)
        }

        const { name, email, password, avatar } = registerInput
        const formData = new FormData()
        formData.set('name', name)
        formData.set('email', email)
        formData.set('password', password)
        formData.set('avatar', avatar)

        dispatch(registerUser(formData))
        setRegisterInput({ name: '', email: '', password: '', avatar: null })
        setAvatarPreview(noAvatar)
        // if (user) history.push('/')
    }


    return (
        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>{error}</Alert>
            </Snackbar>
            <Card variant='outlined' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>

                <TabPanel value={value} index={0}>
                    <CardContent>
                        <TextField label='Email' size='medium' margin='dense' type='email' name='email' value={loginInput.email} onChange={handleLoginInputChange} /><br />
                        <TextField label='Password' size='medium' margin='dense' type='password' name='password' value={loginInput.password} onChange={handleLoginInputChange} />

                    </CardContent>
                    <CardActions>
                        <Button size="medium" variant='contained' fullWidth onClick={handleLoginSubmit} disabled={loading}>Login</Button>
                    </CardActions>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CardContent>
                        <TextField label='Name' size='small' margin='dense' name='name' value={registerInput.name} onChange={handleRegisterInputChange} fullWidth /><br />
                        <TextField label='Email' size='small' margin='dense' type='email' name='email' value={registerInput.email} onChange={handleRegisterInputChange} fullWidth /><br />
                        <TextField label='Password' size='small' margin='dense' type='password' name='password' value={registerInput.password} onChange={handleRegisterInputChange} fullWidth /><br />

                        <input type='file' accept="image/*" id='avatar' name='avatar' style={{ display: 'none' }} onChange={handleRegisterInputChange} />
                        <label htmlFor="avatar">
                            <Grid container>
                                <Grid item>
                                    <Demo>
                                        <List>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar src={avatarPreview} sx={{ width: 36, height: 36 }} />
                                                </ListItemAvatar>
                                                <ListItemText primary='Upload your Profile Image (optional)' />
                                            </ListItem>
                                        </List>
                                    </Demo>
                                </Grid>
                            </Grid>
                        </label>

                    </CardContent>
                    <CardActions>
                        <Button size="medium" variant='contained' fullWidth onClick={handleRegisterSubmit} disabled={loading}>Register</Button>
                    </CardActions>
                </TabPanel>

            </Card>
        </Box>
    )
}

export default Login;
