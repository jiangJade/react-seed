
import * as React from 'react';
import {
    HashRouter as Router,
    Link
} from 'react-router-dom'
import { Icon, Menu } from 'antd';
import "./home.scss";
// import Heads from "./header/Header";
import Page1 from './pages/Page1';

const SubMenu = Menu.SubMenu;

interface HandleIndex {
    key: string,
    keyPath: any[]
}

class Index extends React.Component {

    public state = {
        rootSubmenuKeys : ['sub1', 'sub2',"sub3", 'sub4','sub5','sub6','sub7','sub8'],
        openKeys: ['sub1'],
        openKeys01s: ['1']
    }
 
    // 环境变量
    public componentDidMount() {
        this.webRefresh();
    }

    // 导航点击
    public checNative = (index: HandleIndex) => {
        const opkeys = [index.key];
        this.setState({
            openKeys01s: opkeys
        });
        sessionStorage.setItem("InNative", JSON.stringify(index.keyPath[0]));
        sessionStorage.setItem("OutNative", JSON.stringify(index.keyPath[1]));
    };

    // 网页刷新
    public webRefresh = (): any => {
        const OutNative = sessionStorage.getItem("OutNative");
        const InNative = sessionStorage.getItem("InNative");
        if(OutNative === null || InNative===null) {
            return false;
        }
        this.setState({
            openKeys: [OutNative],
            openKeys01s: [InNative]
        })
    }

    public returnChangeKey = (key: any) => {
        return this.state.openKeys.indexOf(key) === -1;
    }
    
    public onOpenChange = (openKeys: string[]) => {
        const latestOpenKey: any = openKeys.find((key: any) => this.returnChangeKey(key));
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : []
            });
        }
    };

    public render() {
        return (
            <div className="home_div">
                {/* <Heads/> */}
                <Router>
                    { /* 系统导航 */ }
                    <div className="sys_navigation">
                        { /* 左侧导航部分 */ }
                        <div className="sys_navigatLeft" id="Glob_Leftnav">
                            <div className="sys_text_nav">
                                <Menu
                                    onClick={(index) => this.checNative(index)}
                                    // defaultSelectedKeys={["menu0001"]}
                                    // defaultOpenKeys={["sub1"]}
                                    openKeys={this.state.openKeys}
                                    selectedKeys = {this.state.openKeys01s}
                                    onOpenChange={this.onOpenChange}
                                    mode="inline"
                                    className="text_menu"
                                >
                                    <SubMenu key="sub4" title={<span><Icon type="cluster" /><span>设备监控</span></span>}>
                                        <Menu.Item key="11"><Link to='/'>隧道</Link></Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" title={<span><Icon type="alert" /><span>交通监控</span></span>}>
                                        <Menu.Item key="4"><Link to='/home/EventHandle'>事件处置管理</Link></Menu.Item>
                                        <Menu.Item key="5"><Link to='/home/EventTypes'>事件源管理</Link></Menu.Item>
                                        <Menu.Item key="6"><Link to='/home/EventPlane'>处置方案管理</Link></Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub3" title={<span><Icon type="file-done" /><span>养护管理</span></span>}>
                                        <Menu.Item key="7"><Link to='/home/CuringCalendar'>养护日历</Link></Menu.Item>
                                        <Menu.Item key="8"><Link to='/home/CuringReportForm'>养护报表</Link></Menu.Item>
                                        <Menu.Item key="10"><Link to='/home/DiseaseCollect'>病害汇总</Link></Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </div>
                        </div>

                        { /* 右侧内容部分 */ }
                        <div className="sys_navigatRight" id="Glob_Rightnav">
                            {/* {this.props.children} */}
                            <Page1 />
                        </div>
                    </div>
                </Router>
            </div>
        )
    }

}

export default Index;