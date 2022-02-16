import './App.css';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import AllProduct from './pages/Products/Products';
import Product from './pages/Product/Product'
// import UserDashboard from './pages/UserDashboard/UserDashboard'
import Cart from './components/Cart/Cart'
import CreateProduct from './pages/CreateProduct/CreateProduct';
import Profile from './pages/Profile/Profile'
import ShippingInfo from './pages/ShippingInfo/ShippingInfo'
import MyOrders from './components/MyOrders/MyOrders';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <ProtectedRoute exact path='/' component={Home} />
        <Route path='/allproducts' component={AllProduct} />
        <Route path='/product/:id' component={Product} />
        {/* <Route path='/user' component={UserDashboard} /> */}
        <ProtectedRoute path='/cart' component={Cart} />
        <ProtectedRoute path='/createproduct' component={CreateProduct} />
        <ProtectedRoute path='/profile' component={Profile} />
        <ProtectedRoute path='/shippinginfo' component={ShippingInfo} />
        <ProtectedRoute path='/orders' component={MyOrders} />
        <Route path='/admin/dashboard' component={AdminDashboard} />
      </Switch>
    </Router>
  );
}

export default App;
