import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
import axios from 'axios';

import dropZone from '../Css/dropZone.css';
 
function BoardNew() {
    let now = new Date();   // 현재 일자
    
    const [title, setTitle] = useState(''); // 제목
    const [contents, setContents] = useState('');   // 내용
    const [files, setFiles] = useState([]); // 파일
    const [viewYn, setViewYn] = useState('y');  // 노출 여부 
    
    // 값이 onChange 될 때마다 호출되어 setTitle, setContent 에 값을 넣어 제어한다.
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleContent = (e) => {
        setContents(e.target.value)
    }
    const handleSelect = (e) => {
        setViewYn(e.target.value);
    };

    // 파일 dnd 로직
    const onDrop = useCallback(acceptedFiles => {
        setFiles(files.concat(acceptedFiles));
    }, [files])

    const {getRootProps, getInputProps} = useDropzone({onDrop})

    // 폼 전송 로직
    function onSave() {
        // 폼은 Json 형태로 전송하는 것이 일반적이지만,
        // 파일은 Json 형태로 전송할 수 없어 파일 데이터를 포함하게 되면 formData 객체를 사용해야 한다.
        let formData = new FormData();

        formData.append("title", title);
        formData.append("contents", contents);
        formData.append("viewYn", viewYn);

        // formData.append("files", files[0]); → 단일 파일 전송
        for(let i=0; i<files.length; i++) {
            formData.append("files", files[i]);
        }   // → 복수 파일 전송

        axios.post("http://192.168.100.74:18080/homepage/api/notification/insert.do", formData, {
            headers: {
              'Content-Type': 'multipart/form-data' // 컨텐츠 타입이 이와 같이 설정되어야 파일 데이터가 넘어간다.
            }
          })
        .then(function (response) {
            // 성공
            console.log(response)  
       }).catch(function (error) {
            // 에러
            console.log(error)
       });

       // 폼 전송 후 기존 값으로 초기화
       setTitle('');
       setContents('');
       setViewYn('y');
       setFiles([]);
    }

    // dropZone ui 로직
    //------------------------------------------------------
    // const removeFile = file => () => {
    //     const newFiles = [...files];
    //     newFiles.splice(newFiles.indexOf(file), 1);
    //     setFiles(newFiles);
    // }
    
    // const removeAll = () => {
    //     setFiles([]);
    // }

    // const showFiles = files.map(file => (
    //     <li key={file.path}>
    //       {file.path} - {file.size} bytes{" "}
    //       <button onClick={removeFile(file)}>X</button>
    //     </li>
    //   ))
    //------------------------------------------------------

    // 렌더링 되는 화면
    return(
        <div className="container">
            <h2>공지사항 작성</h2>
            <hr/>
            <div>
                <table className="insertTable">
                    <tbody>
                    <tr>
                        <td>제목</td>
                        <td colSpan='4'><input type='text' className='inputTitle' onChange={handleTitle} value={title} /></td>
                        <td>상단에 노출<input type='checkbox'/></td>
                    </tr>
                    <tr>
                        <td>작성자</td>
                        <td colSpan='2'>라츠온</td>
                        <td>작성일</td>
                        <td colSpan='2'>{ now.getFullYear() }년 { now.getMonth()+1 }월 { now.getDate() }일</td>
                    </tr>
                    <tr>
                        <td>노출 레벨</td>
                        <td colSpan='2'><input type='text' className='inputLevel' /></td>
                        <td>노출 여부</td>
                        <td colpsan='3'>
                            <select name="viewYn" onChange={handleSelect} size="1">
                                <option value="y">노출</option>
                                <option value="n">숨김</option>
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <br/>
                <div>
                    <textarea className='inputContent' onChange={handleContent} value={contents}/>
                </div>
                <div className="dropZone" {...getRootProps()}>
                    <input {...getInputProps()} />
                </div>
                {/* ---------------------------------------------------------------------- */}
                {/* <aside>
                    <h4>Files</h4>
                    <ul>{files}</ul>
                </aside>
                {files.length > 0 && <button onClick={removeAll}>Remove All</button>} */}
                {/* ---------------------------------------------------------------------- */}
                <br/>
            <button type='button' onClick={onSave}>전송</button>
        </div>
    </div>
    )
}
 
export default BoardNew;