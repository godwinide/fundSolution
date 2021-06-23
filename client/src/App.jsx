import './index.css';
import {Switch, BrowserRouter, Route, Redirect} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import RegisterCustomer from './components/RegisterCustomer';
import CustomerDetails from './components/CustomerDetails';
import Transactions from './components/Transactions';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import Login from './components/Login';
import ChangePassword from './components/ChangePassword';
import {connect} from 'react-redux'
import {getCustomers, getHistory, getComHistory} from './actions/customer'
import {loadUser} from './actions/auth'
import { useEffect } from 'react';
import store from './store'
import NewAdmin from './components/NewAdmin';

function App({getCustomers, getHistory, loadUser, getComHistory, isAuthenticated}) {

  useEffect(()=> {  
    loadUser();
    getCustomers();
    getHistory();
    getComHistory();
  },[])

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute path="/customers" component={Customers} />
        <PrivateRoute path="/register-customer" component={RegisterCustomer} />
        <PrivateRoute path="/customer-details/:acco_no" component={CustomerDetails} />
        <PrivateRoute path="/transactions/:acco_no" component={Transactions} />
        <PrivateRoute path="/deposit" component={Deposit} />
        <PrivateRoute path="/withdraw" component={Withdraw} />
        <PrivateRoute path="/new-admin" component={NewAdmin} />
        <ForwardAuthenticated path="/login" component={Login} />
        <PrivateRoute path="/change-password" component={ChangePassword} />
      </Switch>
    </BrowserRouter>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => store.getState().auth.isAuthenticated
  ? <Component {...props} /> : <Redirect to="/login"/>}
  />
)



const ForwardAuthenticated = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => store.getState().auth.isAuthenticated
  ?<Redirect to="/"/>:<Component {...props}/>}
  />
)

const mapStateToProps = state => ({
  customers: state.customer.customers,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {getCustomers, getHistory, getComHistory, loadUser})(App);
