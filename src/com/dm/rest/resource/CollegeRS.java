package com.dm.rest.resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 实现院校的列表和统计、信息查看、二维码，已经完成
 * 
 * @author Anthony
 * 
 */

@Controller
@RequestMapping("/college")
public class CollegeRS extends BasicRS {

	@RequestMapping(value = "/mapper", method = RequestMethod.GET)
	public @ResponseBody
	String[] getSchoolNameById(String[] cids) {
		String[] cnames = new String[cids.length];
		for (int i = 0; i < cids.length; i++) {
			cnames[i] = RSCache.getSchoolNameByCid(Integer.parseInt(cids[i]));
		}
		return cnames;
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public @ResponseBody
	String count(@RequestParam(value = "t", required = false)
	String t, @RequestParam(value = "schoolName", required = false)
	String schoolName) {
		String url = RSCache.getURI() + "/collegeService/count?";
		url += "schoolName=" + encodeStr(schoolName);
		if(!"null".equals(t))
		{
			url += "&t=" + t;
		}
		return restTemplate.getForObject(url, String.class);
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	String list(@RequestParam(value = "t", required = false)
	String t, @RequestParam(value = "schoolName", required = false)
	String schoolName, @RequestParam(value = "curPage", required = false)
	int curPage, @RequestParam(value = "pageSize", required = false)
	int pageSize) {
		String url = RSCache.getURI() + "/collegeService/list?";
		url += "schoolName=" + encodeStr(schoolName);
		if(!"null".equals(t))
		{
			url += "&t=" + t;
		}
		url += "&curPage=" + (curPage-1);
		url += "&pageSize=" + pageSize;
		return restTemplate.getForObject(url, String.class);
//		return restTemplate.getForObject(RSCache.getURI()
//				+ "/collegeService/list?t=" + t + "&schoolName="
//				+ encodeStr(schoolName) + "&curPage=" + (curPage - 1)
//				+ "&pageSize=" + pageSize, String.class);
	}

	@RequestMapping(value = "/{cid}", method = RequestMethod.GET)
	public @ResponseBody
	String getCollegeInfo(@PathVariable("cid")
	String cid) {
		return restTemplate.getForObject(RSCache.getURI()
				+ "/collegeService/{cid}", String.class, cid);
	}

	@RequestMapping(value = "/{cid}/qrcode", method = RequestMethod.GET)
	public @ResponseBody
	String generateQRCode(@PathVariable("cid")
	String cid, @RequestParam(value = "examType", required = false)
	String examType) {
		String url = RSCache.getURI() + "/collegeService/qrcodebyCid/" + cid + "/" + examType;
		return restTemplate.getForObject(url, String.class);
	}

	@RequestMapping(value = "/list/{type1}/{type2}", method = RequestMethod.GET)
	public @ResponseBody
	String list(@PathVariable("type1")
	String type1, @PathVariable("type2")
	String type2) {
		return restTemplate.getForObject(RSCache.getURI()
				+ "/collegeService/list/{type1}/{type2}", String.class, type1,
				type2);
	}

	@RequestMapping(value = "/batch/{startCid}/{endCid}/{examType}", method = RequestMethod.GET)
	public @ResponseBody
	String batch(@PathVariable("startCid")
	String startCid, @PathVariable("endCid")
	String endCid, @PathVariable("examType")
	String examType) {
		return restTemplate.getForObject(RSCache.getURI()
				+ "/collegeService/generateQRCodeBatch/{startCid}/{endCid}/{examType}",
				String.class, startCid, endCid, examType);
	}
}
