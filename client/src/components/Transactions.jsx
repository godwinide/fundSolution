import React, { useState, useEffect } from 'react'
import Header from './layout/Header'
import Aside from './layout/Aside'
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'

const Transactions = ({customers, history}) => {
    const [loading, setLoading] = useState(true);
    const [histories, setHistories] = useState([]);
    const [customer, setCustomer] = useState(false);
    const {acco_no} = useParams();

    useEffect(()=> {
        const customer = customers.filter(c => c.account_number == acco_no)[0];
        if(customer){
            setCustomer(customer);
            const hist = history.filter(h => h.account_number == acco_no);
            setHistories(hist);
            setLoading(false);
        }
    },[customers]);

    const handlePrint = () => {
        
    }

    return (
        !loading
        &&
        <>
        <Aside/>
        <div className="right-panel" id="right-panel">
        <Header/>
        <div className="content">
       
        <div className="animated fadeIn">
            
            <div className="orders">
                <div className="row">
                    <div className="col-xl-12">
                        <button className="btn bg-primary text-white mb-3" onClick={handlePrint}>
                            Print{" "}
                            <i className="fas fa-print"></i>
                        </button>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="box-title">Name: {customer.firstname} {customer.middlename} {customer.lastname} </h4>
                                <h4 className="box-title">Transaction History</h4>
                            </div>
                                <div className="table-stats ov-h">
                                <div className="table-stats ov-h">
                                    <table id="table" class="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="avatar">Type</th>
                                                <th>Amount</th>
                                                <th>Balance</th>
                                                <th>Cashier</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                histories.reverse().map((h, key) => (
                                                    <tr key={key}>
                                                        {
                                                            h.type === 'credit'
                                                            ?<td>  <span className="name text-success">Credit</span> </td>
                                                            :<td>  <span className="name text-danger">Debit</span> </td>
                                                        }
                                                        <td className="serial">N{h.amount}</td>
                                                        <td className="serial">N{h.balance}</td>
                                                        <td className="serial">N{h.cashier.username}</td>
                                                        <td className="serial">
                                                            {new Date(h.date).toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
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

const mapStateToProps = state => ({
    customers: state.customer.customers,
    history: state.customer.history
});

export default connect(mapStateToProps)(Transactions)
