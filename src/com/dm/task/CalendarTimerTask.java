package com.dm.task;

import java.util.List;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.web.client.RestTemplate;

import com.dm.orm.biz.impl.BizCache;
import com.dm.orm.biz.impl.PushErrorBizImpl;
import com.dm.orm.mapper.entity.CalendarTimer;
import com.dm.orm.mapper.entity.Plugin;
import com.dm.orm.mapper.entity.PushError;
import com.dm.rest.model.PushRequest;
import com.dm.rest.resource.RSCache;
import com.dm.utils.TimeUtils;

public class CalendarTimerTask {
	/**
	 * 1资讯2专题3分数4录取5招生答疑6院校答疑7事件8倒计时
	 */
	public static final int pushType = 8;
	public static boolean isRunning = false;

	private final Logger log = Logger.getLogger(CalendarTimerTask.class);

	public void push() {
		log.debug("push starting......");
		if (isRunning) {
			log
					.warn("{\"result\":3,\"content\":\"上次倒计时提醒任务尚未结束\",\"msg\":\"\"}");
			return;
		}

		// 查询待提醒的倒计时
		CalendarTimer cond = new CalendarTimer();
		cond.setStatus(1);
		cond.setStarttime(TimeUtils.addDays(0, TimeUtils.DB_DATE_PATTERN_82));
		cond.setEndtime(TimeUtils.addDays(2, TimeUtils.DB_DATE_PATTERN_82));
		List<CalendarTimer> list = BizCache.getCalendarTimerBiz()
				.findCalendarTimers(cond);
		if (list.size() == 0) {
			log.warn("{\"result\":3,\"content\":\"没有倒计时提醒需要推送\",\"msg\":\"\"}");
			return;
		}

		// 调用push接口进行推送
		isRunning = true;
		try {
			RestTemplate rs = RSCache.getRestTemplate();
			PushErrorBizImpl err = BizCache.getPushErrorBiz();
			for (int j = 0; j < list.size(); j++) {
				CalendarTimer t = list.get(j);
				// log.info("push " + t.getName() + "......");
//				Information info = new Information();
//				info.setTitle(t.getName());
//				info.setAlert(t.getName());
//				info.setKaoshi_type(String.valueOf(t.getExamtype()));
//				info.setMsg_type(String.valueOf(pushType));
//				info.setMsg_id(String.valueOf(t.getId()));
			
//				HttpHeaders headers = new HttpHeaders();
//				headers.setContentType(MediaType.APPLICATION_JSON);
//				HttpEntity<BroadCastPush> request = new HttpEntity<BroadCastPush>(
//						info.toBoardCastPush(), headers);
//				String context = JSONObject.fromObject(request.getBody())
//						.toString();
//				log.info(context);
//				String ret = rs.postForObject(RSCache.getURI()
//						+ "/pushService/broadcastpush", request, String.class);
//				log.info(ret);
				
				PushRequest pushRequest = new PushRequest();
				pushRequest.setMsg(t.getName());
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
			// 处理postForObject方法的可能异常
			log
					.warn("{\"result\":3,\"content\":\"广播推送REST服务异常\",\"msg\":\"\"}");
		}
		isRunning = false;
		log.debug("push end");
	}
}
