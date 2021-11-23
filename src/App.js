import React  from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BoardList from './components/board/boardList';
import BoardCreate from './components/board/BoardCreate';
import BoardRead from './components/board/BoardRead';
import BoardUpdate from './components/board/BoardUpdate';
import Popup from './components/common/Popup';
import Error from './components/common/Error';


function App () {

  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path='/BoardNew' component={BoardCreate} />
            <Route path='/BoardRead' component={BoardRead} />
            <Route exact path='/BoardUpdate' component={BoardUpdate} />
            <Route exact path='/' component={BoardList} />
            <Route path='*' component={Error} />
          </Switch>       
          <Popup></Popup>
      </Router>
      
    </div>
  )
}
 
export default App;
