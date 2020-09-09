// 首页header
import React from 'react';
import { Menu } from 'antd';
import { EditFilled, InfoCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import styles from './header.scss';
import dayJs from 'dayjs';
import { getSession, remove } from '@/utils/storage';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            times: 1,
            menu: (
                <Menu className={styles.userncek}>
                    {/* <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={()=>{this.getVersion()}}><img className="head_img_os" src="./img/lj2940.png" />&nbsp;&nbsp;&nbsp;版本更新</a>
                    </Menu.Item> */}
                    <Menu.Item >
                        <span target="_blank" rel="noopener noreferrer">
                            <EditFilled />&nbsp;&nbsp;&nbsp;密码修改
                        </span>
                    </Menu.Item>
                    <Menu.Item >
                        <span target="_blank" rel="noopener noreferrer">
                            <InfoCircleOutlined />&nbsp;&nbsp;&nbsp;关于系统
                        </span>
                    </Menu.Item>
                    <Menu.Item >
                        <span target="_blank" rel="noopener noreferrer" onClick={()=> this.Exit() }>
                            <LogoutOutlined />&nbsp;&nbsp;&nbsp;退出登录
                        </span>
                    </Menu.Item>
                </Menu>
            ),
            weeks: {
                1: '星期一',
                2: '星期二',
                3: '星期三',
                4: '星期四',
                5: '星期五',
                6: '星期六',
                7: '星期日'
            }
        };
    }

    componentDidMount() {
        this.timesFn = setInterval(() => {
            this.setState({
                times: this.state.times + 1
            });
        });
    }

    // 退出登录
    exit = () => {
        remove('OPEN_NEW_PAGE_PARAMS');
        remove('CURRENT_USER_INFO');
        remove('selectedKeys');
        window.location.replace('/');
    };

    formatMoment = () => {
        const currentTime = dayJs().locale('zh-cn').format('YYYY-MM-DD') || '';
        const week = this.state.weeks[dayJs().get('day')] || '';
        const hour = dayJs().locale('zh-cn').format('HH:mm:ss') || '';
        return {currentTime, week, hour};
    };

    componentWillUnmount() {
        clearInterval(this.timesFn);
    }

    render() {
        const { currentTime, week, hour } = this.formatMoment();
        const { username = '' } = getSession('CURRENT_USER_INFO') || {};
        return (
            <div className={styles.homeHeader}>
                {/* 左侧 */}
                <div className={styles.head_left}>
                    {/* <img className="imglogos" src={require('@Img/qingtian.png')} alt=""/>
                    <p>
                        <span className="temperature">30℃</span>
                    </p>
                    <span className="text">&nbsp;&nbsp;&nbsp;多云</span> */}
                </div>
                {/* 中间 */}
                <div className={styles.head_cont}>
                    <p></p>
                </div>
                {/* 右侧 */}
                <div className={styles.head_right}>
                    <p className={styles.time}>
                        <span>{currentTime}</span>&nbsp;&nbsp;&nbsp;
                        <span>{week}</span>&nbsp;&nbsp;&nbsp;
                    </p>
                    <p>
                        <span className={styles.hour}>{hour}</span>&nbsp;&nbsp;&nbsp;
                    </p>
                    <p>
                        <img className={styles.head_right_imgs} src={require('@/images/head.png')} alt="" />&nbsp;
                        <span>{username}</span>&nbsp;&nbsp;&nbsp;
                        <img className={styles.head_right_imgs1} src={require('@/images/logout.png')} alt="退出登录" onClick={this.exit}/>&nbsp;&nbsp;&nbsp;
                    </p>
                </div>
            </div>
        );
    }
}