/* eslint-disable no-extend-native */
/* eslint-disable no-undef */
import qs from 'qs';
import axios from 'axios';
import emitter from './emitter';
import config from './config';
import info from '../constants/info';
// import { setSession, getSession } from './storage';
import { HttpMethod, ContentType, Event } from '../constants/enum';
import { isString, isFormData, isIE, isEmpty, isNotEmpty } from './util';

/**
 * @author Stephen Liu
 * @desc 使用axios第三方库访问后台服务器, 返回封装过后的Promise对象.
 * @param {string} url 请求的接口地址, 格式: "/xxx...".
 * @param {string} domain 跨域请求的域名地址, 如: http://www.baidu.com
 * @param {object} data 请求的数据, object对象格式.
 * @param {function} onUpload 上传文件过程中的回调函数, 接收progressEvent参数.
 * @param {function} onDownload 下载文件过程中的回调函数, 接收progressEvent参数.
 * @param {function} cancel 取消请求的回调函数, 接收cancel参数, 当执行cancel()参数时请求被取消.
 * @param {boolean} enableLoading 是否开启loading动画, 默认 type 为 POST 时显示.
 * @param {boolean} showError 是否显示消息提示, 大多数情况为错误提示, 默认true.
 * @param {string} type HTTP请求方式, 默认GET.
 * @param {boolean} cache 是否开启缓存, 开启后同样的请求(url相同, 参数相同), 第二次请求时会直接返回缓存数据, 不会请求后台数据, 默认false.
 * @param {number} timeout 配置请求超时时间, 为毫秒数, 默认从配置文件读取.
 * @param {boolean} messager 错误信息提示插件, 该插件为一个对象, 并且该对象需要有一个error方法, 方法接收一个错误消息.
 * @param {string} contentType HTTP请求头的Content-Type, 如: 'application/x-www-form-urlencoded'
 * @param {function} transformRequest 在发送请求前对请求数据进行预处理, 函数接收1个参数, 为请求的数据, 需要return处理后的数据.
 * @param {function} transformResponse 接受到响应后在resolve之前对响应数据进行预处理, 函数接受2个参数, 包括响应的数据和请求时的config对象, 需要return过滤后的数据.
 * @param {function} responseInterceptor 在resolve之前拦截resolve, 可根据返回的数据自定义Promise是resolve还是reject, 如success为false的情况.
 * @return {object} - 返回一个promise的实例对象.
 */
