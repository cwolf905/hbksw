package com.dm.orm.biz.impl;

import java.io.File;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.core.SysConfig;
import com.dm.orm.biz.IAppReleaseBiz;
import com.dm.orm.mapper.AppReleaseMapper;
import com.dm.orm.mapper.entity.AppRelease;

public class AppReleaseBizImpl implements IAppReleaseBiz {

	private Logger log = Logger.getLogger(AppReleaseBizImpl.class);

	private AppReleaseMapper mapper;

	public void setMapper(AppReleaseMapper mapper) {
		this.mapper = mapper;
	}

	@Override
	public int countAppReleases(AppRelease cond) {
		log.debug("countAppReleases starting...");
		int count = 0;
		try {
			count = mapper.countAppReleases(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countAppReleases end");
		return count;
	}

	@Override
	public List<AppRelease> findAppReleasesByPage(AppRelease cond) {
		log.debug("findAppReleasesByPage starting...");
		List<AppRelease> list = null;
		try {
			list = mapper.findAppReleasesByPage(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findAppReleasesByPage end");
		return list;
	}

	@Override
	public AppRelease getAppRelease(int id) {
		log.debug("getAppRelease starting...");
		AppRelease obj = null;
		try {
			obj = mapper.getAppRelease(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getAppRelease end");
		return obj;
	}

	@Override
	public int addAppRelease(AppRelease obj) {
		log.debug("addAppRelease starting...");
		int retval = 0;
		try {
			obj.setReleaseDate(new Timestamp(System.currentTimeMillis()));
			retval = mapper.addAppRelease(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			retval = obj.getId();
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addAppRelease end");
		return retval;
	}

	@Override
	public int updateAppRelease(AppRelease obj) {
		log.debug("updateAppRelease starting...");
		int retval = 0;
		try {
			retval = mapper.updateAppRelease(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updateAppRelease end");
		return retval;
	}

	@Override
	public int deleteAppRelease(int id) {
		log.debug("deleteAppRelease starting...");
		int retval = 0;
		try {
			retval = mapper.deleteAppRelease(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deleteAppRelease end");
		return retval;
	}

	@Override
	public int deleteAppReleaseFile(String type, String file) {
		log.debug("deleteAppReleaseFile starting...");
		String uri = SysConfig.concat(SysConfig.getWebAddr(), "uploadify",
				type, file);
		File f = new File(uri);
		if (f.exists())
			f.delete();
		log.debug("deleteAppReleaseFile end");
		return 1;
	}
}
