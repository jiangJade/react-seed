/**
 * Desc: 表格搜索公用类，提供一些表格搜索公用方法
 */

import React, { PureComponent } from 'react';
import { Table } from 'antd';
import {paramFilter, addDataIndex, afterDelPage} from '@src/utils/util';
import SearchForm from '../searchForm/SearchForm';
import Pagination from '../pagination/Pagination';
import { getLocal } from '../../utils/storage';

export default class TableSearch extends PureComponent {
    constructor(props) {
        super(props);
        this.server = '';
        this.state = {
            searchParams: {},
            systemId: 1,
            current: 1,
            size: 10,
            total: 0,
            data: [],
            loading: false,
            isVisible: false,
            modalKey: +new Date()
        };
    }

    componentDidMount() {
        this.getData();
    }

    // 搜索重置参数
    onSearch = (searchParams) => {
        this.setState({
            searchParams,
            current: 1,
            total: 10
        }, () => {
            this.getData();
        });
    };

    // 分页
    pageChange = (current, size) => {
        this.setState({
            current,
            size
        }, () => {
            this.getData();
        });
    };

    // 获取搜索参数
    getParam = () => {
        let sdId = getLocal('sdId');
        const { current, size, searchParams } = this.state;
        return {data: paramFilter({ current, size, sdId }), searchParams: paramFilter({...searchParams})};
    };

    // 获取数据
    getData = () => {
        const { current, size } = this.state;
        let server = this.server;
        if(server) {
            server(this.getParam()).then(data => {
                data = data.data || {};
                this.setState({
                    loading: false,
                    data: addDataIndex(data.records, current, size),
                    total: data.total || 0
                });
            }).catch(() => {
                this.setState({
                    loading: false,
                    data: []
                });
            });
        }
    };

    delRefresh = (delNum = 1) => {
        let { data, current } = this.state;
        this.setState({
            current: afterDelPage(data, current, delNum)
        }, () => {
            this.getData();
        });
    };

    // modal操作
    showModal = (add) => {
        this.setState({ isVisible: add, modalKey: +new Date() });
    };

    hideModal = () => {
        this.setState({ isVisible: false });
    };

    // 详情弹框
    infoHideModal = () => {
        this.setState({ infoVisible: false });
    };

    // 获取table列
    getColumns = () => {
        return [];
    };

    render() {
        const { data, total, current, size, loading } = this.state;

        return (
            <div>
                <SearchForm onSearch={this.onSearch}
                    add={this.showModal} 
                    eventType={this.eventType}
                    teamName={this.teamName} 
                    taskState={this.taskState}
                />
                <Table
                    rowKey="id"
                    loading={loading}
                    pagination={false}
                    columns={this.getColumns()}
                    dataSource={data}
                    bordered
                    footer={() => <Pagination total={total} current={current} size={size} onChange={this.pageChange}/>}
                />
            </div>
        );
    }
}
