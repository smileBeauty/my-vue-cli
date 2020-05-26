#!/usr/bin/env node
const { Command } = require('commander');
const { askQuestions, askQuestionsAllDefault, askRemoveFolder } = require('./questions');
const { download } = require('./download');
const { generateUrl, generateTarget, checkFolderIsExist, removeFileAndFolder } = require('./tool');
const { progressStart, progressLoading, progressSuccess, progressStop } = require('./progress');
const chalk = require('chalk');
function actionExec(projectName, type) {
  const questionMap = {
    'byUser': askQuestions,
    'create-all-default': askQuestionsAllDefault
  }
  questionMap[type]().then(answers => {
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
          progressStart()
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
    console.log(chalk.red('myvuecli ' + error));
  })
}
const program = new Command();
program.name('仿vue-cli脚手架').alias('高仿vue-cli脚手架').usage('用法很简单').description('别再更新了，我学不动了！');
program.helpOption('-h --help', '输出所有命令');
program.helpInformation();
program.version('0.0.1', '-v --version', '输出版本号');
program.command('create <projectName>').description('创建项目').action(projectName => {
  actionExec(projectName, 'byUser')
});
program.command('create-all-default <projectName>').description('创建项目所有选项全部执行默认值（单页面模板带vue-router和vuex）').action(projectName=> {
  actionExec(projectName, 'create-all-default')
});
program.parse(process.argv);