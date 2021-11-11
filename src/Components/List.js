import React,{useState,useEffect} from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {changePageNo, changePageSize,changeBlockSize} from '../Modules/pagination';
import {changeSearchType,changeSearchKeyword} from '../Modules/search';
import {changeTotalCount} from '../Modules/list';


const Lists= () => {

    const [lists, setLists] = useState([]);
    
    const searchType = useSelector(state => state.search.searchType);
    const searchKeyword = useSelector(state => state.search.searchKeyword);
    const pageNo = useSelector(state => state.pagination.pageNo);
    const pageSize = useSelector(state => state.pagination.pageSize);
    const blockSize =  useSelector(state => state.pagination.blockSize);
    const totalCount = useSelector(state => state.list.totalCount);
    const dispatch = useDispatch();
   
    useEffect(()=>{
        async function fetchDate(){
            const url = 'http://192.168.100.74:18080/homepage/api/notification/list.do?pageNo='+pageNo+'&pageSize='+pageSize+'&searchType='+searchType+'&searchKeyword='+searchKeyword;
            console.log("url" + url);
            const response = await axios.get(url);
            console.log(response.data);
            setLists(response.data.RESULT_DATA.list);
        //  dispatch(changePageNo(response.data.RESULT_DATA.search.pageNo));
        //  dispatch(changePageSize(response.data.RESULT_DATA.search.pageSize)); 지금은 필요없을듯
        //  dispatch(changeBlockSize(response.data.RESULT_DATA.search.blockSize));
        //  dispatch(changeSearchKeyword(response.data.RESULT_DATA.search.searchKeyword));
        //  dispatch(changeSearchType(response.data.RESULT_DATA.search.searchType));
            dispatch(changeTotalCount(response.data.RESULT_DATA.search.totalCount));
        }
        fetchDate();
        console.log("1");
      },[pageNo,pageSize,searchType,searchKeyword,totalCount]);
      console.log(lists);
      console.log("totalCount"+ totalCount);
   
      
    
    
    // const noList = ()=>{
    //     return (
    //         <tr className="boardList">
    //             <td colSpan="5">데이터가 없습니다.</td>
    //         </tr>
    //     );
    // };

    // const normalList = ({lists}) =>{
    //     return (
    //         lists.map(list=>(
    //         <tr className="boardList" key={list.seq}>
    //             <td className="first input">{list.seq}</td>
    //             <td>{list.title}</td>
    //             <td>{list.contents}</td>
    //             <td className="last input">{list.regDt}</td>
    //         </tr>  
    //     )));
    // };
    var list;
    if (totalCount=== 0 ){
        list = 
                <tr className="boardList">
                    <td colSpan="5">데이터가 없습니다.</td>
                </tr>;
    }else {
        list = lists.map(item=>(
                 <tr className="boardList" key={item.seq}>
                    <td className="first input">{item.seq}</td>
                    <td>{item.title}</td>
                    <td>{item.contents}</td>
                    <td className="last input">{item.regDt}</td>
                 </tr> 
        )); 
    }

    return (
        <table className="dtbl_col" cellSpacing="0" cellPadding="0" summary="">
            <colgroup>
                <col style={{width: "15%"}} />
                <col style={{width: "40%"}} />
                <col style={{width: "25%"}} />
                <col style={{width: "20%"}} />
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">NO</th>
                    <th scope="col">제목</th>
                    <th scope="col">내용</th>
                    <th scope="col">등록일</th>
                </tr>
	        </thead>
            <tbody>
                {list}
            </tbody>
        </table>
        
    );
};
export default Lists;