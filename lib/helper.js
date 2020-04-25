const fs = require('fs');
const path = require('path');
const baseConfig = require('./config').config;
const { fileOrFolderExists } = require('./utils');

class Helper {
  constructor(config) {
    this.config = {
      ...baseConfig,
      ...config
    };
  }

  getStepFiles = (customStepsPath) => {
    const stepsPath = customStepsPath || this.config.stepsPath;

    if (!fileOrFolderExists(stepsPath, true)) {
      throw new Error(`The steps definition path ${stepsPath} does not exist.`);
    }

    return fs.readdirSync(stepsPath).filter((file) => {
      return !/^\..*/.test(file)
    }).map((file) => {
      return path.resolve(stepsPath, file);
    });
  };
}

module.exports = new Helper();
