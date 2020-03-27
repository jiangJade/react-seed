/**
 * Desc: 列表信息搜索
 */
import './search.scss';
import React, { Component } from 'react';
import { DATE_TIME_FORMAT } from '../../../constants/common';
import { Form, Select, DatePicker, Button } from 'antd';
import moment from 'moment';
moment.locale('zh-cn');
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endOpen: false,
            eventType: []
        };
    }

    // 查询
    onSubmit = (e) => {
        e && e.preventDefault();
        const { onSearch } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { time } = values;
                // 将时间格式为'2019/09/8 处理成 '2019-08-09'
                values.startTime = time[0].locale('zh-cn').format(DATE_TIME_FORMAT);

                values.endTime = time[1].locale('zh-cn').format(DATE_TIME_FORMAT);
                
                delete values.time;
                onSearch && onSearch(values);
            }
        });
    };

    // 重置表单的值
    resetForm = () => {
        const { onSearch } = this.props;
        this.props.form.resetFields();
        onSearch && onSearch();
    };

    // 禁止选择今天以后的时间
    disabledDate = (current) => {
        return current && current > moment().endOf('day');
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        let dates = new Date();
        return (
            <div className="searchBox">
                <Form layout="inline" onSubmit={this.onSubmit} className="formBox">
                    <FormItem label="报警时间">
                        {getFieldDecorator('time', {
                            initialValue: [moment(new Date(dates.setDate(dates.getDate() - 2)), DATE_TIME_FORMAT), 
                                moment(new Date (), DATE_TIME_FORMAT)]
                        })(
                            <RangePicker />
                        )}
                    </FormItem>
                    <FormItem label="报警类型">
                        {getFieldDecorator('eventType', {
                            initialValue: isNotEmpty(eventTypeData) && eventTypeData[0].id
                        })(
                            <Select size="default" style={{ width: 160 }}>
                                {eventTypeData && eventTypeData.map(item => (
                                    <Option key={item.id} value={item.id}>{item.typeName}</Option>
                                ))}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button htmlType="submit" type="primary" className="margin-right10">查询</Button>
                        <Button type="primary" className="resetBtnBg" onClick={() => this.resetForm()}>重置</Button>
                    </FormItem>
                   
                </Form>
            </div>
        );
    }
}

export default (Form.create({})(SearchForm));
