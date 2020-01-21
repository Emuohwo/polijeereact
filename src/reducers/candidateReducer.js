import {
    GET_CANDIDATE_SUCCESSFUL, GET_CANDIDATE_UNSUCCESSFUL,
    ADD_CANDIDATE_SUCCESSFUL, ADD_CANDIDATE_UNSUCCESSFUL,
    GET_A_CANDIDATE_SUCCESSFUL, GET_A_CANDIDATE_UNSUCCESSFUL,
    EDIT_CANDIDATE_SUCCESSFUL, EDIT_CANDIDATE_UNSUCCESSFUL,
    DELETE_CANDIDATE_SUCCESSFUL, DELETE_CANDIDATE_UNSUCCESSFUL,
    SET_LOADING_STATE
} from '../constants/actionTypes';

const initialState = {
    candidates: {},
    candidate: {},
    error: null,
    success: false,
    loading: false
};

const candidateReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CANDIDATE_SUCCESSFUL:
            return {
                ...state,
                success: true,
                candidates: action.data.candidates,
                loading: false
            };
        case GET_CANDIDATE_UNSUCCESSFUL:
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
            case ADD_CANDIDATE_SUCCESSFUL:
                return {
                    ...state,
                    success: true,
                    loading: false,
                    candidate: action.data.candidate
                };
            case ADD_CANDIDATE_UNSUCCESSFUL:
                return {
                    ...state,
                    success: false,
                    loading: false,
                    error: action.error
                };
            case GET_A_CANDIDATE_SUCCESSFUL:
                return {
                    ...state,
                    success: true,
                    candidate: action.data.candidate
                };
            case GET_A_CANDIDATE_UNSUCCESSFUL:
                return {
                    ...state,
                    success: false,
                    candidate: null,
                    error: action.error
                };
            case EDIT_CANDIDATE_SUCCESSFUL:
                return {
                    ...state,
                    success: true,
                    loading: false,
                    candidate: action.data.candidate,
                    candidates: {
                        candidates: state.candidates.map((candidate) => {
                            if (candidate.id === action.data.candidate.id ) {
                                return {
                                    ...candidate,
                                    ...action.data.candidate
                                };
                            }
                            return candidate
                        })
                    }
                };
            case EDIT_CANDIDATE_UNSUCCESSFUL:
                return {
                    ...state,
                    success: false,
                    loading: false,
                    error: action.error
                };
            case DELETE_CANDIDATE_SUCCESSFUL: 
                return {
                    ...state,
                    success: true,
                    loading: false,
                    candidates: {
                        candidates: state.candidates.filter(candidate => candidate.id !== action.data)
                    }
                };
            case DELETE_CANDIDATE_UNSUCCESSFUL:
                return {
                    ...state,
                    success: false,
                    passes: null,
                    error: action.error
                };
            default:
                return {
                    ...state
                }
    }
}

export default candidateReducer;
