const fs = require('fs');
const path = require('path');
const output = require('./output');

function fileExists (filePath) {
  try {
    fs.statSync(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') return false;
  }
  return true;
}

function safeFileWrite (file, contents = "") {
  if (fileExists(file)) {
    output.say(`File ${file} already exist, skipping...`);
    return false;
  }
  fs.writeFileSync(file, contents);
  return true;
}

module.exports.isFile = function (filePath) {
  let fileStat;
  try {
    fileStat = fs.statSync(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') return false;
  }
  if (!fileStat) return false;
  return fileStat.isFile();
};

module.exports.makeFeatureConfig = function (config, featureName) {
  const stepFile = `${featureName}.steps.js`;
  const featureFile = `${featureName}.feature`;
  const stepPath = path.resolve(config.stepsDir, stepFile);
  const featurePath = path.resolve(config.featuresDir, featureFile);
  const readableStepPath = `${config.stepsDir}/${stepFile}`;
  const readableFeaturePath = `${config.featuresDir}/${featureFile}`;

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
module.exports.fileExists = fileExists;



