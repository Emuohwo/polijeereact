import axios from 'axios';
// import { toast } from 'react-toastify';
import { authorization } from '../utils/helper';
import {
    GET_OFFICE_SUCCESSFUL, GET_OFFICE_UNSUCCESSFUL,
    ADD_OFFICE_SUCCESSFUL, ADD_OFFICE_UNSUCCESSFUL,
    GET_AN_OFFICE_SUCCESSFUL, GET_AN_OFFICE_UNSUCCESSFUL,
    EDIT_OFFICE_SUCCESSFUL, EDIT_OFFICE_UNSUCCESSFUL,
    DELETE_OFFICE_SUCCESSFUL, DELETE_OFFICE_UNSUCCESSFUL,
    SET_LOADING_STATE
} from '../constants/actionTypes';
// import { dispatch } from 'rxjs/internal/observable/range';

const getOfficeSuccess = data => ({
    type: GET_OFFICE_SUCCESSFUL,
    data
});

const getOfficeUnsuccess = error => ({
    type: GET_OFFICE_UNSUCCESSFUL,
    error
});

const addOfficeSuccess = data => ({
    type: ADD_OFFICE_SUCCESSFUL,
    data
});

const addOfficeUnsuccess = error => ({
    type: ADD_OFFICE_UNSUCCESSFUL,
    error
});

const getAnOfficeSuccess = data => ({
    type:  GET_AN_OFFICE_SUCCESSFUL,
    data
});

const getAnOfficeUnsuccess = error => ({
    type: GET_AN_OFFICE_UNSUCCESSFUL,
    error
});

const editOfficeSuccess = data => ({
    type: EDIT_OFFICE_SUCCESSFUL,
    data
});

const editOfficeUnsuccess = error => ({
    type: EDIT_OFFICE_UNSUCCESSFUL,
    error
});

const deleteOfficesuccess = data => ({
    type:  DELETE_OFFICE_SUCCESSFUL,
    data
});

const deleteOfficeUnsuccess = error => ({
    type: DELETE_OFFICE_UNSUCCESSFUL,
    error
});

const getOffices = () => (dispatch => (
    axios.get('/offices', authorization())
    .then((res) => {
        dispatch(getOfficeSuccess({
            offices: res.data.offices
        }));
    })
    .catch((err) => {
        dispatch(getOfficeUnsuccess(err))
    })
));

const addOffice = officeDetail => {
    dispatch({
        type: SET_LOADING_STATE,
        payload: true
    });
    return (
        axios.post('/offices', officeDetail, authorization())
        .then((res) => {
            dispatch(addOfficeSuccess({
                office: res.data
            }));
        })
        .catch((err) => {
            dispatch(addOfficeUnsuccess(err));
        })
    );
};

const getAnOfficeAction = id => (dispatch) => (
    axios.get(`/offices/${id}`, authorization())
    .then((res) => {
        dispatch(getAnOfficeSuccess({
            office: res.data.office
        }));
    })
    .catch(err => dispatch(getAnOfficeUnsuccess(err)))
);

const editOfficeAction = (officeDetail, id) => dispatch => axios.put(
    `/offices/${id}`,
    officeDetail, authorization()
)
.then((res) => {
    dispatch(editOfficeSuccess({
        office: res.data.office
    }));
})
.catch((err) => {
    dispatch(editOfficeUnsuccess(err));
});

const deleteOfficeAction = officeId => dispatch => 
axios.delete(`/offices/${officeId}`, authorization())
.then((res) => {
    dispatch(deleteOfficesuccess(officeId));
})
.catch(err => dispatch(deleteOfficeUnsuccess(err)))

export {
    getOffices,
    addOffice,
    getAnOfficeAction,
    editOfficeAction,
    deleteOfficeAction,
    getOfficeSuccess,
    getOfficeUnsuccess,
    addOfficeSuccess,
    addOfficeUnsuccess,
    getAnOfficeSuccess,
    getAnOfficeUnsuccess,
    editOfficeSuccess,
    editOfficeUnsuccess,
    deleteOfficesuccess,
    deleteOfficeUnsuccess
};
