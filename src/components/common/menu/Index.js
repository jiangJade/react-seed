
import React from 'react';
import styles from './index.scss';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { CopyTwoTone } from '@ant-design/icons';

const SubMenu = Menu.SubMenu;

export default class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rootSubmenuKeys: ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8'],
            openKeys: ['sub1'],
            openKeys01s: ['1']
        };
    }

    componentDidMount(){
        // 环境变量
        this.control_Navheig();
        this.webRefresh();
    }

    // 动态控制导航高度
    control_Navheig(){
        // commons.setNversHeight(document.getElementById('Glob_Leftnav'));
        // commons.setNversHeight(document.getElementById('Glob_Rightnav'));
    }

    // 导航点击
    checNative = (index) => {
        let opkeys = [index.key];

        this.setState({
            openKeys01s: opkeys
        });
        sessionStorage.setItem('InNative', JSON.stringify(index.keyPath[0]));
        sessionStorage.setItem('OutNative', JSON.stringify(index.keyPath[1]));
    };

    // 网页刷新
    webRefresh = () => {
        let OutNative = sessionStorage.getItem('OutNative');
        let InNative = sessionStorage.getItem('InNative');
        if(OutNative === null || InNative === null){
            return false;
        }
        this.setState({
            openKeys: [OutNative],
            openKeys01s: [InNative]
        });
    };

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : []
            });
        }
    };

    render() {
        const menuData = [
            {data: [
                {key: '1', to: '/page', title: '事件处置管理'},
                {key: '5', to: '/home/eventTypes', title: '事件源管理'},
                {key: '6', to: '/home/eventPlane', title: '处置方案管理'}
            ], subMenuKey: 'sub1', title: '交通监控', icon: <CopyTwoTone />},
            {data: [
                {key: '7', to: '/home/curingCalendar', title: '养护日历'},
                {key: '8', to: '/home/curingReportForm', title: '养护报表'},
                {key: '10', to: '/home/diseaseCollect', title: '病害汇总'}
            ], subMenuKey: 'sub2', title: '养护管理', icon: <CopyTwoTone />}
        ];
        return (
            <div className={styles.layoutMenu}>
                <Menu
                    onClick={this.checNative.bind(this)}
                    openKeys={this.state.openKeys}
                    selectedKeys = {this.state.openKeys01s}
                    onOpenChange={this.onOpenChange}
                    mode="inline"
                    className="text_menu"
                >
                    {
                        menuData.map(item => (
                            <SubMenu key={item.subMenuKey} title={<span>{item.icon}<span>{item.title}</span></span>}>
                                {item.data.map(value => (
                                    <Menu.Item key={value.key}><Link to={value.to}>{value.title}</Link></Menu.Item>
                                ))}
                            </SubMenu>
                        ))
                    }
                </Menu>
            </div>
        );
    }
}