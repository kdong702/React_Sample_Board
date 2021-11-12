import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
import BoardList from './components/BoardList';
import BoardNew from './components/BoardNew';
import Footer from './components/Footer';

/* S DH 추가 */

import {useState,useEffect} from 'react';
import axios from 'axios';
import Lists from './components/List';
import Pagination from './components/Pagination'
import Search from './components/Search';
import { useSelector, useDispatch } from 'react-redux';
import {changePageNo, changePageSize} from './reducer/pagination';
import {changeSearchType,changeSearchKeyword} from './reducer/search';
import {changeTotalCount} from './reducer/list';

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
