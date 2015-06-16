package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.CalendarTimer;

public interface CalendarTimerMapper extends ISqlMapper {

	public int countCalendarTimers(CalendarTimer cond) throws SQLException;

	public List<CalendarTimer> findCalendarTimersByPage(CalendarTimer cond)
			throws SQLException;

	public List<CalendarTimer> findCalendarTimers(CalendarTimer cond)
			throws SQLException;

	public CalendarTimer getCalendarTimer(int id) throws SQLException;

	public int addCalendarTimer(CalendarTimer obj) throws SQLException;

	public int updateCalendarTimer(CalendarTimer obj) throws SQLException;

	public int statusCalendarTimer(CalendarTimer obj) throws SQLException;

	public int deleteCalendarTimer(int id) throws SQLException;
}
