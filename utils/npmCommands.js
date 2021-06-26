const { rejects } = require("assert");
const { spawn } = require("child_process");

function executeCommand(command, args) {
    return new Promise((resolve, reject) => {
        console.info(`> ${command} ${args}`);
        const process = spawn(command, args);
        process.stdout.on("data", data => {
            console.log(data.toString());
        });
        process.stderr.on("data", data => {
            console.warn(data.toString());
        });
        process.on('error', (error) => {
            console.error(`error: ${error.message}`);
            reject(error);
        });
        process.on("close", code => {
            console.log(`child process exited with code ${code}`);
            resolve();
        });
    });
}

function executeNpmCommand(args) {
    const npmCommand = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
    return executeCommand(npmCommand, args)
}

const NPM_PKG_MATERIAL_UI = '@material-ui/core';

function installMaterialUIDeps() {
    return executeNpmCommand(['i', NPM_PKG_MATERIAL_UI]);
}

function uninstallMaterialUIDeps() {
    return executeNpmCommand(['remove', NPM_PKG_MATERIAL_UI]);
}

module.exports = {
    installMaterialUIDeps,
    uninstallMaterialUIDeps,
}