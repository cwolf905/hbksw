package com.dm.orm.biz.impl;

import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

public class BizCache {

	
	/**
	 * 提供插件服务
	 * 
	 * @return
	 */
	public static PluginBizImpl getPluginBiz() {
		WebApplicationContext wac = ContextLoader
				.getCurrentWebApplicationContext();
		PluginBizImpl biz = wac.getBean("pluginBiz",
				PluginBizImpl.class);
		return biz;
	}
	
	/**
	 * 提供分数推送和录取状态推送的模板查询
	 * 
	 * @return
	 */
	public static PushTemplateBizImpl getPushTemplateBiz() {
		WebApplicationContext wac = ContextLoader
				.getCurrentWebApplicationContext();
		PushTemplateBizImpl biz = wac.getBean("pushTemplateBiz",
				PushTemplateBizImpl.class);
		return biz;
	}

	/**
	 * 提供系统事件查询
	 * 
	 * @return
	 */
	public static CalendarEventBizImpl getCalendarEventBiz() {
		WebApplicationContext wac = ContextLoader
				.getCurrentWebApplicationContext();
		CalendarEventBizImpl biz = wac.getBean("calendarEventBiz",
				CalendarEventBizImpl.class);
		return biz;
	}

	/**
	 * 提供系统倒计时查询
	 * 
	 * @return
	 */
	public static CalendarTimerBizImpl getCalendarTimerBiz() {
		WebApplicationContext wac = ContextLoader
				.getCurrentWebApplicationContext();
		CalendarTimerBizImpl biz = wac.getBean("calendarTimerBiz",
				CalendarTimerBizImpl.class);
		return biz;
	}

	/**
	 * 记录推送错误日志
	 * 
	 * @return
	 */
	public static PushErrorBizImpl getPushErrorBiz() {
		WebApplicationContext wac = ContextLoader
				.getCurrentWebApplicationContext();
		PushErrorBizImpl biz = wac.getBean("pushErrorBiz",
				PushErrorBizImpl.class);
		return biz;
	}
	
	/**
	 * 极光服务
	 * 
	 * @return
	 */
	public static PushRegistBizImpl getPushRegistBiz() 
	{
		
		WebApplicationContext wac = ContextLoader
				.getCurrentWebApplicationContext();
		PushRegistBizImpl biz = wac.getBean("pushRegistBiz",
				PushRegistBizImpl.class);
		return biz;
	}
	
}
