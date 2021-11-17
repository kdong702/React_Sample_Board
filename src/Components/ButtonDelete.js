import React from 'react';
import axios from 'axios';
import { useSelector,useDispatch} from 'react-redux';
import {togglePopup,changeMessageCode,changeMessage} from '../action/popup';
import { deleteCheckBox,resetCheckBox } from '../action/list';

const ButtonDelete = () =>{
    const checkedList = useSelector(state => state.list.checkedList);
    const dispatch = useDispatch();
    console.log(checkedList);

    async function onRemove(list) {
        for (let i = 0; i < list.length; i++) {
            try{
                await axios.post("http://192.168.100.74:18080/homepage/api/notification/delete.do?seq="+ list[i])
                .then(res=>{
                    console.log(list[i] + "삭제 완료" );
                    dispatch(changeMessage(list.length+"건 삭제 완료"));
                    dispatch(changeMessageCode("0000"));
                })
                .catch(err => {
                    console.log(err);
                    dispatch(changeMessage("에러 발생 관리자에게 문의하세요22!!!!"));
                    dispatch(changeMessageCode("0011"));

                });
            } catch(error){
                console.log(error);
                dispatch(changeMessage("에러 발생 관리자에게 문의하세요"));
                dispatch(changeMessageCode("0010"));
            }
        };
        dispatch(resetCheckBox());
        // checkedList.forEach(element => {
        //     dispatch(deleteCheckBox(element));
        // }); 
    }

    const clickHandler = () =>{
         
        if(window.confirm(checkedList.length + "건 삭제하시겠습니까?")){
            console.log(checkedList.length);
            if(checkedList.length === 0 ){
                alert("선택된 리스트 없습니다.");
            }else{
                onRemove(checkedList);
                dispatch(togglePopup(true));
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