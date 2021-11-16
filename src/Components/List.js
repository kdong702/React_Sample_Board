import React,{useState,useEffect} from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {changeBlockSize} from '../action/pagination';
import {changeTotalCount,createCheckBox,deleteCheckBox} from '../action/list';
import { Link, Router } from "react-router-dom";

const Lists= () => {
    const [lists, setLists] = useState([]);
    const searchType = useSelector(state => state.search.searchType);
    const searchKeyword = useSelector(state => state.search.searchKeyword);
    const pageNo = useSelector(state => state.pagination.pageNo);
    const pageSize = useSelector(state => state.pagination.pageSize);
    const totalCount = useSelector(state => state.list.totalCount);
    const checkedList = useSelector(state => state.list.checkedList);
    const dispatch = useDispatch();
   
    useEffect(()=>{
        async function fetchDate(){
            const url = 'http://192.168.100.74:18080/homepage/api/notification/list.do?pageNo='+pageNo+'&pageSize='+pageSize+'&searchType='+searchType+'&searchKeyword='+searchKeyword;
            console.log(url);
            const response = await axios.get(url);
            console.log(response.data.RESULT_DATA.list);
            setLists(response.data.RESULT_DATA.list);
            dispatch(changeBlockSize(response.data.RESULT_DATA.search.blockSize));
            dispatch(changeTotalCount(response.data.RESULT_DATA.search.totalCount));
        }
        fetchDate();
      },[pageNo,pageSize,searchType,searchKeyword,totalCount]);
    //개별체크
    const checkHandler = (e) => {
        if(e.target.checked){
            dispatch(createCheckBox(parseInt(e.target.id)));
        }else if(!e.target.checked){
            dispatch(deleteCheckBox(parseInt(e.target.id)));
        }
    };
    //전체 체크
    const allCheckHandler = (e) => {
        if(e.target.checked){
            lists.forEach(
                (el)=>{
                    //기존에 체크해서 들어간 값 중복 방지
                    if(!checkedList.includes(el.seq)){
                    dispatch(createCheckBox(parseInt(el.seq)))
                    }
                }
            );
        }else if(!e.target.checked){
            lists.forEach((el)=>dispatch(deleteCheckBox(parseInt(el.seq))));
        }
    };
    

    var list;
    if (totalCount=== 0 ){
        list = 
                <tr className="boardList">
                    <td colSpan="5">조회된 리스트가 없습니다.</td>
                </tr>;
    }else {
        list = lists.map(item=>(
                 <tr className="boardList" key={item.seq}>
                    <td className=""><input type="checkbox" id={item.seq} onChange={checkHandler} checked={checkedList.includes((item.seq))}></input></td>
                    <td className="first input">{item.seq}</td>
                        <Link to={"/BoardDetail?seq=" + item.seq}>
                            <td>{item.title}</td>
                        </Link>
                    <td>{item.contents}</td>
                    <td className="last input">{item.regDt}</td>
                    {item.fileId !== null ?
                        <td className="ellipsis"><i class="fa fa-file-archive-o" style={{fontSize: "18px"}}></i></td> : 
                        <td className="ellipsis">파일없다</td>}
                 </tr> 
        )); 
    }

    return (
        <table className="dtbl_col" cellSpacing="0" cellPadding="0" summary="">
            <colgroup>
                <col style={{width: "5%"}} />
                <col style={{width: "10%"}} />
                <col style={{width: "35%"}} />
                <col style={{width: "25%"}} />
                <col style={{width: "20%"}} />
                <col style={{width: "5%"}} />
            </colgroup>
            <thead>
                <tr>
                    <th scope="col"><input type="checkbox" onChange={allCheckHandler} checked={lists.every((el)=> checkedList.includes(el.seq))}></input></th>
                    <th scope="col">NO</th>
                    <th scope="col">제목</th>
                    <th scope="col">내용</th>
                    <th scope="col">등록일</th>
                    <th scope="col">첨부파일</th>
                </tr>
	        </thead>
            <tbody>
                {list}
            </tbody>
        </table>
        
    );
};
export default Lists;