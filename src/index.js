import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ProjectListing from './components/ProjectListing.jsx';
import ProjectDetail from './components/ProjectDetail.jsx';
import EmployeeListing from './components/EmployeeListing.jsx';
import EmployeeDetail from './components/EmployeeDetail.jsx';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'


const routing = (
  <Router>
    <div>
      <Route path="/projects/" exact component={ProjectListing} />
      <Route exact path="/project-detail/:projectId" component={ProjectDetail} />
      <Route exact path="/project-detail/" component={ProjectDetail} />
      <Route path="/employees/" exact component={EmployeeListing} />
      <Route exact path="/emp-detail/:empId" component={EmployeeDetail} />
      <Route exact path="/emp-detail/" component={EmployeeDetail} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
