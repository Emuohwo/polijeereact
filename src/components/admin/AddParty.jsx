import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import Loader from 'react-loader-spinner';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';
import { addParty } from '../../actions/partyAction';
import AdminHeader from '../partials/AdminHeader.jsx';
import { partyValidation } from '../../utils/partyValidation';
import { dispatch } from 'rxjs/internal/observable/pairs';


/**
 * AddParty declaration
 * 
 * @class AddParty
 * @extends  {React.Component}
 */
export class AddParty extends Component {
    state = {
        partyData: {
            logourl: '',
            name: '',
            hqaddress: ''
        },
        loading: false,
        errors: []
    }

    /**
     * Handle onInputChange
     * 
     * @param {event} event
     * 
     * @return {event} event
     */
    onInputChange = (event) => {
        const { partyData } = this.state;
        partyData[event.target.name] = event.target.value;
        this.setState({ partyData });
    }

    /**
     * Handle onFormSubmit
     * 
     * @param {event} event
     * 
     * @return {event} event
     */
    onFormSubmit = (event) => {
        event.preventDefault();
        const validation = partyValidation(this.state.partyData);
        if (validation.isValid()) {
            const { logourl, name, hqaddress } = this.state.partyData;
            const formData = new FormData();
            formData.append('logourl', logourl);
            formData.append('name', name);
            formData.append('hqaddress', hqaddress);

            this.props.addParty(formData).then(() => {
                if (this.props.partyState.success) {
                    this.setState(state => ({
                        partyData: { logourl: '', name: '', hqaddress: '' }
                    }));
                    swal("Party Added Successfully!");
                } else if (!this.props.partyState.success && this.props.partyState.error) {
                    const message = this.props.partyState.error.response.data.message;
                    const notify = () => toast.info(message);
                    notify();
                } else {
                    const notify = () => toast.info('Internal Server Error');
                    notify();
                }
            });
        } else {
            this.state(state => ({ errors: validation.errors }));
        }
    }

    /**
     * Renders Party Component
     * 
     * @return {XML} XML/JSX
     */
    render() {
        const { logourl, name, hqaddress } = this.state.partyData;
        return (
            <div>
            <AdminHeader/>
                <section className="form_section">
                    <div className="form_wrapper">
                        <ToastContainer/>
                        {
                            this.props.isLoading ? 
                            <Loader 
                            type="Rings" 
                            color="#ff9600"
                            height="50"
                            width="100" 
                            margin="2px"
                            />
                            :
                            ''
                        }
                        <form 
                          className="auto_positioned" 
                          type="multipart/form-data" 
                          onSubmit={this.onFormSubmit}
                        >
                            <h1>Add Party</h1>

                            <label htmlFor="logourl">Party Logo URL:</label>
                            <input 
                              type="text"
                              name="logourl" 
                              className="form-control" 
                              placeholder="Enter Party URL max:250" 
                              value={logourl} 
                              onChange={this.onInputChange}
                            />
                            {
                                this.state.errors.logourl ? 
                                <span>{this.state.errors.logourl[0]}</span> 
                                : ''
                            }

                            <label htmlFor="name">Party Name:</label>
                            <input 
                              type="text" 
                              name="name" 
                              className="form-control" 
                              placeholder="Enter party Name"
                              value={name} 
                              onChange={this.onInputChange} 
                            />
                            {
                                this.state.errors.name ? 
                                <span>{this.state.errors.name[0]}</span> 
                                : ''
                            }

                            <label htmlFor="hqaddress">Party Address:</label>
                            <input 
                              type="text" 
                              name="hqaddress" 
                              className="form-control" 
                              placeholder="Enter party Headquater"
                              value={hqaddress} 
                              onChange={this.onInputChange} 
                            />
                            {
                                this.state.errors.hqaddress ? 
                                <span>{this.state.errors.hqaddress[0]}</span> 
                                : ''
                            }
                            <button type="button"
                              className="submit" 
                            >
                                Add Party
                            </button>
                        </form>
                    </div>
                </section>
                
            </div>
        );
    }
}


// export default AddParty;

AddParty.propTypes = {
    addParty: PropTypes.func.isRequired,
    partyState: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export const mapStateToProps = state => ({
    partyState: state.partyReducer,
    isLoading: state.partyReducer.isLoading
});

const mapDispatchToProps = dispatch => 
bindActionCreators({ addParty }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddParty);
