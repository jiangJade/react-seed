import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from '../components/common/loadable/Loadable';

const Login = Loadable(() => import('../components/login/Login'));
const Layout = Loadable(() => import('../components/common/layout/Layout'));
const Page = Loadable(() => import('../components/pages/Page'));
const Fragment = Loadable(() => import('../components/testHooksFlash/Fragment'));

const Routers = () => (
    <Router>
        <Switch>
            <Route exact path="/" render={ () => <Login /> } />
            <Route exact path="/page" render={ () => <Layout><Page /></Layout> } />
            <Route exact path="/fragment" render={ () => <Layout><Fragment /></Layout> } />
        </Switch>
    </Router>
);

export default Routers;