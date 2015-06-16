package com.dm.orm.biz;

import java.util.List;

import com.dm.orm.mapper.entity.CalendarTimer;

public interface ICalendarTimerBiz {

	/**
	 * 查询倒计时总数
	 * 
	 * @param cond
	 * @return
	 */
	public int countCalendarTimers(CalendarTimer cond);

	/**
	 * 分页查询
	 * 
	 * @param cond
	 * @return
	 */
	public List<CalendarTimer> findCalendarTimersByPage(CalendarTimer cond);
	
	/**
	 * 查询到期提醒
	 * 
	 * @param cond
	 * @return
	 */
	public List<CalendarTimer> findCalendarTimers(CalendarTimer cond);

	/**
	 * 查询某个倒计时的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public CalendarTimer getCalendarTimer(int id);

	/**
	 * 发布倒计时
	 * 
	 * @param obj
	 * @return
	 */
	public int addCalendarTimer(CalendarTimer obj);

	/**
	 * 修改倒计时信息
	 * 
	 * @param obj
	 * @return
	 */
	public int updateCalendarTimer(CalendarTimer obj);

	/**
	 * 启用/停用倒计时信息
	 * 
	 * @param obj
	 * @return
	 */
	public int applyCalendarTimerStatus(CalendarTimer obj);

	/**
	 * 删除倒计时
	 * 
	 * @param id
	 * @return
	 */
	public int deleteCalendarTimer(int id);
}
