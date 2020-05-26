#!/usr/bin/env node
// 必须 告诉系统脚本执行的环境
const inquirer = require('inquirer');
var questions = [
  {
    type: 'editor',
    name: 'bio',
    message: 'Please write a short bio of at least 3 lines.',
    validate: function(text) {
      if (text.split('\n').length < 3) {
        return 'Must be at least 3 lines.';
      }
      return true;
    }
  }
];

inquirer.prompt(questions).then(answers => {
  console.log(JSON.stringify(answers, null, '  '));
});