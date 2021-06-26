const fs = require('fs');
const path = require('path');
const dependencies = require('./createSvgIcon-dependencies.json');
const utils = require('./utils/fsUtils');
const npmCommands = require('./utils/npmCommands');

function copyToTemp() {
    return Promise.all(dependencies.map(dependecyFile => {
        const from = path.join('node_modules', dependecyFile);
        const to = path.join('temp', dependecyFile);

        return utils.copyFile(from, to);
    })).catch(e => {
        console.error(e)
    })
}

npmCommands.installMaterialUIDeps()
    .then(copyToTemp)
    .then(npmCommands.uninstallMaterialUIDeps)