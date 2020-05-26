#!/usr/bin/env node
const { Command } = require('commander');
const { askQuestions, askRemoveFolder } = require('./questions');
const { download } = require('./download');
const { generateUrl, generateTarget, checkFolderIsExist, removeFileAndFolder } = require('./tool');
const { progressStart, progressLoading, progressSuccess, progressStop } = require('./progress');
const chalk = require('chalk');
const program = new Command();
program.name('仿vue-cli脚手架').alias('高仿vue-cli脚手架').usage('用法很简单').description('别再更新了，我学不动了！');
program.helpOption('-h --help', '输出所有命令');
program.helpInformation();
program.version('0.0.1', '-v --version', '输出版本号');
program.option('-a --all <type>', '创建项目所有选项全部执行默认值（单页面模板带vue-router和vuex）', '123')
program.command('create <projectName>').description('创建项目').action(projectName => {
  askQuestions().then(answers => {
    progressStart('程序正在运行，请耐心等待')
    const userArgv = Object.assign({}, answers, { projectName })
    const url = generateUrl(userArgv)
    const target = generateTarget(userArgv)
    return Promise.resolve({ url, target })
  }).then(obj => {
    if (checkFolderIsExist(obj.target)) {
      progressStop()
      return askRemoveFolder().then(answers => {
        if (answers.removeFolder === 'yes') {
          progressLoading('删除中')
          return removeFileAndFolder(obj.target).then(() => {
            progressLoading('下载模板中')
            return download(obj.url, obj.target)
          })
        } else {
          return Promise.reject(new Error(`创建失败，不忍删除${obj.target}文件夹`))
        }
      })
    } else {
      progressLoading('下载模板中')
      return download(obj.url, obj.target)
    }
  }).then(() => {
    progressSuccess('项目生成成功')
    console.log(chalk.green('运行 npm install 安装依赖'))
    console.log(chalk.green('运行 npm run dev 启动项目'))
  }).catch(error => {
    progressStop('程序运行结束')
    console.log(chalk.red('[myvuecli Error:] ' + error));
  })
});
program.parse(process.argv);
if (program.all === '111') {
  console.log('111')
}