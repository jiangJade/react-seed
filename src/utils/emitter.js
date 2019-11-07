import events from 'events';

/**
 * @desc 用于全局事件绑定和响应, 具体可参考higgsPromise的使用
 */
const emitter = new events.EventEmitter();

export default emitter;