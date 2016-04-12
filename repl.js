#!/usr/bin/env node
var repl = require('repl');
// 创建一个REPL
var r = repl.start('> ');
// context即为REPL中的上下文环境
var c = r.context;
c.name="liangklfang I love you!";
// 测试用的初始化代码
// 在REPL中可以通过Segment和segment来访问以下两个变量
c.Segment = require('./Segment');
c.segment = new c.Segment();
//创建一个Segemnt实例
c.segment.useDefault();
//精简函数名，方便手工输入，在REPL中可以通过s来访问此函数
//绑定到repl.context中的函数或者变量可以在repl控制台使用函数名或者变量名直接调用或者获取
c.s = function () {
  return c.segment.doSegment.apply(c.segment, arguments);
};

