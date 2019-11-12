
// export default Loading
import * as React from 'react';
import { Spin } from 'antd';

const Loading = () => (
    <div className="spin">
        <Spin size="large" />
    </div>
);

export default Loading;
