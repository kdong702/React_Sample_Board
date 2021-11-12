import React from 'react';
import { Link } from 'react-router-dom';
 
import { useDispatch } from 'react-redux';
import { uriSave } from '../action/uri';
 
function ButtonWrite() {
    const dispatch = useDispatch();
 
    function onClick() {
        dispatch(uriSave('/BoardNew'))
    }
 
    return(
        <Link to='/BoardNew'>
            <a className="btn_white" onClick={onClick}>
                글쓰기
            </a>
        </Link>
    );
}
 
export default ButtonWrite;