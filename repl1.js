
var fs = require('fs');
var path = require('path');
var repl = require('repl');
var r = repl.start({
  prompt:"liangklfang",
  input:process.stdin,
  output:process.stdout,
  replMode:repl.REPL_MODE_SLOPPY
});
var c = r.context;
// 原来的初始化代码放到此函数内
c._load = function () {
  c.Segment = require('./Segment');
  c.segment = new c.Segment();
  c.segment.useDefault();
  c.s = function () {
    return c.segment.doSegment.apply(c.segment, arguments);
  };
};

// 在REPL中执行reload()可重新加载模块
c.reload = function () {
  var t = Date.now();
  // 清空当前项目根目录下所有文件的缓存
  var dir = path.resolve(__dirname) + path.sep;
  //path.sep在window环境下为\符号
  //console.log(require.cache);
  //require.cache是如下的格式类型(里面放置的全部是模块的键值也就是Module对象，键名为模块的路径当然包括文件名)：
  /*
  { 'C:\Users\Administrator\Desktop\N-blog\fiboo\repl1.js':
     Module {
       id: '.',
       exports: {},
       parent: null,
       filename: 'C:\\Users\\Administrator\\Desktop\\N-blog\\fiboo\\repl1.js',
       loaded: true,
       children: [ [Object] ],
       paths:
        [ 'C:\\Users\\Administrator\\Desktop\\N-blog\\fiboo\\node_modules',
          'C:\\Users\\Administrator\\Desktop\\N-blog\\node_modules',
          'C:\\Users\\Administrator\\Desktop\\node_modules',
          'C:\\Users\\Administrator\\node_modules',
          'C:\\Users\\node_modules',
          'C:\\node_modules' ] },
    'C:\Users\Administrator\Desktop\N-blog\fiboo\Segment.js':
     Module {
       id: 'C:\\Users\\Administrator\\Desktop\\N-blog\\fiboo\\Segment.js',
       exports: [Function: Segment],
       parent:
        Module {
          id: '.',
          exports: {},
          parent: null,
          filename: 'C:\\Users\\Administrator\\Desktop\\N-blog\\fiboo\\repl1.js',
          loaded: true,
          children: [Object],
          paths: [Object] },
       filename: 'C:\\Users\\Administrator\\Desktop\\N-blog\\fiboo\\Segment.js',
       loaded: true,
       children: [],
       paths:
        [ 'C:\\Users\\Administrator\\Desktop\\N-blog\\fiboo\\node_modules',
          'C:\\Users\\Administrator\\Desktop\\N-blog\\node_modules',
          'C:\\Users\\Administrator\\Desktop\\node_modules',
          'C:\\Users\\Administrator\\node_modules',
          'C:\\Users\\node_modules',
          'C:\\node_modules' ] } }
  */
  for (var i in require.cache) {
    if (i.indexOf(dir) === 0) {
      delete require.cache[i];
    }
  }
  // 重新执行初始化
  c._load();
  console.log('OK. (spent %sms)', Date.now() - t);
}

c._load();