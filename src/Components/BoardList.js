import React from 'react';
import Lists from './List';
import Pagination from './Pagination';
import Search from './Search';
import Footer from './Footer';
 
function BoardList() {
    return(
        <div id="content" style={{padding:50}}>
            <Search></Search>
            <Lists></Lists>
            <Footer></Footer>
            <Pagination></Pagination>
        </div>
    )
}
 
export default BoardList;