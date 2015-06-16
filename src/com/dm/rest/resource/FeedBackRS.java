package com.dm.rest.resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/feedBack")
public class FeedBackRS extends BasicRS 
{
	
	private Logger log = Logger.getLogger(FeedBackRS.class);

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public @ResponseBody
	String count(@RequestParam(value = "mobileNo", required = false)
	String mobileNo, @RequestParam(value = "pluginName", required = false)
	String pluginName) {
		
		pluginName = encodeStr(pluginName);
		log.debug("FeedBackRS count pluginName" + pluginName);
		
		System.out.println("".equals(mobileNo));
		
		String url = "/userFeedBackService/count?userId=" + mobileNo + "&pluginName=" + pluginName;
		if("".equals(mobileNo))
		{
			url = "/userFeedBackService/count?userId=" + "&pluginName=" + pluginName;
		}
		if("".equals(pluginName))
		{
			url = "/userFeedBackService/count?userId=" + mobileNo + "&pluginName=";
		}
		
		String forObject = restTemplate.getForObject(RSCache.getURI()
				+ url,
				String.class);
		
		return forObject;
		
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	String list(@RequestParam(value = "mobileNo", required = false)String mobileNo,  
			@RequestParam(value = "pluginName", required = false)String pluginName,
			@RequestParam(value = "curPage", required = false)int curPage, 
			@RequestParam(value = "pageSize", required = false)int pageSize) 
	{
		
		pluginName = encodeStr(pluginName);
		log.debug("FeedBackRS list pluginName:" + pluginName);
		
		String url = "/userFeedBackService/list?userId=" + mobileNo + "&pluginName=" + pluginName;
		if("".equals(mobileNo))
		{
			url = "/userFeedBackService/list?userId=" + "&pluginName=" + pluginName;
		}
		if("".equals(pluginName))
		{
			url = "/userFeedBackService/list?userId=" + mobileNo + "&pluginName=";
		}
		
		url += "&curPage=" + (curPage - 1) + "&pageSize=" + pageSize;
		String forObject = restTemplate.getForObject(RSCache.getURI()
				+ url,
				String.class);
		
		return forObject;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody
	String getFeedBack(@PathVariable("id")
	String id) {
		return restTemplate.getForObject(RSCache.getURI()
				+ "/userFeedBackService/{id}", String.class, id);
	}
}
