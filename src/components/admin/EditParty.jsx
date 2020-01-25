import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';

import { getAPartyAction, editPartyAction } from '../../actions/partyAction';
import AdminHeader from '../partials/AdminHeader';

/**
 * EditParty declaration
 * 
 * @class EditParty
 * 
 * @extends {React.Component}
 */
class EditParty extends Component {
    state = {
        partyData: {
            logourl: '',
            name: '',
            hqaddress: '',
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
        if (nextProps.partyState.success) {
            nextState.party = nextProps.partyState.party;
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
        const partyId = this.props.match.params.partyId;
        this.props.getAPartyAction(partyId);
    }

    onInputChange = (event) => {
        const partyData = this.state.partyData;
        partyData[event.target.name] = event.target.value;
        this.setState(partyData);
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

        const { logourl, name, hqaddress } = this.state.partyData;
        const partyId = this.props.match.params.partyId;
        const formData = new FormData();

        formData.append('logourl', logourl);
        formData.append('name', name);
        formData.append('hqaddress', hqaddress);
        this.props.editPartyAction(formData, partyId).then(() => {
            if (this.props.partyState.success) {
                swal("Party Modified!", "Updated Successfully", "success");
            } else {
                const message = this.props.partyState.error.response.data.message;
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
                            name="add-office" 
                            encType="multpart/form-data" 
                            onSubmit={this.onFormSubmit}
                        >
                        <label htmlFor="logourl">Party Logo:</label>
                        <input 
                          type="text" 
                          name="logourl" 
                          placeholder={party ? party.logourl : ''}
                          className="form-control name" 
                          value={logourl} 
                        onChange={this.onInputChange} 
                        /> 
                        <label htmlFor="name">Party Name:</label>
                        <input 
                          type="text" 
                          name="name" 
                          placeholder={party ? party.name : ''}
                          className="form-control name" 
                          value={name} 
                        onChange={this.onInputChange} 
                        />
                        <label htmlFor="hqaddress">Party Address:</label>
                        <input 
                          type="text" 
                          name="hqaddress" 
                          placeholder={party ? party.hqaddress : ''}
                          className="form-control name" 
                          value={hqaddress} 
                        onChange={this.onInputChange} 
                        />  
                        <button 
                          type="button"
                          className="submit" 
                        >
                            Save Party Changes
                        </button>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}


EditParty.propTypes = {
    getAPartyAction: PropTypes.func.isRequired,
    editPartyAction: PropTypes.func.isRequired,
    partyState: PropTypes.object.isRequired,
    match: PropTypes.object,
    isLoading: PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
    partyState: state.partyReducer,
    isLoading: state.partyReducer.isLoading
});

export const mapDispatchToProps = dispatch => 
bindActionCreators({ getAPartyAction, editPartyAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditParty);

