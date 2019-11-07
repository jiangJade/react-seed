import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Home from '../components/pages/home/Home';
import Page1 from '../components/pages/Page1';
// import Bundle from './Bundle';
const Loading = function () {
    return <div>Loading...</div>
};

// const createComponent = (component) => (props) => (
//     <Bundle load={component}>
//         {
//             (Component) => Component ? <Component {...props} /> : <Loading/>
//         }
//     </Bundle>
// );

const getRouter = () => (
    <Router>
       <div>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/page1">Page1</Link></li>
            </ul>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/page1" component={Page1}/>
            </Switch>
        </div>
    </Router>
);

export default getRouter;