import React from 'react'

function Header() {
    return (
        <header id="header" className="header">
            <div className="top-left">
                <div className="navbar-header">
                    <a href="/" style={{marginTop: "10px"}}>Fund Solution NIG LTD</a>
                    <a id="menuToggle" className="menutoggle"><i className="fa fa-bars"></i></a>
                </div>
            </div>
        </header>
    )
}

export default Header
