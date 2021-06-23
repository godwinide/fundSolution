import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import {connect} from 'react-redux'
import {logout} from '../../actions/auth'


function Aside({logout}) {
    return (
        <aside id="left-panel" className="left-panel">
        <nav className="navbar navbar-expand-sm navbar-default">
            <div id="main-menu" className="main-menu collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    <li>
                        <NavLink exact to="/"><i className="menu-icon fa fa-laptop"></i>Dashboard </NavLink>
                    </li>
                    
                    <li className="menu-item-has-children dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fas fa-university"></i>Make Transaction</a>
                        <ul className="sub-menu children dropdown-menu">  
                            <li>
                                <i className="fas fa-piggy-bank"></i>
                                <NavLink to="/deposit">Deposit</NavLink></li>
                            <li>
                                <i className="fas fa-money-bill"></i>
                                <NavLink to="/withdraw">WithDraw</NavLink></li>
                        </ul>
                    </li>
                    
                    <li className="menu-item-has-children dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-users"></i>Customers</a>
                        <ul className="sub-menu children dropdown-menu">  
                            <li><i className="fa fa-users"></i><NavLink to="/customers">All Customers</NavLink></li>
                            <li><i className="fa fa-user-plus"></i><NavLink to="register-customer">Register Customer</NavLink></li>
                        </ul>
                    </li>

                    <li className="menu-item-has-children dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-shield"></i>Auth</a>
                        <ul className="sub-menu children dropdown-menu">  
                            <li><i className="fa fa-user-plus"></i>{" "}<NavLink to="/new-admin">New Admin</NavLink></li>
                            <li><i className="fa fa-lock"></i>{" "}<NavLink to="/change-password">Change Password</NavLink></li>
                            <li
                                onClick={logout}
                            >
                            <i className="fa fa-arrow-right"></i>{" "}
                            <a href="#">Logout</a>
                            </li>
                        </ul>
                    </li>
                
                    
                </ul>
            </div>
        </nav>
    </aside>
    )
}

export default connect(null, {logout})(Aside)
