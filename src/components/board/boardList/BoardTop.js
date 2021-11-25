import React,{ useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {changePageSize} from '../../../action/pagination';
import {changeEndDay,changeStartDay} from '../../../action/search';
import Button from "../../common/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css" ;
import {ko} from "date-fns/esm/locale"

const BoardTop = () =>{
    const totalCount = useSelector(state => state.list.totalCount);
    const pageSize = useSelector(state => state.pagination.pageSize);
    const checkedList = useSelector(state => state.list.checkedList);
    const [startDate,setStartDate] = useState(new Date());
    const [endDate,setEndDate] = useState(new Date());
    const dispatch = useDispatch();

    var today = new Date();
    
    function pad(n) { 
        return n<10 ? "0"+n :""+n; 
    } 

    const makeDate = (day,isStart) => {
        var date ="";
        if(isStart === 0 ){
            date = day.getFullYear() + pad(day.getMonth()+1) + pad(day.getDate()) + "000000" ; 
        }else{
            date = day.getFullYear() + pad(day.getMonth()+1) + pad(day.getDate()) + "999999" ;
        }
        var dateNum = parseInt(date);
        return dateNum
    }
    //페이지 사이즈 변경
    const changeHandler = (e) => {
        dispatch(changePageSize(e.target.value));
    }
    //전체기간 조회
    const entireHandler = ()=>{
        var year_1 =  makeDate(new Date(new Date().setFullYear(today.getFullYear()-1)),0);
        var now =  makeDate(new Date(),1);
        dispatch(changeStartDay(year_1));
        dispatch(changeEndDay(now));
    }
    //최근 1일 조회
    const recent1Handler = () =>{
        var day_1 = makeDate(new Date(new Date().setDate(today.getDate()-1)),0);
        var now = makeDate(new Date(),1);
        dispatch(changeStartDay(day_1));
        dispatch(changeEndDay(now));
    }
    //최근 7일 조회
    const recent7Handler = () =>{
        var day_7 = makeDate(new Date(new Date().setDate(today.getDate()-7)),0);
        var now = makeDate(new Date(),1);
        dispatch(changeStartDay(day_7));
        dispatch(changeEndDay(now));
    }
    // 시작날짜 바뀔때
    const StartChangeHandler = (e) =>{
        setStartDate((e));
    }
    // 완료날짜 바뀔때
    const EndChangeHandler = (e) =>{
        setEndDate(e);
    }
    // 조회버튼 클릭시
    const submitHandler = () =>{
        dispatch(changeStartDay(makeDate(startDate,0)));
        dispatch(changeEndDay(makeDate(endDate,1)));
    }
    return(
        <div className="desc_box mgt_25" style={{paddingBottom:"10px"}}>
	        <div className="fl">
		        <span className="tresult "><em>{totalCount}</em>개의 게시글이 검색되었습니다.</span><br></br>
                <span className="tresult "><em>{checkedList.length}</em>개 선택되었습니다.</span>
	        </div>
            <div className="fl" style={{position:"relative", top:"30px",left:"20px"}} >
                <Button title="전체" cName="btn_white" event={entireHandler}/>
            </div>
            <div className="fl" style={{position:"relative", top:"30px",left:"20px"}} >
                <Button title="최근 1일" cName="btn_white" event={recent1Handler}/>
            </div>
            <div className="fl" style={{position:"relative", top:"30px",left:"20px"}}>
                <Button title="최근 7일" cName="btn_white" event={recent7Handler} />
            </div>
            <div className="fl" style={{position:"relative", top:"30px",left:"20px"}}>
                <DatePicker selected={startDate} onChange={StartChangeHandler} locale={ko} dateFormat="yyyy년 MM월 dd일" />
            </div>
            <div className="fl" style={{position:"relative", top:"30px",left:"20px"}}>_</div>
            <div className="fl" style={{position:"relative", top:"30px",left:"20px"}}>
                <DatePicker selected={endDate} onChange={EndChangeHandler} locale={ko} dateFormat="yyyy년 MM월 dd일" minDate={startDate}/>
            </div>
            <div className="fl" style={{position:"relative", top:"30px",left:"20px"}}>
                <Button title="조회" cName="btn_white" event={submitHandler}/>
            </div>
	        <div className="fr" style={{position:"relative", top:"30px"}}>
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