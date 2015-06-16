package com.dm.orm.biz.impl;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.log4j.Logger;

import com.dm.orm.biz.IPushTemplateBiz;
import com.dm.orm.mapper.PushTemplateMapper;
import com.dm.orm.mapper.entity.PushTemplate;
import com.dm.task.LuquTask;
import com.dm.task.ScoreTask;

public class PushTemplateBizImpl implements IPushTemplateBiz {

	private Logger log = Logger.getLogger(PushTemplateBizImpl.class);

	private PushTemplateMapper mapper;

	public void setMapper(PushTemplateMapper mapper) {
		this.mapper = mapper;
	}

	@Override
	public int countPushTemplates(PushTemplate cond) {
		log.debug("countPushTemplates starting...");
		int count = 0;
		try {
			count = mapper.countPushTemplates(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countPushTemplates end");
		return count;
	}

	@Override
	public List<PushTemplate> findPushTemplatesByPage(PushTemplate cond) {
		log.debug("findPushTemplatesByPage starting...");
		List<PushTemplate> list = null;
		try {
			list = mapper.findPushTemplatesByPage(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findPushTemplatesByPage end");
		return list;
	}

	@Override
	public PushTemplate getPushTemplate(int id) {
		log.debug("getPushTemplate starting...");
		PushTemplate obj = null;
		try {
			obj = mapper.getPushTemplate(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getPushTemplate end");
		return obj;
	}

	@Override
	public PushTemplate getPushTemplateByClock(PushTemplate cond) {
		log.debug("getPushTemplateByClock starting...");
		PushTemplate obj = null;
		try {
			obj = mapper.getPushTemplateByClock(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getPushTemplateByClock end");
		return obj;
	}

	@Override
	public int addPushTemplate(PushTemplate obj) {
		log.debug("addPushTemplate starting...");
		int retval = 0;
		try {
			PushTemplate existObj = mapper.getPushTemplateByClock(obj);
			if (existObj != null) {
				throw new BizException(BizErr.EX_ADD_FAIL, "已经存在该时间点的推送!");
			}
			obj.setCreatetime(new Timestamp(System.currentTimeMillis()));
			retval = mapper.addPushTemplate(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			retval = obj.getId();
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addPushTemplate end");
		return retval;
	}

	@Override
	public int updatePushTemplate(PushTemplate obj) {
		log.debug("updatePushTemplate starting...");
		int retval = 0;
		try {
			PushTemplate existObj = mapper.getPushTemplateByClock(obj);
			if (existObj != null) {
				throw new BizException(BizErr.EX_UPDATE_FAIL, "已经存在该时间点的推送!");
			}
			retval = mapper.updatePushTemplate(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updatePushTemplate end");
		return retval;
	}

	@Override
	public int deletePushTemplate(int id) {
		log.debug("deletePushTemplate starting...");
		int retval = 0;
		try {
			retval = mapper.deletePushTemplate(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deletePushTemplate end");
		return retval;
	}

	@Override
	public int applyPushTemplateNow(int pushType, int examType, String message) {
		log.debug("applyPushTemplateNow starting...");

		final int type = examType;
		final String msg = message;
		if (pushType == ScoreTask.pushType) {
			if (ScoreTask.isRunning) {
				throw new BizException(BizErr.EX_PUSH_RUNNING,
						"分数推送正在运行中,请稍后尝试或者设置定时推送!");
			}
			Timer t = new Timer();
			t.schedule(new TimerTask() {
				@Override
				public void run() {
					ScoreTask task = new ScoreTask();
					task.pushNow(type, msg);
				}
			}, 100);
			// t.cancel();
		} else if (pushType == LuquTask.pushType) {
			if (LuquTask.isRunning) {
				throw new BizException(BizErr.EX_PUSH_RUNNING,
						"录取状态推送正在运行中,请稍后尝试或者设置定时推送!");
			}
			Timer t = new Timer();
			t.schedule(new TimerTask() {
				@Override
				public void run() {
					LuquTask task = new LuquTask();
					task.pushNow(type, msg);
				}
			}, 100);
			// t.cancel();
		} else {
			throw new BizException(BizErr.EX_PUSH_RUNNING, "尚不支持该推送类型!");
		}
		log.debug("applyPushTemplateNow end");
		return 1;
	}
}
