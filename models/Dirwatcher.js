import EventEmitter from 'events';
import path from 'path';
import { readdir } from 'fs';


class DirWatcher extends EventEmitter {
    constructor() {
        super();
        this.filesList = [];
    }

    isNewFilesAdded(diff) {
        return diff && diff.addedFiles && diff.addedFiles.length > 0
    }

    findDiff(files, dirPath) {
        let addedFiles, deletedFiles;

        if (!this.filesList.length) {
            addedFiles = files;
        } else {
            addedFiles = files.filter(x => !this.filesList.includes(x));
            deletedFiles = this.filesList.filter(x => !files.includes(x));
        }

        return {addedFiles, deletedFiles};
    }

    watch(dirPath, delay) {
        setInterval((dirPath) => {
            readdir(dirPath, (err, files) => {
                if(err) throw err;
                if (files && files.length > 0) {
                    let diff = this.findDiff(files, dirPath);
                    if (this.isNewFilesAdded(diff)) {
                        diff.addedFiles
                            .map((fileName) => path.join(dirPath, fileName))
                            .filter(e => e.split('.').pop() === 'csv')
                            .forEach(filePath => this.emit('changed', filePath));
                    }
                    this.filesList = files;
                }
            });
        }, delay, dirPath);
    };
}

export default DirWatcher;