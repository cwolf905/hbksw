package com.dm.rest.resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dm.orm.mapper.entity.News;

@Controller
@RequestMapping("/news")
public class NewsRS extends BasicRS {

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public @ResponseBody
	String count(@RequestParam(value = "t", required = false)
	String t, @RequestParam(value = "title", required = false)
	String title, @RequestParam(value = "nids", required = false)
	String nids) {
		String uri = RSCache.getURI() + "/newsService/count?t=" + t + "&title="
				+ encodeStr(title);
		if (nids != null) {
			uri += "&nids=" + nids;
		}
		return restTemplate.getForObject(uri, String.class);
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	String list(@RequestParam(value = "t", required = false)
	String t, @RequestParam(value = "title", required = false)
	String title, @RequestParam(value = "nids", required = false)
	String nids, @RequestParam(value = "curPage", required = false)
	int curPage, @RequestParam(value = "pageSize", required = false)
	int pageSize) {
		String uri = RSCache.getURI() + "/newsService/list?t=" + t + "&title="
				+ encodeStr(title);
		if (nids != null) {
			uri += "&nids=" + nids;
		}
		uri += "&curPage=" + (curPage - 1) + "&pageSize=" + pageSize;
		return restTemplate.getForObject(uri, String.class);
	}
	
	/**
	 * 极光推送接口
	 */
	@RequestMapping(value = "/auraroPush", method = RequestMethod.POST)
	public @ResponseBody
	String auraroPush(@RequestBody
	News news) 
	{
		
//		HttpEntity<TagPush> request = new HttpEntity<TagPush>(news.toAuraroPush(), newHeaders());
		JSONObject fromObject = null;
		//如果信息中类型不为空则说明是教师答疑后台的推送
		if(null != news.getNewsType()){
			fromObject = JSONObject.fromObject(news.toAuraroPushNew());
		}
		//否则是院校资讯的推送
		else{
			fromObject = JSONObject.fromObject(news.toAuraroPush());
		}
		log.info(JSONObject.fromObject(fromObject));
		String ret = restTemplate.postForObject(RSCache.getURI()
				+ "/jpushService/push", fromObject, String.class);
		log.info(ret);
		return ret;
	}
}
