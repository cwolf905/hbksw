package com.dm.orm.biz.impl;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.orm.biz.ICalendarEventrsBiz;
import com.dm.orm.mapper.CalendarEventrsMapper;
import com.dm.orm.mapper.entity.CalendarEventrs;

public class CalendarEventrsBizImpl implements ICalendarEventrsBiz {

	private Logger log = Logger.getLogger(CalendarEventrsBizImpl.class);

	private CalendarEventrsMapper mapper;

	public void setMapper(CalendarEventrsMapper mapper) {
		this.mapper = mapper;
	}

	@Override
	public List<CalendarEventrs> findAllCalendarEventrss(CalendarEventrs cond) {
		log.debug("findCalendarEventrssByPage starting...");
		List<CalendarEventrs> list = null;
		try {
			list = mapper.findAllCalendarEventrss(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findCalendarEventrssByPage end");
		return list;
	}

	@Override
	public CalendarEventrs getCalendarEventrs(int id) {
		log.debug("getCalendarEventrs starting...");
		CalendarEventrs obj = null;
		try {
			obj = mapper.getCalendarEventrs(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getCalendarEventrs end");
		return obj;
	}

	@Override
	public int addCalendarEventrs(CalendarEventrs obj) {
		log.debug("addCalendarEventrs starting...");
		int retval = 0;
		try {
			obj.setCreatetime(new Timestamp(System.currentTimeMillis()));
			retval = mapper.addCalendarEventrs(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			retval = obj.getId();
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addCalendarEventrs end");
		return retval;
	}

	@Override
	public int updateCalendarEventrs(CalendarEventrs obj) {
		log.debug("updateCalendarEventrs starting...");
		int retval = 0;
		try {
			retval = mapper.updateCalendarEventrs(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updateCalendarEventrs end");
		return retval;
	}

	@Override
	public int deleteCalendarEventrs(int id) {
		log.debug("deleteCalendarEventrs starting...");
		int retval = 0;
		try {
			retval = mapper.deleteCalendarEventrs(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deleteCalendarEventrs end");
		return retval;
	}
}
