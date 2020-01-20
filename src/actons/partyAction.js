import axios from 'axios';
import { toast } from 'react-toastify';
import { authorization } from '../utils/helper';
import {
    GET_PARTY_SUCCESSFUL, GET_PARTY_UNSUCCESSFUL,
    ADD_PARTY_SUCCESSFUL, ADD_PARTY_UNSUCCESSFUL,
    GET_A_PARTY_SUCCESSFUL, GET_A_PARTY_UNSUCCESSFUL,
    EDIT_PARTY_SUCCESSFUL, EDIT_PARTY_UNSUCCESSFUL,
    DELETE_PARTY_SUCCESSFUL, DELETE_PARTY_UNSUCCESSFUL,
    SET_LOADING_STATE
} from '../constants/actionTypes';
// import { dispatch } from 'rxjs/internal/observable/pairs';

const getPartySuccess = data =>  ({
    type: GET_PARTY_SUCCESSFUL,
    data
});

const getPartyUnsuccess = error => ({
    type: GET_PARTY_UNSUCCESSFUL,
    error
});

const addPartySuccess = data => ({
    type: ADD_PARTY_SUCCESSFUL,
    data
});

const addPartyUnsuccess = error => ({
    type: ADD_PARTY_UNSUCCESSFUL,
    error
});

const getAPartySuccess = data => ({
    type: GET_A_PARTY_SUCCESSFUL,
    data
});

const getAPartyUnsuccess = error => ({
    type: GET_A_PARTY_UNSUCCESSFUL,
    error
});

const editPartySuccess = data => {
    type: EDIT_PARTY_SUCCESSFUL,
    data
};

const editPartyUnsuccess = error => ({
    type: EDIT_PARTY_UNSUCCESSFUL,
    error
});

const deletePartySuccess = data => ({
    type: DELETE_PARTY_SUCCESSFUL,
    data
});

const deletePartyUnsuccess = error => ({
    type: DELETE_PARTY_UNSUCCESSFUL,
    error
})

const getParties = () => (dispatch) => 
axios.get('/parties', authorization())
.then((res) => {
    dispatch(getPartySuccess({
        parties: res.data.offices
    }));
})
.catch((err) => {
    dispatch(getPartyUnsuccess(err))
})


const addParty = partyDetail => {
    dispatch({
        type: SET_LOADING_STATE,
        payload: true
    });
    return (
        axios.post('/parties', partyDetail, authorization())
        .then((res) => {
            dispatch(addPartySuccess({
                party: res.data
            }));
        })
        .catch((err) => {
            dispatch(addPartyUnsuccess(err))
        })
    )
};

const getAPartyAction = id => (dispatch) => (
    axios.get(`/parties/${id}`, authorization())
    .then((res) => {
        dispatch(getAPartySuccess({
            party: res.data.party
        }));
    })
    .catch(err => dispatch(getAPartyUnsuccess(err)))
);

const editPartyAction = (partyDetail, id) => dispatch => 
axios.patch(`/parties/${id}/name`, partyDetail, authorization())
.then((res) => {
    dispatch(editPartySuccess({
        party: res.data.party
    }));
})
.catch((err) => {
    dispatch(editPartyUnsuccess(err));
})

const deletePartyAction = partyId => dispatch => 
axios.delete(`/parties/${partyId}`, authorization())
.then((res) => {
    dispatch(deletePartySuccess(partyId))
})
.catch(err => dispatch(deletePartyUnsuccess(err)))

export {
    getParties,
    addParty,
    getAPartyAction,
    editPartyAction,
    deletePartyAction,
    getAPartySuccess,
    getPartyUnsuccess,
    addPartySuccess,
    addPartyUnsuccess,
    getPartySuccess,
    getPartyUnsuccess,
    editPartySuccess,
    editPartyUnsuccess,
    deletePartySuccess,
    deletePartyUnsuccess
};
