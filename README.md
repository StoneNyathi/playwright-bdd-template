Playwright BDD Template
This is a template repository for setting up Playwright automation with Behavior-Driven Development (BDD) using Cucumber and TypeScript.
Features

Page Object Model (POM) for maintainable code
TypeScript for type safety
Cucumber for BDD scenarios
GitHub Actions for CI integration

Prerequisites

Node.js (v16 or higher)
npm

Setup

Clone the repository:
git clone https://github.com/StoneNyathi/playwright-bdd-template.git
cd playwright-bdd-template


Install dependencies:
npm install


Install Playwright browsers:
npx playwright install



Running Tests
To run the tests, use:
npm test

This will execute the Cucumber scenarios using the TypeScript step definitions.
Project Structure

features/: BDD feature files written in Gherkin.
page_objects/: Page Object Model classes for interacting with web pages.
step_definitions/: Step definitions that map Gherkin steps to code.
utils/: Utility functions for common assertions and helpers.
tsconfig.json: TypeScript configuration.
package.json: Project dependencies and scripts.
.github/workflows/ci.yml: GitHub Actions configuration for CI.

Customizing for Your Project

Feature Files: Update the .feature files in the features/ directory with your own scenarios.
Page Objects: Modify or add new page objects in page_objects/ to match the structure of your web application.
Step Definitions: Adjust the step definitions in step_definitions/ to implement the logic for your scenarios.
Selectors: Update the selectors in the page objects to match the actual HTML structure of your web pages.

CI Integration
This template includes a GitHub Actions workflow (.github/workflows/ci.yml) that runs the tests on every push or pull request to the main branch. Ensure that the workflow is correctly configured for your repository.
