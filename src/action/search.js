import { createAction} from "redux-actions";

const CHANGE_SEARCHTYPE = 'search/CHANGE_SEARCHTYPE';
const CHANGE_SEARCHKEYWORD = 'search/CHANGE_SEARCHKEYWORD';
const CHANGE_INPUT = 'search/CHANGE_INPUT';
const CHANGE_STARTDAY = 'search/CHANGE_STARTDAY';
const CHANGE_ENDDAY = 'search/CHANGE_ENDDAY';

export const changeSearchType = createAction(CHANGE_SEARCHTYPE,searchType => searchType);
export const changeSearchKeyword = createAction(CHANGE_SEARCHKEYWORD,searchKeyword => searchKeyword);
export const changeInput = createAction(CHANGE_INPUT,input => input);
export const changeStartDay = createAction(CHANGE_STARTDAY,sday => sday);
export const changeEndDay = createAction(CHANGE_ENDDAY,eday => eday);

export { CHANGE_SEARCHTYPE,CHANGE_SEARCHKEYWORD,CHANGE_INPUT,CHANGE_STARTDAY,CHANGE_ENDDAY };
