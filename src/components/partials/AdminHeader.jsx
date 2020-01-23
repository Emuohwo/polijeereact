import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../../public/assets/images/ElectionLogo.jpg';


/**
 * AdminHeader class declaration
 * 
 * @class AdminHeader
 * 
 * @extends {React.Component}
 */
class AdminHeader extends React.Component {
    myFunction = () => {
        const x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += "responsive";
        } else {
            x.className = "topnav";
        }
    }
    /**
     * Renders AdminHeader Component
     * 
     * @returns {XML} XML/JSX
     */
    render() {
        return (
            <header>
                <nav>
                    <div className="topnav" id="myTopnav">
                        <NavLink to="/admin">
                            <img src={logo} alt="logo" className="page_logo" />
                        </NavLink>
                        <NavLink activeClassName="active move_right" to="/admin">Home</NavLink>
                        <NavLink to="/adminviewparties">Parties</NavLink>
                        <NavLink to="/adminviewoffices">Offices</NavLink>
                        <NavLink to="/adminresultsheet">Result</NavLink>
                        <NavLink>Logout</NavLink>
                        <a
                        href="javascript:void(0);"
                        className="icon"
                        onClick={this.myFunction}
                        >
                        <i className="fa fa-bars"></i>
                        </a>
                    </div>
                </nav>
            </header>
        );
    }
}

export default AdminHeader;
