package com.dm.task;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.web.client.RestTemplate;

import com.dm.core.Constants;
import com.dm.core.SysConfig;
import com.dm.orm.biz.impl.BizCache;
import com.dm.orm.biz.impl.PushErrorBizImpl;
import com.dm.orm.mapper.entity.MobileUser;
import com.dm.orm.mapper.entity.PushError;
import com.dm.orm.mapper.entity.PushTemplate;
import com.dm.orm.mapper.entity.UserJpushMapping;
import com.dm.rest.model.PushRequest;
import com.dm.rest.resource.RSCache;
import com.dm.utils.TimeUtils;

public class LuquTask {
	/**
	 * 1资讯2专题3分数4录取5招生答疑6院校答疑7事件8倒计时
	 */
	public static final int pushType = 4;
	public static boolean isRunning = false;

	private final Logger log = Logger.getLogger(LuquTask.class);

	public void push() {
		log.debug("push starting......");
		if (isRunning) {
			log
					.warn("{\"result\":3,\"content\":\"上次录取状态推送任务尚未结束\",\"msg\":\"\"}");
			return;
		}

		// 查询时间点配置和消息模板
		PushTemplate cond = new PushTemplate();
		cond.setPushtype(pushType);
		cond.setClock(String.valueOf(TimeUtils.getSingleTime("HH")));
		PushTemplate result = BizCache.getPushTemplateBiz()
				.getPushTemplateByClock(cond);
		if (result == null) {
			log
					.warn("{\"result\":3,\"content\":\"该时间点没有配置录取状态推送模板\",\"msg\":\""
							+ cond.getClock() + "\"}");
			return;
		}
		pushRun(result.getExamtype(), result.getMessage());
		log.debug("push end");
	}

	public void pushNow(int examtype, String message) {
		log.debug("pushNow starting......");
		pushRun(examtype, message);
		log.debug("pushNow end");
	}

	public void pushRun(int examtype, String message) {
		log.debug("pushRun starting......");
		isRunning = true;
		try {
			RestTemplate rs = RSCache.getRestTemplate();
//			String users = rs.getForObject(RSCache.getURI()
//					+ "/userService/mobileUser/all", String.class);
			List<MobileUser> findAllUser = BizCache.getPushRegistBiz().findAllUser();
//			JSONArray userArr = JSONArray.fromObject(users);

			PushErrorBizImpl err = BizCache.getPushErrorBiz();
			if(null == findAllUser || findAllUser.size() == 0){
				return;
			}
			for (int i = 0; i < findAllUser.size(); i++) {
//				JSONObject userObj = findAllUser.getJSONObject(i);
//				String mobileNo = userObj.getString("mobileNo");
				String mobileNo = findAllUser.get(i).getMobileNo();
				
				String url = RSCache.getURI() + "/userExamineeBindingService/bindlist/" + mobileNo + "?examtype=" + examtype +"&templateid=AdmissionPush";
//				String url = RSCache.getURI() + "/userExamineeBindingService/bindlist/" + mobileNo + "/" + examtype + "?templateid=AdmissionPush";
				// 根据用户手机号码找到姓名和准考证号
				String props = rs.getForObject(url, String.class);
				JSONArray propArr = JSONArray.fromObject(props);
				if (propArr.size() == 0) {
					log
							.warn("{\"result\":3,\"content\":\"该用户没有绑定任何录取状态推送考生\",\"msg\":\""
									+ mobileNo + "\"}");
					continue;
				}

				StringBuffer sb = new StringBuffer();
				String userName = "";
				for (int j = 0; j < propArr.size(); j++) {
					JSONObject propObj = propArr.getJSONObject(j);
					String bmh = propObj.getString("registerno");
					String sfzh = propObj.getString("idcard");
					String zkzh = propObj.getString("admissioncardid");
					String xm = propObj.getString("name");
					String msg = message;

					// 根据姓名和准考证查询分数
					HashMap<String, String> map = JWSUtil.luqu(SysConfig
							.getProperty("luqu.url", ""), SysConfig
							.getProperty("luqu.namespace", ""), SysConfig
							.getProperty("luqu.method", ""), bmh, sfzh, zkzh,
							xm, SysConfig.getProperty("luqu.ip", ""));
					if (map == null || map.size() == 0)
						continue;
					if (map.containsKey("XM")) {
						String xmx = map.get("XM");
						if (xmx == null || xmx.length() == 0)
							continue;
					}

					// 根据配置的消息模板生成提醒内容
					sb.append(Constants.MARK_SEMICOLON);
					for (String key : map.keySet()) {
						String tpl = "{" + key + "}";
						if (msg.indexOf(tpl) > -1) {
							msg = msg.replace(tpl, map.get(key));
						}
					}
					sb.append(msg);

					// 由于app通知消息长度限制，只发一个考生的
					userName = xm;
					break;
				}

				// 调用push接口进行推送
				if (sb.length() <= 1) {
					log
							.warn("{\"result\":3,\"content\":\"该用户绑定的所有考生录取状态尚未公布\",\"msg\":\""
									+ mobileNo + "\"}");
					continue;
				}
				// log.info("pushRun " + mobileNo + "," + sb + "......");

//				Information info = new Information();
//				info.setUserId(mobileNo);
//				info.setTitle(sb.substring(1));
//				info.setAlert(sb.substring(1));
//				info.setKaoshi_type(String.valueOf(examtype));
//				info.setMsg_type(String.valueOf(pushType));
//				info.setMsg_id(userName);
//				HttpHeaders headers = new HttpHeaders();
//				headers.setContentType(MediaType.APPLICATION_JSON);
//				HttpEntity<Notification> request = new HttpEntity<Notification>(
//						info.toNotification(), headers);
//				String context = JSONObject.fromObject(request.getBody())
//						.toString();
//				log.info(context);
//				String ret = rs.postForObject(RSCache.getURI()
//						+ "/pushService/notification", request, String.class);
//				log.info(ret);
					PushRequest pushRequest = new PushRequest();
					pushRequest.setMsg(sb.substring(1));
					pushRequest.setType("4");
					pushRequest.setExamtype(String.valueOf(examtype));
					UserJpushMapping pushRegist = BizCache.getPushRegistBiz().findAuraroPushIdByUserId(mobileNo);
					List<String> registration_id = new ArrayList<String>();
					if(null!= pushRegist){
						registration_id.add(pushRegist.getRegistration_id());
						pushRequest.setRegistration_id(registration_id);
						
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
					}else{
						log.info(mobileNo + "用户没有注册相应的极光服务！");
					}
			}
		} catch (Exception ex) {
			// 处理postForObject方法的可能异常
			log
					.warn("{\"result\":3,\"content\":\"个人通知REST服务异常\",\"msg\":\"\"}");
		}
		isRunning = false;
		log.debug("pushRun end");
	}
}
