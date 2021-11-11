import { combineReducers } from 'redux';
import uriReducer from './uriReducer';
import pagination from "./pagination";
import search from "./search";
import list from "./list";

// 컴바인리듀서를 통해 여러 개의 리듀서를 합쳐 하나의 루트 리듀서를 만들고
// 이를 스토어에 넣어 주면 해당 스토어에서 여러 개의 상태를 관리하는 것이 가능함.
const rootReducer = combineReducers({
    uriReducer,
    pagination,
    search,
    list,
});
 
export default rootReducer;