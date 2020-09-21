import { isArray } from '@/utils/utils';
export function colorRgb(color){
    let sColor = color.toLowerCase();
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = '#';
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        // 处理六位的颜色值
        let sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt(sColor.slice(i, i + 2), 16));
        }
        return sColorChange.join(',');
    }
    return sColor;
}

// 根据数据获取图例
export function getLegendData(data = []) {
    return data.map(d => d.name );
}

export function isStandardDataFormat(data) {
    return data[0] && data[0].data !== undefined && data[0].data !== null;
}

// 生成标准数据
export function createStandardData(data, standard = {}) {
    if (!isArray(data) || !data.length) {
        return [];
    }
    if (!isStandardDataFormat(data)) {
        data = [{ data: data }];
    }
    return data.map( d => Object.assign({}, standard, d));
}