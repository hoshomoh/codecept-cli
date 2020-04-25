# codecept-cli
Helper functions and commands for CodeceptJs.

## Installing
```node
npm i codecept-cli -D
```

## Usage
```node
npx codecept-cli <command>

or

node node_modules/.bin/codecept-cli <command>
```

## Commands

### Generators

Available generators.

---

Initializes your codeceptjs project for BDD by adding a gherking config to your `codecept.conf.js` file. This runs the same command as documented [here](https://codecept.io/bdd/#gherkin)

```sh
npx codecept-cli bdd:init
```

---

Generates a feature and steps file for a new feature. The generated feature file is saved in `features` folder while the generated steps file is saved in the `step_definitions` folder.

```sh
npx codecept-cli bdd:feature <featureName>
```

Add optional parameter `steps-path` (or shortform -s), if your steps definition files are not in the `step_definitions` folder. E.g:

```sh
npx codecept-cli bdd:feature login --steps-path ./steps
npx codecept-cli bdd:feature login -s ./steps
```

Add optional parameter `features-path` (or shortform -f), if your feature files are not in the `feature` folder. E.g:

```sh
npx codecept-cli bdd:feature login --features-path ./bdd-features
npx codecept-cli bdd:feature login -f ./bdd-features
```

---

Save or updates the steps file for a feature with the BDD snippets. You will normally run this after updating the feature file of a feature. This commands assumes that your steps files are saved in tye `step_definitions` folder.

```sh
npx codecept-cli bdd:snippets <featureName>
```

Add optional parameter `steps-path` (or shortform -s), if your steps definition files are not in the `step_definitions` folder. E.g:

```sh
npx codecept-cli bdd:snippets login --steps-path ./steps
npx codecept-cli bdd:snippets login -s ./steps
```

Add optional parameter `features-path` (or shortform -f), if your feature files are not in the `feature` folder. E.g:

```sh
npx codecept-cli bdd:snippets login --features-path ./bdd-features
npx codecept-cli bdd:snippets login -f ./bdd-features
```

### Codeceptjs Commands

All codeceptjs commands documented [here](https://codecept.io/commands/) will also work with the CLI. 

```sh
npx codecept-cli <codecept-command>
```

## Helpers

Available helpers.

---

Dynamically load steps files in the `step_definitions` folder without having to manually update your `codecept.conf.js` file.

```sh
const { helper } = require("./codecept-cli");

gherkin: {
    features: './features/*.feature',
    steps: helper.getStepFiles()
},
```

Pass optional parameter `stepsPath` to the `getStepFiles` helper function, if your steps definition files are not in the `step_definitions` folder. E.g:

```sh
const { helper } = require("./codecept-cli");

gherkin: {
    features: './features/*.feature',
    steps: helper.getStepFiles('./steps')
},

