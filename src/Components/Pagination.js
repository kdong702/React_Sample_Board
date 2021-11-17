import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {changePageNo, changePageSize} from '../action/pagination';

const Pagination = () => {
    const pageNo = useSelector(state => state.pagination.pageNo);
    const pageSize = useSelector(state => state.pagination.pageSize);
    const blockSize =  useSelector(state => state.pagination.blockSize);
    const totalCount = useSelector(state => state.list.totalCount);
    const dispatch = useDispatch();
    
    const goPage = (pageNo) =>{
        dispatch(changePageNo(pageNo));
    };

    var pageNumbers = [];
    var firstPageNo = 1;
    var finalCount = parseInt((totalCount + (pageSize - 1)) / pageSize);
    var finalPage = finalCount !== 0 ? finalCount :1;
    var isNowFirst = pageNo === 1 ? true : false;
    var isNowFinal = pageNo === finalPage ? true : false;
    var startPage = Math.floor((pageNo-1)/blockSize) * blockSize + 1 ; //by 동현
    var endPage = startPage + blockSize - 1; // by 동현
    var prevPageNo = startPage - 1 ;
    var nextPageNo = endPage + 1 ;

   
    if (pageNo === 0){
        goPage(1);
    }    
    if (pageSize === 0){
     	dispatch(changePageSize(10));
    }     
    if (pageNo > finalPage){
        goPage(finalPage);
    }    
    if (pageNo < 0 || pageNo > finalPage){
        goPage(1);
    }
    if (endPage > finalPage) {
        endPage = finalPage;
    } 
    if(isNowFirst){
        prevPageNo = 1;
    }
    if(isNowFinal){
        nextPageNo = finalPage;
    }
    if(nextPageNo > finalPage){
        nextPageNo = finalPage;
    }
    if (totalCount === 0 ) {
        pageNumbers.push(1);
    }else{
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
    }
  

    return(
        <div className="paging">
            {startPage !== 1 ? <a  className="ico btn_page_frist" onClick={()=> goPage(firstPageNo)} style={{cursor:"pointer"}}><i>앞으로</i></a> : ""}
            {pageNo !== 1 ? <a  className="ico btn_page_prve" onClick={()=>goPage(prevPageNo)} style={{cursor:"pointer"}}><i>이전</i></a> : ""}
            <span className="page_num">
            {pageNumbers.map(number => (
              <a key={(number)}  onClick={() => goPage(number)} className={ number === pageNo ? "here" : "" }  id={number} style={{cursor:"pointer"}}>
                {number}
              </a>
            ))}
            </span>
            {pageNo !== finalPage ? <a  className="ico btn_page_next" onClick={()=> {goPage(nextPageNo);}} style={{cursor:"pointer"}}><i>다음</i></a> : ""}
            {endPage !== finalPage ? <a  className="ico btn_page_last" onClick={()=>goPage(finalPage)} style={{cursor:"pointer"}}><i>마지막</i></a> : ""}
        </div>
    );
};
export default Pagination;