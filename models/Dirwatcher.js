import EventEmitter from 'events';
import path from 'path';
import { readdir } from 'fs';


class DirWatcher extends EventEmitter {
    constructor(filesList = [], addedFiles = [], deletedFiles = []) {
        super();
        this.filesList = filesList;
        this.addedFiles = addedFiles;
        this.deletedFiles = deletedFiles;
    }

    findDiff(files, dirPath) {
        if (!this.filesList.length) {
            this.addedFiles = files;
        } else {
            this.addedFiles = files.filter(x => !this.filesList.includes(x));
            this.deletedFiles = this.filesList.filter(x => !files.includes(x));
        }
    }

    watch(dirPath, delay) {
        setInterval((dirPath) => {
            readdir(dirPath, (err, files) => {
                if(err) throw err;
                if (files && files.length > 0) {
                    this.findDiff(files, dirPath);
                    if (this.addedFiles.length > 0) {
                        this.addedFiles
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