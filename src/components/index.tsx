
import * as React from 'react';
import {
    HashRouter as Router,
    Link
} from 'react-router-dom'
import {  Icon,Menu  } from 'antd';
import "./home.scss";
// import Heads from "./header/Header";

const SubMenu = Menu.SubMenu;

interface IState {
    rootSubmenuKeys: any[],
    openKeys: string[],
    openKeys01s: any[]
}

interface handleIndex {
    key: string,
    keyPath: any[]
}

interface initOpentChange {
    openKeys: string[],
    find: (key: string) => string
}

class Homepage extends React.Component<IState> {

    public state: IState = {
        rootSubmenuKeys : ['sub1', 'sub2',"sub3", 'sub4','sub5','sub6','sub7','sub8'],
        openKeys: ['sub1'],
        openKeys01s: ['1']
    }
    // constructor(props) {
    //     super(props);
    //     this.state = {
           
    //     }
    // }
    public componentDidMount() {
        //环境变量
        this.webRefresh();
    }

    // emitter事件跳转更新menu
    public handleCall = (v: IState) => {
        this.setState({
            openKeys01s: v.openKeys01s,
            openKeys: v.openKeys
        });
    };

    //导航点击
    public checNative = (index: handleIndex) => {
        let opkeys = [index.key];
        this.setState({
            openKeys01s: opkeys,
        });
        sessionStorage.setItem("InNative", JSON.stringify(index.keyPath[0]));
        sessionStorage.setItem("OutNative", JSON.stringify(index.keyPath[1]));
    };

    //网页刷新
    public webRefresh = () => {
        let OutNative = sessionStorage.getItem("OutNative");
        let InNative = sessionStorage.getItem("InNative");
        if(OutNative === null || InNative===null){
            return false;
        }
        this.setState({
            openKeys:[OutNative],
            openKeys01s:[InNative]
        })
    }

    public returnChangeKey = (key: string) => {
        return this.state.openKeys.indexOf(key) === -1;
    }
    
    public onOpenChange = (openKeys: initOpentChange) => {
        const latestOpenKey = openKeys.find((key: string) => this.returnChangeKey(key));
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
                    {/* 系统导航 */}
                    <div className="sys_navigation">
                        {/* 左侧导航部分 */}
                        <div className="sys_navigatLeft" id="Glob_Leftnav">
                            <div className="sys_text_nav">
                                <Menu
                                    onClick={this.checNative.bind(this)}
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
                                        <Menu.Item key="5"><Link to='/home/EventTypes' replace>事件源管理</Link></Menu.Item>
                                        <Menu.Item key="6"><Link to='/home/EventPlane' replace>处置方案管理</Link></Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub3" title={<span><Icon type="file-done" /><span>养护管理</span></span>}>
                                        <Menu.Item key="7"><Link to='/home/CuringCalendar' replace>养护日历</Link></Menu.Item>
                                        <Menu.Item key="8"><Link to='/home/CuringReportForm' replace>养护报表</Link></Menu.Item>
                                        <Menu.Item key="10"><Link to='/home/DiseaseCollect' replace>病害汇总</Link></Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </div>
                        </div>

                        {/* 右侧内容部分 */}
                        <div className="sys_navigatRight" id="Glob_Rightnav">
                            {this.props.children}
                        </div>
                    </div>
                </Router>
            </div>
        )
    }

}

export default Homepage;