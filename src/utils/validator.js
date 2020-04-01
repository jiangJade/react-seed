/**
 * @desc 主要用于form验证, 可以搭配antDesign的validation使用.
 * message需要动态传参时可以改为function, 如REQUIRED中的message一样, 但注意不要影响其他使用到此对象的地方.
 */

// 长度范围
export function LengthRangeCheck(min, max) {
    return ({
        message: `${min}-${max}位`,
        pattern: new RegExp(`^.{${min},${max}}$`, 'g')
    });
}

// 长度不能小于n
export function tipsLessN(n) {
    return `长度不能小于${n}位`;
}
// 长度不能大于n
export function tipsMoreN(n) {
    return `长度不能大于${n}位`;
}

// 必填项验证
export const RequiredCheck = {
    message: function(value = ''){
        return `${value}不能为空`;
    },
    pattern: /^\s*$/g
};
// 邮箱格式验证
export const EmailCheck = {
    message: '请输入正确的邮箱地址',
    // pattern: /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
};
// 电话格式验证, 如座机
export const PhoneCheck = {
    message: '电话格式不正确',
    pattern: /(^(\d{3,4}[-]?)?\d{7,8})$|^((1[3-9][0-9]\d{8}$))/
};
// 手机格式验证
export const CellphoneCheck = {
    message: '手机格式不正确',
    pattern: /^(1[3-9][0-9])\d{8}$/
};
// 邮箱/手机格式验证
export const EmailOrCellphoneCheck = {
    message: '邮箱/手机格式不正确',
    pattern: /(^(1[3-9][0-9])\d{8}$)|(^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$)/
};
// 日期格式验证
export const DateCheck = {
    message: '日期格式不正确',
    pattern: /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/
};
// 身份证格式验证
export const IDcardCheck = {
    message: '身份证格式不正确',
    pattern: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
};
// 金额格式验证
export const PriceCheck = {
    message: '金额格式不正确',
    pattern: /^\d+(\.\d{1,2})?$/
};
// 纯数字验证
export const NumericCheck = {
    message: '请输入数字',
    pattern: /^[-+]?[0-9]+$/
};
// 纯字母验证
export const LetterCheck = {
    message: '请输入字母',
    pattern: /^[A-Za-z]+$/
};
// 字母加数字验证
export const LetterNumCheck = {
    message: '请输入字母或数字',
    pattern: /^[A-Za-z0-9]+$/
};
// 大写字母、小写字母、数字验证
export const CapitalNumCheck = {
    message: '请输入大写字母、小写字母、数字验证',
    pattern: /^([A-Z]|[a-z]|[0-9])*$/
};
// 字母加数字加中文验证
export const LetterNumCNCheck = {
    message: '请输入字母、数字或中文',
    pattern: /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[\w])*$/
};
// 中文验证
export const CNCheck = {
    message: '请输入中文',
    pattern: /^[\u4e00-\u9fa5]*$/
};
// 中文和标点符号验证
export const SymbolCNCheck = {
    message: '请输入中文',
    pattern: /^([\u4e00-\u9fa5]|(?=[\x21-\x7e]+)[^A-Za-z0-9])*$/
};

// 单位验证
export const UNITCheck = {
    message: '请输入...',
    pattern: /^.*/
};

// 只能输入正整数
export const PositiveInteger = {
    message: '只能输入整数',
    pattern: /^\d+$/
};

// 用户名
export const UNameCheck = {
    message: '请输入2-16位字母、数字或下划线,以字母开头',
    pattern: /^[a-zA-Z][a-zA-Z0-9_]{1,15}$/
};

// 姓名
export const CNameCheck = {
    message: '请输入2-10位中文、字母、数字或下划线,不能纯数字',
    pattern: /^(?!\d+$)[\u4E00-\uFA29a-zA-Z0-9_]{2,10}$/
};

// 密码
export const PwdCheck = {
    message: '请输入6-20位字母或数字',
    pattern: /^[A-Za-z0-9]{6,20}$/
};

