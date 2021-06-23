import React, { useEffect, useState } from 'react'
import Header from './layout/Header'
import Aside from './layout/Aside'
import {connect} from 'react-redux'
import axios from 'axios';
import {getCustomers, getHistory} from '../actions/customer'
import { NavLink, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import {useHistory} from 'react-router-dom'


const CustomerDetails = ({customers, getCustomers, getHistory, admin}) => {    
    const [customer, setCustomer] = useState(false);
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [middlename, setMiddlename] = useState("")
    const [phone, setPhone] = useState("")
    const [balance, setBalance] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const {acco_no} = useParams();

    const history = useHistory();


    useEffect(()=> {
        const customer = customers.filter(c => c.account_number == acco_no)[0];
        if(customer){
            setCustomer(customer);
            setFirstname(customer.firstname);
            setLastname(customer.lastname);
            setMiddlename(customer.middlename);
            setPhone(customer.phone);
            setBalance(customer.balance);
            setCity(customer.city);
            setState(customer.state);
            setLoading(false);
        }
    },[customers])

    const handleUpdate = async () => {
        try{
            setErrorMsg("");
            setSuccessMsg("");
            setLoading(true);
            const data = {firstname, lastname, middlename, balance, city, state, phone, id: customer._id};
            const res = await axios.post("/customers/update", data, {timeout: 30000});
            setLoading(false);
            setSuccessMsg(res.data.msg[0].msg);
            window.scrollTo(500, 0);
            getCustomers();
            getHistory();


        }catch(err){
            setLoading(false);
            typeof err.response.data === 'object'
            ?setErrorMsg(err.response.data.msg[0].msg)
            :setErrorMsg("Please check your internet connection!")
            window.scrollTo(500, 0);
        }
    }

    
    const handleDelete = async () => {

        try{
            const res = await axios.post("/customers/delete-customer", {id: customer._id}, {timeout: 30000});
            getCustomers();
            history.push("/customers");


        }catch(err){
            alert("Something went wrong");
            console.log(err);
        }
    }





    return (
        !loading &&
        <>
        <Aside/>
        <div className="right-panel" id="right-panel">
        <Header/>
        <div className="content">
       
        <div className="animated fadeIn">
            
            <div className="orders">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="box-title">CUSTOMER DETAILS </h4>
                                <h4 className="box-title">Name: {customer.firstname} {customer.middlename} {customer.lastname} </h4>
                                <h4 className="box-title">Account Number: {customer.account_number}</h4>
                            </div>
                            <div className="card-body">
                                <NavLink to={"/transactions/"+customer.account_number} className="btn btn-info mr-3">
                                    <i className="fa fa-history"></i>
                                    {" "}Transactions</NavLink>
                                {
                                    admin.isSuper
                                    &&
                                    <button onClick={handleDelete} className="btn btn-danger text-white">
                                    <i className="fa fa-trash"></i>
                                    {" "}Delete User</button>
                                }
                            </div>
                        </div>
                        {
                            admin.isSuper
                            &&
                            <div className="card">
                            <div className="card-body">
                                <h4 className="box-title">Update Customer </h4>
                            </div>
                            {
                                    successMsg
                                    &&<div class="sufee-alert alert with-close alert-success alert-dismissible fade show">
                                        <span class="badge badge-pill badge-success">Success {" "}</span>
                                        {successMsg}
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                }

                                {
                                    errorMsg
                                    &&<div class="sufee-alert alert with-close alert-danger alert-dismissible fade show">
                                        <span class="badge badge-pill badge-danger">Error {" "}</span>
                                        {errorMsg}
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                }
                            <div className="card">
                                <div className="card-body card-block">
                                    <div className="form-group">
                                        <label for="company" className=" form-control-label">First Name</label>
                                        <input type="text" id="company" placeholder="Enter first name" className="form-control"
                                            onChange={e => setFirstname(e.target.value)}
                                            value={firstname}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="company" className=" form-control-label">Middle Name</label>
                                        <input type="text" id="company" placeholder="Enter middle name" className="form-control"
                                            onChange={e => setMiddlename(e.target.value)}
                                            value={middlename}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="company" className=" form-control-label">Last Name</label>
                                        <input type="text" id="company" placeholder="Enter last name" className="form-control"
                                            onChange={e => setLastname(e.target.value)}
                                            value={lastname}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="vat" className=" form-control-label">Phone Number</label>
                                        <input type="text" id="vat" placeholder="Phone number" className="form-control"
                                            onChange={e => setPhone(e.target.value)}
                                            value={phone}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="vat" className=" form-control-label">Account Balance</label>
                                        <input type="number" id="vat" placeholder="Phone number" className="form-control"
                                            onChange={e => setBalance(e.target.value)}
                                            value={balance}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="country" className=" form-control-label">City</label>
                                        <input type="text" id="country" placeholder="City" className="form-control"
                                            onChange={e => setCity(e.target.value)}
                                            value={city}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="country" className=" form-control-label">State</label>
                                        <input type="text" id="country" placeholder="State" className="form-control"
                                            onChange={e => setState(e.target.value)}
                                            value={state}
                                            required
                                        />
                                    </div>
                                    <div>
                                        {
                                            loading
                                            ?<button type="button" class="btn btn-lg btn-secondary btn-block">
                                                <i class="fa fa-user-plus"></i>&nbsp;
                                                <span id="payment-button-amount">Please wait</span>
                                            </button>
                                            :<button id="payment-button" type="button" class="btn btn-lg btn-info btn-block"
                                                onClick={handleUpdate}
                                            >
                                                <i class="fa fa-synce"></i>&nbsp;
                                                <span id="payment-button-amount">Update User</span>
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    </>
    )
}

const mapStateToProps = state => ({
    customers: state.customer.customers,
    admin: state.auth.user
});

export default connect(mapStateToProps, {getCustomers, getHistory})(CustomerDetails)
