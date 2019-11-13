import * as React from 'react';
// import Header from '../header/Header';
import './index.scss';
// import { getSession } from '../../utils/storage';
interface ISProps {
    children: any
}

class Layout extends React.Component<ISProps> {

    public render() {
        // let headerName = getSession('headerName');
        return (
            <div className="layout">
                <div className="bgColor">
                    {/* <Header header={headerName} /> */}
                </div>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )
    };
}
export default Layout;