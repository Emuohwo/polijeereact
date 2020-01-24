import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import Loader from 'react-loader-spinner';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';

import AdminHeader from '../partials/AdminHeader.jsx';
import { addCandidate } from "../../actions/candidateAction";
import { candidateValidation } from "../../utils/candidateValidation";


/**
 * AddCandidate declaration
 * 
 * @class AddParty
 * @extends  {React.Component}
 */

export class AddCandidate extends React.Component {
    state = {
        candidateData: {
            office: '',
            party: '',
            candidate: ''
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
        const { candidateData } = this.state;
        candidateData[event.target.name] = event.target.value;
        this.setState({ candidateData });
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
        const validation = candidateValidation(this.state.candidateData);
        if (validation.isValid()) {
            const { office, party, candidate } = this.state.candidateData;
            const formData = new FormData();
            formData.append('office', office);
            formData.append('party', party);
            formData.append('candidate', candidate);

            this.props.addCandidate(formData).then(() => {
                if (this.props.candidateState.success) {
                    this.setState(state => ({
                        candidateData: { office: '', party: '', candidate: '' }
                    }));
                    swal("Candidate Added Successfully!");
                } else if (!this.props.candidateState.success && this.props.candidateState.error) {
                    const message = this.props.candidateState.error.response.data.message;
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
     * Renders Candidate Component
     * 
     * @return {XML} XML/JSX
     */
    render() {
        const { office, party, candidate } = this.state.candidateData;
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
                            <h1>Add Candidate</h1>

                            <label htmlFor="office">Office</label>
                            <input 
                              type="text"
                              name="office" 
                              className="form-control" 
                              placeholder="Enter Party URL max:250" 
                              value={office} 
                              onChange={this.onInputChange}
                            />
                            {
                                this.state.errors.office ? 
                                <span>{this.state.errors.office[0]}</span> 
                                : ''
                            }

                            <label htmlFor="party">Party Name:</label>
                            <input 
                              type="text" 
                              name="party" 
                              className="form-control" 
                              placeholder="Enter party Name"
                              value={party} 
                              onChange={this.onInputChange} 
                            />
                            {
                                this.state.errors.party ? 
                                <span>{this.state.errors.party[0]}</span> 
                                : ''
                            }

                            <label htmlFor="candidate">Candidate:</label>
                            <input 
                              type="text" 
                              name="candidate" 
                              className="form-control" 
                              placeholder="Enter Candidate"
                              value={candidate} 
                              onChange={this.onInputChange} 
                            />
                            {
                                this.state.errors.candidate ? 
                                <span>{this.state.errors.candidate[0]}</span> 
                                : ''
                            }
                            <button type="button"
                              className="submit" 
                            >
                                Add Candidate
                            </button>
                        </form>
                    </div>
                </section>
                
            </div>
        );
    }
}


AddCandidate.propTypes = {
    addCandidate: PropTypes.func.isRequired,
    candidateState: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export const mapStateToProps = state => ({
    candidateState: state.candidateReducer,
    isLoading: state.candidateReducer.isLoading
});

const mapDispatchToProps = dispatch => 
bindActionCreators({ addCandidate }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCandidate);

