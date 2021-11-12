import { handleActions } from "redux-actions";

import {CHANGE_SEARCHTYPE,CHANGE_SEARCHKEYWORD,CHANGE_INPUT} from '../action/search'

const initialState = {
    input: '',
    searchType: null,
    searchKeyword: null,
};

export default handleActions(
    {
        [CHANGE_SEARCHTYPE]:(state,action) => ({
            ...state,
            searchType: action.payload
        }),
        [CHANGE_SEARCHKEYWORD]:(state,action) => ({
            ...state,
            searchKeyword: action.payload
        }),
        [CHANGE_INPUT]: (state, action) => ({
            ...state,
            input: action.payload,
        }),
    },
    initialState
);