/*
 * @desc 词云图
 */
import React, { Component } from 'react';
import { colors } from './config/config';
import extend from './utils/extend';
import EchartBase from './base/EchartBase';
import "echarts-wordcloud/dist/echarts-wordcloud.min";

class WordCloud extends Component {
    constructor(props) {
        super(props);
    }
    setOption(param) {
        let {
            color =  colors.color.slice(),
            name = '',
            data = [],
            sizeRange = [14, 80],
            ...others
        } = param;

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
            series: [{
                type: 'wordCloud',
                shape: 'circle',
                left: 'center',
                top: 'center',
                width: '70%',
                height: '80%',
                right: null,
                bottom: null,
                sizeRange,
                rotationRange: [0, 0],
                rotationStep: 0.1,
                gridSize: 8,
                // type: 'wordCloud',
                // gridSize: 10, // 用来调整词之间的距离
                // sizeRange: [14, 60], // 用来调整字的大小范围
                // rotationRange: [0, 0], // 用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
                //随机生成字体颜色
                // maskImage: maskImage,
                textStyle: {
                    normal: {
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        color: function () {
                            // Random color
                            let arr = ['#13C2C2', '#F759AB', '#40A9FF', '#9254DE', '#597EF7']
                            return arr[Math.floor((Math.random() * arr.length))]
                        }
                        // color: function() {
                        //     return (
                        //         'rgb(' +
                        //         Math.round(Math.random() * 255) +
                        //         ', ' +
                        //         Math.round(Math.random() * 255) +
                        //         ', ' +
                        //         Math.round(Math.random() * 255) +
                        //         ')'
                        //     );
                        // }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                left: 'center',
                top: 'center',
                right: null,
                bottom: null,
                width: '200%',
                height: '200%',
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
export default WordCloud;
