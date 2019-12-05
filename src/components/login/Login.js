
import React, { Component } from 'react';
import styles from './login.scss';
import {  Form, Button, Input, Icon  } from 'antd';
// import { setLocal, setSession } from '../utils/storage';
// import { CURRENT_USER_INFO, CURRENT_USER_ROULS } from '@src/constants/common';
// import { eventTypeWring, getDictionary } from '@src/service/common';
import errorPng from '../../images/error.png';
import { isEmpty } from '../../utils/util';
// import { isEmpty, isNotEmpty } from '../utils/util';
// import { getLogin } from '@src/service/common';

const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordType: 'text',
            username: '',
            password: '',
            data: '',
            msg: ''
        };
    }

    // 登录事件
    handleSubmit = async (e) => {
        e && e.preventDefault();
        window.location.replace('#/page');
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         getLogin(values).then(res => {
        //             res = res.data || {};
        //             if(isNotEmpty(res)) {
        //                 setSession(CURRENT_USER_INFO, res);
        //                 this.props.history.push('#/page');
        //                 // this.props.history.push(CURRENT_USER_ROULS[res.roleType]);
        //             }
        //         }).catch(e => {
        //             this.setState({
        //                 data: e.code,
        //                 msg: e.resultMsg
        //             });
        //         });
        //     }
        // });
    };

    // 回车键登录
    keyDown = (e) => {
        if (e.keyCode === 13) {
            this.handleSubmit();
        }
    };

    // 处理事件状态数据的格式
    formatEventState = (data) => {
        if(isEmpty(data)) {
            return [];
        }
        let arr = [];
        data.forEach(item => {
            arr.push({id: item.typeCode, typeName: item.name});
        });
        return arr;
    };

    render() {
        const { passwordType, data, msg } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.Login_div}>
                <div className={styles.the_log_div}>
                    <p>欢迎登录</p>
                    <p>全息智慧隧道</p>
                    <p>展示平台</p>
                    { data === 10003 && <div>
                        <img src={errorPng} alt="" className={styles.failureIncon} />
                        <span className={styles.textSpan}>{msg}</span>
                    </div>
                    }
                    <Form>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名！' }]
                            })(
                                <Input
                                    addonBefore={<Icon type="user" />}
                                    placeholder="请输入用户名"
                                    size="large"
                                    autoComplete="off"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码！', whitespace: true }]
                            })(
                                <Input.Password
                                    addonBefore={<Icon type="lock" />}
                                    type={passwordType}
                                    placeholder="请输入密码"
                                    size="large"
                                    autoComplete="new-password"
                                    onKeyDown={this.keyDown}
                                />
                            )}
                        </FormItem>
                        <FormItem className={styles.the_log_btn}>
                            <Button onClick={(e) => this.handleSubmit(e)}>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create()(Login);