package com.dm.task;

import java.util.List;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.web.client.RestTemplate;

import com.dm.orm.biz.impl.BizCache;
import com.dm.orm.biz.impl.PushErrorBizImpl;
import com.dm.orm.mapper.entity.CalendarEvent;
import com.dm.orm.mapper.entity.Plugin;
import com.dm.orm.mapper.entity.PushError;
import com.dm.rest.model.PushRequest;
import com.dm.rest.resource.RSCache;
import com.dm.utils.TimeUtils;

public class CalendarEventTask {
	/**
	 * 1资讯2专题3分数4录取5招生答疑6院校答疑7事件8倒计时
	 */
	public static final int pushType = 7;
	public static boolean isRunning = false;

	private final Logger log = Logger.getLogger(CalendarEventTask.class);

	public void push() {
		log.debug("push starting......");
		if (isRunning) {
			log
					.warn("{\"result\":3,\"content\":\"上次日历事件推送任务尚未结束\",\"msg\":\"\"}");
			return;
		}

		// 查询待提醒的考试安排
		CalendarEvent cond = new CalendarEvent();
		cond.setStarttime(TimeUtils.addDays(1, TimeUtils.DB_DATE_PATTERN_82));
		cond.setEndtime(TimeUtils.addDays(2, TimeUtils.DB_DATE_PATTERN_82));
		List<CalendarEvent> list = BizCache.getCalendarEventBiz()
				.findCalendarEvents(cond);
		if (list.size() == 0) {
			log.warn("{\"result\":3,\"content\":\"没有日历事件需要推送\",\"msg\":\"\"}");
			return;
		}

		// 调用push接口进行推送
		isRunning = true;
		try {
			RestTemplate rs = RSCache.getRestTemplate();
			PushErrorBizImpl err = BizCache.getPushErrorBiz();
			for (int j = 0; j < list.size(); j++) {
				CalendarEvent t = list.get(j);
				// log.info("push " + t.getTitle() + "......");
//				Information info = new Information();
//				info.setTagName("event" + t.getId()); // tagpush
//				info.setTitle(t.getTitle());
//				info.setAlert(t.getTitle());
//				info.setKaoshi_type(String.valueOf(t.getExamtype()));
//				info.setMsg_type(String.valueOf(pushType));
//				info.setMsg_id(String.valueOf(t.getId()));
//				HttpHeaders headers = new HttpHeaders();
//				headers.setContentType(MediaType.APPLICATION_JSON);
				
//				public String template_id = "";
//				public String plugin_id = "";
//				public String event_id = "";
//				HttpEntity<TagPush> request = new HttpEntity<TagPush>(info
//						.toTagPush(), headers);
//				String context = JSONObject.fromObject(request.getBody())
//						.toString();
//				JSONObject fromObject = JSONObject.fromObject(pushRequest);
//				log.info(fromObject);
////				String ret = rs.postForObject(RSCache.getURI()
////						+ "/pushService/tagpush", request, String.class);
//				log.info(fromObject);
//				String ret = rs.postForObject(RSCache.getURI()
//						+ "/jpushService/push", fromObject, String.class);
//				log.info(ret);
				
				PushRequest pushRequest = new PushRequest();
				pushRequest.setMsg(t.getTitle());
				pushRequest.setType(String.valueOf(pushType));
				pushRequest.setPlugin_id(t.getPluginId().toString());
				Plugin plugin = BizCache.getPluginBiz().getPlugin(t.getPluginId());
				pushRequest.setTemplate_id(plugin.getTemplateId());
				pushRequest.setEvent_id(String.valueOf(t.getId()));
				
				JSONObject fromObject = JSONObject.fromObject(pushRequest);
				log.info(fromObject);
//				String ret = rs.postForObject(RSCache.getURI()
//						+ "/pushService/tagpush", request, String.class);
				log.info(fromObject);
				String ret = rs.postForObject(RSCache.getURI()
						+ "/jpushService/push", fromObject, String.class);
				log.info(ret);

				JSONObject retObj = JSONObject.fromObject(ret);
				if (retObj.getInt("result") != 0) {
					PushError obj = new PushError();
					obj.setPushtype(pushType);
					obj.setContext(fromObject.toString());
					err.addPushError(obj);
				}
			}
		} catch (Exception ex) {
//			ex.printStackTrace();
			// 处理postForObject方法的可能异常
			log
					.warn("{\"result\":3,\"content\":\"广播推送REST服务异常\",\"msg\":\"\"}");
		}
		isRunning = false;
		log.debug("push end");
	}
}
