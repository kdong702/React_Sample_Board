import {  handleActions } from "redux-actions";
import {CHANGE_TOTALCOUNT,CREATE_CHECKBOX,DELETE_CHECKBOX,RESET_CHECKBOX,CREATE_LOCKLIST,DELETE_LOCKLIST} from '../action/list'

const initialState = {
    totalCount: 0,
    checkedList : [],
    lockedList : [],
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
        [RESET_CHECKBOX]: (state,action) =>({
            ...state,
            checkedList:[],
        }),
        [CREATE_LOCKLIST]:(state,action) => ({
            ...state,
            lockedList:state.lockedList.concat(action.payload),
        }),
        [DELETE_LOCKLIST]: (state, action) => ({
            ...state,
            lockedList: state.lockedList.filter(item => item !== action.payload),
        }),
    },
    initialState
);