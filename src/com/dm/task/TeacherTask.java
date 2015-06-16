package com.dm.task;

import org.apache.log4j.Logger;
import org.springframework.web.client.RestTemplate;

import com.dm.rest.resource.RSCache;

public class TeacherTask {
	/**
	 * 1资讯2专题3分数4录取5招生答疑6院校答疑7事件8倒计时
	 */
	public static final int pushType = 9;
	public static boolean isRunning = false;

	private final Logger log = Logger.getLogger(TeacherTask.class);

	public void push() {
		// push(RSCache.getRestTemplate());
		// }
		//
		// public void push(RestTemplate rs) {
		log.debug("push starting......");
		if (isRunning) {
			log
					.warn("{\"result\":3,\"content\":\"上次教师推送接口尚未结束\",\"msg\":\"\"}");
			return;
		}

		// 调用短信接口进行推送
		isRunning = true;
		try {
			RestTemplate rs = RSCache.getRestTemplate();
			String ret = rs.getForObject(RSCache.getURI()
					+ "/qaService/teacher/smsnotification", String.class);
			log.info(ret);
		} catch (Exception ex) {
			ex.printStackTrace();
			// 处理postForObject方法的可能异常
			log.warn("{\"result\":3,\"content\":\"教师推送接口异常\",\"msg\":\"\"}");
		}
		isRunning = false;
		log.debug("push end");
	}
}
