const output = require('../../output');
const { exec } = require('child_process');
const { snippetGeneratorCmd  } = require('../../config').config;
const { fileOrFolderExists, makeFeatureConfig } = require('../../utils');

module.exports = function (featureName, args) {
    const {
        stepPath,
        featurePath,
        readableStepPath,
        readableFeaturePath
    } = makeFeatureConfig(featureName, args);

    if (!stepPath || !featurePath) return;

    if (!fileOrFolderExists(stepPath)) {
        output.error(`Step file ${readableStepPath} does not exist`);
        return;
    }

    if (!fileOrFolderExists(featurePath)) {
        output.error(`Feature file ${readableFeaturePath} does not exist`);
        return;
    }

    exec(`${snippetGeneratorCmd} --path=${stepPath} --feature=${featurePath}`, (err, stdout, stderr) => {
        if (err) {
            output.error(`${err.message}`);
            return;
        }

        if (stderr) {
            output.error(`${stderr}`);
            return;
        }

        output.say(`${stdout}`, 'green');
    });
};
