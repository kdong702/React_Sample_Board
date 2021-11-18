import React  from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BoardList from './components/BoardList';
import BoardNew from './components/BoardNew';
import BoardDetail from './components/BoardDetail';
import BoardUpdate from './components/BoardUpdate';
import Popup from './components/Popup';
import Error404 from './components/Error404';


function App () {

  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path='/BoardNew' component={BoardNew} />
            <Route path='/BoardDetail' component={BoardDetail} />
            <Route exact path='/BoardUpdate' component={BoardUpdate} />
            <Route exact path='/' component={BoardList} />
            <Route path='*' component={Error404} />
          </Switch>       
          <Popup></Popup>
      </Router>
      
    </div>
  )
}
 
export default App;
