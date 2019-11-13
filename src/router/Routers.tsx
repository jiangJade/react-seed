import * as React from 'react';
import { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import loading from './loading';

const Layout = lazy(() => import('../components/common/layout/Layout'));
const Home = lazy(() => import('../components/pages/home/Home'));
const Page1 = lazy(() => import('../components/pages/Page1'));
const Index = lazy(() => import('../components/Index'));

const Routers = () => (
  <Router>
    <div className="App">
      <Suspense fallback={<Spin className="spin-loading-class" tip="Loading...">请稍后。。。</Spin>}>
        <Route path="/" render={ () => <Layout><Index /></Layout> } />
        <Route exact path="/home" render={ () => <Home /> } />
        <Route path="/page1" render={ () => <Page1 /> } />
      </Suspense>
    </div>
  </Router>
);

export default Routers;