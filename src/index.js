import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './styles/main.scss';
import './styles/common.scss';
import './styles/btn.scss';
import './styles/reset.scss';
import React from 'react';
import 'antd/dist/antd.min.css';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import Router from './router/Router';
import zhCN from 'antd/lib/locale-provider/zh_CN';

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Router />
    </ConfigProvider>, document.getElementById('app')
);