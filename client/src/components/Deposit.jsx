import React, { useState } from 'react'
import Header from './layout/Header'
import Aside from './layout/Aside'
import axios from 'axios';
import {connect} from 'react-redux'
import {getCustomers, getHistory} from '../actions/customer'
import {tokenConfig} from '../actions/auth'
import store from '../store'

const Deposit = ({getCustomers, getHistory}) => {

    const [accountNum, setAccountNum] = useState("");
    const [amount, setAmount] = useState("");
    const [confirmName, setConfirmName] = useState("");
    const [loading, setLoading] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const deposit = async() => {
        try{
            setErrorMsg("");
            setSuccessMsg("");
            setLoading(true);
            const data = {amount, account_number: accountNum};
            const res = await axios.post("/deposit", data, tokenConfig(store.getState));
            setLoading(false);
            window.scrollTo(500, 0);
            setSuccessMsg(res.data.msg[0].msg);
            setAmount("");
            setAccountNum("");
            getCustomers();
            getHistory();

        }catch(err){
            setLoading(false);
            window.scrollTo(500, 0);
            typeof err.response.data === 'object'
            ?setErrorMsg(err.response.data.msg[0].msg)
            :setErrorMsg("Please check your internet connection!")
            
        }
    }

    const handleConfirm = async() => {
        try{
            setErrorMsg("");
            setSuccessMsg("");
            setConfirming(true);
            const res = await axios.post("/customers/findOne", {accountNum}, {timeout: 30000});
            setConfirmName(
                res.data.customer.firstname +" "+
                res.data.customer.lastname)
            setConfirming(false);
            getCustomers();
            getHistory();

        }catch(err){
            setConfirming(false);
            typeof err.response.data === 'object'
            ?setErrorMsg(err.response.data.msg[0].msg)
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
                                        <h4 class="text-center">Deposit</h4>
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
                                            <label for="cc-payment" class="control-label">Account Number</label>
                                            <input type="text" value={accountNum} onChange={e => {
                                                setAccountNum(e.target.value);
                                                setConfirmName("");
                                            }}
                                             class="form-control" aria-required="true" required/>
                                        </div>
                                        <div>
                                            <p>{confirmName}</p>
                                        </div>
                                        <div>
                                            {
                                                confirming
                                                ?<button type="button" className="btn btn-secondary mb-3">
                                                    <span id="payment-button-amount">Please wait</span>
                                                </button>
                                                :<button type="button" className="btn btn-info mb-3"
                                                    onClick={handleConfirm}
                                                >
                                                    <i class="fa fa-check"></i>&nbsp;
                                                    <span id="payment-button-amount">Confirm</span>
                                                </button>
                                            }
                                        </div>
                                        <div class="form-group has-success">
                                            <label for="cc-name" class="control-label mb-1">Amount</label>
                                            <input type="text" value={amount} class="form-control cc-name valid" onChange={e => setAmount(e.target.value)} required/>
                                            <span class="help-block field-validation-valid" data-valmsg-for="cc-name" data-valmsg-replace="true"></span>
                                        </div>
                                        <div>
                                            {
                                                loading
                                                ?<button 
                                                    id="payment-button" type="submit" 
                                                    class="btn btn-lg btn-secondary btn-block"
                                                >
                                                    <span id="payment-button-amount">Depositing..</span>
                                                </button>
                                                :<button 
                                                    id="payment-button" type="submit" 
                                                    class="btn btn-lg btn-info btn-block"
                                                    onClick={deposit}
                                                >
                                                    <i class="fa fa-lock fa-lg"></i>&nbsp;
                                                    <span id="payment-button-amount">Deposit</span>
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

export default connect(null, {getCustomers, getHistory})(Deposit)
