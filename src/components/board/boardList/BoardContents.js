import React,{useState,useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link,useHistory } from "react-router-dom";
import {changeBlockSize} from '../../../action/pagination';
import {changeTotalCount,createCheckBox,deleteCheckBox} from '../../../action/list';
import {togglePopup,changeMessageCode,changeMessage} from '../../../action/popup';
import { listApi,getAxiosFromApi } from '../../../api';

const BoardContents= () => {
    const [lists, setLists] = useState([]);
    const searchType = useSelector(state => state.search.searchType);
    const searchKeyword = useSelector(state => state.search.searchKeyword);
    const pageNo = useSelector(state => state.pagination.pageNo);
    const pageSize = useSelector(state => state.pagination.pageSize);
    const totalCount = useSelector(state => state.list.totalCount);
    const checkedList = useSelector(state => state.list.checkedList);
    const lockedList = useSelector(state => state.list.lockedList);
    const popupStatus = useSelector(state => state.popup.popupStatus);
    const dispatch = useDispatch();
    var history = useHistory();

    function timestamp(){ 
        function pad(n) { 
            return n<10 ? "0"+n :""+n; 
        } 
        var d=new Date();
        var format = d.getFullYear()+ pad(d.getMonth()+1)+ pad(d.getDate())+ pad(d.getHours())+ pad(d.getMinutes())+ pad(d.getSeconds()) ; 
        return format
    }

    var now = timestamp();
    
    
    const successAxios = (res) =>{
        console.log(encodeURIComponent(";,/?:@&=+$ test"));
        console.log(encodeURIComponent(";,/?:@&=+$ "));
        console.log(res.data.RESULT_DATA.list);
        setLists(res.data.RESULT_DATA.list);
        dispatch(changeBlockSize(res.data.RESULT_DATA.search.blockSize));
        dispatch(changeTotalCount(res.data.RESULT_DATA.search.totalCount));
    };

    const failAxios = (err) =>{
        console.log(err);
        dispatch(changeMessage("리스트 axios 에러"));
        dispatch(changeMessageCode("1000"));
        dispatch(togglePopup(true));
    };

    useEffect(()=>{
        const params = {
            pageNo:pageNo,
            pageSize:pageSize,
            searchType:searchType,
            searchKeyword:searchKeyword
        }
        async function fetchDate(){
            await getAxiosFromApi(listApi,params,successAxios,failAxios);
        }
        fetchDate();
    },[pageNo,pageSize,searchType,searchKeyword,totalCount,popupStatus,lockedList]);
    
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
            <td className="first input">
                <Link to={"/BoardRead?seq=" + item.seq}>
                    {now-item.regDt < 60*60*24 ? <i className="material-icons" style={{fontSize: "23px", color: "orange",verticalAlign:"middle"}}>fiber_new</i> : ""}{item.seq}
                </Link>
            </td>
            <td>
                <Link to={"/BoardRead?seq=" + item.seq}>{lockedList.includes(parseInt(item.seq)) ? "잠금된 게시판" : item.title}
                </Link> 
            </td>
            <td><Link to={"/BoardRead?seq=" + item.seq}>{lockedList.includes(item.seq) ? "잠금된 게시판" : item.contents}</Link></td>
            <td className="last input"><Link to={"/BoardRead?seq=" + item.seq}>{ lockedList.includes(item.seq) ? "잠금된 게시판" : item.regDt}</Link></td>
            {item.fileId !== null ?
                <td className="ellipsis"><Link to={"/BoardRead?seq=" + item.seq}><i className="fa fa-file-archive-o" style={{fontSize: "18px"}}></i></Link></td> : 
                <td className="ellipsis">파일X</td>}
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
                    <th scope="col"><input type="checkbox" onChange={allCheckHandler} checked={lists.every((el)=> checkedList.includes(el.seq)) && lists.length !== 0}></input></th>
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
export default BoardContents;