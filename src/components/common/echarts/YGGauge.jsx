/*
* @type 仪表盘
*/
import React, { PureComponent } from 'react';
import extend from './utils/extend';
import EchartBase from './base/EchartBase';
import { createStandardData } from './utils/util';
class YGGauge extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currIndex: -1
        };
    }
    setOption(param) {
        let {
            color = [],
            data = [],
            ...others  // 其他需要特殊配置的参数，格式与echarts格式一致
        } = param;

        let series = param.series;
        let seriesItem = '';
        let seriesData = [];
        let seriesLength = series.length;
        for(let i = 0;  i < seriesLength; i++){
            seriesItem = {
                name: '速度',
                type: 'gauge',
                z: 3,
                min: 0,
                max: 6,
                center: ['30%', '80%'],
                splitNumber: 1,
                radius: '80%',
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 10,
                        color: [[2, '#597EF7'], [4, '#F2B50E'], [5, '#ff4d4f'], [6, '88A3B4']]
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length: 15,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                // axisLabel: {
                //     show: true,
                //     distance: 10,
                //     textStyle: {
                //         color: 'blue',
                //         fontSize: 12,
                //         fontWeight: 500
                //     }
                // },
                axisLabel: {
                    show: true,
                    distance: -10,
                    fontSize: 12,
                    color: 'rgba(0,0,0,0.65)'
                },
                splitLine: {           // 分隔线
                    length: 20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                title: {
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: '#555',
                        fontSize: 16,
                        fontStyle: 'italic'
                    }
                },
                detail: {
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder'
                    }
                },
                data: series[i]
            };
            seriesData.push(seriesItem);
        }
       
        let op = extend(true, {}, seriesData, others);
        return op;
    }
    render() {
        return (
            <EchartBase option={this.setOption(this.props.option)} style={this.props.style} />
        );
    }
}
export default YGGauge;
