import React from 'react';
import BoardContents from './BoardContents';
import Pagination from '../../common/Pagination';
import BoardSearch from './BoardSearch';
import BoardBtn from './BoardBtn';
import BoardTop from './BoardTop';

function index() {
    return(
        <div id="content" style={{padding:50}}>
            <BoardSearch/>
            <BoardTop/>
            <BoardContents/>
            <BoardBtn/>
            <Pagination/>
        </div>
    )
}
 
export default index;