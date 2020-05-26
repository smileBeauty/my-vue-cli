const fs = require("fs") ;
const rm = require('rimraf');
const defaultObj = { author: 'no-author', mode: 'single page application', projectName: 'demo' }
const urlMap = {
  'single page application': 'direct:https://github.com/smileBeauty/vue-single-page.git',
  'more pages application': 'direct:https://github.com/smileBeauty/vue-more-pages.git#v0.0.1'
}
function generateUrl (obj = defaultObj) {
  return urlMap[obj.mode] || urlMap['single page application']
}

function generateTarget (obj = defaultObj) {
  return './' + obj.author + '-' + obj.projectName
}

function checkFolderIsExist (url = './') {
  return fs.existsSync(url)
}

function removeFileAndFolder (url) {
  if (!url) {
    return Promise.reject(new Error('请输入要删除的文件或文件夹路径'))
  }
  return new Promise((resolve, reject) => {
    rm(url, function (error) {
      if (error) {
        reject(error)
      }
      resolve()
    })
  })
}

module.exports = {
  generateUrl,
  generateTarget,
  checkFolderIsExist,
  removeFileAndFolder
}