'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

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
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {appName: this.props.appName,
        appDescription: this.props.appDescription,
        author: this.props.author}
    );
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
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
  }

  install() {
    this.installDependencies({bower: false});
  }
};
