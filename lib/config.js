const mainCmd = "node_modules/.bin/codeceptjs";

exports.config = {
    stepsDir: "./step_definitions",
    featuresDir: "./features",
    mainCmd,
    snippetGeneratorCmd:  `${mainCmd} gherkin:snippets`,
};
