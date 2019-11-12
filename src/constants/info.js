/**
 * @desc 系统提示信息, 包括错误信息提示, 方便后期做国际化
 */
import {
    UserLevel,
    UserStatus,
    ReportStatus,
    AccountStatus,
    AccountType,
} from './enum';

export default {
    500: '网络繁忙, 请稍后再试',
    REQUIRED_TOKEN_ERROR: '登录过期,请重新登录',
    SYSTEM_ERROR: '网络繁忙, 请稍后再试',
    BROWSER_ERROR: '网络繁忙, 请稍后再试',
    RESPONSE_ERROR: '请求数据异常',
    DATA_TRANSFORM_ERROR: '数据转换异常',
    UPLOAD_FILE_SIZE_ERROR: '上传文件不能大于2M',
    UPLOAD_FILE_TYPE_ERROR: '上传格式有误'
};

export const ReportStatusText = {
    [ReportStatus.FAIL]: '生成失败',
    [ReportStatus.SUCCESS]: '生成成功'
};

export const AccountStatusText = {
    [AccountStatus.ENABLE]: '启用',
    [AccountStatus.DISABLE]: '禁用'
};

export const AccountTypeText = {
    [AccountType.ADMIN]: '管理员',
    [AccountType.NORMAL]: '普通用户'
};

/**
 * @desc Demo
 * 根据用户等级, 在页面显示对应的中文, 正式开发时请删除 Demo 代码段.
 */
export const UserLevelText = {
    [UserLevel.NORMAL]: '普通会员',
    [UserLevel.VIP]: 'VIP会员'
};

export const UserStatusText = {
    [UserStatus.ENABLE]: '启用',
    [UserStatus.DISABLE]: '禁用'
};
/**
 * Demo end
 */
