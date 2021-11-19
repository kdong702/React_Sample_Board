import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch} from 'react-redux';
import { togglePopup, changeMessageCode, changeMessage } from '../action/popup';
import { useHistory } from "react-router";

const BoardDetail = () => {
    // 참고: https://znznzn.tistory.com/64
    // seq 가 일단 있어야 detail.do 로 notice, fileList 의 데이터들을 가져올 수 있었음.
    const current = decodeURI(window.location.href);
    const search = current.split("?")[1];
    const params = new URLSearchParams(search);
    const seq = params.get('seq');

    const [details, setDetails] = useState([]);
    const [fileList, setFileList] = useState([]);

    const dispatch = useDispatch();

    var history = useHistory();

    useEffect(()=>{
        const url = 'http://192.168.100.74:18080/homepage/api/notification/detail.do?seq=' + seq;
        axios.get(url)
        .then(res=>{
            setFileList(res.data.RESULT_DATA.fileList);
            setDetails(res.data.RESULT_DATA.notice);
        })
        .catch(err => {
            console.log(err);
            dispatch(changeMessage("detail 에러 없는 번호입니다"));
            dispatch(changeMessageCode("0001"));
            dispatch(togglePopup(true));
        })
    },[]);

    console.log(fileList);

    function onRemove(seq) {
             axios.post("http://192.168.100.74:18080/homepage/api/notification/delete.do?seq="+ seq)
            .then(res=>{
                console.log(seq + "삭제 완료" );
                dispatch(changeMessage(seq+"번 삭제 완료"));
                dispatch(changeMessageCode("0000"));
            })
            .catch(err => {
                console.log(err);
                dispatch(changeMessage(seq + "번 삭제 실패"));
                dispatch(changeMessageCode("0011"));
            });
        ;
    }

    const clickHandler = () =>{
        if(window.confirm(details.seq + "번 삭제하시겠습니까?")){
            console.log(details.seq);
            onRemove(details.seq);
            dispatch(togglePopup(true));
            console.log("삭제");
        }else{
            //else 지워도 됨
            console.log("취소");
        }
    }

    //목록으로 가기
    const goList = () => {
        history.push("/");
    }

    return (
        <div id="content" style={{padding: "50px", width: "50%"}}>
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
                            <td>{details.title}</td>
                            <th scope="row">노출 여부</th>
                            <td>{details.viewYn}</td>
                        </tr>
                        <tr>
                        <th scope="row">작성자</th>
                            <td>{details.regId}</td>
                            <th scope="row">작성일</th>
                            <td>{details.regDt}</td>
                        </tr>
                        <tr>
                            <th scope="row" style={{height: "100%"}}>첨부 이미지</th>
                            <td colSpan="3">
                                { !fileList.length ? "등록된 이미지가 없습니다." : 
                                fileList.map((fileList) => (
                                <div>
                                    <a href={'http://192.168.100.74:18080/homepage/api/notification/download.do?saveFileName=' + fileList.saveFileName}>
                                        {fileList.originalFileName}
                                    </a>
                                    <img alt="" src=""  style={{width: "100%"}}/>
                                    <br/>
                                </div>
                                ))}    
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">내용</th>
                            <td colSpan="3">
                                <div style={{height: "400px"}}>{details.contents}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn_group">
                    <Link to={{
                        pathname: "/BoardUpdate",
                        state: {
                            viewYn: details.viewYn,
                            title: details.title,
                            contents: details.contents,
                            seq : seq,
                            fileId: details.fileId,
                            fileList: fileList
                        }
                    }}>
                        <a className="btn_pos">
                            <span>수정</span>
                        </a>
                    </Link>
                    <a className="btn_gray" style={{cursor:"pointer"}} onClick={goList}>
                        <span>목록</span>
                    </a>                    
                    <a className="btn_black" style={{cursor:"pointer"}} onClick={clickHandler}>
                        <span>삭제</span>
                    </a>
                    
                </div>
            </form>
        </div>
    )
}

export default BoardDetail;