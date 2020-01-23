import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

import signupAction from '../../actions/signupAction';
import signupValidation from '../../utils/signupValidation';
// import { dispatch } from 'rxjs/internal/observable/pairs';

/**
 * UserSignup class declaration
 * 
 * @class UserSignup
 * 
 * @extends {React.Component}
 */
export class UserSignup extends Component {
    state = {
        userData: {
            firstname: '',
            lastname: '',
            othernames: '',
            email: '',
            password: '',
            phonenumber: '',
            passporturl: ''
        },
        errors: [],
        fail: null
    }

    /**
     * Handle onInputChange
     * 
     * @param {event} event
     * 
     * @return {event} event
     * 
     */
    onInputChange = (event) => {
        const { userData } = this.state;
        userData[event.target.name] = event.target.value;
        this.setState({ userData})
    }

    /**
     * Handle onFormSubmit
     * 
     * @param {event} event
     * 
     * @return {event} event
     * 
     */
    onFormSubmit = (event) => {
        event.preventDefault();
        const validation = signupValidation(this.state.userData);
        if (validation.isValid()) {
            const { userData } = this.state;

            this.props.signupAction(userData).then(() => {
                if (this.props.errorResponse) {
                    const message = this.props.errorResponse.message;
                    const notify = () => toast.info(message0);
                    notify();
                }
            });
        } else {
            this.setState(state => ({ errors: validation.getErrors() }));
        }
    }
    /**
     * Renders UserSignup component
     * 
     * @returns {XML} XML/JSX
     */
    render() {
        return (
            <div>
                <ToastContainer />
                <section className="form_section">
                    <div className="form_wrapper">
                        {
                            this.props.isLoading ?
                            <Loader 
                              type='Rings'
                              color='#ff9600' 
                              height='50' 
                              width='100' 
                              margin='2px' 
                            />
                            : ''
                        }
                        <h1>Sign Up</h1>
                        <form onSubmit={this.onFormSubmit}>
                        <label htmlFor="firstname">First Name:</label>
                        <input 
                          type="text" 
                          name="firstname" 
                          className="form-control firstname" 
                          placeholder="First Name" 
                          value={this.state.userData.firstname} 
                          onChange={this.onInputChange}
                        />
                        {
                            this.state.errors.firstname ? 
                            <span>First Name field is required.</span> 
                            : ''
                        }
                        <label htmlFor="lastname">Last Name:</label>
                        <input 
                          type="text" 
                          name="lastname" 
                          placeholder="Enter your Last Name" 
                          value={this.state.userData.lastname} 
                          onChange={this.onInputChange} 
                        />
                        {
                            this.state.errors.lastname ? 
                            <span>Last Name field is required.</span> 
                            : ''
                        }
                        <label htmlFor="othernames">Other Names:</label>
                        <input 
                          type="text" 
                          name="othernames" 
                          placeholder="Enter your Other Name" 
                          value={this.state.userData.othernames} 
                          onChange={this.onInputChange} 
                        />
                        {
                            this.state.errors.othernames ? 
                            <span>Other Name field is required.</span> 
                            : ''
                        }
                        <label htmlFor="email">Email:</label>
                        <input 
                          type="email" 
                          name="email" 
                          placeholder="Enter your Email" 
                          value={this.state.userData.email} 
                          onChange={this.onInputChange} 
                        />
                        {
                            this.state.errors.email ? 
                            <span>Email field is required.</span> 
                            : ''
                        }
                        <label htmlFor="password">Password:</label>
                        <input 
                          type="password" 
                          name="password" 
                          placeholder="Enter your Password" 
                          value={this.state.userData.password} 
                          onChange={this.onInputChange} 
                        />
                        {
                            this.state.errors.password ? 
                            <span>Password field is required.</span> 
                            : ''
                        }
                        <label htmlFor="phonenumber">Phone Number:</label>
                        <input 
                          type="number" 
                          name="phonenumber" 
                          placeholder="example +23409012345678" 
                          value={this.state.userData.phonenumber} 
                          onChange={this.onInputChange} 
                        />
                        {
                            this.state.errors.phonenumber ? 
                            <span>Phone Number field is required.</span> 
                            : ''
                        }
                        <label htmlFor="passporturl">Passport URL:</label>
                        <input 
                          type="text" 
                          name="passporturl" 
                          placeholder="Enter your Passport URL" 
                          value={this.state.userData.passporturl} 
                          onChange={this.onInputChange} 
                        />
                        {
                            this.state.errors.passporturl ? 
                            <span>Passport URL field is required.</span> 
                            : ''
                        }
                        <button className="submit" type="submit">Sign Up</button>
                        <p>Already have an account? <Link to="/signin">signin</Link></p>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}

UserSignup.PropTypes = {
    signupAction: PropTypes.func.isRequired,
    signupState: PropTypes.object.isRequired,
    errorResponse: PropTypes.object,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => 
bindActionCreators({ signupAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserSignup);
