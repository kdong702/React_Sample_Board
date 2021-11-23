import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {togglePopup,changeSeq} from '../../action/popup';
import {useHistory,useLocation} from 'react-router-dom';


const Popup = () =>{
    const popupStatus = useSelector(state => state.popup.popupStatus);
    const message = useSelector(state => state.popup.message);
    const messageCode = useSelector(state=>state.popup.messageCode);
    const seq = useSelector(state=>state.popup.seq);
    const dispatch = useDispatch();

    //모달창 닫고 Store 내용 가지고 페이지 이동을 위해 
    var history = useHistory();
    var location = useLocation();
    var pathName = location.pathname;
    
    const closeHandler = () =>{
        dispatch(togglePopup(false));
        if(pathName === "/" && messageCode==="1000"){ //리스트 에러 발생시
            window.location.href="/NoList";
            console.log("path / code1000");
        }else if(pathName === "/"){ //리스트에서 목록 삭제시
            history.push("/")
            console.log("path / action push");
        }else if(pathName === "/BoardRead"){ // 디테일에서 글 삭제시 
            history.push("/");
            console.log("Popup.js / closeHandler() / path: BoardRead");
        }else if(pathName === "/BoardCreate"){ // 새로 글 등록시
            history.push("/");
            console.log("Popup.js / closeHandler() / path: BoardCreate");
        }else if(pathName === "/BoardUpdate"){ //업데이트 성공 실패시
            history.push("/BoardRead?seq=" + seq);
            dispatch(changeSeq(0));
        }else {
            history.push("/");
            console.log("popup else");
        }
    }
    
   

    
    return(
        <div className="modalPopup" style={popupStatus ? {display:"block"} : {display:"none" ,color:"black"}}>
            <div className="dimmed" onClick={closeHandler} ></div>
            <div className="user_layout popup_layer" style={{width:"500px"}}>
                <div className="pop_container">
                    <h1 className="pop_title">{messageCode === "0000" ? "성공": "실패"}</h1> 
                    <div className="pop_contents">
                    <h2>{message}</h2>
                        <div className="btn_group">
                            <a className="btn_gray" onClick={closeHandler} ><span>닫기</span></a>
                        </div>
                    </div>
                    <a className="btn_pop_close" onClick={closeHandler}>닫기</a>
                </div>
            </div>
        </div>
        
    );
};
export default Popup;