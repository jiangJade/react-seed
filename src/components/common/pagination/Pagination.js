import './style.scss';
import React from 'react';
import classNames from 'classnames';
import { Pagination } from 'antd';
import { formatNumber } from '../../../utils/formatter';
// import { PAGE_SIZE_OPTIONS } from '../../utils/constants';

/**
 * 对antd分页插件封装
 * */
export default function BasePagination(props) {
    const { onChange, className = '', ...others } = props;
    // 公共的props
    const defaultProps = {
        showTotal: total => (
            <span>
                共：<strong>{formatNumber(total)}</strong> 条
            </span>
        ),
        // sizeOptions: PAGE_SIZE_OPTIONS,
        showSizeChanger: false,
        showQuickJumper: true
    };
    const pageChange = (current, size = props.size) => {
        onChange && onChange(size === props.size ? current : 1, size);
    };

    const pageProps = { ...defaultProps, ...others };

    return (
        <div className={classNames('base-pagination', className, 'clearfix')}>
            {props.total ? <Pagination {...pageProps} onChange={pageChange} showQuickJumper={false} onShowSizeChange={pageChange} /> : null}
        </div>
    );
}
