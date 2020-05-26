const inquirer = require('inquirer');
const chalk = require('chalk');

function askQuestions() {
  return inquirer
  .prompt([
    {
      type: 'input',
      name: 'author',
      message: chalk.cyan('你的名字'),
      validate: function (value) {
        return !!value || chalk.red('请输入你的姓名')
      }
    },
    {
      type: 'list',
      name: 'mode',
      message: chalk.cyan('你想创建哪种类型的vue项目'),
      choices: ['single page application', 'more pages application'],
      default: function () {
        return 'single page application'
      }
    }
  ])
}

function askRemoveFolder() {
  return inquirer
  .prompt([
    {
      type: 'list',
      name: 'removeFolder',
      message: chalk.cyan('文件夹已存在，是否删除当前文件夹并创建项目'),
      choices: ['yes', 'no'],
      default: function () {
        return 'yes'
      }
    }
  ])
}

module.exports = {
  askQuestions,
  askRemoveFolder
}