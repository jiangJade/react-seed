import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd';
import Routers from './router/Routers';
import zhCN from 'antd/lib/locale-provider/zh_CN';

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Routers />
    </ConfigProvider>, document.getElementById('app') as HTMLElement
);