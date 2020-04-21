
import React from 'react';
import styles from './login.scss';
import { Form, Button, Input, Checkbox } from 'antd';
// import { setLocal, setSession } from '../utils/storage';
// import { CURRENT_USER_INFO, CURRENT_USER_ROULS } from '@src/constants/common';
// import { eventTypeWring, getDictionary } from '@src/service/common';
import errorPng from '../../images/error.png';
// import { isEmpty } from '../../utils/util';
// import { isEmpty, isNotEmpty } from '../utils/util';
// import { getLogin } from '@src/service/common';

export default function Login() {
    // 登录
    const onFinish = values => {
        window.location.replace('#/page');
    };

    const onFinishFailed = errorInfo => {
        // console.log('Failed:', errorInfo);
    };

    // 回车键登录
    const keyDown = (e) => {
        if (e.keyCode === 13) {
            onFinish();
        }
    };

    const layout = {
        labelCol: {
            span: 8
        },
        wrapperCol: {
            span: 16
        }
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 }
    };

    const data = '', msg = '';
    return (
        <div className={styles.Login_div}>
            <div className={styles.the_log_div}>
                <p></p>
                { data === 10003 && <div>
                    <img src={errorPng} alt="" className={styles.failureIncon} />
                    <span className={styles.textSpan}>{msg}</span>
                </div>
                }
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: false, message: '请输入用户名' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: false, message: '请输入密码' }]}
                    >
                        <Input.Password onKeyDown={keyDown} />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item className={styles.the_log_btn}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}