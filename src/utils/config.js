/* eslint-disable no-restricted-globals */
/**
 * @desc 项目配置文件
 */
// import info from '../constants/info';
import messager from './messager';
// import StatusCode from '../constants/statusCode';
import { HttpMethod, ContentType} from '../constants/enum';
import { CURRENT_USER_INFO } from '../constants/common';
import { isEmpty } from './util';
import { getSession } from './storage';

export default {
    messagerDuration: 2,                        // 系统提示信息显示时间, 默认3秒
    higgsPromise: {                             // higgsPromise默认配置
        cache: false,
        // domain: urlAll.url, // url = base url + request url
        timeout: 10000,
        showError: true,
        processError: true,
        messager: messager,
        enableLoading: null,                       // 默认post请求时会显示loading动画
        type: HttpMethod.GET,                      // 默认请求方式
        contentType: ContentType.JSON,   // API接口请求默认发送的contentType
        responseInterceptor: function(data, resolve, reject) {
            // 根据接口返回数据判断是否请求成功 (1:成功；0:失败；403:未登录)
            if (Number(data.code) === 0) {
                resolve(data);
            } else {
                let errorMessage;
                // 默认错误处理

                if (this.processError && data.resultMsg !== '用户名密码错误') {
                    const userInfo = getSession(CURRENT_USER_INFO) || {};
                    if(isEmpty(userInfo.username)) {
                        window.location.replace("/");
                    }
                    // clear();  // 清除缓存--storage
                }
                if (errorMessage) {
                    data.msg = errorMessage;
                }
                reject(data);
            }
        }
    }
};