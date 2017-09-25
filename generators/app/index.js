'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const fs = require('fs');

module.exports = class extends Generator {
  prompting() {
    this.log('Welcome to ' + chalk.blue('generator-backapp') + ' generator!');

    const prompts = [{
      type: 'input',
      name: 'appName',
      message: 'Choose your app name:',
      default: this.appname
    }, {
      type: 'input',
      name: 'appDescription',
      message: 'Write description of your app:'
    }, {
      type: 'input',
      name: 'author',
      message: 'Author:'
    }, {
      type: 'list',
      name: 'eslint',
      message: 'Choose ESlint mode:',
      choices: ['Standart', 'Preferable']
    },
    {
      type: 'confirm',
      name: 'mailgun',
      message: 'Would you like to setup Mailgun?'
    },
    {
      type: 'confirm',
      name: 'nexmo',
      message: 'Would you like to setup Nexmo?'
    }, {
      type: 'confirm',
      name: 'windows',
      message: 'Are you develop on Windows?'
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('nodemon.json'),
      this.destinationPath('nodemon.json')
    );
    this.fs.copy(
      this.templatePath('bin'),
      this.destinationPath('bin')
    );
    this.fs.copy(
      this.templatePath('src'),
      this.destinationPath('src')
    );
    if (this.props.eslint === 'Standart') {
      this.fs.copy(
        this.templatePath('.standart_eslintrc.json'),
        this.destinationPath('.eslintrc.json')
      );
    } else {
      this.fs.copy(
        this.templatePath('.preferable_eslintrc.json'),
        this.destinationPath('.eslintrc.json')
      );
    }
    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    );
    this.fs.copy(
      this.templatePath('.env'),
      this.destinationPath('.env')
    );
    if (this.props.nexmo === false && this.props.mailgun === false) {
      this.fs.delete('src/core/services')
      this.fs.delete('src/core/services-mailgun')
      this.fs.delete('src/core/services-nexmo')
      this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {appName: this.props.appName,
        appDescription: this.props.appDescription,
        author: this.props.author,
        windows: this.props.windows}
      );
    } else if (this.props.nexmo === true && this.props.mailgun === false) {
      this.fs.copyTpl(
        this.templatePath('nexmo-package.json'),
        this.destinationPath('package.json'),
        {appName: this.props.appName,
          appDescription: this.props.appDescription,
          author: this.props.author,
          windows: this.props.windows}
        );
        this.fs.delete('src/core/services')
        this.fs.delete('src/core/services-mailgun')
        this.fs.append('src/config/index.js', `
export const NEXMO_FROM = 'VALUE'
export const NEXMO_KEY = 'VALUE'
export const NEXMO_SECRET = 'VALUE'
        `)
    } else if (this.props.nexmo === false && this.props.mailgun === true) {
      this.fs.copyTpl(
        this.templatePath('mailgun-package.json'),
        this.destinationPath('package.json'),
        {appName: this.props.appName,
          appDescription: this.props.appDescription,
          author: this.props.author,
          windows: this.props.windows}
        );
        this.fs.delete('src/core/services')
        this.fs.delete('src/core/services-nexmo')
        this.fs.append('src/config/index.js', `
export const MAILGUN_DOMAIN = 'VALUE'
export const MAILGUN_FROM = 'VALUE'
export const MAILGUN_KEY = 'VALUE'
        `)
    } else {
      this.fs.copyTpl(
        this.templatePath('whole-package.json'),
        this.destinationPath('package.json'),
        {appName: this.props.appName,
          appDescription: this.props.appDescription,
          author: this.props.author,
          windows: this.props.windows}
        );
        this.fs.append('src/config/index.js', `
export const MAILGUN_DOMAIN = 'VALUE'
export const MAILGUN_FROM = 'VALUE'
export const MAILGUN_KEY = 'VALUE'
export const NEXMO_FROM = 'VALUE'
export const NEXMO_KEY = 'VALUE'
export const NEXMO_SECRET = 'VALUE'
        `)
        this.fs.delete('src/core/services-mailgun')
        this.fs.delete('src/core/services-nexmo')
    }
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
  }

  install() {
    this.installDependencies({bower: false});
    if (this.props.windows === true) {
      this.npmInstall(['cross-env'], { 'save-dev': true });
    }
  }
};
