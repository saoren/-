/*
Navicat MySQL Data Transfer

Source Server         : 云控测试
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : yk

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2022-03-31 23:14:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for authority
-- ----------------------------
DROP TABLE IF EXISTS `authority`;
CREATE TABLE `authority` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `authority` varchar(255) DEFAULT NULL,
  `status` int(1) unsigned zerofill DEFAULT '0' COMMENT '0 启用 1 禁用',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of authority
-- ----------------------------
INSERT INTO `authority` VALUES ('1', 'super', '0');
INSERT INTO `authority` VALUES ('2', 'admin', '1');
INSERT INTO `authority` VALUES ('3', 'user', '0');

-- ----------------------------
-- Table structure for cron
-- ----------------------------
DROP TABLE IF EXISTS `cron`;
CREATE TABLE `cron` (
  `id` int(11) NOT NULL,
  `cron_name` varchar(255) DEFAULT NULL,
  `cron` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cron
-- ----------------------------

-- ----------------------------
-- Table structure for device
-- ----------------------------
DROP TABLE IF EXISTS `device`;
CREATE TABLE `device` (
  `id` int(100) NOT NULL,
  `device_id` varchar(100) DEFAULT NULL,
  `device_group` bigint(20) DEFAULT NULL,
  `imei` varchar(100) DEFAULT NULL,
  `status` int(1) DEFAULT '0',
  `is_deleted` int(1) DEFAULT '0',
  `create_time` varchar(100) DEFAULT NULL,
  `update_time` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of device
-- ----------------------------

-- ----------------------------
-- Table structure for device_group
-- ----------------------------
DROP TABLE IF EXISTS `device_group`;
CREATE TABLE `device_group` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `beizhu` varchar(255) DEFAULT NULL,
  `belong` varchar(255) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `create_time` varchar(100) DEFAULT NULL,
  `update_time` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of device_group
-- ----------------------------
INSERT INTO `device_group` VALUES ('2', '禁用', '222', 'lemon', '0', '2022-03-09 12:47:25', '2022-03-29 12:00:37');

-- ----------------------------
-- Table structure for email_code
-- ----------------------------
DROP TABLE IF EXISTS `email_code`;
CREATE TABLE `email_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `create_time` varchar(255) DEFAULT NULL,
  `email_code` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of email_code
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `authority` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `isban` int(1) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`id`,`username`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'lemon', 'lemon0208', '9573661@qq.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxlbW9uIiwicGFzc3dvcmQiOiJsZW1vbjAyMDgiLCJpYXQiOjE2NDg1MjQxNjcsImV4cCI6MTY0ODUyNzc2N30.bJee1z0aA27FvvygiwAO3HxLAPZ0iYRnv0_xnnN4cuk', 'super', '', '0');
