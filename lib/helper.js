const fs = require('fs');
const path = require('path');
const baseConfig = require('./config').config;

class Helper {
  constructor(config) {
    this.config = {
      ...baseConfig,
      ...config
    };
  }

  getStepFiles = () => {
    const stepDir = this.config.stepsDir;

    return fs.readdirSync(stepDir).filter((file) => {
      return !/^\..*/.test(file)
    }).map((file) => {
      return path.resolve(stepDir, file);
    });
  };
}

module.exports = new Helper();
