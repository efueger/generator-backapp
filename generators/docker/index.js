'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    this.log(`I'll help you to generate Dockerfile!`);

    const prompts = [{
      type: 'input',
      name: 'port',
      message: 'What port you would like to expose ?',
      default: '8001'
    }, {
      type: 'input',
      name: 'cmd',
      message: 'What command will execute app ?',
      default: 'npm run start'
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const PORT = this.props.port;
    const cmd = this.props.cmd.split(' ');
    const CMD = [];
    for (let i = 0; i < cmd.length; i++) {
      CMD.push('"' + cmd[i] + '"');
    }

    this.fs.copyTpl(
      this.templatePath('Dockerfile'),
      this.destinationPath('Dockerfile'),
      {PORT, CMD}
    );
  }
};
