const output = require('../../output');
const baseConfig = require('../../config').config;
const { exec } = require('child_process');
const { fileExists, makeFeatureConfig } = require('../../utils');

module.exports = function (featureName) {
    const config = { ...baseConfig };
    const {
        stepPath,
        featurePath,
        readableStepPath,
        readableFeaturePath
    } = makeFeatureConfig(config, featureName);

    if (!fileExists(stepPath)) {
        output.error(`Step file ${readableStepPath} does not exist`);
        return;
    }

    if (!fileExists(featurePath)) {
        output.error(`Feature file ${readableFeaturePath} does not exist`);
        return;
    }

    exec(`${config.snippetGeneratorCmd} --path=${stepPath} --feature=${featurePath}`, (err, stdout, stderr) => {
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
