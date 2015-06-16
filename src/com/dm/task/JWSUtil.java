package com.dm.task;

import java.net.URL;
import java.util.HashMap;

import javax.xml.namespace.QName;

import org.apache.axis.client.Call;
import org.apache.axis.client.Service;
import org.apache.axis.encoding.ser.BeanDeserializerFactory;
import org.apache.axis.encoding.ser.BeanSerializerFactory;
import org.apache.log4j.Logger;

public class JWSUtil {

	private static Logger log = Logger.getLogger(JWSUtil.class);

	public static String score(String endpoint, String namespace,
			String method, String bmh, String sfzh, String zkzh, String xm,
			String ip) {
		try {
			// SysConfig.setHttpProxy();
			Service service = new Service();
			Call call = (Call) service.createCall();
			QName qn = new QName(namespace, "String");
			call.registerTypeMapping(String[].class, qn,
					new BeanSerializerFactory(String[].class, qn),
					new BeanDeserializerFactory(String[].class, qn));
			call.setTargetEndpointAddress(new URL(endpoint));
			call.setOperation(new QName(namespace), method);
			String ret = (String) call.invoke(new Object[] { bmh, sfzh, zkzh,
					xm, ip });
			return ret;
		} catch (Exception e) {
			e.printStackTrace();
			log.warn("分数查询WS服务异常" + e.getMessage());
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	public static HashMap<String, String> luqu(String endpoint,
			String namespace, String method, String bmh, String sfzh,
			String zkzh, String xm, String ip) {
		try {
			// SysConfig.setHttpProxy();
			Service service = new Service();
			Call call = (Call) service.createCall();
			QName qn = new QName(namespace, "String");
			call.registerTypeMapping(String[].class, qn,
					new BeanSerializerFactory(String[].class, qn),
					new BeanDeserializerFactory(String[].class, qn));
			call.setTargetEndpointAddress(new URL(endpoint));
			call.setOperation(new QName(namespace), method);
			HashMap<String, String> ret = (HashMap<String, String>) call
					.invoke(new Object[] { bmh, sfzh, zkzh, xm, ip });
			return ret;
		} catch (Exception e) {
			log.warn("录取状态查询WS服务异常" + e.getMessage());
		}
		return null;
	}

	public static void main(String[] args) {
		System.out.println(score(
				"http://score.hbksw.com.cn:8090/score/services/score.jws",
				"http://score.hbksw.com.cn:8090/score/services/score.jws",
				"scoreToJSON", "", "", "", "4", "111"));
	}
}
