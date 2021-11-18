import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch} from 'react-redux';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import {togglePopup,changeMessageCode,changeMessage} from '../action/popup';

const Csv = () =>{
  
    const searchType = useSelector(state => state.search.searchType);
    const searchKeyword = useSelector(state => state.search.searchKeyword);
    const pageNo = useSelector(state => state.pagination.pageNo);
    const totalCount = useSelector(state => state.list.totalCount);
    const checkedList = useSelector(state => state.list.checkedList);
    const dispatch = useDispatch();
    const [lists, setLists] = useState([]);
    const headers = [
      {label: "아이디", key: "seq"},
      {label: "노출여부", key: "viewYn"},
      {label: "제목", key: "title"},
      {label: "내용", key: "contents"},
      {label: "파일아이디", key: "fileId"},
      {label: "등록자", key: "regId"},
      {label: "등록일", key: "regDt"},
      {label: "수정자", key: "modId"},
      {label: "수정일", key: "modDt"},
    ];
  
    useEffect(()=>{
        async function fetchDate(){
            const url = 'http://192.168.100.74:18080/homepage/api/notification/list.do?pageNo='+pageNo+'&pageSize='+totalCount+'&searchType='+searchType+'&searchKeyword='+searchKeyword;
            await axios.get(url)
            .then(res=>{
                setLists(res.data.RESULT_DATA.list);
            })
            .catch(err => {
                console.log(err);
                dispatch(changeMessage("CSV axios 에러"));
                dispatch(changeMessageCode("0001"));
                dispatch(togglePopup(true));
            });
        }
        fetchDate();
      },[searchType,searchKeyword,totalCount]);

    //선택한 리스트 출력 바꾸고 싶다면 csvLink data ={lists}로 수정
    var selectedList = [];
    selectedList = lists.filter(list => checkedList.includes(list.seq));
    
    return(
      <a className="btn_black">
      <CSVLink headers={headers} data={selectedList} filename="list.csv" style={{color:"white"}}>선택영역 CSV</CSVLink> 
      </a>
    );

};
export default Csv;