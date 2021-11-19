import { combineReducers } from 'redux';
import uri from './uri';
import pagination from "./pagination";
import search from "./search";
import list from "./list";
import popup from './popup';


// 컴바인리듀서를 통해 여러 개의 리듀서를 합쳐 하나의 루트 리듀서를 만들고
// 이를 스토어에 넣어 주면 해당 스토어에서 여러 개의 상태를 관리하는 것이 가능함.
const reducer = combineReducers({
    uri,
    pagination,
    search,
    list,
    popup,
});
 
export default reducer;