const EventEmitter = require('events');

class Dirwatcher extends EventEmitter {
    constructor() {
        this.filesN = null;
        this.filesTmp = [];
    }

    watch(path, delay) {
        setInterval((path) => {
            fs.read(path, (eventType, files) => {
                if(this.filesTmp && areTheySameArray(files, this.filesTmp)) {

                }
                if (eventType) {
                    emitter.emit('changed', filename);
                } else {
                  console.log('no changes');
                }
              });
        }, delay)
    };
}


let myWatcher = Dirwatcher('./path');

let myImpoeter = impoter(myWatcher);



emitter.on('changed', function)

export default Dirwatcher;