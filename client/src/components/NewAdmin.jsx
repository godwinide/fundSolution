import React, {useState} from 'react'
import Header from './layout/Header'
import Aside from './layout/Aside'
import axios from 'axios';
import {connect} from 'react-redux'
import {getCustomers, getHistory} from '../actions/customer'


const NewAdmin = ({getCustomers, getHistory}) => {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const registerAdmin = async() => {
        try{
            setErrorMsg("");
            setSuccessMsg("");
            setLoading(true);
            const data = {username, password, password1};
            const res = await axios.post("/admin/register", data, {timeout: 30000});
            setLoading(false);
            setSuccessMsg("Admin registered successfully");
            window.scrollTo(500, 0);
            setPassword("");
            setPassword1("");
        }catch(err){
            window.scrollTo(500, 0);
            setLoading(false);
            typeof err.response.data === 'object'
            ?setErrorMsg(err.response.data.errors[0].msg)
            :setErrorMsg("Please check your internet connection!")
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
                            <div className="card-body--">
                            <div id="pay-invoice" style={{maxWidth: "500px", margin: "0 auto"}}>
                                <div class="card-body">
                                    <div class="card-title">
                                        <h4 class="text-center">Register Admin</h4>
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
                                    <hr/>
                                        <div class="form-group">
                                            <label for="cc-payment" class="control-label">Username</label>
                                            <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                                             class="form-control" aria-required="true" required/>
                                        </div>
                                        <div class="form-group has-success">
                                            <label for="cc-name" class="control-label mb-1">Password </label>
                                            <input type="text" value={password} class="form-control cc-name valid" onChange={e => setPassword(e.target.value)} required/>
                                            <span class="help-block field-validation-valid" data-valmsg-for="cc-name" data-valmsg-replace="true"></span>
                                        </div>
                                        <div class="form-group has-success">
                                            <label for="cc-name" class="control-label mb-1">Retype Password </label>
                                            <input type="text" value={password1} class="form-control cc-name valid" onChange={e => setPassword1(e.target.value)} required/>
                                            <span class="help-block field-validation-valid" data-valmsg-for="cc-name" data-valmsg-replace="true"></span>
                                        </div>
                                        <div>
                                            {
                                                loading
                                                ?<button 
                                                    id="payment-button" type="submit" 
                                                    class="btn btn-lg btn-secondary btn-block"
                                                >
                                                    <span >Please wait..</span>
                                                </button>
                                                :<button 
                                                    id="payment-button" type="submit" 
                                                    class="btn btn-lg btn-info btn-block"
                                                    onClick={registerAdmin}
                                                >
                                                    <i class="fa fa-lock fa-user-plus"></i>&nbsp;
                                                    <span>Register</span>
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
    </div>
    </>
    )
}

export default connect(null, {getCustomers, getHistory})(NewAdmin)
