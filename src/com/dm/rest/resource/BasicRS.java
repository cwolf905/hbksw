package com.dm.rest.resource;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.web.client.RestTemplate;

public class BasicRS {

	protected Logger log = Logger.getLogger(BasicRS.class);

	@Qualifier("restTemplate")
	@Autowired
	protected RestTemplate restTemplate;

	public void setRestTemplate(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
		ClientHttpRequestInterceptor interceptor = new BasicRSInterceptor();
		List<ClientHttpRequestInterceptor> list = new ArrayList<ClientHttpRequestInterceptor>();
		list.add(interceptor);
		restTemplate.setInterceptors(list);
	}

	public HttpHeaders newHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		return headers;
	}

	public String encodeStr(String str) {
		
//		 try 
//		 {
//			return new String(str.getBytes("ISO-8859-1"), "UTF-8");
//		} catch (UnsupportedEncodingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} 
		 
		return str;
	}
}
