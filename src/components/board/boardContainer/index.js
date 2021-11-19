import React from 'react';
import BoardList from './BoardList';
import Pagination from '../../common/Pagination';
import BoardSearch from './BoardSearch';
import BoardBtn from './BoardBtn';
import BoardTop from './BoardTop';

function index() {
    return(
        <div id="content" style={{padding:50}}>
            <BoardSearch/>
            <BoardTop/>
            <BoardList/>
            <BoardBtn/>
            <Pagination/>
        </div>
    )
}
 
export default index;