import { useEffect, useReducer } from 'react';
import { addDataIndex } from '@/utils/util';

// 基础配置
const basePaginationConfig = {
    showSizeChanger: false,
    hideOnSinglePage: false,
    sizeOptions: [10, 20, 50, 100],
    showQuickJumper: true,
    showTotal: total => `共${total}条记录`
};

// action type
const DATA_CHANGE = 'DATA_CHANGE';
const STATE_CHANGE = 'STATE_CHANGE';

// 设置默认参数
const DEFAULT_STATE = {
    loading: false,
    current: 1,
    size: 10,
    total: 0,
    dataSource: [],
    searchParams: {},
    freshKey: 0
};

// 用作 useReducer 中的 reducer
const reducer = (state, action) => {
    const {
        type,
        data: { dataSource, ...nextState }
    } = action;
    switch (type) {
        case STATE_CHANGE:
            return { ...state, ...nextState };
        case DATA_CHANGE:
            return { ...state, dataSource, ...nextState };
        default:
            return state;
    }
};

export function useTableData (api, initState = {}) {
    const [
        {
            loading, // 加载态
            current, // 当前页
            size, // 一页多少条
            total, // 总共多少条
            dataSource, // 数据
            searchParams, // 额外搜索项
            freshKey
        },
        dispatch
    ] = useReducer(reducer, {
        ...DEFAULT_STATE,
        ...initState // 外部传入的参数
    });
    useEffect(() => {
        let cancel = false;
        dispatch({ type: STATE_CHANGE, data: { loading: true } });
        api && api({ current, size, ...searchParams })
            .then(res => {
                const { records = [] } = (res && res.success) ? res.data : {};
                if (!cancel) {
                    dispatch({ type: DATA_CHANGE, data: { dataSource: addDataIndex(records || [], size, current), total: res?.data?.total || 0 } });
                }
            })
            .finally(() => dispatch({ type: STATE_CHANGE, data: { loading: false } }));

        // 返回值时页面卸载之后调用的函数
        return () => {
            cancel = true;
        };
    }, [current, size, searchParams, freshKey]);

    // 搜索事件
    function onSearch(searchParam) {
        // 点击搜索按钮 跳到第一页
        if (!loading) {
            dispatch({ type: STATE_CHANGE, data: { ...searchParam, current: 1 } });
        }
    }

    // 刷新页面
    function onFreshPage() {
        // 点击搜索按钮 跳到第一页
        if (!loading) {
            dispatch({ type: STATE_CHANGE, data: { freshKey: freshKey + 1 } });
        }
    }

    // 变更事件
    function onChange(pagination) {
        // eslint-disable-next-line no-shadow
        const { current, size } = pagination;
        if (!loading) {
            dispatch({ type: STATE_CHANGE, data: { current, size } });
        }
    }

    return {
        onSearch,
        onFreshPage,
        tableProps: {
            loading,
            dataSource,
            pagination: { current, size, total, ...basePaginationConfig },
            onChange
        }
    };
}
