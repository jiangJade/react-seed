/*
* @desc 图标公共部分
*/
import echarts from 'echarts';
import React, { Component } from 'react';
import elementResizeEvent from 'element-resize-event';
class EchartBase extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.echartObj = this.renderEchartDom();
        let onEvents = this.props.onEvents || [];
        for (let eventName in onEvents) {
            if (typeof eventName === 'string' && typeof onEvents[eventName] === 'function') {
                this.echartObj.on(eventName, function(param) {
                    onEvents[eventName](param, this.echartObj);
                });
            }
        }
        elementResizeEvent(this.echartsDom, () => {
            this.echartObj.resize();
        });
        // $(window).resize(function(){
        //  echartObj.resize();
        // });
    }
    shouldComponentUpdate(nextProps) {
        if(JSON.stringify(this.props.option) === JSON.stringify(nextProps.option)) {
            return false;
        }
        return true;
    }
    componentDidUpdate() {
        this.echartObj.setOption(this.props.option, true);
        if (this.props.showLoading) {
            this.echartObj.showLoading();
        } else {
            this.echartObj.hideLoading();
        }
    }
    componentWillUnmount() {
        echarts.dispose(this.echartObj);
    }
    renderEchartDom() {
        let echartObj = this.getEchartsInstance();
        echartObj.setOption(this.props.option);
        if (this.props.showLoading) {
            echartObj.showLoading();
        } else {
            echartObj.hideLoading();
        }
        return echartObj;
    }
    getEchartsInstance() { // echarts.getInstanceByDom(this.echartsDom) || 
        return echarts.init(this.echartsDom, 'echartTheme');
    }
    render() {
        let style = this.props.style || {
            height: '100%',
            width: '100%'
        };
        return (
            <div ref = {(echartsDom) => {this.echartsDom = echartsDom;}} style = {style} />
        );
    }
}
export default EchartBase;