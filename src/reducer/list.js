import { createAction, handleActions } from "redux-actions";

const CHANGE_TOTALCOUNT = 'list/CHANGE_TOTALCOUNT';

export const changeTotalCount = createAction(CHANGE_TOTALCOUNT,totalCount => totalCount);

const initialState = {
    totalCount: 0,
};

export default handleActions(
    {
        [CHANGE_TOTALCOUNT]:(state,action) => ({
            ...state,
            totalCount: action.payload
        }),
    },
    initialState
);