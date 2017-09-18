'use strict';
const Generator = require('yeoman-generator');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    this.log(`Generating new model...`);

    const prompts = [{
      type: 'input',
      name: 'MODEL_NAME',
      message: 'Model name:',
    }, {
      type: 'input',
      name: 'FIELDS',
      message: 'Model fields(:type):',
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const modelName = this.props.MODEL_NAME[0].toLowerCase() + this.props.MODEL_NAME.substring(1);

    let fields = '';
    let arr = this.props.FIELDS.split(' ');
    for (let i = 0; i < arr.length; i++) {
      let [field, type] = [arr[i].split(':')[0], arr[i].split(':')[1]];
      type = type[0].toUpperCase() + type.substring(1);
      fields += `\n${field}: {type: ${type}},`;
    }

    this.fs.copyTpl(
      this.templatePath('model.js'),
      this.destinationPath(`src/core/models/${modelName}.js`),
      {MODEL_NAME: this.props.MODEL_NAME,
      FIELDS: fields}
    );

    const currentModelIndexFile = fs.readFileSync(`${process.cwd()}/src/core/models/index.js`, 'utf-8');
    let pos = currentModelIndexFile.search(/export/gm);
    let bufferImport = `${currentModelIndexFile.substring(0, pos-1)}import ${this.props.MODEL_NAME} from './${modelName}'\n`;
    let bufferExport = `${currentModelIndexFile.substring(currentModelIndexFile.search(/export/gm), currentModelIndexFile.length)}`;

    pos = bufferExport.search(/}/gm);
    let buffer = `${bufferImport}\n${bufferExport.substring(0, pos)}${this.props.MODEL_NAME},\n}`;
    fs.writeFileSync(`${process.cwd()}/src/core/models/index.js`, buffer, 'utf-8');
  }
    
};