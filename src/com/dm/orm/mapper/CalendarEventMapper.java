package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.CalendarEvent;

public interface CalendarEventMapper extends ISqlMapper {

	public int countCalendarEvents(CalendarEvent cond) throws SQLException;

	public List<CalendarEvent> findCalendarEventsByPage(CalendarEvent cond)
			throws SQLException;

	public List<CalendarEvent> findCalendarEvents(CalendarEvent cond)
			throws SQLException;

	public CalendarEvent getCalendarEvent(int id) throws SQLException;

	public int addCalendarEvent(CalendarEvent obj) throws SQLException;

	public int updateCalendarEvent(CalendarEvent obj) throws SQLException;

	public int deleteCalendarEvent(int id) throws SQLException;

}
