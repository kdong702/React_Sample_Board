import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardList from './components/BoardList';
import BoardNew from './components/BoardNew';

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
