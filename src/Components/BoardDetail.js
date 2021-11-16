import axios from "axios";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setFileImage } from "../action/board";

// function searchParam(key, {location}) {
//     return new URLSearchParams(location.search).get(key);
//   };

const BoardDetail = () => {
    // https://znznzn.tistory.com/64
    const current = decodeURI(window.location.href);
    const search = current.split("?")[1];
    const params = new URLSearchParams(search);
    const seq = params.get('seq');

    console.log(seq);

    const [details, setDetails] = useState([]);
    
    useEffect(()=>{
        async function showDetail(){
            const url = 'http://192.168.100.74:18080/homepage/api/notification/detail.do?seq=' + seq;
            //console.log(url);
            const response = await axios.get(url);
            //console.log(response.data.RESULT_DATA.notice);
            setDetails(response.data.RESULT_DATA.notice);
        }
        showDetail();
      },[]);

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
                                <img alt="" src=""  style={{width: "100%"}}/>
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
                    <Link to="/BoardUpdate">
                        <a href className="btn_pos">
                            <span>수정</span>
                        </a>
                    </Link>
                    <a href className="btn_gray">
                        <span>목록</span>
                    </a>
                    <Link to="">
                    <a href className="btn_black">
                        <span>삭제</span>
                    </a>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default BoardDetail;