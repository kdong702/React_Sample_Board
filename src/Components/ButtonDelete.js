import React from 'react';
import axios from 'axios';
import { useSelector,useDispatch} from 'react-redux';
import {togglePopup,changeMessageCode,changeMessage} from '../action/popup';
import { resetCheckBox } from '../action/list';

const ButtonDelete = () =>{
    const checkedList = useSelector(state => state.list.checkedList);
    const dispatch = useDispatch();
    console.log(checkedList);

    async function onRemove(list) {
        let count = 0;
        let msg = '';
        let code = 0;
        for (let i = 0; i < list.length; i++) {
            await axios.post("http://192.168.100.74:18080/homepage/api/notification/delete.do?seq="+ list[i])
            .then(res=>{
                console.log(res);
                //없는 번호 지울때 성공이지만,RESULT_CODE 9999로 빠진다
                code += parseInt(res.data.RESULT_CODE);
                if(res.data.RESULT_CODE !=="0000"){
                    msg += list[i]+"번  ";
                }
                console.log(list[i] + "삭제 완료" );
                count++;
            })
            .catch(err => {
                msg += list[i]+"번  ";
                console.log(err);
            });
             
        };
        if(count === list.length && code === 0){
            dispatch(changeMessage(list.length+"건 삭제 완료"));
            dispatch(changeMessageCode("0000"));
            dispatch(togglePopup(true));
        }else{
            dispatch(changeMessage(msg+"삭제 이미 되었다 axios 오류!"));
            dispatch(changeMessageCode("0001"));
            dispatch(togglePopup(true));
        }
        dispatch(resetCheckBox());
    }

    const clickHandler = () =>{
        if(window.confirm(checkedList.length + "건 삭제하시겠습니까?")){
            console.log(checkedList.length);
            if(checkedList.length === 0 ){
                alert("선택된 리스트 없습니다.");
            }else{
                onRemove(checkedList);
            }
            console.log("삭제");
            
        }else{
            console.log("취소");
        }
    }

    return(
        <a className="btn_white" style={{cursor:'pointer'}} onClick={clickHandler}>선택 삭제 </a>
    );
}
export default ButtonDelete;