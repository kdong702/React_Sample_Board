import { createAction, handleActions } from "redux-actions";

const CHANGE_SEARCHTYPE = 'search/CHANGE_SEARCHTYPE';
const CHANGE_SEARCHKEYWORD = 'search/CHANGE_SEARCHKEYWORD';
const CHANGE_INPUT = 'search/CHANGE_INPUT';

export const changeSearchType = createAction(CHANGE_SEARCHTYPE,searchType => searchType);
export const changeSearchKeyword = createAction(CHANGE_SEARCHKEYWORD,searchKeyword => searchKeyword);
export const changeInput = createAction(CHANGE_INPUT,input => input);

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