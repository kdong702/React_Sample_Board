import { createAction } from "redux-actions";

const CHANGE_PAGENO = 'pagination/CHANGE_PAGENO';
const CHANGE_PAGESIZE = 'pagination/CHANGE_PAGESIZE';
const CHANGE_BLOCKSIZE = 'pagination/CHANGE_BLOCKSIZE';

export const changePageNo = createAction(CHANGE_PAGENO, pageNo => pageNo);
export const changePageSize = createAction(CHANGE_PAGESIZE, pageSize => pageSize);
export const changeBlockSize = createAction(CHANGE_BLOCKSIZE, blockSize => blockSize);

export {CHANGE_PAGENO,CHANGE_PAGESIZE,CHANGE_BLOCKSIZE};