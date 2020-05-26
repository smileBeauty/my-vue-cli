#!/usr/bin/env node
// 必须 告诉系统脚本执行的环境
const inquirer = require('inquirer');

var questions = [
  {
    type: 'input',
    name: 'first_name',
    message: "What's your first name",
    // name 用户输入的答案
    // answers 所有问题的结果
    // isFinalObj 是不是最后一个问题
    transformer: function(name, answers, isFinalObj) {
      return name;
    }
  },
  {
    type: 'input',
    name: 'last_name',
    message: "What's your last name",
    default: function () {
      return 'Doe';
    }
  },
  {
    type: 'input',
    name: 'phone',
    message: "What's your phone number",
    validate: function (value) {
      var pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      }
      return 'Please enter a valid phone number';
    }
  }
];

inquirer.prompt(questions).then(answers => {
  console.log(JSON.stringify(answers, null, '  '));
});