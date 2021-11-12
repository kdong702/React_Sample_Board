import {  handleActions } from "redux-actions";
import {CHANGE_TOTALCOUNT} from '../action/list'

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