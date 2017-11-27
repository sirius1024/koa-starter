/*
* 在此设置常量
*/

module.exports = {
  appStartStr: "koa",
  enum: {
    verification: {
      // 已经过期
      expired: "EXPIRED",
      // 不匹配
      notMatch: "NOT MATCH",
      // 已消费
      consumed: "CONSUMED"
    }
  }
};
