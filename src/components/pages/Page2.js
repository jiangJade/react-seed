import React, { Component } from 'react';
import styles from  './index.scss';
import CaptureValue from './CaptureValue';
import Fragment from './Fragment';
import { Table, Input } from 'antd';

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.server = '';
        this.state = {
            searchParams: {},
            systemId: 1,
            current: 1,
            size: 10,
            total: 0,
            data: [
                {
                    Asend: 0,
                    Ksend: 0,
                    Msend: 0,
                    Isend: 0,
                    Csend: 0,
                    Esend: 0,
                    Lsend: 0,
                    Gsend: 0,
                    Nsend: 0,
                    Dsend: 0,
                    Jsend: 0,
                    Bsend: 0,
                    Fsend: 0
                },
                {
                    Asend: 0,
                    Ksend: 0,
                    Msend: 0,
                    Isend: 0,
                    Csend: 0,
                    Esend: 0,
                    Lsend: 0,
                    Gsend: 0,
                    Nsend: 0,
                    Dsend: 0,
                    Jsend: 0,
                    Bsend: 0,
                    Fsend: 0
                },
                {
                    Asend: 0,
                    Ksend: 0,
                    Msend: 0,
                    Isend: 0,
                    Csend: 0,
                    Esend: 0,
                    Lsend: 0,
                    Gsend: 0,
                    Nsend: 0,
                    Dsend: 0,
                    Jsend: 0,
                    Bsend: 0,
                    Fsend: 0
                },
                {
                    Asend: 0,
                    Ksend: 0,
                    Msend: 0,
                    Isend: 0,
                    Csend: 0,
                    Esend: 0,
                    Lsend: 0,
                    Gsend: 0,
                    Nsend: 0,
                    Dsend: 0,
                    Jsend: 0,
                    Bsend: 0,
                    Fsend: 0
                }
            ],
            loading: false,
            isVisible: false,
            modalKey: +new Date(),
            paramsList: []
        };
    }

    getColumns = () => [
        {
            title: '序号',
            dataIndex: 'Asend'
        }, {
            title: '报警时间',
            dataIndex: 'Ksend'
        }, {
            title: '报警类型',
            dataIndex: 'Msend'
        }, {
            title: '报警位置',
            dataIndex: 'Isend'
        }, {
            title: '处置方式',
            dataIndex: 'dealWay',
            render: (d, r, i) => {
                return <Input onChange={(e) => this.inputChange(r, e)} />;
            }
        }
    ];

    inputChange = (r, e) => {
        let { paramsList } = this.state;
        let value = e.target.value, resetArr = [...paramsList];

        let obj = {
            id: r.id,
            value
        };
        
        if(resetArr.length === 0) {
            resetArr.push(obj);
        }else {
            let current = resetArr.find(item => item.id === r.id) || '';
            if(!current) {
                resetArr.push(obj);
            }else {
                if(current.id !== r.id) {
                    resetArr.push(obj);
                }
                let index = resetArr.findIndex(item => item.id === r.id);
                resetArr.splice(index, 1);
                resetArr.push(obj);
            }
        }

        this.setState({
            paramsList: resetArr
        });
    };

    render() {
        return (
            <div className={styles.about}>
                <p className={styles.title}>首页6666666666666</p>
                <CaptureValue />
                <table>
                    <tbody>
                        <tr>
                            <Fragment />
                        </tr>
                    </tbody>
                </table>
                <Table
                    rowKey="id"
                    // loading={loading}
                    pagination={false}
                    columns={this.getColumns()}
                    dataSource={this.state.data}
                    bordered
                    // footer={() => <Pagination total={total} current={current} size={size} onChange={this.pageChange}/>}
                />
            </div>
        );
    }
}