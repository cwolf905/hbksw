package com.dm.orm.biz.impl;

import java.io.File;
import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.core.SysConfig;
import com.dm.orm.biz.InfoSubjectPictureBiz;
import com.dm.orm.mapper.InfoSubjectPictureMapper;
import com.dm.orm.mapper.entity.InfoSubjectPicture;

public class InfoSubjectPictureBizImpl implements InfoSubjectPictureBiz {

	private Logger log = Logger.getLogger(InfoSubjectPictureBizImpl.class);

	private InfoSubjectPictureMapper mapper;

	public void setMapper(InfoSubjectPictureMapper mapper) {
		this.mapper = mapper;
	}

	@Override
	public int countInfoSubjectPictures(InfoSubjectPicture cond) {
		log.debug("countInfoSubjectPictures starting...");
		int count = 0;
		try {
			count = mapper.countInfoSubjectPictures(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countInfoSubjectPictures end");
		return count;
	}

	@Override
	public List<InfoSubjectPicture> findInfoSubjectPicturesByPage(InfoSubjectPicture cond) {
		log.debug("findInfoSubjectPicturesByPage starting...");
		List<InfoSubjectPicture> list = null;
		try {
			list = mapper.findInfoSubjectPicturesByPage(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findInfoSubjectPicturesByPage end");
		return list;
	}

	@Override
	public List<InfoSubjectPicture> findAllInfoSubjectPictures(InfoSubjectPicture cond) {
		log.debug("findAllInfoSubjectPictures starting...");
		List<InfoSubjectPicture> list = null;
		try {
			list = mapper.findAllInfoSubjectPictures(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findAllInfoSubjectPictures end");
		return list;
	}

	@Override
	public InfoSubjectPicture getInfoSubjectPicture(int id) {
		log.debug("getInfoSubjectPicture starting...");
		InfoSubjectPicture obj = null;
		try {
			obj = mapper.getInfoSubjectPicture(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getInfoSubjectPicture end");
		return obj;
	}

	@Override
	public int addInfoSubjectPicture(InfoSubjectPicture obj) {
		log.debug("addUniversity starting...");
		int retval = 0;
		try {
			retval = mapper.addInfoSubjectPicture(obj);
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
	public int updateInfoSubjectPicture(InfoSubjectPicture obj) {
		log.debug("updateInfoSubjectPicture starting...");
		int retval = 0;
		try {
			retval = mapper.updateInfoSubjectPicture(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updateInfoSubjectPicture end");
		return retval;
	}

	public int deleteInfoSubjectPicture(int id) {
		log.debug("deleteInfoSubjectPicture starting...");
		int retval = 0;
		try {
			retval = mapper.deleteInfoSubjectPicture(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deleteInfoSubjectPicture end");
		return retval;
	}

	@Override
	public int deleteInfoSubjectPictureFile(String type, String file) {
		log.debug("deleteInfoSubjectPictureFile starting...");
		String uri = SysConfig.concat(SysConfig.getWebAddr(), "uploadify",
				type, file);
		File f = new File(uri);
		if (f.exists())
			f.delete();
		log.debug("deleteInfoSubjectPictureFile end");
		return 1;
	}
}
