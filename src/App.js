import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardList from './components/BoardList';
import BoardNew from './components/BoardNew';
import BoardDetail from './components/BoardDetail';
import BoardUpdate from './components/BoardUpdate';

function App () {

  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path='/' element={<BoardList/>} />
            <Route exact path='/BoardNew' element={<BoardNew/>} />
            <Route exact path='/BoardDetail' element={<BoardDetail/>} />
            <Route exact path='/BoardUpdate' element={<BoardUpdate/>} />
          </Routes>       
      </Router>
    </div>
  )
}
 
export default App;
