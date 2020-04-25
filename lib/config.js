const mainCmd = "node_modules/.bin/codeceptjs";

exports.config = {
    stepsPath: "./step_definitions",
    featuresPath: "./features",
    mainCmd,
    snippetGeneratorCmd:  `${mainCmd} gherkin:snippets`,
};
