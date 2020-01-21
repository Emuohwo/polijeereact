import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer} from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import { loginAction } from '../../actions/loginAction';
import loginValidation from '../../utils/loginValidation';
import { toast } from 'react-toastify';
import { dispatch } from 'rxjs/internal/observable/range';

/**
 * Login class declaration
 * 
 * @class Signin
 * 
 * @extends {React.Component}
 */


export class Signin extends Component {
    state = {
        loginData: {
            email: '',
            password: ''
        },
        errors: []
    };

    /**
     * Handle Signin Input Change
     * 
     * @param {event} event
     * 
     * @return {event} event
     */
    onInputChange = (event) => {
        const { loginData } = this.state;
        loginData[event.target.name] = event.target.value;
        this.setState(() => ({ loginData }));
    }
    /**
     * Handle Signin Input Change
     * 
     * @param {event} event
     * 
     * @return {event} event
     */
    onFormSubmit = (event) => {
        event.preventDefault();
        
        const validation = loginValidation(this.state.loginData);
        if (validation.isValid()) {
            const { loginData } = this.state;
            this.props.loginAction(loginData);
        } else {
            this.setState(state => ({ errors: validation.getErrors() }));
        }
    };

    loginSuccess = () => toast.success('Invalid Credentials');
    /**
     * Render Signin component
     * 
     * @returns {XML} XML/JSX
     */

    render() {
        return (
            <section className="form_section">
                <ToastContainer />
                <div className="form_wrapper">
                    {
                        this.props.isLoading ? 
                        <Loader 
                          type="Rings"
                          color='#ff9600' 
                          height='50' 
                          width='100' 
                          margin='2px'
                        />
                        : ''
                    }
                    <h1>Sign In</h1>
                    <form 
                      onSubmit={this.onFormSubmit} 
                      className="auto_positioned empty_space signinForm"
                    >
                        <label htmlFor="email">Email:</label>
                        <input 
                          type="email" 
                          name="email" 
                          className="form-control email" 
                          placeholder="Email" 
                          value={this.state.loginData.email} 
                          onChange={this.onInputChange}
                        />
                        {
                            this.state.errors.email ? 
                            <span>{this.state.errors.email[0]}</span> 
                            : ''
                        }
                        
                        <label htmlFor="password">Password:</label>
                        <input 
                          type="password" 
                          name="password" 
                          className="form-control password" 
                          placeholder=" Enter Password" 
                          value={this.state.loginData.password} 
                          onChange={this.onInputChange}
                        />
                        {
                            this.state.errors.password ? 
                            <span>{this.state.errors.password[0]}</span> 
                            : ''
                        }
                        <button type="submit" className="submit">Signin</button>
                    </form>
                </div>
                
            </section>
        );
    }
}


Signin.propTypes = {
   loginAction: PropTypes.func.isRequired,
   isLoading: PropTypes.bool.isRequired 
};


export const mapStateToProps = state ({
    state: state.loginReducer,
    isLoading: state.loginReducer.loading
});

const mapDispatchToProps = dispatch => 
bindActionCreators({ loginAction }, dispatch);


export default connect(mapDispatchToProps, mapDispatchToProps)(Signin);
