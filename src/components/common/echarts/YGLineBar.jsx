/*
* @type 折线柱状组合图
*/
import React, { Component } from 'react';
import { colors } from './config/config';
import extend from './utils/extend';
import { getLegendData } from './utils/util';
import { isNumber } from '@/utils/utils';
import EchartBase from './base/EchartBase';

class YGLineBar extends Component {
    constructor(props) {
        super(props);
        this.grid = {
            false: {
                top: 15,
                left: 10,
                right: 0,
                bottom: 15,
                containLabel: true
            },
            true: {
                top: 10,
                left: 10,
                right: 50,
                bottom: 10,
                containLabel: true
            }
        };
    }

    // 生成标准数据
    createStandardData(data = [], standard = {}, areaShow) {
        if (isNumber(data[0])) {
            data = [{ data: data }];
        }
        return data.map( d => Object.assign({}, standard, d));
    }

    setOption(param){

        let {
            color =  colors.color.slice(),
            category = [],         // 类别
            horizontal = false,    // 横向图
            barData = [],          // 柱状图数据
            barStack,              // 柱状图stack
            barMaxWidth = 20,      // 柱状图宽
            lineData = [],         // 折线数据
            lineStack,             // 折线stack
            symbolSize = 6,        // 折线标记大小
            areaShow = true,       // 折线堆叠是否显示
            smooth,                // 线条是否平滑过渡
            ...others              // 其他需要特殊配置的参数，格式与echarts格式一致
        } = param;
        let series = [];
        let barSeries = [];
        let lineSeries = [];

        const barBaseSeries = {    // 柱状图默认配置
            type: 'bar',
            barMaxWidth,
            stack: barStack
        };

        const lineBaseSeries = {   //  折线默认配置
            type: 'line',
            smooth,
            symbolSize,
            stack: lineStack
        };

        barSeries = this.createStandardData(barData, barBaseSeries);
        lineSeries = this.createStandardData(lineData, lineBaseSeries);

        if (areaShow) {
            lineSeries.forEach((d, index) => {
                d.areaStyle = {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: color[(index + barSeries.length) % color.length]  // 0% 处的颜色
                            }, {
                                offset: 1, color: 'white' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        opacity: 0.2
                    }
                };
            });
        }

        series = series.concat(barSeries, lineSeries);

        if (horizontal) { // 如果坐标翻转。数据也翻转
            category = [...category].reverse();
            series.forEach(s => s.data = [...s.data].reverse() );
        }

        const option = {
            color,
            title: {
                show: false,
                link: '',
                target: 'self',
                text: '',
                x: 'left',
                padding: [25, 0, 0, 5],
                textStyle: {
                    fontSize: 12,
                    fontWeight: 'normal',
                    fontFamily: 'Microsoft Yahei'
                }
            },
            tooltip: {
                trigger: 'axis',
                padding: [10, 10, 10, 10],
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                padding: [15, 0, 0, 0],
                itemGap: 5,
                itemWidth: 25,
                itemHeight: 12,
                width: 'auto',
                show: true,
                left: 'auto',
                right: '50',
                bottom: 'auto',
                top: '0',
                data: getLegendData(series),
                textStyle: {
                    color: colors.legendColor,
                    fontSize: 14,
                    fontFamily: 'Microsoft Yahei'
                }
            },
            grid: {...this.grid[horizontal]},
            xAxis: [{
                name: '',
                type: 'category',
                boundaryGap: barSeries.length !== 0 || horizontal,
                data: category,
                axisLine: {
                    lineStyle: {
                        color: colors.axisLineColor
                    }
                },
                axisLabel: {
                    color: colors.textColor,
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'Microsoft Yahei'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: '#DDE0E5'
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                data: [],
                name: '',
                axisLine: {
                    lineStyle: {
                        color: colors.axisLineColor
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: colors.textColor,
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'Microsoft Yahei'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: colors.splitLineColor
                    }
                }
            }, {
                type: 'value',
                name: '',
                data: [],
                axisLine: {
                    show: false, // 控制右边的Y轴显不显示
                    lineStyle: {
                        color: colors.axisLineColor
                    }
                },
                axisLabel: {
                    show: false,
                    color: colors.textColor,
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'Microsoft Yahei'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: colors.splitLineColor
                    }
                }
            }],
            series
        };
        let op = extend(true, {}, option, others);
        if (horizontal) {
            let cAxis = op.xAxis;
            op.xAxis = op.yAxis.slice(0, 1);
            op.yAxis = cAxis;
        }
        return op;
    }
    render() {
        return (
            <EchartBase option={this.setOption(this.props.option)} style = {this.props.style} />
        );
    }
}
export default YGLineBar;