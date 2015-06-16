package com.dm.rest.resource;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import com.dm.core.SysConfig;
import com.dm.rest.model.College;

public class RSCache {

	public static Map<Integer, String> cidNameMap = new HashMap<Integer, String>();

	public static RestTemplate getRestTemplate() {
		WebApplicationContext wac = ContextLoader
				.getCurrentWebApplicationContext();
		RestTemplate rs = wac.getBean("restTemplate", RestTemplate.class);
		ClientHttpRequestInterceptor interceptor = new BasicRSInterceptor();
		List<ClientHttpRequestInterceptor> list = new ArrayList<ClientHttpRequestInterceptor>();
		list.add(interceptor);
		rs.setInterceptors(list);
		return rs;
	}

	public static String getURI() {
		SysConfig.setHttpProxy();
		return SysConfig.getProperty("serveruri", "http://localhost");
	}

	public static void cacheCidNameMap() throws IOException {
		if (cidNameMap == null || cidNameMap.size() == 0) {
			String jsonstr = getRestTemplate().getForObject(
					getURI() + "/collegeService/all", String.class);
			ObjectMapper objMapper = new ObjectMapper();
			objMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd"));
			College[] arr = objMapper.readValue(jsonstr, College[].class);
			for (College college : arr) {
				int cid = college.getCid();
				String name = college.getSchoolName();
				cidNameMap.put(cid, name);
			}
		}
	}

	public static String getSchoolNameByCid(int cid) {
		try {
			cacheCidNameMap();
		} catch (IOException ex) {
			ex.printStackTrace();
		}
		if (!cidNameMap.containsKey(cid))
			return "";
		return cidNameMap.get(cid);
	}
}
