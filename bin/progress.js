const ora = require('ora');
const chalk = require('chalk');
let spinner

function progressStart (text = 'start loading', color = 'blue', bgColor = 'bgGray') {
  if (!spinner) {
    spinner = ora();
  }
  spinner.start(chalk[color][bgColor](text))
}

function progressStop (text = 'stop program', color = 'blue', bgColor = 'bgGray') {
  spinner.stop(chalk[color][bgColor](text))
}

function progressLoading (text = 'load') {
  spinner.text = ''
  spinner.spinner = {
    interval: 200,
    frames: [`${text}.`, `${text}..`, `${text}...`]
  }
}

function progressSuccess (text = 'success', color = 'green', bgColor = 'bgGray') {
  spinner.text = ''
  spinner.succeed(chalk[color][bgColor](text))
}

module.exports = {
  progressStart,
  progressStop,
  progressLoading,
  progressSuccess
}