const colors = require('chalk');
const figures = require('figures');

const styles = {
  error: colors.bgRed.white.bold,
  success: colors.bgGreen.white.bold,
  debug: colors.cyan,
  log: colors.grey,
  bold: colors.bold,
};

let outputLevel = 0;
let outputProcess = '';
let newline = true;

/**
 * @alias output
 * @namespace
 */
module.exports = {
  colors,
  styles,
  print,
  /** @type {number} */
  stepShift: 0,

  /**
   * Set or return current verbosity level
   * @param {number} level
   * @return {number}
   */
  level(level) {
    if (level !== undefined) outputLevel = level;
    return outputLevel;
  },

  /**
   * Print information in --debug mode
   * @param {string} msg
   */
  debug(msg) {
    if (outputLevel >= 2) {
      print(' '.repeat(this.stepShift), styles.debug(`${figures.pointerSmall} ${msg}`));
    }
  },

  /**
   * Print information in --verbose mode
   * @param {string} msg
   */
  log(msg) {
    if (outputLevel >= 3) print(' '.repeat(this.stepShift), styles.log(truncate(`   ${msg}`)));
  },

  /**
   * Print error
   * @param {string} msg
   */
  error(msg) {
    print(styles.error(msg));
  },

  /**
   * Print a successful message
   * @param {string} msg
   */
  success(msg) {
    print(styles.success(msg));
  },

  /**
   *
   * Print a text in console log
   * @param {string} message
   * @param {string} [color]
   */
  say(message, color = 'cyan') {
    print(`   ${colors[color].bold(message)}`);
  }
};

function print(...msg) {
  if (outputProcess) {
    msg.unshift(outputProcess);
  }
  if (!newline) {
    console.log();
    newline = true;
  }

  console.log.apply(this, msg);
}

function truncate(msg, gap = 0) {
  if (msg.indexOf('\n') > 0) {
    return msg; // don't cut multi line steps
  }
  const width = (process.stdout.columns || 200) - gap - 4;
  if (msg.length > width) {
    msg = msg.substr(0, width - 1) + figures.ellipsis;
  }
  return msg;
}
