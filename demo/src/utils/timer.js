class Timer {
    constructor() {
        //记录定时器数据
        this.record = {}
        this.minInterval = 1000 / 60
    }
    
    loop(type, callback, delay) {
        if (!['interval', 'timeout'].includes(type)) return;
        if (!this.record[type]) this.record[type] = {}

        //记录开始时间
        let startTime = Date.now();
        const record = Symbol(type);

        //循环执行计算时间间隔
        const loopStart = () => {

            this.setRecord(record, type, loopStart);
            //获取当前时间
            let currentTime = Date.now();
     
            if (currentTime - startTime >= delay) {
        
                if (type == "timeout") {

                    //此条件执行timeout
                    callback && callback()
                    this.clear({ record, type })

                } else if (type == "interval") {

                    //此条件执行interval
                    startTime = Date.now();
                    callback && callback();

                }

            }
        }
        
        //定时! 启动!
        this.setRecord(record, type, loopStart);

        return { record, type }

    }
    
    //记录 raf 的id
    setRecord(record, type, callback) {
        const id = window.requestAnimationFrame(callback)
        this.record[type][record] = id;
    }
    //模拟 setInterval 方法
    interval(callback, delay = 1000) {
        delay = delay < this.minInterval ? this.minInterval : delay;
        return this.loop("interval", callback, delay);
    }
    //模拟 setTimeout 方法
    timeout(callback, delay = 1000) {
        delay = delay < this.minInterval ? this.minInterval : delay;
        return this.loop("timeout", callback, delay);
    }
    //清除定时器方法
    clear(timer) {
        if(!timer) return
        const { record, type } = timer
        window.cancelAnimationFrame(this.record[type][record]);
        this.record[type][record] = null
    }
}

const TimerFunc = ["loop", "setRecord", "interval", "timeout", "clear"];

for (const func of TimerFunc) {
    Object.defineProperty(Timer.prototype, func, {
        writable: false,
        configurable: false,
    })
}

export {
    Timer
}