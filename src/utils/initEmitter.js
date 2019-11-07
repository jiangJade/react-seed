class Public {
    constructor() {
        this.handlers = {};
    }
    on(eventType, handler) {
        let self = this;
        if (!(eventType in self.handlers)) {
            self.handlers[eventType] = [];
        }
        self.handlers[eventType].push(handler);
            
        return this;
    }
    emit(eventType) {
        let self = this;
        let handlerArgs = Array.prototype.slice.call(arguments, 1);
        for (let i = 0; i < self.handlers[eventType].length; i++) {
            self.handlers[eventType][i].apply(self, handlerArgs);
        }
        return self;
    };
    off(eventType, handler) {
        let currentEvent = this.handlers[eventType];
        let len = 0;
        if (currentEvent) {
            len = currentEvent.length;
            for (let i = len - 1; i >= 0; i--) {
                if (currentEvent[i] === handler) {
                    currentEvent.splice(i, 1);
                }
            }
        }
        return this;
    }
}
        
export const _Public = new Public();