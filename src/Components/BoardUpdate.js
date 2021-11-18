import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function BoardUpdate({location}) {
    // 초기값 
    const initialTitle = location.state.title;
    const initialContents = location.state.contents;
    const initialViewYn = location.state.viewYn;
    const initialFileList = location.state.fileList;

    // update시 필요. fileId 는 게시글마다 fix 된 상태이기 때문에 그대로 가지고 있어도 됨!
    const seq = location.state.seq;
    const fileId = location.state.fileId;

    // state 관리
    const [title, setTitle] = useState(initialTitle); // 제목
    const [contents, setContents] = useState(initialContents);   // 내용
    const [viewYn, setViewYn] = useState(initialViewYn);  // 노출 여부
    const [files, setFiles] = useState(''); // 파일 → 파일은 보안 정책상 초기값을 줄 수 없다고 하여 '' 로 초기화.
    //const [fileImage, setFileImage] = useState(""); // 파일 미리보기
    const [fileList, setFileList] = useState([initialFileList]); // 파일 리스트 
    
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
    const handleFilesChange = (e) => {
        setFiles(e.target.files);
        console.log(e.target.files);
        //setFileImage(URL.createObjectURL(e.target.files[0]));
        //console.log(URL.createObjectURL(e.target.files[0]));
    };

    console.log(fileList);

    let history = useHistory();
    
    // 업데이트 함수
    function onUpdate() {
        // 폼은 Json 형태로 전송하는 것이 일반적이지만,
        // 파일은 Json 형태로 전송할 수 없어 파일 데이터를 포함하게 되면 formData 객체를 사용해야 한다.
        let formData = new FormData();

        formData.append("title", title);
        formData.append("contents", contents);
        formData.append("viewYn", viewYn);
        formData.append("files", files[0]);
        //formData.append("fileId", fileId);
        //formData.append("fileSeqs", [1]);

        axios.post("http://192.168.100.74:18080/homepage/api/notification/update.do?seq=" + seq, formData, {
            headers: {
              'Content-Type': 'multipart/form-data' // 컨텐츠 타입이 이와 같이 설정되어야 파일 데이터가 넘어간다.
            }
          })
        .then(function(response) {
            alert("글이 정상적으로 수정되었습니다.");
            history.push("/");    
       }).catch(function (error) {
            alert("실패!");
            console.log(error)
       });
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
                        <td><input type='text' id="title" name="title" title="제목" style={{width: "100%"}} onChange={handleTitle} value={title}/></td>
                        <th scope="row">노출 여부</th>
                        <td>
                            <select name="viewYn" style={{width: "62px"}} className="ui_sel" onChange={handleSelect} defaultValue={initialViewYn}>
                                <option value="Y">노출</option>
                                <option value="N">숨김</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">첨부이미지</th>
                        <td colSpan='3'>
                            <input multiple type="file" id="files" onChange={handleFilesChange} accept="image/*"/>
                            {/* <img alt="" src={fileImage}  style={{width: "100%"}}/> */}
                            <div>
                            { !fileList.length ? "" : 
                                fileList[0].map((fileList) => (
                                <div>
                                    {fileList.originalFileName + ' '}
                                    <a style={{color:"red", cursor:"pointer"}} onclick="">X</a>
                                    <br/>
                                </div>
                                ))} 
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <br/>
                <div style={{marginBottom: "20px"}}>
                    <textarea id="contents" title="내용" style={{height:"400px", width: "100%"}} onChange={handleContent}>
                        {initialContents}
                    </textarea>
                </div>
                <div className="btn_group">
                    <a className="btn_pos" type='button' onClick={onUpdate}>전송</a>
                </div>
        </form>
    </div>
    )
};