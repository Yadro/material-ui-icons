const fse = require('fs-extra');
const path = require('path');
const dependencies = require('./createSvgIcon-dependencies.json');
const utils = require('./utils/fsUtils');
const npmCommands = require('./utils/npmCommands');

function copyToTemp() {
    return Promise.all(dependencies.map(dependecyFile => {
        const from = path.join('..', 'node_modules', dependecyFile);
        const to = path.join('temp', dependecyFile);

        return utils.copyFile(from, to);
    })).catch(e => {
        console.error(e)
    })
}

function copyToNodeModules() {
    const from = path.join('temp', '@material-ui');
    const to = path.join('..', 'node_modules', '@material-ui');
    fse.copySync(from, to);
}

npmCommands.installMaterialUIDeps()
    .then(copyToTemp)
    .then(npmCommands.uninstallMaterialUIDeps)
    .then(copyToNodeModules);