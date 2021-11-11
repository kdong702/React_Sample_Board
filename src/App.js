import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
import BoardList from './Components/BoardList';
import BoardNew from './Components/BoardNew';
import Footer from './Components/Footer';
 
function App () {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<BoardList/>} />
            <Route exact path='/BoardNew' element={<BoardNew/>} />
          </Routes>
        </div>
        <div>
          <Footer />
        </div>
      </Router>
    </div>
  )
}
 
export default App;
