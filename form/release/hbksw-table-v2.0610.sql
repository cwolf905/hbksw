
drop database if exists hbksw;
create database hbksw;

USE hbksw;

/* 1.0 */
DROP TABLE IF EXISTS appReleases;
CREATE TABLE appReleases (
  id          BIGINT AUTO_INCREMENT NOT NULL,
  appType     VARCHAR(255),
  version     VARCHAR(255),
  releaseDate DATETIME,
  releaseNote VARCHAR(255),
  url         VARCHAR(255),
  CONSTRAINT pk_appReleases PRIMARY KEY (id))
  ENGINE =InnoDB
  DEFAULT CHARSET =utf8;

DROP TABLE IF EXISTS collegeQRCode;
CREATE TABLE collegeQRCode (
  id         BIGINT AUTO_INCREMENT NOT NULL,
  cid        BIGINT,
  schoolName VARCHAR(255),
  schoolUrl  VARCHAR(255),
  imgPath    VARCHAR(255),
  CONSTRAINT pk_collegeQRCode PRIMARY KEY (id))
  ENGINE =InnoDB
  DEFAULT CHARSET =utf8;

DROP TABLE IF EXISTS favoriteCollege;
CREATE TABLE favoriteCollege (
  fid         INTEGER AUTO_INCREMENT NOT NULL,
  userId      CHAR(11),
  collegeId   BIGINT,
  flag        INTEGER                NOT NULL,
  favorTime   DATETIME,
  unfavorTime DATETIME,
  CONSTRAINT pk_favoriteCollege PRIMARY KEY (fid))
  ENGINE =InnoDB
  DEFAULT CHARSET =utf8;

DROP TABLE IF EXISTS mobileUser;
CREATE TABLE mobileUser (
  mobileId         BIGINT AUTO_INCREMENT NOT NULL,
  mobileNo         VARCHAR(255),
  password         VARCHAR(255),
  passwordQuestion VARCHAR(255),
  passwordAnswer   VARCHAR(255),
  phoneModel       VARCHAR(255),
  IMEI             VARCHAR(255),
  MID              VARCHAR(255),
  registerDate     DATETIME,
  lastLogin        DATETIME,
  userId           CHAR(11),
  headPortrait     VARCHAR(255),
  notify	int(11) NOT NULL DEFAULT '0',
  CONSTRAINT uq_mobileUser_mobileNo UNIQUE (mobileNo),
  CONSTRAINT pk_mobileUser PRIMARY KEY (mobileId))
  ENGINE =InnoDB
  DEFAULT CHARSET =utf8;

DROP TABLE IF EXISTS questionAnswer;
CREATE TABLE questionAnswer (
  questionId BIGINT AUTO_INCREMENT NOT NULL,
  userId     CHAR(11),
  userName   VARCHAR(255),
  mobileNo   VARCHAR(255),
  title      VARCHAR(255),
  type       INTEGER,
  collegeId  INTEGER,
  `schoolName` varchar(255) DEFAULT NULL,
  t          INTEGER,
  content    VARCHAR(2000),
  addTime    DATETIME,
  status     INTEGER,
  classic    INTEGER,
  answererId BIGINT,
  answer     VARCHAR(2000),
  answerTime DATETIME,
  reviewerId BIGINT,
  review     VARCHAR(2000),
  reviewTime DATETIME,
  CONSTRAINT pk_questionAnswer PRIMARY KEY (questionId))
  ENGINE =InnoDB
  DEFAULT CHARSET =utf8;

DROP TABLE IF EXISTS teacher;
CREATE TABLE teacher (
  teacherId    BIGINT AUTO_INCREMENT NOT NULL,
  userName     VARCHAR(255),
  password     VARCHAR(255),
  cid          INTEGER,
  role         INTEGER,
  registerDate DATETIME,
  lastLogin    DATETIME,
  CONSTRAINT uq_teacher_userName UNIQUE (userName),
  CONSTRAINT pk_teacher PRIMARY KEY (teacherId))
  ENGINE =InnoDB
  DEFAULT CHARSET =utf8;

