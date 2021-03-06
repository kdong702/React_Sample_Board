import { createAction } from "redux-actions";

const CHANGE_TOTALCOUNT = 'list/CHANGE_TOTALCOUNT';

//checkItem
const CREATE_CHECKBOX = 'list/CREATE_CHECKBOX';
const DELETE_CHECKBOX = 'list/DELETE_CHECKBOX';
const RESET_CHECKBOX = 'list/RESET_CHECKBOX';

//lockList
const CREATE_LOCKLIST = 'list/CREATE_LOCKLIST';
const DELETE_LOCKLIST = 'list/DELETE_LOCKLIST'

export const changeTotalCount = createAction(CHANGE_TOTALCOUNT,totalCount => totalCount);
export const createCheckBox = createAction(CREATE_CHECKBOX,id => id);
export const deleteCheckBox = createAction(DELETE_CHECKBOX,id => id);
export const resetCheckBox = createAction(RESET_CHECKBOX);
export const createLockList = createAction(CREATE_LOCKLIST,seq=>seq);
export const deleteLockList = createAction(DELETE_LOCKLIST,seq=>seq);


export {CHANGE_TOTALCOUNT, CREATE_CHECKBOX,DELETE_CHECKBOX,RESET_CHECKBOX,CREATE_LOCKLIST,DELETE_LOCKLIST };
        
