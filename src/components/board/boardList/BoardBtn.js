import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import xlsx from 'xlsx';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { listApi,getAxiosFromApi,deleteApi,postAxiosFromApi } from '../../../api';
import Button from '../../common/Button';
import {togglePopup,changeMessageCode,changeMessage} from '../../../action/popup';
import { resetCheckBox } from '../../../action/list';
 
const BoardBtn = () => {
	// store 의 상태가 바뀔 때마다 상태를 받아온다.
    const checkedList = useSelector(state => state.list.checkedList);
    const dispatch = useDispatch();
    const searchType = useSelector(state => state.search.searchType);
    const searchKeyword = useSelector(state => state.search.searchKeyword);
    const pageNo = useSelector(state => state.pagination.pageNo);
    const totalCount = useSelector(state => state.list.totalCount);
    const [lists, setLists] = useState([]);
    // excel 헤더 부분
    const excelheaders = ["아이디","노출여부", "제목","내용", "파일아이디",  "등록자", "등록일","수정자", "수정일"];
    // csv 아이디 추가 하고 싶다면 {label: "아이디", key: "seq"}, 추가한다
    const csvHeaders = [
        {label: "노출여부", key: "viewYn"},
        {label: "제목", key: "title"},
        {label: "내용", key: "contents"},
        {label: "파일아이디", key: "fileId"},
        {label: "등록자", key: "regId"},
        {label: "등록일", key: "regDt"},
        {label: "수정자", key: "modId"},
        {label: "수정일", key: "modDt"},
    ];
    
    var count = 0;
    //없는 번호 지울때 성공이지만,RESULT_CODE 9999로 빠진다
    const delSuccessAxios = (res) =>{
        count++;
        if(count === checkedList.length){
            dispatch(changeMessage(checkedList.length+"건 삭제 완료"));
            dispatch(changeMessageCode("0000"));
            dispatch(togglePopup(true));
        }
    }
    const delFailAxios = (err) =>{
        console.log(err);
        dispatch(changeMessage("삭제 axios 오류!"));
        dispatch(changeMessageCode("0001"));
        dispatch(togglePopup(true));
    }
    
    //S 삭제 버튼 기능
    async function onRemove(list) {
        for (let i = 0; i < list.length; i++) {
            let formData = new FormData();
            formData.append("seq", list[i]);
            await postAxiosFromApi(deleteApi,formData,delSuccessAxios,delFailAxios);
        };
        dispatch(resetCheckBox());
    }

    //삭제 버튼 클릭시
    const delEvent = () =>{
        if(window.confirm(checkedList.length + "건 삭제하시겠습니까?")){
            console.log(checkedList.length);
            if(checkedList.length === 0 ){
                alert("선택된 리스트 없습니다.");
            }else{
                onRemove(checkedList);
            }
            console.log("삭제");
        }else{
            alert("취소하였습니다.");
        }
    }

    //E 삭제 버튼 기능

    //S excel, csv 리스트 가져오는 작업
    const listSuccessAxios = (res) =>{
        setLists(res.data.RESULT_DATA.list);
    }
    
    const listFailAxios = (err) =>{
        console.log(err);
        dispatch(changeMessage("Excel Csv axios 에러"));
        dispatch(changeMessageCode("0001"));
        dispatch(togglePopup(true));
    }
    useEffect(()=>{
        const params = {
            pageNo:pageNo,
            pageSize:totalCount,
            searchType:searchType,
            searchKeyword:searchKeyword
        }
        async function fetchDate(){
            await getAxiosFromApi(listApi,params,listSuccessAxios,listFailAxios);
        }
        fetchDate();
    },[searchType,searchKeyword,totalCount,checkedList]);
      
    //선택한 리스트 출력 바꾸고 싶다면 csvLink data ={lists}로 수정
    var selectedList = [];
    selectedList = lists.filter(list => checkedList.includes(list.seq));

    //  임의의 데이터 삭제후 출력하고 싶을때
    for (let index = 0; index < selectedList.length; index++) {
        delete selectedList[index].seq;
    }

    // 엑셀 만드는 작업
    const excelEvent = () =>{
        var ws = xlsx.utils.json_to_sheet(lists);
        //headers 추가해주는 작업
        excelheaders.forEach((x,idx)=>{
            const cellAdd = xlsx.utils.encode_cell({c:idx,r:0});
            ws[cellAdd].v = x;
            // 엑셀에 숨기고 싶은 정보 있을 경우 (아이디 없애는 작업)
             ws['!cols'] = [];
             ws['!cols'][0] = { hidden: true };
        });
        // 엑셀 북 생성
        var wb = xlsx.utils.book_new();
        //엑셀 시트 이름 정해주기
        xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
        xlsx.writeFile(wb, "list.xlsx");
    }  
    // E excel csv 만드는 작업
   
    return(
        <div className="btn_group">
            <div className="fr">
                <Link to='/BoardNew'>
                    <Button title="글쓰기" cName="btn_white"/>
                </Link>
                {checkedList.length !== 0 ? <Button title="선택 삭제" cName="btn_white" event= {delEvent}/> : null}
                <Button title="엑셀 다운로드" cName="btn_black" event = {excelEvent}/>
                {checkedList.length !== 0 ?
                <CSVLink headers={csvHeaders} data={selectedList} filename="list.csv" style={{color:"white"}}>
                    <Button title="선택영역 CSV" cName="btn_black"/>
                </CSVLink> : null }
            </div>
        </div>

    );
}
 
export default BoardBtn;