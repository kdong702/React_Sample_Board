import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {togglePopup,changeMessageCode,changeMessage} from '../../action/popup';
import { useHistory } from 'react-router';
import { insertApi, postAxiosFromApi } from '../../api';
import Button from '../common/Button';

const BoardCreate = () => {
    const [title, setTitle] = useState(''); // 제목
    const [contents, setContents] = useState('');   // 내용
    const [files, setFiles] = useState(''); // 파일
    const [viewYn, setViewYn] = useState('Y');  // 노출 여부 
    //const [fileImage, setFileImage] = useState(""); // 파일 미리보기

    const dispatch = useDispatch();

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleContent = (e) => {
        setContents(e.target.value)
    }
    const handleSelect = (e) => {
        setViewYn(e.target.value);
    };
    const handleFilesChange = (e) => {
        setFiles(e.target.files);
        for(let i=0; i<files.length; i++){
        
        }
        console.log(e.target.files);
        // 파일 이미지 미리보기 우선 생략
        //setFileImage(URL.createObjectURL(e.target.files[0]));
        //console.log(URL.createObjectURL(e.target.files[0]));
    };

    // textarea 글자 수 체크
    function checkLength(e) {
        const maxLength = 1000;

        if(contents.length > maxLength){
            alert("글자 수는 " + maxLength + " 자를 초과할 수 없습니다.");
            e.target.value = contents.substr(0, maxLength);
            setContents(e.target.value);
        }
    }

    let history = useHistory();

    function onSave() {
        if(!title){
            alert("제목을 입력해 주세요.");
            return;
        }

        if(!contents){
            alert("내용을 입력해 주세요.");
            return;
        }

        // 폼은 Json 형태로 전송하는 것이 일반적이지만,
        // 파일은 Json 형태로 전송할 수 없어 파일 데이터를 포함하게 되면 formData 객체를 사용해야 한다.
        let formData = new FormData();

        formData.append("title", title);
        formData.append("contents", contents);
        formData.append("viewYn", viewYn);

        // 파일 여러 개 폼데이터에 append 하여 전송
        for (let i = 0; i < files.length; i++) {
            // key, value or key, value, fileName
            // 주의사항: key 의 값이 api 의 key 값과 같아야 한다. 
            formData.append("files", files[i]);
        }

        function succFunc() {
            alert("글이 정상적으로 등록되었습니다.");
            history.push("/");
        }

        function failFunc() {
            dispatch(changeMessage("글 등록 실패하였습니다."));
            dispatch(changeMessageCode("0001"));
            dispatch(togglePopup(true));    
        }

        postAxiosFromApi(insertApi, formData, succFunc, failFunc);
    }

    function onCancle() {
        if(window.confirm("글 작성을 취소하시겠습니까?")) {
            history.push("/");
        }
        else {
            return;
        }
    }

    return(
        <div id="content" style={{padding:"50px", width: "50%"}}>
            <form>
                <table className="dtbl_row">
                    <colgroup>
                        <col style={{width: "11%"}}/>
                        <col style={{width: "39%"}}/>
                        <col style={{width: "11%"}}/>
                        <col style={{width: "39%"}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">제목</th>
                        <td><input type='text' id="title" name="title" title="제목" 
                        style={{width: "100%"}} maxLength="20" onChange={handleTitle} /></td>
                        <th scope="row">노출 여부</th>
                        <td>
                            <select name="viewYn" style={{width: "62px"}} className="ui_sel" onChange={handleSelect}>
                                <option value="Y">노출</option>
                                <option value="N">숨김</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">첨부이미지</th>
                        <td colSpan='3'>
                            <input multiple type="file" id="files" onChange={handleFilesChange} accept="image/*"/>
                            <div id="showFile"/>
                            {/* <img alt="" src={fileImage} style={{width: "100%"}}/> */}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <br/>
                <div style={{marginBottom: "20px"}}>
                    <textarea id="contents" title="내용" style={{height:"400px", width: "100%"}} onKeyUp={(e)=>{checkLength(e)}}
                    onChange={handleContent}/>
                </div>
                <div className="btn_group">
                    <Button title="전송" cName="btn_pos" event = {onSave}/>
                    <Button title="취소" cName="btn_black" event = {onCancle}/>
                </div>
        </form>
    </div>
    )
}
 
export default BoardCreate;