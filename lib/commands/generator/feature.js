const output = require('../../output');
const { safeFileWrite, makeFeatureConfig } = require("../../utils");

module.exports = function (featureName, args) {
    const {
        stepPath,
        featurePath,
        readableStepPath,
        readableFeaturePath
    } = makeFeatureConfig(featureName, args);

    if (!stepPath || !featurePath) return;

    output.print( `Creating feature and steps file for ${featureName}`);
    output.print('----------------------------------------------');

    if (safeFileWrite(featurePath)) output.success(`Created feature file: ${readableFeaturePath}`);

    // Generate step file for the just generated feature file.
    if (safeFileWrite(stepPath)) output.success(`Created steps file: ${readableStepPath}`);
};
