package com.dm.rest.resource;

import net.sf.json.JSONObject;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dm.rest.model.BroadCastPush;
import com.dm.rest.model.Information;
import com.dm.rest.model.Notification;
import com.dm.rest.model.TagPush;

@Controller
@RequestMapping("/information")
public class InformationRS extends BasicRS {

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public @ResponseBody
	String count(@RequestParam(value = "t", required = false)
	String t, @RequestParam(value = "cid", required = false)
	String cid, @RequestParam(value = "title", required = false)
	String title, @RequestParam(value = "iids", required = false)
	String iids,@RequestParam(value = "contentAudit", required = false)
	String contentAudit,@RequestParam(value = "pushTitleAudit", required = false)
	String pushTitleAudit) {
		String uri = RSCache.getURI() + "/infoService/count?cid=" + cid
				+ "&title=" + encodeStr(title);
		if (t != null) {
			uri += "&t=" + t;
		}
		if (iids != null) {
			uri += "&iids=" + iids;
		}
		if(contentAudit != null)
		{
			uri += "&contentAudit=" + contentAudit;
		}
		if(pushTitleAudit != null)
		{
			uri += "&pushTitleAudit=" + pushTitleAudit;
		}
		
		return restTemplate.getForObject(uri, String.class);
	}
 
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	String list(@RequestParam(value = "t", required = false)
	String t, @RequestParam(value = "cid", required = false)
	String cid, @RequestParam(value = "title", required = false)
	String title, @RequestParam(value = "iids", required = false)
	String iids, @RequestParam(value = "contentAudit", required = false)
	String contentAudit,@RequestParam(value = "pushTitleAudit", required = false)
	String pushTitleAudit,@RequestParam(value = "curPage", required = false)
	int curPage, @RequestParam(value = "pageSize", required = false)
	int pageSize) {
		String uri = RSCache.getURI() + "/infoService/list?cid=" + cid
				+ "&title=" + encodeStr(title);
		if (t != null) {
			uri += "&t=" + t;
		}
		if (iids != null) {
			uri += "&iids=" + iids;
		}
		if(contentAudit != null)
		{
			uri += "&contentAudit=" + contentAudit;
		}
		if(pushTitleAudit != null)
		{
			uri += "&pushTitleAudit=" + pushTitleAudit;
		}
		uri += "&curPage=" + (curPage - 1) + "&pageSize=" + pageSize;
		return restTemplate.getForObject(uri, String.class);
	}

	@RequestMapping(value = "/commend", method = RequestMethod.GET)
	public @ResponseBody
	String commend(@RequestParam(value = "iid", required = false)
	String iid, @RequestParam(value = "commend", required = false)
	String commend) {
		if ("0".equals(commend))
			return restTemplate.getForObject(RSCache.getURI()
					+ "/infoRecommendService/{iid}/unrecommend", String.class,
					iid);
		else
			return restTemplate.getForObject(RSCache.getURI()
					+ "/infoRecommendService/{iid}/recommend", String.class,
					iid);
	}

	@RequestMapping(value = "/tagpush", method = RequestMethod.POST)
	public @ResponseBody
	String tagpush(@RequestBody
	Information information) {
		HttpEntity<TagPush> request = new HttpEntity<TagPush>(information
				.toTagPush(), newHeaders());
		log.info(JSONObject.fromObject(request.getBody()));
		String ret = restTemplate.postForObject(RSCache.getURI()
				+ "/pushService/tagpush", request, String.class);
		log.info(ret);
		return ret;
	}

	@RequestMapping(value = "/notification", method = RequestMethod.POST)
	public @ResponseBody
	String notification(@RequestBody
	Information information) {
		HttpEntity<Notification> request = new HttpEntity<Notification>(
				information.toNotification(), newHeaders());
		log.info(JSONObject.fromObject(request.getBody()));
		String ret = restTemplate.postForObject(RSCache.getURI()
				+ "/pushService/notification", request, String.class);
		log.info(ret);
		return ret;
	}

	@RequestMapping(value = "/broadcastpush", method = RequestMethod.POST)
	public @ResponseBody
	String broadcastpush(@RequestBody
	Information information) {
		HttpEntity<BroadCastPush> request = new HttpEntity<BroadCastPush>(
				information.toBoardCastPush(), newHeaders());
		log.info(JSONObject.fromObject(request.getBody()));
		String ret = restTemplate.postForObject(RSCache.getURI()
				+ "/pushService/broadcastpush", request, String.class);
		log.info(ret);
		return ret;
	}
	
	
	/**
	 * 极光推送接口
	 */
	@RequestMapping(value = "/auraroPush", method = RequestMethod.POST)
	public @ResponseBody
	String auraroPush(@RequestBody
	Information information) 
	{

//		HttpEntity<TagPush> request = new HttpEntity<TagPush>(information.toAuraroPush(), newHeaders());
		JSONObject fromObject = null;
		if("1".equals(information.getIsCustomPush())){
			fromObject = JSONObject.fromObject(information.toAuraroPushCustomPush());
		}else{
			fromObject = JSONObject.fromObject(information.toAuraroPush());
		}
		log.info(fromObject);
		String ret = restTemplate.postForObject(RSCache.getURI()
				+ "/jpushService/push", fromObject, String.class);
		log.info(ret);
		return ret;
	}
	
}
