#!/usr/bin/env node
const commander = require('commander');
const codeceptHandler = require('../lib/commands/codecept');

commander.usage('[command] [options]');
commander.version('1.0.0');

commander.command('bdd:feature <name>')
    .description('Generate feature and step file for a feature.')
    .option('-s, --steps-path <stepsPath>', 'step definitions path if not "step_definitions"')
    .option('-f, --features-path <featuresPath>', 'features path if not "features"')
    .action(require('../lib/commands/generator/feature'));

commander.command('bdd:snippets <name>')
    .description('Generate snippets for a feature.')
    .option('-s, --steps-path <stepsPath>', 'step definitions path if not "step_definitions"')
    .option('-f, --features-path <featuresPath>', 'features path if not "features"')
    .action(require('../lib/commands/generator/snippet'));

commander.on('command:*',  (cmd) => {
  codeceptHandler(cmd);
});

commander.parse(process.argv);
