
// export default Loading
import { Spin } from 'antd';
import * as React from 'react';

const Loading = () => (
    <div className="spin">
        <Spin size="large" />
    </div>
);

export default Loading;
