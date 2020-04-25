const fs = require('fs');
const path = require('path');
const output = require('./output');
const baseConfig = require('./config').config;

const fileOrFolderExists = (fileOrFolderPath, dirCheck = false) => {
  try {
    const stats = fs.statSync(fileOrFolderPath);
    if (!stats) return false;
    if (dirCheck) return stats.isDirectory();

    return stats.isFile;
  } catch (err) {
    return false;
  }
};

const safeFileWrite = (file, contents = "") => {
  if (fileOrFolderExists(file)) {
    output.say(`File ${file} already exist, skipping...`);
    return false;
  }

  fs.writeFileSync(file, contents);
  return true;
};

const getConfigFromArgs = (args) => {
  const { stepsPath, featuresPath } = args;
  const config = {};

  if (stepsPath) config.stepsPath = stepsPath;
  if (featuresPath) config.featuresPath = featuresPath;

  return config;
};

module.exports.makeFeatureConfig = function (featureName, args) {
  const config = { ...baseConfig, ...getConfigFromArgs(args) };

  if (!fileOrFolderExists(config.stepsPath, true)) {
    output.error(`The steps definition path ${config.stepsPath} does not exist.`);
    return {};
  }

  if (!fileOrFolderExists(config.featuresPath, true)) {
    output.error(`The features path ${config.featuresPath} does not exist.`);
    return {};
  }

  const stepFile = `${featureName}.steps.js`;
  const featureFile = `${featureName}.feature`;
  const stepPath = path.resolve(config.stepsPath, stepFile);
  const featurePath = path.resolve(config.featuresPath, featureFile);
  const readableStepPath = `${config.stepsPath}/${stepFile}`;
  const readableFeaturePath = `${config.featuresPath}/${featureFile}`;

  return {
    stepFile,
    featureFile,
    stepPath,
    featurePath,
    readableStepPath,
    readableFeaturePath
  }
};

module.exports.safeFileWrite = safeFileWrite;
module.exports.fileOrFolderExists = fileOrFolderExists;



