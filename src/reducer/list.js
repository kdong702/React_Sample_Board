import {  handleActions } from "redux-actions";
import {CHANGE_TOTALCOUNT,CREATE_CHECKBOX,DELETE_CHECKBOX} from '../action/list'



const initialState = {
    totalCount: 0,
    checkedList : [
       
    ],
};

export default handleActions(
    {
        [CHANGE_TOTALCOUNT]:(state,action) => ({
            ...state,
            totalCount: action.payload,
        }),
        [CREATE_CHECKBOX]:(state,action) => ({
            ...state,
            checkedList:state.checkedList.concat(action.payload),
        }),
        [DELETE_CHECKBOX]: (state, action) => ({
            ...state,
            checkedList: state.checkedList.filter(item => item !== action.payload),
        }),
    },
    initialState
);