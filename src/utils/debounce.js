
// 防抖
export function debounce(func, wait, immediate) {
    let timeout, result;

    let debounced = function() {
        let context = this;
        let args = arguments;

        if (timeout) {
            clearTimeout(timeout);
        }

        if (immediate) {
            // 如果已经执行过，不再执行
            let callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait);

            if (callNow) {
                result = func.apply(context, args);
            }
        } else {
            timeout = setTimeout(function(){
                func.apply(context, args);
            }, wait);
        }

        return result;
    };

    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}

// 节流
export function throttle(func, wait) {
    let timeout, previous = 0;

    let throttled = function() {
        let now = +new Date();
        let context = this;
        let args = arguments;
        // 下次触发 func 剩余的时间
        let remaining = wait - (now - previous);

        // 如果没有剩余的时间了或者你改了系统时间
        if(remaining <= 0 || remaining > wait) {
            if(timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, arguments);
        } else if(!timeout){
            timeout = setTimeout(function () {
                previous = +new Date();
                timeout = null;
                func.apply(context, args);
            }, remaining);
        }
    };

    throttled.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return throttled;
}
