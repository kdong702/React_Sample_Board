import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
import BoardList from './Components/BoardList';
import BoardNew from './Components/BoardNew';
import Footer from './Components/Footer';

/* S DH 추가 */

import {useState,useEffect} from 'react';
import axios from 'axios';
import Lists from './Components/List';
import Pagination from './Components/Pagination'
import Search from './Components/Search';
import { useSelector, useDispatch } from 'react-redux';
import {changePageNo, changePageSize} from './Modules/pagination';
import {changeSearchType,changeSearchKeyword} from './Modules/search';
import {changeTotalCount} from './Modules/list';

/* E DH 추가 */


 
function App () {


  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path='/' element={<BoardList/>} />
            <Route exact path='/BoardNew' element={<BoardNew/>} />
          </Routes>
          
      </Router>
    </div>
  )
}
 
export default App;
