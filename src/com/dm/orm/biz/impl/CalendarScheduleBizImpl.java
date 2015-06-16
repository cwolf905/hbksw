package com.dm.orm.biz.impl;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.orm.biz.ICalendarScheduleBiz;
import com.dm.orm.mapper.CalendarScheduleMapper;
import com.dm.orm.mapper.entity.CalendarSchedule;

public class CalendarScheduleBizImpl implements ICalendarScheduleBiz {

	private Logger log = Logger.getLogger(CalendarScheduleBizImpl.class);

	private CalendarScheduleMapper mapper;

	public void setMapper(CalendarScheduleMapper mapper) {
		this.mapper = mapper;
	}

	@Override
	public int countCalendarSchedules(CalendarSchedule cond) {
		log.debug("countCalendarSchedules starting...");
		int count = 0;
		try {
			count = mapper.countCalendarSchedules(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countCalendarSchedules end");
		return count;
	}

	@Override
	public List<CalendarSchedule> findCalendarSchedulesByPage(
			CalendarSchedule cond) {
		log.debug("findCalendarSchedulesByPage starting...");
		List<CalendarSchedule> list = null;
		try {
			list = mapper.findCalendarSchedulesByPage(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findCalendarSchedulesByPage end");
		return list;
	}

	@Override
	public List<CalendarSchedule> findCalendarSchedules(CalendarSchedule cond) {
		log.debug("findCalendarSchedules starting...");
		List<CalendarSchedule> list = null;
		try {
			list = mapper.findCalendarSchedules(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findCalendarSchedules end");
		return list;
	}

	@Override
	public CalendarSchedule getCalendarSchedule(int id) {
		log.debug("getCalendarSchedule starting...");
		CalendarSchedule obj = null;
		try {
			obj = mapper.getCalendarSchedule(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getCalendarSchedule end");
		return obj;
	}

	@Override
	public int addCalendarSchedule(CalendarSchedule obj) {
		log.debug("addCalendarSchedule starting...");
		int retval = 0;
		try {
			obj.setCreatetime(new Timestamp(System.currentTimeMillis()));
			retval = mapper.addCalendarSchedule(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			retval = obj.getId();
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addCalendarSchedule end");
		return retval;
	}

	@Override
	public int updateCalendarSchedule(CalendarSchedule obj) {
		log.debug("updateCalendarSchedule starting...");
		int retval = 0;
		try {
			retval = mapper.updateCalendarSchedule(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updateCalendarSchedule end");
		return retval;
	}

	@Override
	public int deleteCalendarSchedule(int id) {
		log.debug("deleteCalendarSchedule starting...");
		int retval = 0;
		try {
			retval = mapper.deleteCalendarSchedule(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deleteCalendarSchedule end");
		return retval;
	}
}
