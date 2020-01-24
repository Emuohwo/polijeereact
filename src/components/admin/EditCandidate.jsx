import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';

import { getACandidateAction, editCandidateAction } from '../../actions/candidateAction';
import AdminHeader from '../partials/AdminHeader';

/**
 * EditCandidate declaration
 * 
 * @class EditCandidate
 * 
 * @extends {React.Component}
 */
class EditCandidate extends Component {
    state = {
        candidateData: {
            status: ''
        },
        party: [],
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
        if (nextProps.candidateState.success) {
            nextState.party = nextProps.candidateState.party;
        }
        return nextState;
    }

    /**
     * Mount Component
     * 
     * @returns {XML} XML/JSX
     * 
     * @member of EditParty
     */
    componentDidMount() {
        const candidateId = this.props.match.params.candidateId;
        this.props.getACandidateAction(candidateId);
    }

    onInputChange = (event) => {
        const candidateData = this.state.candidateData;
        candidateData[event.target.name] = event.target.value;
        this.setState(candidateData);
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

        const { status } = this.state.candidateData;
        const candidateId = this.props.match.params.candidateId;
        const formData = new FormData();

        formData.append('status', status);
        this.props.editCandidateAction(formData, candidateId).then(() => {
            if (this.props.candidateState.success) {
                swal("Status Modified!", "Updated Successfully", "success");
            } else {
                const message = this.props.candidateState.error.response.data.message;
                const notify = () => toast.info(message);
                notify();
            }
        });
    }

    /**
     * Renders EditParty Component
     * 
     * @returns {XML} XML/JSX
     */
    render() {
        return (
            <div>
                <AdminHeader/>
                <section className="form_section">
                    <div className="form-wrapper">
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
                        <h1>Edit Party</h1>
                        <form 
                            className="auto_positioned empty_space admincreateoffice" 
                            name="edit-candidate" 
                            encType="multpart/form-data" 
                            onSubmit={this.onFormSubmit}
                        >
                        {/* <label htmlFor="status">Party Logo:</label>
                        <input 
                          type="text" 
                          name="status" 
                          placeholder={party ? party.status : ''}
                          className="form-control name" 
                          value={status} 
                        onChange={this.onInputChange} 
                        />  */}
                        <label htmlFor="status">Status</label>
                        <select name="status" 
                          className="form-control type"
                          value={status} 
                          onChange={this.onInputChange}
                        >
                            <option value="">Select Office Type</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select> 
                        <button 
                          type="button"
                          className="submit" 
                        >
                            Save Changes
                        </button>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}


EditParty.propTypes = {
    getACandidateAction: PropTypes.func.isRequired,
    editCandidateAction: PropTypes.func.isRequired,
    candidateState: PropTypes.object.isRequired,
    match: PropTypes.object,
    isLoading: PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
    candidateState: state.candidateReducer,
    isLoading: state.candidateReducer.isLoading
});

export const mapDispatchToProps = dispatch => 
bindActionCreators({ getACandidateAction, editCandidateAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditCandidate);

