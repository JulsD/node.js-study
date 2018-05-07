const EventEmitter = require('events');

class Dirwatcher extends EventEmitter {
    constructor() {
        this.filesN = null;
    }

    watch(path, delay) {
        setTimeout((path) => {
            fs.watch(path);
        }, delay)
    };
}

export default Dirwatcher;