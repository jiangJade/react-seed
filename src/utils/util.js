import dayJs from 'dayjs';
import { getLocal, setSession } from './storage';
import { OPEN_NEW_PAGE_PARAMS } from '../constants/common';
/**
 * @desc 封装了一些项目常用方法.
 */

// 内部函数, 用于判断对象类型
function _getClass(object) {
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

export function isArray(obj) {
    return _getClass(obj).toLowerCase() === 'array';
}

export function isString(obj) {
    return _getClass(obj).toLowerCase() === 'string';
}

export function isDate(obj) {
    return _getClass(obj).toLowerCase() === 'date';
}

export function isObject(obj) {
    return _getClass(obj).toLowerCase() === 'object';
}

export function isNumber(obj) {
    return _getClass(obj).toLowerCase() === 'number' && !isNaN(obj);
}

export function isFormData(obj){
    try{
        if(obj instanceof FormData){
            return true;
        }
    }catch(e){
        return false;
    }
    return false;
}

export function isIE(){
    let userAgent = navigator.userAgent;
    if(userAgent.indexOf('compatible') > -1
        && userAgent.indexOf('MSIE') > -1){
        return true;
    }
    return false;
}

/**
 * @desc 判断参数是否为空, 包括null, undefined, [], '', {}
 * @param {object} obj 需判断的对象
 */
export function isEmpty(obj) {
    let empty = false;

    if (obj === null || obj === undefined) {    // null and undefined
        empty = true;
    } else if ((isArray(obj) || isString(obj)) && obj.length === 0) {
        empty = true;
    } else if (isObject(obj)) {
        let hasProp = false;
        for (let prop in obj) {
            if (prop) {
                hasProp = true;
                break;
            }
        }
        if (!hasProp) {
            empty = true;
        }
    }
    return empty;
}
/**
 * @desc 判断参数是否不为空
 */
export function isNotEmpty(obj) {
    return !isEmpty(obj);
}
/**
 * @desc 判断参数是否为空字符串, 比isEmpty()多判断字符串中有空格的情况, 如: '   '.
 * @param {string} str 需判断的字符串
 */
export function isBlank(str) {
    if (isEmpty(str)) {
        return true;
    } else if (isString(str) && str.trim().length === 0) {
        return true;
    }
    return false;
}
/**
 * @desc 判断参数是否不为空字符串
 */
export function isNotBlank(obj) {
    return !isBlank(obj);
}

/**
 * @desc 根据对象和传入的对象value属性的值, 查询value对应的name值
 * @param {object} obj 需遍历的对象
 * @param {string} value 需搜索的value属性的值
 * @demo USER = {
 *           A: {
 *               name: '普通会员',
 *               value: 0
 *           },
 *           B: {
 *               name: 'VIP会员',
 *               value: 1
 *           }
 *       }
 */
export function searchNameByVal(obj, value) {
    if (isEmpty(obj) || isEmpty(value)) {
        return '';
    }

    for (let prop in obj) {
        if (obj[prop].value === value) {
            return obj[prop].name;
        }
    }
}

export function getChildOptions(value, options) {
    if (!value || !options) {
        return [];
    }
    for (let i = 0, l = options.length; i < l; i++) {
        if (value === options[i].key) {
            return [...(options[i].childs || [])];
        }
    }
    return [];
}

export function keyToText(key, options) {
    let data = options.find(d => d.key === key) || {};
    return data.value || '';
}

/**
 * 过滤参数，过滤空字符串
 * */
export function paramFilter(params = {}) {
    let result = {};
    for(let k in params) {
        if (params[k] !== '' && params[k] !== undefined && params[k] !== null) {
            result[k] = params[k];
        }
    }
    return result;
}

// 根据链接下载文件
export function downloadURI(uri, name) {
    let link = document.createElement('a');
    link.href = uri;
    if (isNotBlank(name)) {
        link.download = name;
    }
    let o = document.body;
    o.appendChild(link).click(); // ie,fierfox,需要把他添加到一个元素后面才能下载（鬼知道还有啥子浏览器要这样，就统一这样了）
    o.removeChild(link);
}

/**
 * @desc 根据传递的对象, 以及嵌套对象的属性名, 来获取属性值
 * @param {object} obj 需要遍历的对象,
 * @param {string} props 需要遍历的对象属性名, 可传递一个到多个.
 * @param {string/number} defaultValue 默认属性值为空时返回的值.
 */
export function getValueByProps(obj) {
    if (arguments.length < 2) {
        return;
    }

    let currentObj = obj;
    let props = Array.prototype.slice.call(arguments, 1);
    let defaultVal = props.pop();
    for (let i = 0; i < props.length; i++) {
        let prop = props[i];
        currentObj = currentObj[prop];
        if (isEmpty(currentObj)) {
            return defaultVal;
        }

        if (i === props.length - 1) {
            if (isObject(currentObj) && isNotEmpty(currentObj[defaultVal])) {
                return currentObj[defaultVal];
            }
            return currentObj;
        }
    }
}

// 根据升序降序获取value
export function getSortValue(type, sortData = []) {
    if (isEmpty(type)) {
        return '';
    }
    return type === 'descend' ? sortData[0] : sortData[1];
}

// 根据value获取升序降序
export function getSortType(value, sortData = []) {
    if (isEmpty(value)) {
        return '';
    }
    return value === sortData[0] ? 'descend' : value === sortData[1] ? 'ascend' : false;
}

/**
 * @desc 表格数据加唯一值
 * @param data 数据
 * @param field 字段名，默认id
 */
export function addUniqueField(data, field = 'id') {
    if (isEmpty(data)) {
        return [];
    }
    data.forEach((d, i) => d[field] = `${i}_${+new Date()}`);
    return data;
}

// 生成min-max的随机数
export function createRandom(min = 0, max = 1) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 根据分页生成序号
export function addDataIndex(data, pageNum = 1, pageSize = 10) {
    if(isEmpty(data)) {
        return [];
    }
    data.forEach((item, i) => {
        Object.assign(item, {index: (pageNum - 1) * pageSize + i + 1});
    });
    return data;
}

// 删除数据后，应该请求的页码
export function afterDelPage(data = [], pageNum = 1, delNum = 1) {
    let rest = data.length - delNum;
    return (rest < 1 && pageNum > 1) ? pageNum - 1 : pageNum;
}

/**
 * @desc 新开页面跳转 根据传入的值
 */
export function jump(e, router, data) {
    e.preventDefault();
    const { origin } = window.location;
    setSession(OPEN_NEW_PAGE_PARAMS, data);

    window.open(`${origin}/${router}`);
}

// 返回报警列表中文
export function eventWringText() {
    let obj = {}, eventTypeData = getLocal('eventTypeData');
    eventTypeData && eventTypeData.forEach(item => {
        obj[item.id] = item.typeName;
    });
    return obj;
}

// 返回事件格式为时分秒的数据
export function hourAndSecond(data = '') {
    let time = dayJs(data).format('HH:mm:ss');
    return time;
}

// 返回设备管理折线图标准数据
export function equipmentLineData(data) {
    let lineData = [], category = [];
    data.forEach(item => {
        lineData.push(item.avgValue);
        category.push(hourAndSecond(item.recordTime));
    });
    return {lineData, category};
}

// 处理事件列表结果数据
export function eventRusultState(data, code = 'code') {
    
    let obj = {};

    data && data.forEach(item => {
        obj[item[code]] = item.name;
    });
    return obj;
}

// 处理表单编辑可变字段数据格式
export function formatPropsConfig(data) {
    if(isEmpty(data)) {
        return [];
    }
    let arr = [];
    for(let key in data) {
        arr.push({prop1: key, prop4: data[key]});
    }
   
    return arr;
}