import {useHistory,useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';;

const Error404 = () =>{
    var history = useHistory();
    var location = useLocation();
    var pathName = location.pathname;
    
    const goHome = () =>{
       history.push("/");
    }

    return (
        <div id="loginWrap">
            <div id="wrap">
                <div id="content">
                    <div className="error_group">
                        <div className="error_inner">
                            <div className="error_body">
                                <em>Error Message</em> <span><br />{pathName !== "/NoList" ? "없는 주소입니다." : "리스트 오류"} </span>
                            </div>
                            <div className="btn_group">
                                {/* <a  className="btn_pig_pos">로그인으로 이동</a> */}
                                <a  className="btn_pig_pos" onClick={goHome} style={{cursor:"pointer"}}>돌아가기</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="footer">
                    <span className="copyright">Copyright ⓒ 2021 Lotson. All Rignts Reserved.</span>
                </div>
            </div>
        </div>
    );
}

export default Error404;