export default function HiggsPromise(args) {

    let options = {
        enableLoading: config.higgsPromise.enableLoading,
        showError: config.higgsPromise.showError,
        processError: config.higgsPromise.processError,
        type: config.higgsPromise.type,
        domain: config.higgsPromise.domain,
        cache: config.higgsPromise.cache,
        timeout: config.higgsPromise.timeout,
        messager: config.higgsPromise.messager,
        contentType: config.higgsPromise.contentType,
        transformRequest: config.higgsPromise.transformRequest,
        transformResponse: config.higgsPromise.transformResponse,
        responseInterceptor: config.higgsPromise.responseInterceptor,
        ...args
    };

    let {
        url,
        domain,
        data,
        onUpload,
        onDownload,
        cancel,
        enableLoading,
        showError,
        type,
        timeout,
        messager,
        cache,
        contentType,
        transformRequest,
        transformResponse,
        responseInterceptor
    } = options;

    let getData, postData, crossDomain = false;

    if (isEmpty(url)) {
        return Promise.resolve();
    }

    // 预处理数据
    if(transformRequest){
        data = transformRequest.call(options, data);
    }

    // type 为 POST 的请求会将参数转化为 formData 传递
    if (type === HttpMethod.POST || type === HttpMethod.PUT) {
        postData = data;
        // 根据配置的 contentType 对数据进一步处理
        // eslint-disable-next-line default-case
        switch (contentType){
            case ContentType.FORM_URLENCODED:
                if(isNotEmpty(postData) && !isFormData(postData)){
                    postData = qs.stringify(postData, {allowDots: true});
                }
                break;
        }
    } else {
        // 接口必传的角色信息 
        // data = data ? {...data, sdId: getLocal('sdId')} : {sdId: getLocal('sdId')};
        getData = data;
    }

    if (isNotEmpty(domain)) {
        crossDomain = true;
    }

    if (isNotEmpty(cancel)) {
        cancelToken = new axios.CancelToken(cancel);
    }

    if(!/^\//.test(url)){
        url = '/' + url;
    }
    
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === 'development') {
        
        // 开发阶段都需要跨域
        if (!crossDomain) {
            crossDomain = true;
        }
        log({url, domain, type, data}, 'Request');
    }

    if(!cache) {
        if(url.indexOf('?') > -1){
            url += `&t=${new Date().getTime()}`;
        }else{
            url += '?t=' + new Date().getTime();
        }
    }

    showLoading(type, enableLoading);

    let promise = new Promise(function (resolve, reject) {
        if (contentType === ContentType.FILE) {
            try {
                let params = qs.stringify(getData, {allowDots: true});
                url = url + (url.indexOf('?') > -1 ? '&' : '?') + params;
                resolve(url);
            } catch (e) {
                reject(e);
            }
        } else {
            // if (setSession('proID')) {
            //     axios.defaults.headers.projectId = getSession('proID');
            // }
            // if(getSession('CURRENT_USER_INFO')) {
            //     axios.defaults.headers.Authorization = getSession('CURRENT_USER_INFO').token;
            // }
            axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            axios.defaults.headers.post['Content-Type'] = contentType;
            axios({
                method: type,
                baseURL: domain,
                url: url,
                timeout: timeout,
                params: getData,
                data: postData,
                withCredentials: crossDomain,       // 跨域请求带cookie
                onUploadProgress: onUpload,
                onDownloadProgress: onDownload,
                // cancelToken: cancelToken,
                transformResponse: [function (data) {
                    if (isString(data)) {
                        try {
                            data = JSON.parse(data);
                        } catch (e) {
                            try {
                                /* eslint-disable no-eval */
                                // data = eval('(' + data + ')');
                                /* eslint-enable no-eval */
                            } catch (e) {
                                console.error(info['DATA_TRANSFORM_ERROR'], e);
                                reject(e);
                                return;
                            }
                        }
                    }

                    if (transformResponse && isNotEmpty(data)) {
                        data = transformResponse(data);
                    }
                    return data;
                }]
            }).then(function (response) {
                hideLoading(response.config, enableLoading);
                
                if (responseInterceptor) {
                    responseInterceptor.call(options, response.data, resolve, reject);
                } else {
                    resolve(response.data);
                }
            }).catch(function (error) {
                hideLoading({method: type}, enableLoading);
                // 服务端返回的异常
                if (error.response) {
                    if (showError) {
                        messager && messager.error(info['SYSTEM_ERROR']);
                    }
                    console.error(error.response);
                    reject(error.response);
                    // 浏览器抛出的异常, 不同浏览器可能有不同的行为
                } else {
                    if (showError) {
                        /*
                         * HACK: 此处做延迟处理是为解决firefox上多请求的弹窗bug
                         */
                        setTimeout(() => {
                            messager && messager.error(info['BROWSER_ERROR']);
                        }, 1000);
                    }
                    console.error(error);
                    reject(error);
                }
            });
        }
    });

    return promise;
}

function showLoading(method, isShow) {
    if (isShow || (isShow === null && method === HttpMethod.POST)) {
        emitter.emit(Event.SHOW_LOADING);
    }
}

function hideLoading(config, isShow) {
    if (isShow || (isShow === null && config.method === HttpMethod.POST)) {
        emitter.emit(Event.HIDE_LOADING);
    }
}

function log(data, title) {
    /* eslint-disable no-console */
    if (title) {
        console.log(title + ' start');
    }

    if(isIE()){
        console.log(JSON.stringify(data));
    }else{
        console.log(data);
    }

    if (title) {
        console.log(title + ' end');
    }
    /* eslint-enable no-console */
}

Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback(value)).then(() => value),
        reason => P.resolve(callback(reason)).then(() => {
            throw reason;
        })
    );
};