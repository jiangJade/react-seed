/**
 * @desc 用于格式化各种数据, 如从后台拿到timestamp, 需要转换成年月日等...
 */
import moment from 'moment';
import { DATE_TIME_FORMAT, PROVINCES } from '../constants/common';
import { isBlank, isEmpty } from './util';

/*
 *  @desc 格式化开始日期
 *  @param time 需要格式化日期
 *  @param type start OR end
 * */
export function startEndDateFormat(time, type = 'start') {
    let suffix = type === 'start' ? ' 00:00:00' : ' 23:59:59';
    return time ? dateFormat(time) + suffix : '';
}

// 日期
export function dateFormat(time) {
    return time ? moment(time).format(DATE_TIME_FORMAT) : '--';
}

// 日期+时间
export function dateTimeFormat(time) {
    return time && moment(time).format('x') > 1000 ? moment(time).format(DATE_TIME_FORMAT) : '--';
}

// 时间差 天
export function dateDiffByDay(beginTime, endTime, type) {
    return moment(endTime).diff(moment(beginTime), type);
}

/**
 * 千分位
 * @param  {[type]} num [description]
 * @return {string}     [description]
 */
export function formatNumber(num) {
    if (isNaN(parseFloat(num))) {
        return '0';
    }
    return ('' + num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
}

// 把千分化的数字转换为一般数字
export function formatNormalNumber(str) {
    if (isEmpty(str)) {
        return '0';
    }
    return str.replace(/,/g, '');
}

/**
 * 如果标题字数超出指定长度，则多余部分显示...
 * @param {number} num
 * @param {string} str
 */
export function overtopOmit(num, str) {
    if (str && num && str.length > num) {
        return str.substring(0, num) + '...';
    }
    return str;
}

// 判断字段是否异常，如果异常则返回‘--’
export function fieldAnomaly(value) {
    if ((typeof (value) === 'number' && !isNaN(value))
        || (typeof (value) === 'string' && value.trim().length > 0)) {
        return value;
    }

    if (!value) {
        return '--';
    }
    return value;
}

// 小数转换
export function numberFixed(num, anomaly, fixed = 2) {
    num = parseFloat(num);
    if (isNaN(num)) {
        if (anomaly !== undefined) {
            return anomaly;
        }
        num = 0;
    }
    return num.toFixed(fixed);
}

// 转换简化省名字
export function provinceNameFormat(name) {
    if(!name) {
        return '--';
    }
    for(let i = 0, l = PROVINCES.length; i < l; i++) {
        if(name.match(PROVINCES[i])) {
            return PROVINCES[i];
        }
    }
    return name;
}

/**
 * 将字符串根据最大值转换为换行数据
 * @param {string} str
 * @param {number} max 每行最大值
 * @param {string} symbol 换行符
 * @return {string} 返回转换数据
 */
export function wordLinefeed(str, max, symbol = '\n') {
    if (isBlank(max)) {
        return str;
    }
    let reg = new RegExp(`(.{${max}}(?!$))`, 'g');
    let replaceReg = new RegExp(`${symbol}`, 'g');

    return ('' + str).replace(replaceReg, '').replace(reg, `$1${symbol}`);
}

// 判断两个对象是否相等
export function isObjectEqual( x, y ) {
    if ( x === y ) {
        return true;
    }

    if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) {
        return false;
    }

    if ( x.constructor !== y.constructor ) {
        return false;
    }

    for ( var p in x ) {
        if ( x.hasOwnProperty( p ) ) {
            if ( ! y.hasOwnProperty( p ) ) {
                return false;
            }

            if ( x[ p ] === y[ p ] ) {
                continue;
            }

            if ( typeof( x[ p ] ) !== 'object' ) {
                return false;
            }

            if ( ! Object.equals( x[ p ], y[ p ] ) ) {
                return false;
            }
        }
    }

    for ( p in y ) {
        if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) {
            return false;
        }
    }
    return true;
}