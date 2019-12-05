import React from 'react';
import styles from './index.scss';
import Menu from '../menu/Index';
import Header from '../header/Header';

class Layout extends React.Component {

    render() {
        return (
            <div className={styles.layout}>
                <Header />
                { /* 系统导航 */ }
                <div className={styles.sys_navigation}>
                    { /* 左侧导航部分 */ }
                    <div className={styles.sys_navigatLeft} id="Glob_Leftnav">
                        <Menu />
                    </div>
                    { /* 右侧内容部分 */ }
                    <div className={styles.sys_navigatRight} id="Glob_Rightnav">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
export default Layout;