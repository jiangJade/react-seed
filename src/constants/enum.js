// http协议method
export const HttpMethod = {
    GET: 'get',
    POST: 'post',
    DELETE: 'delete',
    PUT: 'put'
};

// http协议头Content-Type
export const ContentType = {
    FILE: 'file', // 自定义的文件类型
    JSON: 'application/json',
    FORM_URLENCODED: 'application/x-www-form-urlencoded'
};

export const API = {
    // eslint-disable-next-line no-undef
    V1: process.env.NODE_ENV === 'development' ? "/api" : ""
};

export const Event = {
    SHOW_LOADING: 'SHOW_LOADING',
    HIDE_LOADING: 'HIDE_LOADING',
    PIC_LOA_CHANGE: 'PIC_LOA_CHANGE'
};

// export const API = {
//     V1: '/api/v1.0'
// };

// 报告生成状态 0：失败 1：成功
export const ReportStatus = {
    FAIL: 0,
    SUCCESS: 1
};

// 用户账号状态
export const AccountStatus = {
    ENABLE: 1,
    DISABLE: 0
};

// 用户账号状态
export const AccountType = {
    NORMAL: 2,
    ADMIN: 1
};

/**
 * @desc Demo
 * 类型或状态封装示例代码, 正式开发时请删除 Demo代码段.
 * 后端返回类型或状态字段时一般为, 数字或字符串, 如: 0, 1 或 'BUSY', 'FREE'
 * 前端应封装为对象使用(如: UserLevel.NORMAL), 这样代码清晰, 便于维护.
 */
export const UserLevel = {
    NORMAL: 0,
    VIP: 1
};

export const UserStatus = {
    ENABLE: 'enable',
    DISABLE: 'disable'
};
/**
 * Demo end
 */
