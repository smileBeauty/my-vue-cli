const chalk = require('chalk');
const text = 'hello world';
console.log(text);
console.log(chalk.red(text));
console.log(chalk.red.bgCyan(text));
console.log(chalk.rgb(255,0,0).bgRgb(255,255,255)(text));