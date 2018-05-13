const EventEmitter = require('events');
const path = require('path');
const fs = require('fs');

class DirWatcher extends EventEmitter {
    constructor() {
        super();
        this.filesList = null;
    }

    findDiff(files, dirPath) {
        let diff = {};
        let addedFiles, deletedFiles;

        if (this.filesList === null) {
            addedFiles = files;
        } else {
            addedFiles = files.filter(x => !this.filesList.includes(x));
            deletedFiles = this.filesList.filter(x => !files.includes(x));
        }

        if (addedFiles && addedFiles.length > 0) {
            diff.addedFiles = addedFiles.map((fileName) => path.join(dirPath, fileName));
        }
        if (deletedFiles && deletedFiles.length > 0) {
            diff.deletedFiles = deletedFiles.map((fileName) => path.join(dirPath, fileName));
        }

        return diff;
    }

    watch(path, delay) {

        setInterval((path) => {

            fs.readdir(path, (err, files) => {
                if(err) {
                    throw err;
                } else if (files && files.length > 0) {
                    let diff = this.findDiff(files, path);
                    if (diff && Object.keys(diff).length > 0) {
                        if(diff.addedFiles && diff.addedFiles.length > 0) {
                            diff.addedFiles.forEach(filePath => {
                                this.emit('changed', filePath);
                            });
                        }
                    }
                    this.filesList = files;
                }
            });

        }, delay, path);
    };
}

export default DirWatcher;