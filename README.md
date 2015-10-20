# fullpage

## Requirement

First you need to install [nodejs](https://nodejs.org). When installed, you can install the dev environment:
* ``npm install -g bower grunt-cli``

## Installation

Install dev dependencies and bower libraries:
* ``npm install``
* ``bower install``

## Developing

Launch the watcher (with live reload):
* ``grunt serve``

Then you can modify ``src/index.ejs`` (this file will be compiled into build/index.html), change the scripts in ``scr/scripts`` and add views in ``src/views``

## Build the project

Generate dist.tgz:
* ``grunt``