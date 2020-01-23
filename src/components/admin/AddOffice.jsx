import React from 'react';
import PropTypes from 'react-proptypes';
import Loader from 'react-loader-spinner';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';
import { addOffice } from '../../actions/officeAction';
import AdminHeader from '../partials/AdminHeader.jsx';
import officeValidation from '../../utils/officeValidation';

/**
 * AddOffice declaration
 * 
 * @class AddOffice
 * @extends  {React.Component}
 */
export class AddOffice extends React.Component {
    state = {
        officeData: {
            type: '',
            name: ''
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
        const { officeData } = this.state;
        officeData[event.target.name] = event.target.value;
        this.setState({ officeData });
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
        const validation = officeValidation(this.state.officeData);
        if (validation.isValid()) {
            const { type, name } = this.state.officeData;
            const formData = new FormData();
            formData.append('type', type);
            formData.append('name', name);

            this.props.addOffice(formData).then(() => {
                if (this.props.officeState.success) {
                    this.setState(state => ({
                        officeData: { type: '', name: ''}
                    }));
                    swal("Office Added Successfully!");
                } else if (!this.props.officeState.success && this.props.officeState.error) {
                    const message = this.props.officeState.error.response.data.message;
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
     * Renders Office Component
     * 
     * @return {XML} XML/JSX
     */
    render() {
        const { type, name } = this.state.officeData;
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
                      className="auto_positioned empty_space admincreateoffice" 
                      name="add-office" 
                      encType="multpart/form-data" 
                      onSubmit={this.onFormSubmit}
                    >
                        <label htmlFor="type">Office Type</label>
                        <select name="type" 
                          className="form-control type"
                          value={type} 
                          onChange={this.onInputChange}
                        >
                            <option value="">Select Office Type</option>
                            <option value="federal">Federal</option>
                            <option value="state">State</option>
                            <option value="Local">Local</option>
                        </select>
                        {
                            this.state.errors.type ? 
                            <span>{this.state.errors.type[0]}</span> 
                            : ''
                        }
                        <label htmlFor="name">Office Name:</label>
                        <input 
                          type="text" 
                          name="name" 
                          className="form-control name" 
                          value={name} 
                          onChange={this.onInputChange} 
                        />
                        {
                            this.state.errors.name ? 
                            <span>{this.state.errors.name[0]}</span> 
                            : ''
                        }
                        <button type="button"
                          className="submit" 
                        >
                            Add Office
                        </button>
                    </form>
                </div>
            </section>
            </div>
        );
    }
}

AddOffice.propTypes = {
    addOffice: PropTypes.func.isRequired,
    officeState: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export const mapStateToProps = state => ({
    officeState: state.officeReducer,
    isLoading: state.officeReducer.isLoading
});

const mapDispatchToProps = dispatch => 
bindActionCreators({ addOffice }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddOffice);
