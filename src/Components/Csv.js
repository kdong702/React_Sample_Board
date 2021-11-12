import React,{useState,useEffect} from 'react';
import { useSelector} from 'react-redux';
import axios from 'axios';
import { CSVLink } from 'react-csv';


const Csv = () =>{
  
    const searchType = useSelector(state => state.search.searchType);
    const searchKeyword = useSelector(state => state.search.searchKeyword);
    const pageNo = useSelector(state => state.pagination.pageNo);
    const totalCount = useSelector(state => state.list.totalCount);
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
            console.log(totalCount+ "totalCount");
            const url = 'http://192.168.100.74:18080/homepage/api/notification/list.do?pageNo='+pageNo+'&pageSize='+totalCount+'&searchType='+searchType+'&searchKeyword='+searchKeyword;
            console.log(url);
            const response = await axios.get(url);
            console.log(response.data.RESULT_DATA.list);
            setLists(response.data.RESULT_DATA.list);
        }
        fetchDate();
      },[pageNo,searchType,searchKeyword,totalCount]);

    // const getFileName = () =>{
    //   let d = new Date();
    //   let dformat = `${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;

    //   console.log("getCurrentDate : ", dformat);
    //   return "GridWidget_" + dformat + ".csv";
    // }
    
    return(
      <a className="btn_black">
      <CSVLink headers={headers} data={lists} filename="list.csv" style={{color:"white"}}>CSV 다운로드</CSVLink> 
      </a>
    );

};
export default Csv;