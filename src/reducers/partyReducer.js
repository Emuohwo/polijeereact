import {
    GET_PARTY_SUCCESSFUL, GET_PARTY_UNSUCCESSFUL,
    ADD_PARTY_SUCCESSFUL, ADD_PARTY_UNSUCCESSFUL,
    GET_A_PARTY_SUCCESSFUL, GET_A_PARTY_UNSUCCESSFUL,
    EDIT_PARTY_SUCCESSFUL, EDIT_PARTY_UNSUCCESSFUL,
    DELETE_PARTY_SUCCESSFUL, DELETE_PARTY_UNSUCCESSFUL,
    SET_LOADING_STATE
} from '../constants/actionTypes';
import { act } from 'react-dom/test-utils';
import { stat } from 'fs';

const initialState = {
    parties: {},
    party: {},
    error: null,
    success: false,
    loading: false
};

const partyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PARTY_SUCCESSFUL:
            return {
                ...state,
                success: true,
                parties: action.data.parties,
                loading: false
            };
        case GET_PARTY_UNSUCCESSFUL:
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
        case ADD_PARTY_SUCCESSFUL:
            return {
                ...state,
                success: true,
                loading: false,
                party: action.data.party
            };
        case ADD_PARTY_UNSUCCESSFUL:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error
            };
        case GET_A_PARTY_SUCCESSFUL:
            return {
                ...state,
                success: true,
                party: action.data.party
            }
        case GET_A_PARTY_UNSUCCESSFUL:
            return {
                ...state,
                success: false,
                party: null,
                error: action.error
            };
        case EDIT_PARTY_SUCCESSFUL:
            return {
                ...state,
                success: true,
                loading: false,
                party: action.data.party,
                parties: {
                    parties: state.parties.map((party) => {
                        if (party.id === action.data.party.id) {
                            return {
                                ...party,
                                ...action.data.party
                            };
                        }
                        return party;
                    })
                }
            };
        case EDIT_PARTY_UNSUCCESSFUL:
            return {
                ...state,
                success: false,
                passes: null,
                error: action.error
            };
        case DELETE_PARTY_SUCCESSFUL:
            return {
                ...state,
                success: true,
                loading: false,
                parties: {
                    parties: state.parties.filter(party => party.id !== action.data)
                }
            };
        case DELETE_PARTY_UNSUCCESSFUL:
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

export default partyReducer;
