package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.CalendarEventrs;

public interface ICalendarEventrsBiz {

	/**
	 * 查询所有系统事件资源
	 * 
	 * @param cond
	 * @return
	 */
	public List<CalendarEventrs> findAllCalendarEventrss(CalendarEventrs cond);

	/**
	 * 查询某个系统事件资源的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public CalendarEventrs getCalendarEventrs(int id);

	/**
	 * 发布系统事件资源
	 * 
	 * @param obj
	 * @return
	 */
	public int addCalendarEventrs(CalendarEventrs obj);

	/**
	 * 修改系统事件资源信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updateCalendarEventrs(CalendarEventrs obj);

	/**
	 * 删除系统事件资源
	 * 
	 * @param id
	 * @return
	 */
	public int deleteCalendarEventrs(int id);
}
