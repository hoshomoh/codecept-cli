const output = require('../../output');
const baseConfig = require('../../config').config;
const { safeFileWrite, makeFeatureConfig } = require("../../utils");

module.exports = function (featureName) {
    const config = { ...baseConfig };
    const {
        stepPath,
        featurePath,
        readableStepPath,
        readableFeaturePath
    } = makeFeatureConfig(config, featureName);

    output.print( `Creating feature and steps file for ${featureName}`);
    output.print('----------------------------------------------');

    if (safeFileWrite(featurePath)) {
        output.success(`Created feature file: ${readableFeaturePath}`);
    }

    // Generate step file for the just generated feature file.
    if (safeFileWrite(stepPath)) {
        output.success(`Created steps file: ${readableStepPath}`);
    }
};
