import React from 'react'
import Header from './layout/Header'
import Aside from './layout/Aside'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import {connect} from 'react-redux'

const Customers = ({customers}) => {
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
                                <h4 className="box-title">Customers </h4>
                            </div>
                            <div className="card-body--">
                                <div className="table-stats ov-h">
                                    <table id="example" class="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="serial">#</th>
                                                <th className="avatar">Name</th>
                                                <th>Balance</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                customers.map(c => (
                                                    <tr>
                                                        <td className="serial">{c.account_number}</td>
                                                        <td>  <span className="name">{c.firstname + " " + c.lastname}</span> </td>
                                                        <td className="serial">N{c.balance}</td>
                                                        <td className="serial">
                                                            <NavLink to={`/customer-details/${c.account_number}`} className="btn btn-success">more</NavLink>
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
    customers: state.customer.customers
})

export default connect(mapStateToProps)(Customers)
