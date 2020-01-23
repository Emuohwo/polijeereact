import React from 'react';
import PropTypes from 'react-proptypes';
import {bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { decodeToken } from '../../utils/helper';
import { logoutAction } from '../../actions/loginAction';

import logo from '../../../public/assets/images/ElectionLogo.jpg';

/**
 * Header class declaration
 * 
 * @class Header
 * 
 * @extends {React.Component}
 */

export class Header extends React.Component {
    handleLogout = () => {
        this.props.logoutAction();
    }
    myFunction = () => {
        const x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += "responsive";
        } else {
            x.className = "topnav";
        }
    }
    /**
     * Renders Header component
     * 
     * @returns {XML} XML/JSX
     */
    render() {
        return (
            <header>
                <nav>
                    <div className="topnav" id="myTopnav">
                        <Link to="/">
                            <img src={logo} alt="Logo" className="page_logo" />
                        </Link>
                        {
                            this.props.isLoggedIn || this.props.isSignedup ? 
                            <span>
                            {/* <div className="" id="myTopnav">  */}
                                <Link to="">WELCOME &nbsp; 
                                    {
                                        decodeToken(localStorage.getItem('token')).email
                                    }
                                </Link>
                                <Link className="" to="#" 
                                  onClick={this.handleLogout}
                                >logout</Link>
                            {/* </div> */}
                            </span>
                            :
                            <span>
                            {/* <div className="topnav" id="myTopnav">  */}
                                <Link to="/" className="active move_right_right">Home</Link>
                                <Link to="/signin">SIGN IN</Link>
                                <Link to="/signup">SIGN IN</Link>
                                <a 
                                  href="javascript:void(0);" 
                                  style={{fontSize:'15px'}} class="icon" onclick={this.myFunction()}>
                                      <i>fa fa-bars</i>
                                  </a>
                            {/* </div> */}
                            </span>
                        }
                    </div>
                </nav>
            </header>
        );
    }
}

Header.prototypes = {
    logoutAction: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    isSignedup: PropTypes.bool
}

export const mapStateToProps = state => ({
    isLoggedIn: state.loginReducet.success,
    isSignedup: state.signupReducer.success
});

const mapDispatchToProps = dispatch => 
bindActionCreators({ logoutAction }, dispatch);

export default connect (mapStateToProps, mapDispatchToProps)(Header);
