![Node](https://img.shields.io/badge/node-9.11.1-brightgreen.svg)
[![Styled with ESLint](https://img.shields.io/badge/styled%20with-eslint-brightgreen.svg)](https://github.com/eslint/eslint)
[![CircleCI](https://img.shields.io/circleci/project/github/socialement-competents/socoperator.svg)](https://circleci.com/gh/socialement-competents/socoperator)
[![Code coverage with Codecov](https://img.shields.io/codecov/c/github/socialement-competents/socoperator.svg)](https://codecov.io/gh/socialement-competents/socoperator)
[![Code quality with Codacy](https://img.shields.io/codacy/grade/b5ce7b8a85cc4881acb74a2746a653b8.svg)](https://app.codacy.com/app/socialementcompetentsbot/socoperator)
![No license](https://img.shields.io/github/license/socialement-competents/socoperator.svg)
[![CircleCI](https://img.shields.io/docker/pulls/socialementcompetents/socoperator.svg)](https://hub.docker.com/r/socialementcompetents/socoperator/)

## Abstract

The SoCo (short for Socialement Compétents = Socially Competent) ecosystem aims
to push people comfortable with IT and the internet to help, in an autonomous
and decentralized way, users less aware of new technologies in general and the
internet in particular.

This was built in 3 days during the 2018 Pôle Emploi (French unemployment
services) hackaton, where 80 teams had to compete to find the best way to
help Pôle Emploi applicants to use their website
(https://www.pole-emploi.fr/accueil/).  
Our platform wasn't strongly linked with Pôle Emploi and could be used with
any website, just by important a JavaScript file (our socomodule).

## Ecosystem

[Socomodule](https://github.com/socialement-competents/socomodule)
is a non intrusive chat module ([Intercom](https://www.intercom.com/)-style)

[Socoperator](https://github.com/socialement-competents/socoperator)
is a web application used by operators (see below)

[Sococoin](https://github.com/socialement-competents/sococoin)
is an ERC20 Ethereum Token awarded to operators

[Socoback](https://github.com/socialement-competents/socoback)
is the application back-end that allows communication between the other components

## Actors

**User**:
Someone that requires help using the website. He would click on the chat icon
available on the bottom right of the page, and be connected to the next available
operator.

**Operator**:
Someone comfortable with new technologies that will help, thanks to the
Socoperator platform, people in difficulty, by chat.

**Organisation**:
Company, public institution, NGO or even a single developer that uses the
socomodule on their website.

## Token reward

Tokens will be rewarded to operators after each help operation, according to
several criteria:
- duration of the intervention
- perception by the user (was the user satisfied?)
- type of help
- ...

## How it works

The organization installs the socomodule on its website, which will add
a non-intrusive chat module on each of the desired pages.

Users of this website will have the opportunity to open a conversation,
to ask for help (by sending a message in the chat).

All operators will see this new conversation appear: they will then have
the opportunity to assign it to themselves, simply by responding. A
conversation that is assigned to an operator is neither visible nor accessible
by other operators.

A single operator, with a single account, can interact with and help a user who
is on any web platform, while remaining on the same application, Socoperator.

## Targeted organisations

The Socially Competent Ecosystem focuses on public institutions. It is particularly
suitable for small organizations (small towns, boroughs...) and small businesses
that have neither the means nor the wish to have a dedicated IT support service.
Any company, NGO, institution or simple developer can include the Socomodule
integration on their website with a simple copy and paste
(see the [CodePen](https://codepen.io/tsauvajon/pen/JvmrEo) demo).

Examples of good use cases for end uses:
- Pôle emploi procedures
- Tax filing
- any other administrative procedure
- help using a website

## Available rewards

Earned SocoCoins could be sold or exchanged or redeemed for non-financial rewards.

A few examples:

Pôle emploi: free training, priviledged access to some job offers...  
Discount on public transports  
Discount on cultural events  

## Challenges

We have identified a number of challenges that will be taken into account when
building a production version of the application.

First, it will reward the best operators, promoting positive behavior and
reducing rewards for negative behavior. This will require in-depth study and
thinking, as it is easy to hijack a system that claims to be beneficial by not
"playing the game".

Indeed, fraud is possible: two accomplices can create an unlimited number of
conversations, and close them instantly to receive rewards without real world
added value. Several levers can be used to counter this problem: check, thanks
to AI/Machine learning, if the messages are generated by a human or a machine;
evaluate the duration of the intervention against similar problems; check the
timing of interventions for each operator; limit the number of simultaneous
conversations/number of conversations in a day...

Finally, we should give organisations the opportunity to certify operators by
themselves. In the case of Pôle Emploi, for example, Pôle Emploi should have the
possibility to authorize, or not, an operator to help users on their platform.
Pôle Emploi could offer operator training that would provide access, on the
"Socoperator" platform, to help users of the Pôle Emploi website.

## Possible evolutions

Without going into details:

It would be possible to do a user facial expression analysis to determine his
satisfaction, and adapt the operator rewards accordingly. Possible technical
solution: trained TensorFlow model.

It would also be wise to store as much information as possible about problem
solving, and intelligently analyze recurring problems, operator performance,
and areas for improvement. Possible technical solution: a classic BigData stack
(Hadoop, MapReduce...).

Operators can easily be replaced by a ChatBot, in a technical point of view. The
rewards can then be omitted, or awarded to the ChatBot owners. Possible
technical solutions: decision tree ChatBot, ChatBot with an AI-driven model.
 
# socoperator

This is the operator front-end of the SoCo ecosystem.

## Getting started

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build

# build for production and view the bundle analyzer report
yarn build --report

# run unit tests
yarn unit

# run e2e tests
yarn e2e

# run all tests
yarn test
```

# Workflow

- `git checkout dev`
- `git fetch`
- `git pull`
- `git branch -b '(feat|fix|refacto)/branch_name` pull out a branch from
dev (up to date)
- dev your stuff
- `git add .`
- `git commit -S -m 'Your commit description'`
- `git push origin (feat|fix|refacto)/branch_name`
- create a pull request to run checks (conflicts, CI)
- ask for a review
- squash and merge
- repeat
- create a pull request from dev to master when you are ready for production

## Vue.js

[Vue.js](https://vuejs.org/) (or just `Vue`) is a JavaScript front-end
framework, competing with Angular and React, amongst others. We have chosen to
use Vue over any other framework for its simplicity, modularity and performance.

While on a rush to have a working application, learning Vue will be easier
for developers unfamiliar with it than learning React or Angular. That's
obviously in the case you don't know your teammates in advance !

We recommand using [Vuetify](http://vuetifyjs.com) for the UI components.

## GraphQL

We believe that [GraphQL](http://graphql.org/) is the future of APIs, while not
adding too much boilerplate code for small applications. Changing to a REST
API would be easy: nothing to add, just remove every `graphql` and `apollo`
package and reference.

To generate the schema from an existing GraphQL endpoint, set the `SERVER_URL`
environment variable and run `yarn gql`.
The generated types will be placed at `src/typings/types.ts`.

## TypeScript

We chose to use TypeScript over regular JavaScript to capitalize on the
advantages of strong typing: build time type checking, auto completion,
self-documentation ...

## CI

The code is linted with [ESLint](https://eslint.org/) and
[TSLint](https://palantir.github.io/tslint/), and tested with
[Jest](https://facebook.github.io/jest/) and
[Nightwatch](http://nightwatchjs.org/).
The test coverage results are uploaded to
[Codecov](https://codecov.io/gh/socialement-competents/socoperator).

It is continuously tested and build with [CircleCI](https://circleci.com),
and published to the
[Docker Hub](https://hub.docker.com/r/socialementcompetents/socoperator/)
on every push to the master branch.

Every branch is automatically deployed and updated at
`https://[branch]--socoperator.netlify.com` and every pull request at
`https://deploy-preview-[#pr]--socoperator.netlify.com`, with
[Netlify](https://www.netlify.com).

The code is reviewed by 2 static analysis providers:
- [Deepscan](https://deepscan.io/dashboard/#view=project&pid=2362&bid=14124)
- [Codacy](https://app.codacy.com/app/tsauvajon/socoperator/dashboard)

## CircleCI

Environment variables to set on CircleCI:
- `CODACY_PROJECT_TOKEN`: Settings > Integrations > Project API > Settings
- `CODECOV_TOKEN`: Settings > Repository Upload Token
- `DOCKER_USER`: Docker Hub username to push the images
- `DOCKER_PASS`: Docker Hub password
- `GITHUB_API_TOKEN`: https://github.com/settings/tokens > generate new token >
  scopes `repo` and `admin:repo_hook` (used to publish release + publish recaps)
- `GITHUB_TOKEN`: same ^
