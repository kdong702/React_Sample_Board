import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeSearchType,changeSearchKeyword,changeInput} from '../../../action/search';
import { resetCheckBox } from '../../../action/list';

const Search = ()=>{
    const searchType = useSelector(state => state.search.searchType);
    const searchKeyword = useSelector(state => state.search.searchKeyword);
    const dispatch = useDispatch();
    
    /* s search2
    const [type2, setType2] = useState('title');
    const [keyword2, setKeyword2] = useState('');
    
    var keyword = keyword2;
    var type = type2;

    const searchHandler = (e) =>{
        console.log("search!!" + type + keyword);
        dispatch(changeSearchType(type));
        dispatch(changeSearchKeyword(keyword));
    }
    //selectList 선택시
    const selectHandler = (e) => {
        type=e.target.value;
        console.log(type);
        setType2(type);
    }

     e search2*/
    //검색어 바뀔시
    const changeHandler = (e) => {
        dispatch(changeInput(e.target.value));
        // keyword = e.target.value; //search2
        // console.log(keyword); //search2
        // setKeyword2(keyword); //search2
    }
    
    const submitHandler = (e) =>{
        e.preventDefault();
        if( e.target.searchKeyword.value.includes("[")  || e.target.searchKeyword.value.includes("]") ){
            alert("특수문자 [ ] 검색 불가능합니다.");
        }else if(e.target.searchKeyword.value === "^"){
            alert("특수문자 ^ 검색 불가능합니다.")
        }else{
            dispatch(changeSearchType(e.target.selectList.value));
            dispatch(changeSearchKeyword(e.target.searchKeyword.value));
            dispatch(resetCheckBox());
        }
    }

    var selected = searchType == null ? "all" : searchType;

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
                                            <select name="selectList" id="selectList" className="ui_sel" style={{width: "100px"}} defaultValue={selected}  >
                                                    <option value="title" >제목</option>
                                                    <option value="contents" >내용</option>
                                                    <option value="all">제목+내용</option>
                                            </select>
                                        </th>
                                        <td className="input">
                                            <input type="text" name="searchKeyword" id="searchKeyword"  style={{width: "100%"}} placeholder="검색어 입력" defaultValue={searchKeyword} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div className="colgroup btn" style={{width: "12%"}}>
                     {/* <span className="bar">|</span>
                    <a  className="btn_black" onClick={searchHandler} style={{cursor:"pointer"}}><span>검색2</span></a> 
                    <span className="barr">|</span>  */}
                      <button type="submit" className="btn_black" style={{color:"white"}}>검색</button> 
                </div>
                
            </form>
        </div>
    );
};
export default Search;