import React from 'react';
import { Table } from 'antd';
import { useTableData } from '../useTableData';

export default function CombinationTable(props) {

    const { getColumns, api, searchParams, SearchForm } = props;

    const { tableProps, onSearch } = useTableData(api, searchParams);

    return (
        <>
            {SearchForm && <SearchForm onSearch={onSearch} />}
            <Table
                className="hooksTable"
                rowKey="sortIndex"
                columns={getColumns}
                {
                ...tableProps
                }
                loading={false}
            />
        </>
    );
}