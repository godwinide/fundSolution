import React, { useEffect, useState } from 'react'
import Header from './layout/Header'
import Aside from './layout/Aside'
import {connect} from 'react-redux'
import {MDBTable} from 'mdbreact'

const Dashboard = ({customers, history, commissionHistory}) => {

    const [availability, setAvailability] = useState(0);
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
    })

    useEffect(()=> {
        const total = customers.reduce((prev, curr) =>  prev + curr.balance,0);
        setAvailability(total);
        const mappedData = history.map(h => ({
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
    },[history])

    return (
        <>
        <Aside/>
        <div className="right-panel" id="right-panel">
        <Header/>
        <div className="content">
        <div className="animated fadeIn">
            <div className="row">

                <div className="col-lg-6 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="stat-widget-five">
                                <div className="stat-icon dib flat-color-1">
                                    <i className="pe-7s-cash"></i>
                                </div>
                                <div className="stat-content">
                                    <div className="text-left">
                                        <div className="stat-text">NGN <span>{availability}</span></div>
                                        <div className="stat-heading">Availabilty</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="stat-widget-five">
                                <div className="stat-icon dib flat-color-4">
                                    <i className="pe-7s-users"></i>
                                </div>
                                <div className="stat-content">
                                    <div className="text-left dib">
                                        <div className="stat-text"><span>{customers.length}</span></div>
                                        <div className="stat-heading">Customers</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="stat-widget-five">
                                <div className="stat-icon dib flat-color-1">
                                    <i className="pe-7s-cash"></i>
                                </div>
                                <div className="stat-content">
                                    <div className="text-left">
                                        <div className="stat-text">NGN <span>{commissionHistory[0] ? commissionHistory[0].balance : 0}</span></div>
                                        <div className="stat-heading">Total Commision</div>
                                        <div className="stat-heading">This Month</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="stat-widget-five">
                                <div className="stat-icon dib flat-color-1">
                                    <i className="pe-7s-cash"></i>
                                </div>
                                <div className="stat-content">
                                    <div className="text-left">
                                        <div className="stat-text">NGN <span>{commissionHistory[1] ? commissionHistory[1].balance : 0}</span></div>
                                        <div className="stat-heading">Total Commision</div>
                                        <div className="stat-heading">Last Month</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
           
            <div className="clearfix"></div>
           
            <div className="orders">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card p-3">
                            <div className="card-body">
                                <h4 className="box-title">Recent Transactions </h4>
                            </div>
                            <div className="card-body--">
                                <div className="table-stats ov-h">
                                    <MDBTable data={data} />
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
    history: state.customer.history,
    commissionHistory: state.customer.commissionHistory
})

export default connect(mapStateToProps)(Dashboard)
