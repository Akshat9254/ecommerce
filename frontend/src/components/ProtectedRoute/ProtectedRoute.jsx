import { Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { autoLogin } from '../../redux/auth/actionCreator'
import { useEffect } from 'react'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user, loading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) dispatch(autoLogin())
    }, [user, dispatch])

    return (
        <>
            {
                !loading && (
                    <Route
                        {...rest}
                        render={(props) => user ? <Component {...props} /> : <Redirect to='/login' />}
                    />
                )
            }

        </>
    )
}

export default ProtectedRoute