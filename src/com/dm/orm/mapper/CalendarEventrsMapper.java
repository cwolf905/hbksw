package com.dm.orm.mapper;

import java.sql.SQLException;
import java.util.List;

import com.dm.orm.mapper.entity.CalendarEventrs;

public interface CalendarEventrsMapper extends ISqlMapper {

	public List<CalendarEventrs> findAllCalendarEventrss(CalendarEventrs cond)
			throws SQLException;

	public CalendarEventrs getCalendarEventrs(int id) throws SQLException;

	public int addCalendarEventrs(CalendarEventrs obj) throws SQLException;

	public int updateCalendarEventrs(CalendarEventrs obj) throws SQLException;

	public int deleteCalendarEventrs(int id) throws SQLException;

}
