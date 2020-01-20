import axios from 'axios';
import  {
    GET_CANDIDATE_SUCCESSFUL, GET_CANDIDATE_UNSUCCESSFUL,
    ADD_CANDIDATE_SUCCESSFUL, ADD_CANDIDATE_UNSUCCESSFUL,
    GET_A_CANDIDATE_SUCCESSFUL, GET_A_CANDIDATE_UNSUCCESSFUL,
    EDIT_CANDIDATE_SUCCESSFUL, EDIT_CANDIDATE_UNSUCCESSFUL,
    DELETE_CANDIDATE_SUCCESSFUL, DELETE_CANDIDATE_UNSUCCESSFUL,
    SET_LOADING_STATE
} from '../constants/actionTypes';
// import { dispatch } from 'rxjs/internal/observable/pairs';
import { authorization } from '../utils/helper';

const getCandidateSuccess = data => ({
    type: GET_CANDIDATE_SUCCESSFUL,
    data
});

const getCandidateUnsuccess = error => ({
    type: GET_CANDIDATE_UNSUCCESSFUL,
    error
});

const addCandidateSuccess = data => ({
    type: ADD_CANDIDATE_SUCCESSFUL,
    data
});

const addCandidateUnsuccess = error => ({
    type: ADD_CANDIDATE_UNSUCCESSFUL,
    error
});

const getACandidateSuccess = data => ({
    type: GET_A_CANDIDATE_SUCCESSFUL,
    data
});

const getACandidateUnsuccess = error => ({
    type: GET_A_CANDIDATE_UNSUCCESSFUL,
    error
});

const editCandidateSuccess = data => ({
    type: EDIT_CANDIDATE_SUCCESSFUL,
    data
});

const editCandidateUnsuccess = error => ({
    type: EDIT_CANDIDATE_UNSUCCESSFUL,
    error
});

const deleteCandidateSuccess = data => ({
    type: DELETE_CANDIDATE_SUCCESSFUL,
    data
});

const deleteCandidateUnsuccess = error => ({
    type: DELETE_CANDIDATE_UNSUCCESSFUL,
    error
});

const getCandidates = () => (dispatch => (
    axios.get('/candidates', authorization())
    .then((res) => {
        dispatch(getCandidateSuccess({
            candidates: res.data.candidates
        }));
    })
    .catch((err) => {
        dispatch(getCandidateUnsuccess(err))
    })
));

const addCandidate = candidateDetail => {
    dispatch({
        type: SET_LOADING_STATE,
        payload: true
    });
    return (
        axios.post('/candidates', candidateDetail, authorization())
        .then((res) => {
            dispatch(addCandidateSuccess({
                candidate: res.data
            }));
        })
        .catch((err) => dispatch(addCandidateUnsuccess(err)))
    );
}

const getACandidateAction = (id) => (dispatch) => (
    axios.get(`/candidates/${id}`, authorization())
    .then((res) => {
        dispatch(getACandidateUnsuccess({
            candidate: res.data.candidate
        }));
    })
    .catch(err => dispatch(getACandidateUnsuccess(err)))
);

const editCandidateAction = (candidateDetail, id) => dispatch => (
    axios.put(`/candidates/${id}`, candidateDetail, authorization())
    .then((res) => {
        dispatch(editCandidateSuccess({
            candidate: res.data.candidate
        }));
    })
    .catch((err) => {
        dispatch(editCandidateUnsuccess(err))
    })
);

const deleteCandidateAction = candidateId => dispatch => (
    axios.delete(`/candidates/${candidateId}`, authorization())
    .then((res) => {
        dispatch(deleteCandidateSuccess(candidateId));
    })
    .catch(err => dispatch(deleteCandidateUnsuccess(err)))
);

export {
    getCandidates,
    addCandidate,
    getACandidateAction,
    editCandidateAction,
    deleteCandidateAction,
    getCandidateSuccess,
    getCandidateUnsuccess,
    addCandidateSuccess,
    addCandidateUnsuccess,
    getACandidateSuccess,
    getACandidateUnsuccess,
    editCandidateSuccess,
    editCandidateUnsuccess,
    deleteCandidateSuccess,
    deleteCandidateUnsuccess
};
