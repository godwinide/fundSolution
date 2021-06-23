import React, {useState} from 'react'
import Header from './layout/Header'
import Aside from './layout/Aside'
import axios from 'axios';
import {connect} from 'react-redux'
import {getCustomers, getHistory} from '../actions/customer'

const RegisterCustomer = ({getCustomers, getHistory}) => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [middlename, setMiddlename] = useState("")
    const [phone, setPhone] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [gender, setGender] = useState("male")
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleRegister = async() => {
        try{
            setErrorMsg("");
            setSuccessMsg("");
            setLoading(true);
            const data = {firstname, lastname, middlename, gender, city, state, phone};
            const res = await axios.post("/customers/register", data, {timeout: 30000});
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

    
    return (
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
                                <h4 className="box-title">New Customer </h4>
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
                                            required
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="select" className=" form-control-label">Gender</label>
                                        <select name="select" id="select" className="form-control"
                                            onChange={e => setGender(e.target.value)}
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
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
                                                onClick={handleRegister}
                                            >
                                                <i class="fa fa-user-plus"></i>&nbsp;
                                                <span id="payment-button-amount">Register</span>
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div> 
 
                </div>
            </div>
        </div>
        </div>
    </div>
    </>
    )
}


export default connect(null, {getCustomers, getHistory})(RegisterCustomer)
