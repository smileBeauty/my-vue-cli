const downloadSourceCode = require('download-git-repo');
function download (url, target) {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error('下载链接不能为空'))
    }
    if (!target) {
      reject(new Error('目标文件夹不能为空'))
    }
    downloadSourceCode(url, target, { clone: true }, function(error) {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}
module.exports = {
  download
}