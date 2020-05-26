#!/usr/bin/env node
// 必须 告诉系统脚本执行的环境
const { Command } = require('commander');
const program = new Command();
program.helpOption('-h, --help', '输出所有命令')
program.helpInformation();
program.version('0.0.1', '-v --version', '输出版本号');
program.option('-ad --allDefault', '创建项目所有选项全部执行默认值');
program.command('create <projectName>').description('创建项目').action(projectName => {
  console.log('projectName', projectName);
});
program.parse(process.argv); // 解析用户输入的命令 必须在整个声明的最后执行
if (program.allDefault) {
  console.log('创建项目所有选项全部执行默认值');
}