import { createAction, handleActions } from "redux-actions";

const CHANGE_PAGENO = 'pagination/CHANGE_PAGENO';
const CHANGE_PAGESIZE = 'pagination/CHANGE_PAGESIZE';
const CHANGE_BLOCKSIZE = 'pagination/CHANGE_BLOCKSIZE';

export const changePageNo = createAction(CHANGE_PAGENO, pageNo => pageNo);
export const changePageSize = createAction(CHANGE_PAGESIZE, pageSize => pageSize);
export const changeBlockSize = createAction(CHANGE_BLOCKSIZE, blockSize => blockSize);

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

