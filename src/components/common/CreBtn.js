import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
 
function ButtonWrite() {
    const dispatch = useDispatch();
 
 
    return(
        <Link to='/BoardNew'>
            <a className="btn_white">
                글쓰기
            </a>
        </Link>
    );
}
 
export default ButtonWrite;