import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {togglePopup} from '../action/popup';
import {useHistory,useLocation} from 'react-router-dom'


const Popup = () =>{
    const popupStatus = useSelector(state => state.popup.popupStatus);
    const message = useSelector(state => state.popup.message);
    const messageCode = useSelector(state=>state.popup.messageCode);
    const dispatch = useDispatch();

    //모달창 닫고 Store 내용 가지고 페이지 이동을 위해 
    var history = useHistory();
    var pathName = useLocation().pathname;
    console.log(history);
    console.log(pathName);

    const closeHandler = () =>{
        dispatch(togglePopup(false));
        if(pathName === "/"){
            history.push("/");
            console.log("path / ");
        }else if(pathName ==="/BoardDetail"){
            history.push("/");
            console.log("Popup.js / closeHandler() / path: boardDetail");
        }
    }
    
   

    
    return(
        <div className="modalPopup" style={popupStatus ? {display:"block"} : {display:"none" ,color:"black"}}>
            <div className="dimmed" onClick={closeHandler} ></div>
            <div className="user_layout popup_layer" style={{width:"500px"}}>
                <div className="pop_container">
                    <h1 className="pop_title">{messageCode === "0000" ? "성공": "실패"}</h1> 
                    
                    <div className="pop_contents">
                        <h1>CODE:{messageCode}</h1>
                        <h1>{message}</h1>
                        
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