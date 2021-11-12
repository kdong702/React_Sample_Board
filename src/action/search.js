import { createAction} from "redux-actions";

const CHANGE_SEARCHTYPE = 'search/CHANGE_SEARCHTYPE';
const CHANGE_SEARCHKEYWORD = 'search/CHANGE_SEARCHKEYWORD';
const CHANGE_INPUT = 'search/CHANGE_INPUT';

export const changeSearchType = createAction(CHANGE_SEARCHTYPE,searchType => searchType);
export const changeSearchKeyword = createAction(CHANGE_SEARCHKEYWORD,searchKeyword => searchKeyword);
export const changeInput = createAction(CHANGE_INPUT,input => input);

export { CHANGE_SEARCHTYPE,CHANGE_SEARCHKEYWORD,CHANGE_INPUT };
