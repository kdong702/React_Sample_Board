import { createAction } from "redux-actions";

const CHANGE_TOTALCOUNT = 'list/CHANGE_TOTALCOUNT';

export const changeTotalCount = createAction(CHANGE_TOTALCOUNT,totalCount => totalCount);

export {CHANGE_TOTALCOUNT} ;
