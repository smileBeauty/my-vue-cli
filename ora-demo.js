const ora = require('ora');
const chalk = require('chalk');
const spinner = ora('please wait loading');
spinner.start();
setTimeout(() => {
  // 图标的颜色
  spinner.color = 'green';
  spinner.text = chalk.magenta('Loading');
  // 图标之前的文字
  spinner.prefixText = 'prefixText';
}, 3000);

setTimeout(() => {
  spinner.spinner = {
    // 图标切换的间隔和图标切换的集合
    interval: 200,
    frames: ['-', '+']
  }
}, 6000);

setTimeout(() => {
  spinner.prefixText = ''
  spinner.info(chalk.blueBright('info'))
}, 9000);

setTimeout(() => {
  spinner.warn(chalk.yellowBright('warn'))
}, 12000);

setTimeout(() => {
  spinner.succeed(chalk.green('success'))
}, 15000);

setTimeout(() => {
  spinner.stop()
}, 18000);