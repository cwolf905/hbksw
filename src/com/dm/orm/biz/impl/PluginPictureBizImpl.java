package com.dm.orm.biz.impl;

import java.io.File;
import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.core.SysConfig;
import com.dm.orm.biz.IPluginPictureBiz;
import com.dm.orm.mapper.PluginPictureMapper;
import com.dm.orm.mapper.entity.PluginPicture;

public class PluginPictureBizImpl implements IPluginPictureBiz {

	private Logger log = Logger.getLogger(PluginPictureBizImpl.class);

	private PluginPictureMapper mapper;

	public void setMapper(PluginPictureMapper mapper) {
		this.mapper = mapper;
	}

	@Override
	public int countPluginPictures(PluginPicture cond) {
		log.debug("countPluginPictures starting...");
		int count = 0;
		try {
			count = mapper.countPluginPictures(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countPluginPictures end");
		return count;
	}

	@Override
	public List<PluginPicture> findPluginPicturesByPage(PluginPicture cond) {
		log.debug("findPluginPicturesByPage starting...");
		List<PluginPicture> list = null;
		try {
			list = mapper.findPluginPicturesByPage(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findPluginPicturesByPage end");
		return list;
	}

	@Override
	public List<PluginPicture> findAllPluginPictures(PluginPicture cond) {
		log.debug("findAllPluginPictures starting...");
		List<PluginPicture> list = null;
		try {
			list = mapper.findAllPluginPictures(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findAllPluginPictures end");
		return list;
	}

	@Override
	public PluginPicture getPluginPicture(int id) {
		log.debug("getPluginPicture starting...");
		PluginPicture obj = null;
		try {
			obj = mapper.getPluginPicture(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getPluginPicture end");
		return obj;
	}

	@Override
	public int addPluginPicture(PluginPicture obj) {
		log.debug("addUniversity starting...");
		int retval = 0;
		try {
			retval = mapper.addPluginPicture(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			retval = obj.getId();
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addUniversity end");
		return retval;
	}

	@Override
	public int updatePluginPicture(PluginPicture obj) {
		log.debug("updatePluginPicture starting...");
		int retval = 0;
		try {
			retval = mapper.updatePluginPicture(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updatePluginPicture end");
		return retval;
	}

	@Override
	public int deletePluginPicture(int id) {
		log.debug("deletePluginPicture starting...");
		int retval = 0;
		try {
			retval = mapper.deletePluginPicture(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deletePluginPicture end");
		return retval;
	}

	@Override
	public int deletePluginPictureFile(String type, String file) {
		log.debug("deletePluginPictureFile starting...");
		String uri = SysConfig.concat(SysConfig.getWebAddr(), "uploadify",
				type, file);
		File f = new File(uri);
		if (f.exists())
			f.delete();
		log.debug("deletePluginPictureFile end");
		return 1;
	}
}
