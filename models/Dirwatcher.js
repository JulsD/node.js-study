const EventEmitter = require('events');
const fs = require('fs');

class DirWatcher extends EventEmitter {
    constructor() {
        super();
        this.files_data = null;
    }

    findDiff(files) {
        let diff = {};

        if (this.files_data === null) {
            diff.addedFiles = files;
        } else {
            console.log('diff check');
            let addedFiles = files.filter(x => !this.files_data.includes(x));
            let deletedFiles = this.files_data.filter(x => !files.includes(x));
            if (addedFiles && addedFiles.length > 0) {
                diff.addedFiles = addedFiles;
            }
            if (deletedFiles && deletedFiles.length > 0) {
                diff.deletedFiles = deletedFiles;
            }
        }
        return diff;
    }

    watch(pathString, delay) {

        setInterval((pathString) => {

            fs.readdir(pathString, (err, files) => {

                if(err) {
                    throw err;
                } else if (files && files.length > 0) {
                    let diff = this.findDiff(files);
                    if (diff && Object.keys(diff).length > 0) {
                        // this.emit('files_updated', diff);
                        console.log('diff found: ', diff);
                    } else {
                        console.log('diff: nothing');
                    }
                    this.files_data = files;
                }

            });
            
        }, delay, pathString);
    };
}

export default DirWatcher;