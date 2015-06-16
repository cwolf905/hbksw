package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.CalendarSchedule;

public interface ICalendarScheduleBiz {

	/**
	 * 查询考试安排总数
	 * 
	 * @param cond
	 * @return
	 */
	public int countCalendarSchedules(CalendarSchedule cond);

	/**
	 * 分页查询
	 * 
	 * @param cond
	 * @return
	 */
	public List<CalendarSchedule> findCalendarSchedulesByPage(CalendarSchedule cond);
	
	/**
	 * 查询到期安排
	 * 
	 * @param cond
	 * @return
	 */
	public List<CalendarSchedule> findCalendarSchedules(CalendarSchedule cond);

	/**
	 * 查询某个考试安排的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public CalendarSchedule getCalendarSchedule(int id);

	/**
	 * 发布考试安排
	 * 
	 * @param obj
	 * @return
	 */
	public int addCalendarSchedule(CalendarSchedule obj);

	/**
	 * 修改考试安排信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updateCalendarSchedule(CalendarSchedule obj);

	/**
	 * 删除考试安排
	 * 
	 * @param id
	 * @return
	 */
	public int deleteCalendarSchedule(int id);
}
