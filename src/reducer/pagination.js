import {handleActions } from "redux-actions";
import {CHANGE_PAGENO,CHANGE_PAGESIZE,CHANGE_BLOCKSIZE} from '../action/pagination'

const initialState = {
    pageNo : 1,
    pageSize : 10,
    blockSize : 5,

};

export default handleActions(
    {
        [CHANGE_PAGENO]: (state,action) => ({
            ...state,
            pageNo: action.payload
        }),
        [CHANGE_PAGESIZE]: (state,action)=> ({
            ...state,
            pageSize: action.payload
        }),
        [CHANGE_BLOCKSIZE]: (state,action)=> ({
            ...state,
            blockSize: action.payload
        }),
    },
    initialState
);

