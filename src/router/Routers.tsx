// import React, {Suspense, lazy} from 'react';
// // import { checkLogin } from '@src/utils/hook';
// import { Icon } from 'antd';
// import {BrowserRouter as Router, Route} from 'react-router-dom';

// // const Logins = lazy(() => import('./Login/index.js'));
// // const Layout = lazy(() => import('./components/layout/Layout'));

// const Home = lazy(() => import('../components/pages/home/Home'));
// const Page1 = lazy(() => import('../components/pages/Page1'));

// const Routers = () => {
//     return (
//         <Router>
//             <div className="App">
//                 <Suspense fallback={<div><Icon type="sync" spin />请稍等...</div>}>
//                     {/* <Route exact path="/" component={Logins} /> */}
//                     {/* <Route path="/equipmentCctv" render={props => checkLogin(EquipmentCctv, props, 120002)} /> */}
//                     <Route exact path="/" render={ () => <Home />} />
//                     <Route path="/page1" render={ () => <Page1 />} />
//                 </Suspense>
//             </div>
//         </Router>
//     );
// }

// export default Routers;
import * as React from 'react';
import * as Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import loading from './loading';
const RouterList: any[] = [
  {
    component: () => React.lazy(() => import('../components/pages/home/Home')),
    path: '/'
  },
  {
    component: () => React.lazy(() => import('../components/pages/Page1')),
    path: '/page1'
  }
]
const Routers = () => (
  <Router>
      <Switch>
        {RouterList.map(item => (
          <Route
            key={item.path}
            exact={true}
            path={item.path}
            component={Loadable({
              loader: item.component,
              loading
            })}
          />
        ))}
      </Switch>
  </Router>
)

export default Routers;