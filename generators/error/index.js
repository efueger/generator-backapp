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
      name: 'error',
      message: 'Error name:',
      default: 'AccessDeniedError'
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    let filename = this.props.error.match(/^(.+)[^Error]/g).join('');
    filename = filename[0].toLowerCase() + filename.substring(1);
    
    this.fs.copyTpl(
      this.templatePath('error.js'),
      this.destinationPath(`src/errors/${filename}.js`),
      {ERROR: this.props.error}
    );

    const currentErrorIndexFile = fs.readFileSync(`${process.cwd()}/src/errors/index.js`, 'utf-8');
    let pos = currentErrorIndexFile.search(/export/gm);
    let bufferImport = currentErrorIndexFile.substring(0, pos-1) + `import ${this.props.error} from './${filename}'\n`;

    pos = currentErrorIndexFile.search(/{/gm);
    let buffer = `${bufferImport}\nexport {\n${this.props.error},${currentErrorIndexFile.substring(pos+1, currentErrorIndexFile.length)}`;
    fs.writeFileSync(`${process.cwd()}/src/errors/index.js`, buffer, 'utf-8');
  }
    
};