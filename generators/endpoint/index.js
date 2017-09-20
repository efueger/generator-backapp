'use strict';
const Generator = require('yeoman-generator');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    this.log(`Generating new endpoint...`);

    const prompts = [{
      type: 'input',
      name: 'url',
      message: 'Endpoint url:',
      default: '/endpoint/getUser'
    }, {
      type: 'list',
      name: 'method',
      message: 'Endpoint method:',
      choices: ['get', 'post', 'put', 'delete']
    }, {
      type: 'input',
      name: 'SWAGGER_TAG',
      message: 'Swagger endpoint tag:'
    }, {
      type: 'input',
      name: 'SWAGGER_DESCRIPTION',
      message: 'Swagger endpoint description:',
      default: 'My endpoint'
    }, {
      type: 'input',
      name: 'VALIDATOR',
      message: 'Choose name for validator:'
    }, {
      type: 'input',
      name: 'CONTROLLER',
      message: 'Choose name for controller:'
    }, {
      type: 'input',
      name: 'ACTION',
      message: 'Choose name for action:'
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const folder = this.props.url.split('/')[1];
    // Routes
    const route = fs.readFileSync(`${__dirname}/templates/routes/${this.props.method}.js`, 'utf-8');
    let rendered = ejs.render(route, {
      URL: this.props.url,
      SWAGGER_TAG: this.props.SWAGGER_TAG,
      SWAGGER_DESCRIPTION: this.props.SWAGGER_DESCRIPTION,
      VALIDATOR: this.props.VALIDATOR,
      CONTROLLER: this.props.CONTROLLER
    }, (err, str) => {
      if (err) {
        this.log(err);
      }
      return str;
    });

    if (!fs.existsSync(`${process.cwd()}/src/api/${folder}`)) {
      fs.mkdirSync(`${process.cwd()}/src/api/${folder}`);
    }
    if (!fs.existsSync(`${process.cwd()}/src/api/${folder}/routes.js`)) {
      fs.writeFileSync(`${process.cwd()}/src/api/${folder}/routes.js`, '');

      const template = fs.readFileSync(`${__dirname}/templates/routes/template.js`);
      fs.appendFileSync(`${process.cwd()}/src/api/${folder}/routes.js`, template);
    }

    fs.appendFileSync(`${process.cwd()}/src/api/${folder}/routes.js`, `\n` + rendered);

    // Controllers
    const controller = fs.readFileSync(`${__dirname}/templates/controllers/controllers.js`, 'utf-8');
    rendered = ejs.render(controller, {
      CONTROLLER: this.props.CONTROLLER,
      ACTION: this.props.ACTION
    }, (err, str) => str);
    if (!fs.existsSync(`${process.cwd()}/src/api/${folder}/controllers.js`)) {
      fs.writeFileSync(`${process.cwd()}/src/api/${folder}/controllers.js`, '');

      const template = fs.readFileSync(`${__dirname}/templates/controllers/template.js`);
      fs.appendFileSync(`${process.cwd()}/src/api/${folder}/controllers.js`, template);
    }

    fs.appendFileSync(`${process.cwd()}/src/api/${folder}/controllers.js`, `\n` + rendered);

    // Validators
    const validator = fs.readFileSync(`${__dirname}/templates/validators/validator.js`, 'utf-8');
    rendered = ejs.render(validator, {
      VALIDATOR: this.props.VALIDATOR
    }, (err, str) => str);
    if (!fs.existsSync(`${process.cwd()}/src/api/${folder}/validators.js`)) {
      fs.writeFileSync(`${process.cwd()}/src/api/${folder}/validators.js`, '');
    }

    fs.appendFileSync(`${process.cwd()}/src/api/${folder}/validators.js`, `\n` + rendered);

    // API tests
    const test = fs.readFileSync(`${__dirname}/templates/tests_api/test.js`, 'utf-8');
    rendered = ejs.render(test, {
      METHOD: this.props.method,
      URL: this.props.url
    }, (err, str) => str);
    if (!fs.existsSync(`${process.cwd()}/src/api/__tests__/${folder}.spec.js`)) {
      fs.writeFileSync(`${process.cwd()}/src/api/__tests__/${folder}.spec.js`, '');

      const template = fs.readFileSync(`${__dirname}/templates/tests_api/template.js`);
      fs.appendFileSync(`${process.cwd()}/src/api/__tests__/${folder}.spec.js`, template);
    }

    fs.appendFileSync(`${process.cwd()}/src/api/__tests__/${folder}.spec.js`, `\n` + rendered);
  }
};
