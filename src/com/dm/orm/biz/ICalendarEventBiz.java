package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.CalendarEvent;

public interface ICalendarEventBiz {

	/**
	 * 查询系统事件总数
	 * 
	 * @param cond
	 * @return
	 */
	public int countCalendarEvents(CalendarEvent cond);

	/**
	 * 分页查询
	 * 
	 * @param cond
	 * @return
	 */
	public List<CalendarEvent> findCalendarEventsByPage(CalendarEvent cond);

	/**
	 * 查询到期事件
	 * 
	 * @param cond
	 * @return
	 */
	public List<CalendarEvent> findCalendarEvents(CalendarEvent cond);

	/**
	 * 查询某个系统事件的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public CalendarEvent getCalendarEvent(int id);

	/**
	 * 发布系统事件
	 * 
	 * @param obj
	 * @return
	 */
	public int addCalendarEvent(CalendarEvent obj);

	/**
	 * 修改系统事件信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updateCalendarEvent(CalendarEvent obj);

	/**
	 * 删除系统事件
	 * 
	 * @param id
	 * @return
	 */
	public int deleteCalendarEvent(int id);

	/**
	 * 删除上传的系统事件图片
	 * 
	 * @param type
	 * @param file
	 * @return
	 */
	public int deleteCalendarEventFile(String type, String file);
}
