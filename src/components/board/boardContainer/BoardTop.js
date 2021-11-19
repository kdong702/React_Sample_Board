import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {changePageSize} from '../../../action/pagination';

const BoardTop = () =>{
    const totalCount = useSelector(state => state.list.totalCount);
    const pageSize = useSelector(state => state.pagination.pageSize);
    const checkedList = useSelector(state => state.list.checkedList);
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        console.log(e.target.value);
        dispatch(changePageSize(e.target.value));
    }
    return(
        <div className="desc_box mgt_25">
	        <div className="fl">
		        <span className="tresult"><em>{totalCount}</em>개의 게시글이 검색되었습니다.</span><br></br>
                <span className="tresult"><em>{checkedList.length}</em>개 선택되었습니다.</span>
	        </div>
	        <div className="fr">
		        <select id="pageSize" name="pageSize" className="ui_sel" style={{width: "120px"}} defaultValue={pageSize} onChange={changeHandler}>
			        <option value="10" >10Line 보기</option>
			        <option value="20" >20Line 보기</option>
                    <option value="50" >50Line 보기</option>
                    <option value="100">100Line 보기</option>
                </select>
            </div>
        </div>
    );
};
export default BoardTop;