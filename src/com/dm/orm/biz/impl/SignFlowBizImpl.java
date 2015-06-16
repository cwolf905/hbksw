package com.dm.orm.biz.impl;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.orm.biz.ISignFlowBiz;
import com.dm.orm.mapper.SignFlowMapper;
import com.dm.orm.mapper.entity.SignFlow;

public class SignFlowBizImpl implements ISignFlowBiz {

	private Logger log = Logger.getLogger(SignFlowBizImpl.class);

	private SignFlowMapper mapper;

	public void setMapper(SignFlowMapper mapper) {
		this.mapper = mapper;
	}

	@Override
	public int countSignFlows(SignFlow cond) {
		log.debug("countSignFlows starting...");
		int count = 0;
		try {
			count = mapper.countSignFlows(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countSignFlows end");
		return count;
	}

	@Override
	public List<SignFlow> findSignFlowsByPage(SignFlow cond) {
		log.debug("findSignFlowsByPage starting...");
		List<SignFlow> list = null;
		try {
			list = mapper.findSignFlowsByPage(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findSignFlowsByPage end");
		return list;
	}

	@Override
	public SignFlow getSignFlow(int id) {
		log.debug("getSignFlow starting...");
		SignFlow obj = null;
		try {
			obj = mapper.getSignFlow(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getSignFlow end");
		return obj;
	}

	@Override
	public int addSignFlow(SignFlow obj) {
		log.debug("addSignFlow starting...");
		int retval = 0;
		try {
			obj.setCreatetime(new Timestamp(System.currentTimeMillis()));
			retval = mapper.addSignFlow(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			retval = obj.getId();
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addSignFlow end");
		return retval;
	}

	@Override
	public int updateSignFlow(SignFlow obj) {
		log.debug("updateSignFlow starting...");
		int retval = 0;
		try {
			retval = mapper.updateSignFlow(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updateSignFlow end");
		return retval;
	}

	@Override
	public int deleteSignFlow(int id) {
		log.debug("deleteSignFlow starting...");
		int retval = 0;
		try {
			retval = mapper.deleteSignFlow(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deleteSignFlow end");
		return retval;
	}
}
