import React, {Suspense, lazy} from 'react';
// import { checkLogin } from '@src/utils/hook';
import { Icon } from 'antd';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// const Logins = lazy(() => import('./Login/index.js'));
// const Layout = lazy(() => import('./components/layout/Layout'));

const Home = lazy(() => import('../components/pages/home/Home'));
const Page1 = lazy(() => import('../components/pages/Page1'));

function Routers() {
    return (
        <Router>
            <div className="App">
                <Suspense fallback={<div><Icon type="sync" spin />请稍等...</div>}>
                    {/* <Route exact path="/" component={Logins} /> */}
                    {/* <Route path="/equipmentCctv" render={props => checkLogin(EquipmentCctv, props, 120002)} /> */}
                    <Route exact path="/" render={ () => <Home />} />
                    <Route path="/page1" render={ () => <Page1 />} />
                </Suspense>
            </div>
        </Router>
    );
}

export default Routers;