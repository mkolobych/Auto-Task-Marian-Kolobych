# AstroCRM Test Automation Project

This repository contains the test automation Test Task for **AstroCRM** using **Playwright** and **TypeScript**. The tests cover various user flows:"User can sign in and create a script group in AstroCRM" in the AstroCRM application to ensure its robustness and reliability.


### Prerequisites
Before running the tests, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)
- [Git](https://git-scm.com/)


### Clone the Repository
Clone the repository to your local machine using the following command:

gh repo clone mkolobych/Auto-Task-Marian-Kolobych

### scripts to run tests
"test": "playwright test",
"test:headed": "playwright test --headed",
"test:headless": "playwright test --headless",
"test:retry": "playwright test --retries=2",
"test:report": "playwright show-report"

