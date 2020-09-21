export const colors = {
    color: ['#40A9FF', '#F2B50E', '#F655AA', '#9254DE', '#597EF7', '#13C2C2', '#6CBA52', '#097C25'],
    textColor: '#88A3B4',
    legendColor: '#607A8D',
    axisLineColor: '#E9EEF2',
    splitLineColor: '#F7F9FA'
};

export const baseSeries = {
    bar: {
        type: 'bar'
    },
    line: {
        type: 'line',
        areaStyle: {
            normal: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'white' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'white' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                },
                opacity: 0.8
            }
        }
    },
    pie: {
        type: 'pie',
        label: {
            show: false,
            normal: {
                position: 'inner',
                formatter: '{d}%',
                color: colors.textColor
            }
        }
    }
};
