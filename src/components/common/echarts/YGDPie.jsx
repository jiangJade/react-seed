/*
 * @desc 饼图 or 环形图 or 南丁格尔玫瑰图
 * @param radius 区别环形与饼图 eg：[0, '75%'] 内半径与外半径
 * @param roseType 南丁格尔玫瑰图专用，可选择两种模式 radius/area
 */
import React, { Component } from 'react';
import { colors } from './config/config';
import extend from './utils/extend';
import { getLegendData } from './utils/util';
import { isEmpty } from '@/utils/utils';
import EchartBase from './base/EchartBase';

class YGBasePie extends Component {
    constructor(props) {
        super(props);
    }
    setOption(param) {
        let {
            color =  colors.color.slice(),
            name = '',
            incomeLabel = {},
            labelShow = false,
            labelLine = false,
            unit = '',
            center = ['30%', '50%'],
            radius = ['35%', '50%'],
            data = [],
            ...others
        } = param;
        let initLabel = {
            label: {
                normal: {
                    show: labelShow,
                    formatter: '{b}: {d}%',
                    color: colors.textColor
                }
            },
        };
        let labelCenter = {
            label: {
                normal: {
                    show: true,
                    position: 'center',
                    formatter: () => {
                        return `${incomeLabel.centerName}\n\n{a|${incomeLabel.total === 0 ? 0 : incomeLabel.total ? incomeLabel.total : ''}}{b|${incomeLabel.unit}}`;
                    },
                    textStyle: {
                        fontSize: 14,
                        fontWeight:'normal',
                        fontFamily: 'PingFangSC-Regular',
                        color: '#555'
                    },
                    rich: {
                        a: {
                            fontSize: 24,
                            color: '#555'
                        },
                        b: {
                            fontSize: 14,
                            color: '#555'
                        }
                    }
                }
            },
        };
        // 饼图中间的配置
        let labelConfig  = isEmpty(incomeLabel) ? initLabel : labelCenter;

        // 计算legend百分比
        const countPercentage = (total, value) => {
            let percentage = total === 0 ? '0' : total ? ((value / total) * 100).toFixed(2) : '';
            return percentage;
        };
        const option = {
            color,
            title: {
                text: '',
                x: '',
                left: 'auto',
                top: 'auto',
                bottom: 'auto',
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'normal',
                    fontFamily: 'Microsoft Yahei',
                    color: colors.textColor
                }
            },
            tooltip: {
                trigger: 'item',
                padding: [10, 10, 10, 10]
            },
            legend: {
                bottom: 15,
                orient: 'vertical',
                left: '38%',
                top: 'center',
                icon: 'circle',
                data: getLegendData(data),
                itemGap: 15,
                itemWidth: 8,
                itemHeight: 8,
                selectedMode: false,
                formatter: params => {
                    // incomeLabel 存在表示饼图中心有数据
                    let dataNumTotal = 0, formatLegend = '';
                    data && data.forEach(item => {
                        dataNumTotal += item.value;
                    });

                    let currentVal = data && data.find(item => item.name === params); // 当前legend数据

                    if(isEmpty(incomeLabel)) {
                        // 计算百分比
                        let percent = countPercentage(dataNumTotal, currentVal.value);
                        
                        formatLegend = [`{a| ${currentVal.name}} {b| ${percent ? percent + '%' : ''}} {c| ${unit ? currentVal.value === 0 ? 0 + unit : currentVal.value ? currentVal.value + unit : '' : ''}}`];
                    }else {
                        let percent = countPercentage(incomeLabel.total, currentVal.value);
                        formatLegend = [`{a| ${currentVal.name}} {b| ${percent ? percent + '%' : ''}} {c| ${currentVal.value === 0 ? 0 + incomeLabel.unit : currentVal.value ? currentVal.value + incomeLabel.unit : ''}}`]
                    }
                    
                    return currentVal ? formatLegend : '';
                },
                textStyle: {
                    color: colors.legendColor,
                    rich: {
                        a: {
                            // width: 150,
                        },
                        b: {
                            align: 'right',
                        },
                        c: {
                            align: 'right',
                        }
                    }
                }
            },
            series: [{
                name,
                type: 'pie',
                center,
                radius,
                ...labelConfig,
                labelLine: {
                    show: labelLine
                },
                data: data
            }]
        };

        let op = extend(true, {}, option, others);
        return op;
    }
    render() {
        return (
            <EchartBase option={this.setOption(this.props.option)} style = {this.props.style} />
        );
    }
}
export default YGBasePie;