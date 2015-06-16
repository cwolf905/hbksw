package com.dm.orm.biz.impl;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.orm.biz.ISignFlowStepBiz;
import com.dm.orm.mapper.SignFlowStepMapper;
import com.dm.orm.mapper.entity.FlowStepIcon;
import com.dm.orm.mapper.entity.SignFlowStep;

public class SignFlowStepBizImpl implements ISignFlowStepBiz {

	private Logger log = Logger.getLogger(SignFlowStepBizImpl.class);

	private SignFlowStepMapper mapper;

	public void setMapper(SignFlowStepMapper mapper) {
		this.mapper = mapper;
	}
	
	/**
	 * 查询所有的图标
	 * @return
	 */
	public List<FlowStepIcon> initAllFlowStepIcon()
	{
		
		List<FlowStepIcon> allFlowStepIcon = mapper.findAllFlowStepsIcon();
		return allFlowStepIcon;
	}

	@Override
	public List<SignFlowStep> findAllSignFlowSteps(SignFlowStep cond) {
		log.debug("findSignFlowStepsByPage starting...");
		List<SignFlowStep> list = null;
		try {
			list = mapper.findAllSignFlowSteps(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findSignFlowStepsByPage end");
		return list;
	}

	@Override
	public SignFlowStep getSignFlowStep(int id) {
		log.debug("getSignFlowStep starting...");
		SignFlowStep obj = null;
		try {
			obj = mapper.getSignFlowStep(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getSignFlowStep end");
		return obj;
	}

	@Override
	public int addSignFlowStep(SignFlowStep obj) {
		log.debug("addSignFlowStep starting...");
		int retval = 0;
		try {
			obj.setCreatetime(new Timestamp(System.currentTimeMillis()));
			retval = mapper.addSignFlowStep(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			retval = obj.getId();
		} catch (SQLException ex) {
			log.error("exception:", ex);
			ex.printStackTrace();
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addSignFlowStep end");
		return retval;
	}

	@Override
	public int updateSignFlowStep(SignFlowStep obj) {
		log.debug("updateSignFlowStep starting...");
		int retval = 0;
		try {
			retval = mapper.updateSignFlowStep(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updateSignFlowStep end");
		return retval;
	}

	@Override
	public int deleteSignFlowStep(int id) {
		log.debug("deleteSignFlowStep starting...");
		int retval = 0;
		try {
			retval = mapper.deleteSignFlowStep(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deleteSignFlowStep end");
		return retval;
	}
}
