import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import Pagination from '../pagination/Pagination';
import { paramFilter, addDataIndex } from 'utils/util';
/**
 *  Desc:               公用的hooks表格
 *  api                 接口
 *  getColumns          表头
 *  searchParams        表单搜索参数
 */
export default function HooksTable({api, getColumns, searchParams}) {
    const [data, setData] = useState([]);
    const [size, setSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);

    const pageChange = (current, size) => {
        setCurrent(current);
        setSize(size);
    };

    useEffect(() => {

        // 调接口获取数据
        const getData = async () => {
            try { 
                const response = await (api && api({data: paramFilter({sdId: 1, size, current}), searchParams: paramFilter({...searchParams})}));
                if (response && response.code === 0) {
                    const {data} = response;
                    setData(addDataIndex(data.records || [], current, size));
                    setTotal(data.total || 0);
                }
            }catch(error) {
                throw(error);
            }
        };
        
        getData();
        
    }, [api, current, size, searchParams]);

    return (
        <Table
            rowKey="id"
            pagination={false}
            columns={getColumns}
            dataSource={data}
            bordered
            footer={() => <Pagination total={total} current={current} size={size} onChange={pageChange}/>}
        />
    );
}