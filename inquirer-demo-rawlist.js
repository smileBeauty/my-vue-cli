#!/usr/bin/env node
// 必须 告诉系统脚本执行的环境
const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'rawlist',
      name: 'theme',
      message: 'What do you want to do?',
      choices: [
        'Order a pizza',
        'Make a reservation',
        new inquirer.Separator(),
        'Ask opening hours',
        'Talk to the receptionist'
      ]
    },
    {
      type: 'rawlist',
      name: 'size',
      message: 'What size do you need',
      choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
      filter: function (val) {
        return val.toLowerCase();
      }
    }
  ])
  .then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
  });