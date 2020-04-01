import * as React from 'react';
// import { getTrafficEvent } from '../../../server/testHooks';
import HooksTable from '../hooksTable/HooksTable';

export default function UseHooksGetData() {

    const getColumns = [
        {
            title: '序号',
            dataIndex: 'index'
        }, {
            title: '报警时间',
            dataIndex: 'occurTime'
        }, {
            title: '报警类型',
            dataIndex: 'eventType',
        }, {
            title: '报警位置',
            dataIndex: 'occurSite'
        }, {
            title: '处置方式',
            dataIndex: 'dealWay',
        }
    ];
    return (
        <HooksTable
            columns={getColumns}
            api={''}
        />
    );
}