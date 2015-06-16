package com.dm.orm.biz.impl;

import java.io.File;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.core.SysConfig;
import com.dm.orm.biz.ICalendarEventBiz;
import com.dm.orm.mapper.CalendarEventMapper;
import com.dm.orm.mapper.entity.CalendarEvent;

public class CalendarEventBizImpl implements ICalendarEventBiz {

	private Logger log = Logger.getLogger(CalendarEventBizImpl.class);

	private CalendarEventMapper mapper;

	public void setMapper(CalendarEventMapper mapper) {
		this.mapper = mapper;
	}

	@Override
	public int countCalendarEvents(CalendarEvent cond) {
		log.debug("countCalendarEvents starting...");
		int count = 0;
		try {
			count = mapper.countCalendarEvents(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countCalendarEvents end");
		return count;
	}

	@Override
	public List<CalendarEvent> findCalendarEventsByPage(CalendarEvent cond) {
		log.debug("findCalendarEventsByPage starting...");
		List<CalendarEvent> list = null;
		try {
			list = mapper.findCalendarEventsByPage(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findCalendarEventsByPage end");
		return list;
	}

	@Override
	public List<CalendarEvent> findCalendarEvents(CalendarEvent cond) {
		log.debug("findCalendarEvents starting...");
		List<CalendarEvent> list = null;
		try {
			list = mapper.findCalendarEvents(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findCalendarEvents end");
		return list;
	}

	@Override
	public CalendarEvent getCalendarEvent(int id) {
		log.debug("getCalendarEvent starting...");
		CalendarEvent obj = null;
		try {
			obj = mapper.getCalendarEvent(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getCalendarEvent end");
		return obj;
	}

	@Override
	public int addCalendarEvent(CalendarEvent obj) {
		log.debug("addCalendarEvent starting...");
		int retval = 0;
		try {
			obj.setCreatetime(new Timestamp(System.currentTimeMillis()));
			retval = mapper.addCalendarEvent(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			retval = obj.getId();
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addCalendarEvent end");
		return retval;
	}

	@Override
	public int updateCalendarEvent(CalendarEvent obj) {
		log.debug("updateCalendarEvent starting...");
		int retval = 0;
		try {
			retval = mapper.updateCalendarEvent(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updateCalendarEvent end");
		return retval;
	}

	@Override
	public int deleteCalendarEvent(int id) {
		log.debug("deleteCalendarEvent starting...");
		int retval = 0;
		try {
			retval = mapper.deleteCalendarEvent(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deleteCalendarEvent end");
		return retval;
	}

	@Override
	public int deleteCalendarEventFile(String type, String file) {
		log.debug("deleteCalendarEventFile starting...");
		String uri = SysConfig.concat(SysConfig.getWebAddr(), "uploadify",
				type, file);
		File f = new File(uri);
		if (f.exists())
			f.delete();
		log.debug("deleteCalendarEventFile end");
		return 1;
	}
}
