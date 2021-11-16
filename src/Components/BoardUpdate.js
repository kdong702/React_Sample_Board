import { useState } from "react";

// 렌더링 되는 화면
function BoardUpdate() {
    const [title, setTitle] = useState(''); // 제목
    const [contents, setContents] = useState('');   // 내용
    const [files, setFiles] = useState(''); // 파일
    const [viewYn, setViewYn] = useState('Y');  // 노출 여부 
    const [fileImage, setFileImage] = useState(""); // 파일 미리보기
    
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
        setFileImage(URL.createObjectURL(e.target.files[0]));
        console.log(URL.createObjectURL(e.target.files[0]));
    };

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
                        <td><input type='text' id="title" name="title" title="제목" style={{width: "100%"}} onChange={handleTitle} /></td>
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
                            <input type="file" id="files" onChange={handleFilesChange} accept="image/*"/>
                            <img alt="" src={fileImage}  style={{width: "100%"}}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <br/>
                <div style={{marginBottom: "20px"}}>
                    <textarea id="contents" title="내용" style={{height:"400px", width: "100%"}} onChange={handleContent}/>
                </div>
                <div className="btn_group">
                    <a href="/" className="btn_pos" type='button' onClick="">전송</a>
                </div>
        </form>
    </div>
    )
};

export default BoardUpdate;