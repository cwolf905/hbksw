package com.dm.orm.biz.impl;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.orm.biz.IPushSampleBiz;
import com.dm.orm.mapper.PushSampleMapper;
import com.dm.orm.mapper.entity.PushSample;

public class PushSampleBizImpl implements IPushSampleBiz {

	private Logger log = Logger.getLogger(PushSampleBizImpl.class);

	private PushSampleMapper mapper;

	public void setMapper(PushSampleMapper mapper) {
		this.mapper = mapper;
	}

	@Override
	public int countPushSamples(PushSample cond) {
		log.debug("countPushSamples starting...");
		int count = 0;
		try {
			count = mapper.countPushSamples(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countPushSamples end");
		return count;
	}

	@Override
	public List<PushSample> findPushSamplesByPage(PushSample cond) {
		log.debug("findPushSamplesByPage starting...");
		List<PushSample> list = null;
		try {
			list = mapper.findPushSamplesByPage(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findPushSamplesByPage end");
		return list;
	}

	@Override
	public PushSample getPushSample(int id) {
		log.debug("getPushSample starting...");
		PushSample obj = null;
		try {
			obj = mapper.getPushSample(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getPushSample end");
		return obj;
	}

	@Override
	public int addPushSample(PushSample obj) {
		log.debug("addPushSample starting...");
		int retval = 0;
		try {
			obj.setCreatetime(new Timestamp(System.currentTimeMillis()));
			retval = mapper.addPushSample(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			retval = obj.getId();
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addPushSample end");
		return retval;
	}

	@Override
	public int updatePushSample(PushSample obj) {
		log.debug("updatePushSample starting...");
		int retval = 0;
		try {
			retval = mapper.updatePushSample(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updatePushSample end");
		return retval;
	}

	@Override
	public int deletePushSample(int id) {
		log.debug("deletePushSample starting...");
		int retval = 0;
		try {
			retval = mapper.deletePushSample(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deletePushSample end");
		return retval;
	}
}
