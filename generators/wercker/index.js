'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    this.log(`I'll help you to generate wercker config!`);

    const prompts = [{
      type: 'input',
      name: 'RUN_APP_COMMAND',
      message: 'What will be your run command at local start container?',
      default: 'yarn start:prod'
    }, {
      type: 'input',
      name: 'INSTALL_COMMAND',
      message: 'Command to install dependencies at build step:',
      default: 'yarn install'
    }, {
      type: 'input',
      name: 'TEST_COMMAND',
      message: 'Test command at build:',
      default: 'yarn test'
    }, {
      type: 'input',
      name: 'DEPLOY_STEP_1',
      message: 'Name your first deploy step:',
      default: 'deploy-dev'
    }, {
      type: 'input',
      name: 'DEPLOY_STEP_2',
      message: 'Name your second deploy step:',
      default: 'deploy-prod'
    }, {
      type: 'input',
      name: 'PORT1',
      message: 'internal/docker-push:ports FIRST deploy step:',
      default: '"8001"'
    }, {
      type: 'input',
      name: 'CMD1',
      message: 'internal/docker-push:cmd FIRST deploy step:',
      default: '/bin/bash -c "cd /pipeline/source && yarn start:prod"'
    }, {
      type: 'input',
      name: 'SSH_KEY_FILENAME',
      message: 'SSH key filename:',
      default: 'mySSHKey'
    }, {
      type: 'input',
      name: 'CONTAINER1_NAME',
      message: 'Name your app container at FIRST deploy step:',
      default: 'myApp_dev'
    }, {
      type: 'input',
      name: 'CONTAINER1_IP',
      message: 'Expose ports for app container at FIRST deploy step:',
      default: '127.0.0.1:8001:8001'
    }, {
      type: 'input',
      name: 'MONGO1_IP',
      message: 'Expose ports for mongo container at FIRST deploy step:',
      default: '127.0.0.1:27017:27017'
    }, {
      type: 'input',
      name: 'PORT2',
      message: 'internal/docker-push:ports SECOND deploy step:',
      default: '"8002"'
    }, {
      type: 'input',
      name: 'CMD2',
      message: 'internal/docker-push:cmd SECOND deploy step:',
      default: '/bin/bash -c "cd /pipeline/source && yarn start:prod"'
    }, {
      type: 'input',
      name: 'CONTAINER2_NAME',
      message: 'Name your app container at SECOND deploy step:',
      default: 'myApp_prod'
    }, {
      type: 'input',
      name: 'MONGO2_IP',
      message: 'Expose ports for mongo container at SECOND deploy step:',
      default: '127.0.0.1:27017:27017'
    }, {
      type: 'input',
      name: 'CONTAINER2_IP',
      message: 'Expose ports for app container at SECOND deploy step:',
      default: '127.0.0.1:8002:8001'
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('wercker.yml'),
      this.destinationPath('wercker.yml'),
      {
        RUN_APP_COMMAND: this.props.RUN_APP_COMMAND,
        INSTALL_COMMAND: this.props.INSTALL_COMMAND,
        TEST_COMMAND: this.props.TEST_COMMAND,
        DEPLOY_STEP_1: this.props.DEPLOY_STEP_1,
        DEPLOY_STEP_2: this.props.DEPLOY_STEP_2,
        PORT1: this.props.PORT1,
        PORT2: this.props.PORT2,
        CMD1: this.props.CMD1,
        CMD2: this.props.CMD2,
        SSH_KEY_FILENAME: this.props.SSH_KEY_FILENAME,
        CONTAINER1_NAME: this.props.CONTAINER1_NAME,
        CONTAINER2_NAME: this.props.CONTAINER2_NAME,
        CONTAINER1_IP: this.props.CONTAINER1_IP,
        CONTAINER2_IP: this.props.CONTAINER2_IP,
        MONGO1_IP: this.props.MONGO1_IP,
        MONGO2_IP: this.props.MONGO2_IP
      }
    );
  }
};
