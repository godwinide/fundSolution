import React, { useEffect, useState } from 'react'
import Header from './layout/Header'
import Aside from './layout/Aside'
import {connect} from 'react-redux'

const Dashboard = ({customers, history, commissionHistory}) => {

    const [availability, setAvailability] = useState(0);

    useEffect(()=> {
        const total = customers.reduce((prev, curr) =>  prev + curr.balance,0);
        setAvailability(total);
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
                                    <table id="example" class="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="serial">#</th>
                                                <th className="avatar">Type</th>
                                                <th>Amount</th>
                                                <th>Cashier</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                history.map((h, key) => (
                                                    <tr key={key}>
                                                        <td className="serial">{h.account_number}</td>
                                                        {
                                                            h.type === "credit"
                                                            ?<td>  <span className="name text-success">{h.type}</span> </td>
                                                            :<td>  <span className="name text-danger">{h.type}</span> </td>
                                                        }
                                                        <td className="serial">N{h.amount}</td>
                                                        <td className="serial">{h.cashier.username}</td>
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
    history: state.customer.history,
    commissionHistory: state.customer.commissionHistory
})

export default connect(mapStateToProps)(Dashboard)
