package com.dm.orm.biz.impl;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;

import com.dm.orm.biz.ICalendarTimerBiz;
import com.dm.orm.mapper.CalendarTimerMapper;
import com.dm.orm.mapper.entity.CalendarTimer;

public class CalendarTimerBizImpl implements ICalendarTimerBiz {

	private Logger log = Logger.getLogger(CalendarTimerBizImpl.class);

	private CalendarTimerMapper mapper;

	public void setMapper(CalendarTimerMapper mapper) {
		this.mapper = mapper;
	}

	@Override
	public int countCalendarTimers(CalendarTimer cond) {
		log.debug("countCalendarTimers starting...");
		int count = 0;
		try {
			count = mapper.countCalendarTimers(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("countCalendarTimers end");
		return count;
	}

	@Override
	public List<CalendarTimer> findCalendarTimersByPage(CalendarTimer cond) {
		log.debug("findCalendarTimersByPage starting...");
		List<CalendarTimer> list = null;
		try {
			list = mapper.findCalendarTimersByPage(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findCalendarTimersByPage end");
		return list;
	}

	@Override
	public List<CalendarTimer> findCalendarTimers(CalendarTimer cond) {
		log.debug("findCalendarTimers starting...");
		List<CalendarTimer> list = null;
		try {
			list = mapper.findCalendarTimers(cond);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("findCalendarTimers end");
		return list;
	}

	@Override
	public CalendarTimer getCalendarTimer(int id) {
		log.debug("getCalendarTimer starting...");
		CalendarTimer obj = null;
		try {
			obj = mapper.getCalendarTimer(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("getCalendarTimer end");
		return obj;
	}

	@Override
	public int addCalendarTimer(CalendarTimer obj) {
		log.debug("addCalendarTimer starting...");
		int retval = 0;
		try {
			obj.setCreatetime(new Timestamp(System.currentTimeMillis()));
			Timestamp timing = obj.getTiming();
			timing.setHours(0);
			timing.setMinutes(0);
			timing.setSeconds(0);
			retval = mapper.addCalendarTimer(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_ADD_FAIL);
			}
			retval = obj.getId();
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("addCalendarTimer end");
		return retval;
	}

	@Override
	public int updateCalendarTimer(CalendarTimer obj) {
		log.debug("updateCalendarTimer starting...");
		int retval = 0;
		try {
			retval = mapper.updateCalendarTimer(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("updateCalendarTimer end");
		return retval;
	}

	@Override
	public int applyCalendarTimerStatus(CalendarTimer obj) {
		log.debug("applyCalendarTimerStatus starting...");
		int retval = 0;
		try {
			retval = mapper.statusCalendarTimer(obj);
			if (retval == 0) {
				throw new BizException(BizErr.EX_UPDATE_FAIL);
			}
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("applyCalendarTimerStatus end");
		return retval;
	}

	@Override
	public int deleteCalendarTimer(int id) {
		log.debug("deleteCalendarTimer starting...");
		int retval = 0;
		try {
			retval = mapper.deleteCalendarTimer(id);
		} catch (SQLException ex) {
			log.error("exception:", ex);
			throw new BizException(BizErr.EX_TRANSACTION_FAIL);
		}
		log.debug("deleteCalendarTimer end");
		return retval;
	}
}
