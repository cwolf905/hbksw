package com.dm.orm.biz.impl;

import java.io.File;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.core.SysConfig;
import com.dm.orm.biz.ISignFlowStepPolicyBiz;
import com.dm.orm.mapper.SignFlowStepPolicyMapper;
import com.dm.orm.mapper.entity.SignFlowStepPolicy;

public class SignFlowStepPolicyBizImpl implements ISignFlowStepPolicyBiz {

	private Logger log = Logger.getLogger(SignFlowStepPolicyBizImpl.class);

	private SignFlowStepPolicyMapper mapper;

	public void setMapper(SignFlowStepPolicyMapper mapper) {
		this.mapper = mapper;
	}

	@Override
	public List<SignFlowStepPolicy> findAllSignFlowStepPolicys(
			SignFlowStepPolicy cond) {
		log.debug("findSignFlowStepPolicysByPage starting...");
		List<SignFlowStepPolicy> list = null;
		try {
			list = mapper.findAllSignFlowStepPolicys(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findSignFlowStepPolicysByPage end");
		return list;
	}

	@Override
	public SignFlowStepPolicy getSignFlowStepPolicy(int id) {
		log.debug("getSignFlowStepPolicy starting...");
		SignFlowStepPolicy obj = null;
		try {
			obj = mapper.getSignFlowStepPolicy(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getSignFlowStepPolicy end");
		return obj;
	}

	@Override
	public int addSignFlowStepPolicy(SignFlowStepPolicy obj) {
		log.debug("addSignFlowStepPolicy starting...");
		int retval = 0;
		try {
			obj.setCreatetime(new Timestamp(System.currentTimeMillis()));
			retval = mapper.addSignFlowStepPolicy(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			retval = obj.getId();
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addSignFlowStepPolicy end");
		return retval;
	}

	@Override
	public int updateSignFlowStepPolicy(SignFlowStepPolicy obj) {
		log.debug("updateSignFlowStepPolicy starting...");
		int retval = 0;
		try {
			retval = mapper.updateSignFlowStepPolicy(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updateSignFlowStepPolicy end");
		return retval;
	}

	@Override
	public int deleteSignFlowStepPolicy(int id) {
		log.debug("deleteSignFlowStepPolicy starting...");
		int retval = 0;
		try {
			retval = mapper.deleteSignFlowStepPolicy(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deleteSignFlowStepPolicy end");
		return retval;
	}

	@Override
	public int deleteSignFlowStepPolicyFile(String type, String file) {
		log.debug("deleteSignFlowStepPolicyFile starting...");
		String uri = SysConfig.concat(SysConfig.getWebAddr(), "uploadify",
				type, file);
		File f = new File(uri);
		if (f.exists())
			f.delete();
		log.debug("deleteSignFlowStepPolicyFile end");
		return 1;
	}
}
