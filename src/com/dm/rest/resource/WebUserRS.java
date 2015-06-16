package com.dm.rest.resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 实现网站用户的列表和统计，已经完成
 * 
 * @author Anthony
 * 
 */

@Controller
@RequestMapping("/webUser")
public class WebUserRS extends BasicRS {

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public @ResponseBody
	String count(@RequestParam(value = "userName", required = false)
	String userName, @RequestParam(value = "phoneBind", required = false)
	String phoneBind) {
		return restTemplate.getForObject(RSCache.getURI()
				+ "/userService/webUser/count?userName=" + encodeStr(userName)
				+ "&phoneBind=" + phoneBind, String.class);
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	String list(@RequestParam(value = "userName", required = false)
	String userName, @RequestParam(value = "phoneBind", required = false)
	String phoneBind, @RequestParam(value = "curPage", required = false)
	int curPage, @RequestParam(value = "pageSize", required = false)
	int pageSize) {
		return restTemplate.getForObject(RSCache.getURI()
				+ "/userService/webUser/list?userName=" + encodeStr(userName)
				+ "&phoneBind=" + phoneBind + "&curPage=" + (curPage - 1)
				+ "&pageSize=" + pageSize, String.class);
	}
}
