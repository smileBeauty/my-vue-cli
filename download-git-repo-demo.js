const download = require('download-git-repo');
// git repositories 为 public 的可以直接 用户名/repository名字 下载模板
// git repositories 为 private 的只能用direct:https地址 下载模板
// 默认下载master分支 如果想下载其他分支或者tag #分支名或者tag
download('direct:https://github.com/smileBeauty/vue-more-pages.git#v0.0.1', './source', { clone: true }, function(err) {
  console.log(err || 'success');
})