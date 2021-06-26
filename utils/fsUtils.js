const fs = require('fs');
const path = require('path');

/**
 * @param {fs.PathLike} path 
 * @param {fs.StatOptions} options 
 * @returns 
 */
function stat(path, options) {
    return new Promise((resolve, reject) => {
        try {
            fs.stat(path, options, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        } catch (err) {
            reject(err);
        }
    });
}

function copyFile(from, to) {
    return new Promise((resolve, reject) => {
        const toPath = path.dirname(to);
        const toPathExists = fs.statSync(toPath, { throwIfNoEntry: false })
        if (!toPathExists) {
            console.log('mkdir', toPath);
            fs.mkdirSync(toPath, { recursive: true });
        }
        const toFileExists = fs.statSync(to, { throwIfNoEntry: false });
        if (!toFileExists) {
            fs.copyFile(from, to, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('copyFile', from, '->', to);
                    resolve();
                }
            });
        } else {
            resolve();
        }
    });
}

module.exports = {
    stat,
    copyFile,
}