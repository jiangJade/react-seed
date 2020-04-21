// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
import './styles/main.scss';
import './styles/common.scss';
import './styles/btn.scss';
import './styles/reset.scss';
import 'antd/dist/antd.min.css';
// require('./styles/main.scss');
// require('./styles/common.scss');
// require('./styles/btn.scss');
// require('./styles/reset.scss');
// require('antd/dist/antd.min.css');
import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import Routers from './router/Router';
import zhCN from 'antd/lib/locale-provider/zh_CN';

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Routers />
    </ConfigProvider>, document.getElementById('app')
);