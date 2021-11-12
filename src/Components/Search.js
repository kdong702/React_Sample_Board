import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeSearchType,changeSearchKeyword,changeInput} from '../action/search';

const Search = ()=>{
    const searchType = useSelector(state => state.search.searchType);
    const searchKeyword = useSelector(state => state.search.searchKeyword);
    const dispatch = useDispatch();
   

        
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(changeSearchType(e.target.selectList.value));
        dispatch(changeSearchKeyword(e.target.searchKeyword.value));
    }

    const changeHandler = (e) => {
        dispatch(changeInput(e.target.value));
    }
          
    var selected = searchType == null ? "" : searchType;

    return(
        <div className="form_box" style={{marginBottom: 30}}>
            <form id="listForm" name="listForm" method="POST" onSubmit={submitHandler}  >
                <div className="colgroup" style={{width: "44%", paddingleft: "55px"}}>
                    <div className="rowgroup">
                        <div className="tbl_inner">
                            <table>
                                <colgroup>
                                    <col style={{width: "20%"}} />
                                    <col style={{width: "80%"}} />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>
                                            <select name="selectList" id="selectList" className="ui_sel" style={{width: "100px"}} defaultValue={selected} >
                                                    <option value="title" >제목</option>
                                                    <option value="contents" >내용</option>
                                                    <option value="all">제목+내용</option>
                                            </select>
                                        </th>
                                        <td className="input">
                                            <input type="text" name="searchKeyword" id="searchKeyword"  style={{width: "100%"}} onChange={changeHandler} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div className="colgroup btn" style={{width: "12%"}}>
                    {/* <span className="bar">|</span>
                    <a href="#" className="btn_black" onClick={searchHandler}><span>검색</span></a> 
                    <span className="barr">|</span> */}
                     <button type="submit" className="btn_black" style={{color:"white"}}>검색</button> 
                </div>
                
            </form>
        </div>
    );
};
export default Search;