import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch} from 'react-redux';
import { togglePopup, changeMessageCode, changeMessage } from '../../action/popup';
import { useHistory } from "react-router";
import { createLockList, deleteLockList } from "../../action/list";
import { detailApi, deleteApi, downloadApi,postAxiosFromApi } from "../../api/index";

const BoardRead = () => {
    // 참고: https://znznzn.tistory.com/64
    // seq 가 일단 있어야 detail.do 로 notice, fileList 의 데이터들을 가져올 수 있었음.
    const current = decodeURI(window.location.href);
    const search = current.split("?")[1];
    const params = new URLSearchParams(search);
    const seq = params.get('seq');

    const [details, setDetails] = useState([]);
    const [fileList, setFileList] = useState([]);
    const lockedList = useSelector(state => state.list.lockedList);

    const dispatch = useDispatch();

    var history = useHistory();
    
    useEffect(()=>{
        if(lockedList.includes(parseInt(seq))){
            let lockDetail = {"seq":seq,"viewYn":"잠금된 게시물","title":"잠금된 게시물","contents":"잠금된 게시물","fileId":null,"regId":"잠금된 게시물","regDt":"잠금된 게시물","modId":"잠금된 게시물","modDt":"잠금된 게시물"};
            setFileList([]);
            setDetails(lockDetail);
        }else{
            const url = detailApi + "?seq=" + seq;
            axios.get(url)
            .then(res=>{
                setDetails(res.data.RESULT_DATA.notice);
                setFileList(res.data.RESULT_DATA.fileList);
            })
            .catch(err => {
                console.log(err);
                dispatch(changeMessage("detail 에러 없는 번호입니다"));
                dispatch(changeMessageCode("0001"));
                dispatch(togglePopup(true));
            })
        }
    },[lockedList]);
    
    useEffect(()=>{
        //잠긴 게시물의 경우
        if(lockedList.includes(parseInt(seq))){
            let lockDetail = {"seq":seq,"viewYn":"잠금된 게시물","title":"잠금된 게시물","contents":"잠금된 게시물","fileId":null,"regId":"잠금된 게시물","regDt":"잠금된 게시물","modId":"잠금된 게시물","modDt":"잠금된 게시물"};
            setFileList([]);
            setDetails(lockDetail);
        }else{
            const url = detailApi + "?seq=" + seq;
            axios.get(url)
            .then(res=>{
                setDetails(res.data.RESULT_DATA.notice);
                setFileList(res.data.RESULT_DATA.fileList);
            })
            .catch(err => {
                console.log(err);
                dispatch(changeMessage("detail 에러 없는 번호입니다"));
                dispatch(changeMessageCode("0001"));
                dispatch(togglePopup(true));
            })
        }
    },[lockedList]);

    //글 작성시간 YYYY년 MM월 DD일 HH:mm:ss
    const format = (day) => {
        var formatDay =  day.substring(0,4) + "년 " + day.substring(4,6) + "월 " + day.substring(6,8) + "일 " + day.substring(8,10)+ ":" + day.substring(10,12) + ":" +day.substring(12,14);
        return formatDay
    }

    // S 삭제
    const delSuccessAxios = (res) =>{
        console.log(seq + "삭제 완료" );
        dispatch(changeMessage(seq+"번 삭제 완료"));
        dispatch(changeMessageCode("0000"));
    }

    const delFailAxios = (err) =>{
        console.log(err);
        dispatch(changeMessage(seq + "번 삭제 실패"));
        dispatch(changeMessageCode("0011"));
    }

    function onRemove(seq) {
        let formData = new FormData();
        formData.append("seq", seq);
        postAxiosFromApi(deleteApi,formData,delSuccessAxios,delFailAxios);
    };

    const clickHandler = () =>{
        if(window.confirm("삭제하시겠습니까?")){
            console.log("삭제");
            onRemove(details.seq);
            dispatch(togglePopup(true));
        }else{
            alert("취소했습니다.");
        }
    };

    // E 삭제

    //목록으로 가기
    const goList = () => {
        history.push("/");
    };
    //잠금
    const lockHandler = () =>{
        if(lockedList.includes(parseInt(seq))){
            dispatch(deleteLockList(parseInt(seq)));
        }else{
            dispatch(createLockList(parseInt(seq)));
        }
    };
    
    console.log(fileList);

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
                            <td>{format(details.regDt)}</td>
                        </tr>
                        <tr>
                            <th scope="row" style={{height: "100%"}}>첨부 이미지</th>
                            <td colSpan="3">
                                { !fileList.length ? "등록된 이미지가 없습니다." : 
                                fileList.map((fileList) => (
                                <div>
                                    <a href={downloadApi + '?saveFileName=' + fileList.saveFileName}>
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
                                <div style={{minHeight: "400px"}}>{details.contents}</div>
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
                    <a className="btn_gray" style={{cursor:"pointer"}} onClick={lockHandler}>
                        <span>{lockedList.includes(parseInt(seq))? "잠금해제" : "잠금"}</span>
                    </a>
                    
                </div>
            </form>
        </div>
    )
}

export default BoardRead;