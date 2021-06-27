import React, { useState, useEffect } from 'react'
import Header from './layout/Header'
import Aside from './layout/Aside'
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import {MDBTable} from 'mdbreact'

const Transactions = ({customers, history}) => {
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState(false);
    const {acco_no} = useParams();
    const [data, setData] = useState({
        columns:[
            {
                label: 'Type',
                field: 'type',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Amount',
                field: 'amount',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Balance',
                field: 'balance',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Cashier',
                field: 'cashier',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Date',
                field: 'date',
                sort: 'asc',
                width: 150
            },
        ],
        rows:[]
    });


    useEffect(()=> {
        const customer = customers.filter(c => c.account_number == acco_no)[0];
        if(customer){
            setCustomer(customer);
            const hist = history.filter(h => h.account_number == acco_no);
            const mappedData = hist.map(h => ({
                type: h.type === 'credit'
                ?<td>  <span className="name text-success">Credit</span> </td>
                :<td>  <span className="name text-danger">Debit</span> </td>,
                amount: h.amount,
                balance: h.balance,
                cashier: h.cashier.username,
                date:  new Date(h.date).toLocaleString()

            }))
            setData({
                ...data.columns,
                rows: mappedData
            });
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
                                    <MDBTable data={data}/>
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
