package com.dm.orm.biz.impl;

import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.orm.biz.IPluginFeeBiz;
import com.dm.orm.mapper.PluginFeeMapper;
import com.dm.orm.mapper.entity.PluginFee;

public class PluginFeeBizImpl implements IPluginFeeBiz {

	private Logger log = Logger.getLogger(PluginFeeBizImpl.class);

	private PluginFeeMapper mapper;

	public void setMapper(PluginFeeMapper mapper) {
		this.mapper = mapper;
	}

	@Override
	public List<PluginFee> findAllPluginFees(PluginFee cond) {
		log.debug("findPluginFeesByPage starting...");
		List<PluginFee> list = null;
		try {
			list = mapper.findAllPluginFees(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findPluginFeesByPage end");
		return list;
	}

	@Override
	public PluginFee getPluginFee(int id) {
		log.debug("getPluginFee starting...");
		PluginFee obj = null;
		try {
			obj = mapper.getPluginFee(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getPluginFee end");
		return obj;
	}

	@Override
	public int addPluginFee(PluginFee obj) {
		log.debug("addPluginFee starting...");
		int retval = 0;
		try {
			retval = mapper.addPluginFee(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			retval = obj.getId();
			
			
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addPluginFee end");
		return retval;
	}

	@Override
	public int updatePluginFee(PluginFee obj) {
		log.debug("updatePluginFee starting...");
		int retval = 0;
		try {
			retval = mapper.updatePluginFee(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updatePluginFee end");
		return retval;
	}

	@Override
	public int deletePluginFee(int id) {
		log.debug("deletePluginFee starting...");
		int retval = 0;
		try {
			retval = mapper.deletePluginFee(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deletePluginFee end");
		return retval;
	}
}
