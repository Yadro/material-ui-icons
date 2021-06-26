const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const dependencies = require('./createSvgIcon-dependencies.json');
const fsUtils = require('./utils/fsUtils');
const npmCommands = require('./utils/npmCommands');

function copyToTemp() {
    return Promise.all(dependencies.map(dependecyFile => {
        const from = path.join('..', 'node_modules', dependecyFile);
        const to = path.join('temp', dependecyFile);

        return fsUtils.copyFile(from, to);
    })).catch(e => {
        console.error(e)
    })
}

function copyTempToNodeModulesAndRm() {
    const from = path.join('temp', '@material-ui');
    const to = path.join('..', 'node_modules', '@material-ui');

    console.log('copy', from, '->', to);
    fse.copySync(from, to);

    console.log('remove', from);
    fs.rmSync(from, { recursive: true });
    fs.rmdirSync('temp');
}

npmCommands.installMaterialUIDeps()
    .then(copyToTemp)
    .then(npmCommands.uninstallMaterialUIDeps)
    .then(copyTempToNodeModulesAndRm);