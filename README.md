# codecept-cli
Helper functions and commands for CodeceptJs.

## Installing
```node
npm i codecept-cli -D
```

## Commands

### Generators

Available generators.

---

Generates a feature and steps file for a new feature. The feature file is saved in `feature` folder while the steps file is saved in the `step_definitions` folder.

```sh
npx codecept-cli bdd:feature <featureName>
```
(use node node_modules/.bin/codecept-cli if you have issues with npx)

Save or updates the steps file for a feature with the BDD snippets. You will normally run this after updating the feature file of a feature. This commands assumes that your steps files are saved in tye `step_definitions` folder.

```sh
npx codecept-cli bdd:snippets <featureName>
```

### Codeceptjs Commands

All codeceptjs commands documented [here](https://codecept.io/commands/) will also work with the CLI. 

```sh
npx codecept-cli <codecept-command>
```

## Helpers

Available helpers.

---

Dynamically load steps files in the `step_definitions` folder without having to manually update your codecep.conf.js file.

```sh
const { helper } = require("./codecept-cli");

gherkin: {
    features: './features/*.feature',
    steps: helper.getStepFiles()
},
````

