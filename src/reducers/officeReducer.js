import {
    GET_OFFICE_SUCCESSFUL, GET_OFFICE_UNSUCCESSFUL,
    ADD_OFFICE_SUCCESSFUL, ADD_OFFICE_UNSUCCESSFUL,
    GET_AN_OFFICE_SUCCESSFUL, GET_AN_OFFICE_UNSUCCESSFUL,
    EDIT_OFFICE_SUCCESSFUL, EDIT_OFFICE_UNSUCCESSFUL,
    DELETE_OFFICE_SUCCESSFUL, DELETE_OFFICE_UNSUCCESSFUL,
    SET_LOADING_STATE
} from '../constants/actionTypes';

const initialState = {
    offices: {},
    office: {},
    error: null,
    success: false,
    loading: false
}

const officeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_OFFICE_SUCCESSFUL:
            return {
                ...state,
                success: true,
                offices: action.data.offices,
                loading: false
            };
        case GET_OFFICE_UNSUCCESSFUL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case SET_LOADING_STATE:
            return {
                ...state,
                loading: action.payload,
            };
            case ADD_OFFICE_SUCCESSFUL:
                return {
                    ...state,
                    success: true,
                    loading: false,
                    office: action.data.office
                };
            case ADD_OFFICE_UNSUCCESSFUL:
                return {
                    ...state,
                    success: false,
                    loading: false,
                    error: action.error
                }
            case GET_AN_OFFICE_SUCCESSFUL:
                return {
                    ...state,
                    success: true,
                    office: action.data.office
                };
            case GET_AN_OFFICE_UNSUCCESSFUL:
                return {
                    ...state,
                    success: false,
                    office: null,
                    error: action.error
                };
            case EDIT_OFFICE_SUCCESSFUL:
                return {
                    ...state,
                    success: true,
                    loading: false,
                    office: action.data.office,
                    offices: {
                        offices: state.offices.map((office) => {
                            if (office.id === action.data.office.id) {
                                return {
                                    ...office,
                                    ...action.data.office
                                };
                            }
                            return office;
                        })
                    }
                };
            case EDIT_OFFICE_UNSUCCESSFUL:
                return {
                    ...state,
                    success: false,
                    loading: false,
                    error: action.error
                };
            case DELETE_OFFICE_SUCCESSFUL:
                return {
                    ...state,
                    success: true,
                    loading: false,
                    offices: {
                        offices: state.offices.filter(office => office.id !== action.data)
                    }
                };
                case DELETE_OFFICE_UNSUCCESSFUL:
                    return {
                        ...state,
                        success: false,
                        passes: null,
                        error: action.error
                    };
            default:
                return {
                    ...state
                };
    }
};

export default officeReducer;
