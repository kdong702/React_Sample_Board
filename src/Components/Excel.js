import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch} from 'react-redux';
import axios from 'axios';
import xlsx from 'xlsx';
import {togglePopup,changeMessageCode,changeMessage} from '../action/popup';

const Excel = () =>{
  
    const searchType = useSelector(state => state.search.searchType);
    const searchKeyword = useSelector(state => state.search.searchKeyword);
    const pageNo = useSelector(state => state.pagination.pageNo);
    const totalCount = useSelector(state => state.list.totalCount);
    const dispatch = useDispatch();
    const [lists, setLists] = useState([]);
    const headers = ["아이디","노출여부", "제목","내용", "파일아이디",  "등록자", "등록일","수정자", "수정일"];
  
    useEffect(()=>{
        async function fetchDate(){
            const url = 'http://192.168.100.74:18080/homepage/api/notification/list.do?pageNo='+pageNo+'&pageSize='+totalCount+'&searchType='+searchType+'&searchKeyword='+searchKeyword;
            await axios.get(url)
            .then(res=>{
                setLists(res.data.RESULT_DATA.list);
            })
            .catch(err => {
                console.log(err);
                dispatch(changeMessage("Excel axios 에러"));
                dispatch(changeMessageCode("0001"));
                dispatch(togglePopup(true));
            });
        }
        fetchDate();
      },[searchType,searchKeyword,totalCount]);

    const clickHandler = () =>{
        var ws = xlsx.utils.json_to_sheet(lists);
        //headers 추가해주는 작업
        headers.forEach((x,idx)=>{
            const cellAdd = xlsx.utils.encode_cell({c:idx,r:0});
            ws[cellAdd].v = x;
        });
        // 엑셀 북 생성
        var wb = xlsx.utils.book_new();
        //엑셀 시트 이름 정해주기
        xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
        xlsx.writeFile(wb, "list.xlsx");
    }  
    
    return(
            <a className="btn_black" onClick={clickHandler} style={{cursor:"pointer"}}>
            엑셀 다운로드
            </a>
    );

};
export default Excel;