/*
 * @Author: L.柠@95736614
 * @Date: 2022-02-21 18:22:52
 * @LastEditTime: 2022-02-22 14:38:33
 */
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
/**
 * 封装返回信息的结构
 * errCode: 0代表成功 1代表参数错误 2代表其他错误
 * message:请求信息的结果
 *
 */
const returnMsg = (errCode, message, data) => {
  return {
    errCode: errCode || 0,
    message: message || "",
    data: data || {},
  };
};


/**
 * 字符串转时间戳
 */
function strTimeToTimeStamps(strtime) {
  //时间转换
  var date = new Date(strtime);
  //获取时间戳
  var timeStamps = Date.parse(date);
  return timeStamps;
}

/**
 * 数据库操作的promise封装
 */
const queryFn = (sql) => {
  return new Promise((resolve, reject) => {
    query(sql, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

/**
 * 鉴权
 */
const jwtVerify = (token) => {
  try {
    jwt.verify(token, "lemon");
  } catch (err) {
    //鉴权失败

    return false;
  }
  return true;
};

//开发环境

let host = "http://127.0.0.1";

let port = 9000;

//数据库参数
const pool = mysql.createPool({
  host: "localhost", // 连接的服务器(代码托管到线上后，需改为内网IP，而非外网)
  port: 3306, // mysql服务运行的端口
  database: "yk", // 选择某个数据库
  user: "yk", // 用户名
  password: "123456", // 用户密码
});

//封装对数据库进行增删改查操作的函数
const query = (sql, callback) => {
  pool.getConnection(function (err, connection) {
    connection.query(sql, function (err, rows) {
      callback(err, rows);
      connection.release();
    });
  });
};

//生产环境

module.exports = {
  host,
  port,
  query,
  returnMsg,
  queryFn,
  jwtVerify,
  strTimeToTimeStamps,
};
