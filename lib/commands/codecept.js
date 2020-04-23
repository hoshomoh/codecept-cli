const output = require('../output');
const baseConfig = require('../config').config;
const { exec } = require('child_process');

module.exports = function (cmd) {
  exec(`${baseConfig.mainCmd} ${cmd}`, (err, stdout, stderr) => {
    if (err) {
      output.error(`${err.message}`);
      return;
    }

    if (stderr) {
      output.error(`${stderr}`);
      return;
    }

    console.log(`${stdout}`);
  });
};