DROP TABLE IF EXISTS popularCollege;
CREATE TABLE popularCollege (
  cid        BIGINT  NOT NULL,
  t          INTEGER NOT NULL,
  popularity INTEGER,
  CONSTRAINT pk_popularCollege PRIMARY KEY (cid, t))
  ENGINE =InnoDB
  DEFAULT CHARSET =utf8;

/* 1.2 */
DROP TABLE IF EXISTS systemadminuser;
CREATE TABLE systemadminuser (
	adminid int(11) NOT NULL AUTO_INCREMENT,
	loginname varchar(50) NOT NULL,
	password varchar(32) NOT NULL,
	truename varchar(100),
	powertype smallint(6),
	regdate varchar(30),
	logindate varchar(30),
	loginip varchar(30),
	logins tinyint(4),
PRIMARY KEY (adminid)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;


/* 2.0 */
DROP TABLE IF EXISTS `androidPush`;
CREATE TABLE `androidPush` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cid` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `pushTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `calendarevent`;
CREATE TABLE `calendarevent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `examtype` smallint(6) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `timing` datetime DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `calendareventrs`;
CREATE TABLE `calendareventrs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `eventid` int(11) DEFAULT NULL,
  `rstype` smallint(6) DEFAULT NULL,
  `rsvalue` varchar(255) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `calendarschedule`;
CREATE TABLE `calendarschedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `examtype` smallint(6) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `timing` datetime DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `calendartimer`;
CREATE TABLE `calendartimer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `examtype` smallint(6) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `timing` datetime DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `favoriteInformation`;
CREATE TABLE `favoriteInformation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` char(11) DEFAULT NULL,
  `iid` bigint(20) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  `flag` int(11) NOT NULL,
  `favorTime` datetime DEFAULT NULL,
  `unfavorTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `favoriteNews`;
CREATE TABLE `favoriteNews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` char(11) DEFAULT NULL,
  `newsId` bigint(20) DEFAULT NULL,
  `flag` int(11) NOT NULL,
  `favorTime` datetime DEFAULT NULL,
  `unfavorTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `infosubject`;
CREATE TABLE `infosubject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `examtype` smallint(6) DEFAULT NULL,
  `sid` smallint(6) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `iids` varchar(1000) DEFAULT NULL,
  `recommend` tinyint(4) DEFAULT NULL,
  `recommendtime` datetime DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `mobileAdNew`;
CREATE TABLE `mobileAdNew` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `adtype` int(11) DEFAULT NULL,
  `pluginid` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `adorder` int(11) DEFAULT NULL,
  `examtype` smallint(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `plugin`;
CREATE TABLE `plugin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `img` varchar(100) DEFAULT NULL,
  `charge` int(11) NOT NULL DEFAULT '0',
  `chargeremark` varchar(255) DEFAULT NULL,
  `fee` double DEFAULT '0',
  `favor` bigint(20) DEFAULT '0',
  `isdefault` int(11) NOT NULL DEFAULT '0',
  `begintime` datetime DEFAULT NULL,
  `expirydate` datetime DEFAULT NULL,
  `recommend` int(11) NOT NULL DEFAULT '0',
  `examtype` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pluginPackage`;
CREATE TABLE `pluginPackage` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `pluginids` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pushCategory`;
CREATE TABLE `pushCategory` (
  `cid` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `pluginid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pushMessage`;
CREATE TABLE `pushMessage` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cid` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `msgtype` int(11) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `pushstarttime` datetime DEFAULT NULL,
  `pushendtime` datetime DEFAULT NULL,
  `androidresult` varchar(255) DEFAULT NULL,
  `iosresult` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pushtemplate`;
CREATE TABLE `pushtemplate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pushtype` smallint(6) DEFAULT NULL,
  `examtype` smallint(6) DEFAULT NULL,
  `clock` tinyint(4) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `recommendInformation`;
CREATE TABLE `recommendInformation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `iid` bigint(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `recommendDate` datetime DEFAULT NULL,
  `recommend` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_recommendInformation_iid` (`iid`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `recommendNews`;
CREATE TABLE `recommendNews` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nid` bigint(20) DEFAULT NULL,
  `recommendDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_recommendNews_nid` (`nid`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `reviewcard`;
CREATE TABLE `reviewcard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pluginid` int(11) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `content` text,
  `sn` smallint(6) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `reviewplugin`;
CREATE TABLE `reviewplugin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `begintime` datetime DEFAULT NULL,
  `endtime` datetime DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `signflow`;
CREATE TABLE `signflow` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `examtype` smallint(6) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `signflowstep`;
CREATE TABLE `signflowstep` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `flowid` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `begintime` datetime DEFAULT NULL,
  `endtime` datetime DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `signflowsteppolicy`;
CREATE TABLE `signflowsteppolicy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stepid` int(11) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `content` text,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `userBaiduPushMapping`;
CREATE TABLE `userBaiduPushMapping` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` char(11) DEFAULT NULL,
  `android_user_id` varchar(255) DEFAULT NULL,
  `android_channel_id` varchar(255) DEFAULT NULL,
  `android_appid` varchar(255) DEFAULT NULL,
  `ios_user_id` varchar(255) DEFAULT NULL,
  `ios_channel_id` varchar(255) DEFAULT NULL,
  `ios_appid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `userExamEventMapping`;
CREATE TABLE `userExamEventMapping` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` char(11) DEFAULT NULL,
  `eventid` bigint(20) DEFAULT NULL,
  `enabled` int(11) NOT NULL DEFAULT '0',
  `enabletime` datetime DEFAULT NULL,
  `disabletime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `userExamTimerMapping`;
CREATE TABLE `userExamTimerMapping` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` char(11) DEFAULT NULL,
  `timerid` bigint(20) DEFAULT NULL,
  `enabled` int(11) NOT NULL DEFAULT '0',
  `enabletime` datetime DEFAULT NULL,
  `disabletime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `userExamineeMapping`;
CREATE TABLE `userExamineeMapping` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` char(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `idcard` varchar(255) DEFAULT NULL,
  `admissioncardid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `userPluginMapping`;
CREATE TABLE `userPluginMapping` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` char(11) DEFAULT NULL,
  `pluginid` bigint(20) DEFAULT NULL,
  `enabled` int(11) NOT NULL DEFAULT '0',
  `enabletime` datetime DEFAULT NULL,
  `disabletime` datetime DEFAULT NULL,
  `favored` int(11) NOT NULL DEFAULT '0',
  `favortime` datetime DEFAULT NULL,
  `unfavortime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=162 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `userPluginOrderMapping`;
CREATE TABLE `userPluginOrderMapping` (
  `userId` char(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `userPluginPackageMapping`;
CREATE TABLE `userPluginPackageMapping` (
  `userId` char(11) NOT NULL,
  `packageid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `userPluginShortcutMapping`;
CREATE TABLE `userPluginShortcutMapping` (
  `userId` char(11) NOT NULL,
  `pluginids` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `userPushCategoryMapping`;
CREATE TABLE `userPushCategoryMapping` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` char(11) DEFAULT NULL,
  `cid` bigint(20) DEFAULT NULL,
  `enabled` int(11) NOT NULL DEFAULT '0',
  `enabletime` datetime DEFAULT NULL,
  `disabletime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `userReviewProgress`;
CREATE TABLE `userReviewProgress` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` char(11) DEFAULT NULL,
  `reviewpluginid` bigint(20) DEFAULT NULL,
  `reviewcardid` bigint(20) DEFAULT NULL,
  `done` int(11) NOT NULL DEFAULT '0',
  `donetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `userevent`;
CREATE TABLE `userevent` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` char(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `timing` datetime DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;