import { createAction } from "redux-actions";

const CHANGE_TOTALCOUNT = 'list/CHANGE_TOTALCOUNT';

//checkItem
const CREATE_CHECKBOX = 'list/CREATE_CHECKBOX';
const DELETE_CHECKBOX = 'list/DELETE_CHECKBOX';

export const changeTotalCount = createAction(CHANGE_TOTALCOUNT,totalCount => totalCount);
export const createCheckBox = createAction(CREATE_CHECKBOX,id => id);
export const deleteCheckBox = createAction(DELETE_CHECKBOX,id => id);

export {CHANGE_TOTALCOUNT, CREATE_CHECKBOX,DELETE_CHECKBOX };
        
