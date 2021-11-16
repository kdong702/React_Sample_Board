import React from 'react';
import axios from 'axios';
import { useSelector} from 'react-redux';

const ButtonDelete = () =>{

    const checkedList = useSelector(state => state.list.checkedList);
    console.log(checkedList);

    async function onRemove(list) {
        for (let i = 0; i < list.length; i++) {
            try{
                await axios.post("http://192.168.100.74:18080/homepage/api/notification/delete.do?seq="+ list[i])
                .then(res=>{
                    console.log(list[i] + "삭제 완료" );
                })
                .catch(err => {
                    console.log(err);
                });
            } catch(error){
                console.log(error);
            }
        };
        window.location.href="/";
    }

    const clickHandler = () =>{
         
        if(window.confirm(checkedList.length + "선택한 거 삭제할꺼?")){
            console.log(checkedList.length);
            if(checkedList.length === 0 ){
                alert("선택된 것 없음");
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