package com.dm.rest.resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 实现手机用户的列表和统计，已经完成
 * 
 * @author Anthony
 * 
 */

@Controller
@RequestMapping("/mobileUser")
public class MobileUserRS extends BasicRS {

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public @ResponseBody
	String count(@RequestParam(value = "mobileNo", required = false)
	String mobileNo) {
		return restTemplate.getForObject(RSCache.getURI()
				+ "/userService/mobileUser/count?mobileNo=" + mobileNo,
				String.class);
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	String list(@RequestParam(value = "mobileNo", required = false)
	String mobileNo, @RequestParam(value = "curPage", required = false)
	int curPage, @RequestParam(value = "pageSize", required = false)
	int pageSize) {
		return restTemplate.getForObject(RSCache.getURI()
				+ "/userService/mobileUser/list?mobileNo=" + mobileNo
				+ "&curPage=" + (curPage - 1) + "&pageSize=" + pageSize,
				String.class);
	}
}
