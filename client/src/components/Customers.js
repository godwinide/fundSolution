import React, { useState } from 'react'
import Header from './layout/Header'
import Aside from './layout/Aside'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import {connect} from 'react-redux'
import { MDBDataTable, MDBTableHead, MDBTableBody } from 'mdbreact';


const Customers = ({customers}) => {

    const [data, setData] = useState({
        columns:[
            {
                label: 'Account No',
                field: 'acc_no',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Name',
                field: 'name',
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
                label: 'Action',
                field: 'action',
                sort: 'asc',
                width: 150
            },
        ],
        rows:[]
    })

    useEffect(() => {
        const mappedCustomers = customers.map(c => ({
            acc_no: c.account_number,
            name: `${c.firstname} ${c.middlename} ${c.lastname} `,
            balance: c.balance,
            action: <NavLink to={`/customer-details/${c.account_number}`} className="btn btn-success">more</NavLink>

        }));

        setData({
            ...data,
            rows: mappedCustomers
        });
    }, [customers])

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
                                    <MDBDataTable>
                                        <MDBTableHead columns={data.columns}/>
                                        <MDBTableBody rows={data.rows}/>
                                    </MDBDataTable>
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
