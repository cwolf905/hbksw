package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.CalendarSchedule;

public interface CalendarScheduleMapper extends ISqlMapper {

	public int countCalendarSchedules(CalendarSchedule cond)
			throws SQLException;

	public List<CalendarSchedule> findCalendarSchedulesByPage(
			CalendarSchedule cond) throws SQLException;

	public List<CalendarSchedule> findCalendarSchedules(CalendarSchedule cond)
			throws SQLException;

	public CalendarSchedule getCalendarSchedule(int id) throws SQLException;

	public int addCalendarSchedule(CalendarSchedule obj) throws SQLException;

	public int updateCalendarSchedule(CalendarSchedule obj) throws SQLException;

	public int deleteCalendarSchedule(int id) throws SQLException;
}
