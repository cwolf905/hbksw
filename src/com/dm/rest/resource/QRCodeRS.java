package com.dm.rest.resource;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dm.rest.model.QRCode;

/**
 * 实现二维码的列表和统计、查看、增加、删除，已经完成
 * 
 * @author Anthony
 * 
 */

@Controller
@RequestMapping("/qrcode")
public class QRCodeRS extends BasicRS {

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public @ResponseBody
	String count(@RequestParam(value = "schoolName", required = false)
	String schoolName) {
		return restTemplate.getForObject(RSCache.getURI()
				+ "/collegeService/qrcode/count?schoolName="
				+ encodeStr(schoolName), String.class);
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	String list(@RequestParam(value = "schoolName", required = false)
	String schoolName, @RequestParam(value = "curPage", required = false)
	int curPage, @RequestParam(value = "pageSize", required = false)
	int pageSize) {
		return restTemplate.getForObject(RSCache.getURI()
				+ "/collegeService/qrcode/list?schoolName="
				+ encodeStr(schoolName) + "&curPage=" + (curPage - 1)
				+ "&pageSize=" + pageSize, String.class);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody
	String getQRCodeInfo(@PathVariable("id")
	String id) {
		return restTemplate.getForObject(RSCache.getURI()
				+ "/collegeService/qrcode/{id}", String.class, id);
	}

	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public @ResponseBody
	String addQRCode(@RequestBody
	QRCode code) {
		HttpEntity<QRCode> request = new HttpEntity<QRCode>(code, newHeaders());
		return restTemplate.postForObject(RSCache.getURI()
				+ "/collegeService/qrcode/new", request, String.class);
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public @ResponseBody
	String updateQRCode(@RequestBody
	QRCode code) {
		HttpEntity<QRCode> request = new HttpEntity<QRCode>(code, newHeaders());
		return restTemplate.postForObject(RSCache.getURI()
				+ "/collegeService/qrcode/"+code.getId()+"/update", request, String.class);
	}

	@RequestMapping(value = "/{id}/delete", method = RequestMethod.GET)
	public @ResponseBody
	String deleteQRCode(@PathVariable("id")
	String id) {
		return restTemplate.getForObject(RSCache.getURI()
				+ "/collegeService/qrcode/{id}/delete", String.class, id);
	}
}
