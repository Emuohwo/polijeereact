import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../../public/assets/images/ElectionLogo.jpg';


/**
 * UserHeader class declaration
 * 
 * @class AdminHeader
 * 
 * @extends {React.Component}
 */
class UserHeader extends React.Component {
    myFunction = () => {
        const x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += "responsive";
        } else {
            x.className = "topnav";
        }
    }
    /**
     * Renders UserHeader Component
     * 
     * @returns {XML} XML/JSX
     */
    render() {
        return (
            <header>
                <nav>
                    <div className="topnav" id="myTopnav">
                        <NavLink to="/user">
                            <img src={logo} alt="logo" className="page_logo" />
                        </NavLink>
                        <NavLink activeClassName="active move_right" to="/user">Home</NavLink>
                        <NavLink to="/userviewparties">Parties</NavLink>
                        <NavLink to="/userviewoffices">Offices</NavLink>
                        <NavLink to="/userresultsheet">Result</NavLink>
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

export default UserHeader;
