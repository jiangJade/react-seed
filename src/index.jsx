import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Routers from './router/Routers';

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Routers />
    </ConfigProvider>
    , document.getElementById('app'));