import React from 'react';
import PropTypes from 'react-proptypes';
import Loader from 'react-loader-spinner';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';

import { getAnOfficeAction, editOfficeAction } from '../../actions/officeAction';
import AdminHeader from '../partials/AdminHeader';

/**
 * EditOffice declaration
 * 
 * @class EditOffice
 * 
 * @extends {React.Component}
 */
export class EditOffice extends React.Component {
    state = {
        officeData: {
            type: '',
            name: '',
        },
        office: [],
        errors: []
    }
    /**
     * @param {object} nextProps
     * 
     * @param {object} prevState
     * 
     * @returns {XML} XML/JSX
     * 
     * @members of EditOffice
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        const nextState = {};
        if (nextProps.officeState.success) {
            nextState.office = nextProps.officeState.office;
        }
        return nextState;
    }

    /**
     * Mount Component
     * 
     * @returns {XML} XML/JSX
     * 
     * @member of EditOffice
     */
    componentDidMount() {
        const officeId = this.props.match.params.officeId;
        this.props.getAnOfficeAction(officeId);
    }

    /**
     * Handle onInputChange
     * 
     * @param {event} event
     * 
     * @return {event} event
     */
    onInputChange = (event) => {
        const officeData = this.state.officeData;
        officeData[event.target.name] = event.target.value;
        this.setState(officeData);
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

        const { type, name } = this.state.officeData;
        const officeId = this.props.match.params.officeId;
        const formData = new FormData();

        formData.append('type', type);
        formData.append('name', name);
        this.props.editOfficeAction(formData, officeId).then(() => {
            if (this.props.officeState.success) {
                swal("Office Modified!", "Updated Successfully!", "success");
            } else {
                const message = this.props.officeState.error.response.data.message;
                const notify = () => toast.info(message);
                notify();
            }
        });
    }

    /**
     * Renders EditOffice Component
     * 
     * @returns {XML} XML/JSX
     */
    render() {
        const office = this.state.office;
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
                        <h1>Edit Office</h1>
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
                            <label htmlFor="name">Office Name:</label>
                            <input 
                            type="text" 
                            name="name" 
                            placeholder={office ? office.name : ''}
                            className="form-control name" 
                            value={name} 
                            onChange={this.onInputChange} 
                            />
                            {/* {
                                this.state.errors.name ? 
                                <span>{this.state.errors.name[0]}</span> 
                                : ''
                            } */}
                            <button type="button"
                            className="submit" 
                            >
                                Save Office
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}

EditOffice.propTypes = {
    getAnOfficeAction: PropTypes.func.isRequired,
    editOfficeAction: PropTypes.func.isRequired,
    officeState: PropTypes.object.isRequired,
    match: PropTypes.object,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    officeState: state.officeReducer,
    isLoading: state.officeReducer.isLoading
});

export const mapDispatchToProps = dispatch => 
bindActionCreators({ getAnOfficeAction, editOfficeAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditOffice);
