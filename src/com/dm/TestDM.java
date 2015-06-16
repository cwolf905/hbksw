package com.dm;

import java.io.File;
import java.net.URL;
import java.net.URLDecoder;

import org.apache.log4j.xml.DOMConfigurator;

import com.dm.core.Constants;
import com.dm.core.SysConfig;
import com.dm.rest.TestRest;

/**
 * 程序总入口<br>
 * 首先初始化全局配置文件，Log4j日志<br>
 * 然后分析dm.properties得到单个应用的入口
 * 
 * @author Anthony
 * 
 */
public class TestDM {

	/**
	 * 测试总入口，负责初始化配置文件和日志；并根据参数找到第二层测试类
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		// 初始化全局配置文件
		String webroot = getWebRoot();
		SysConfig.setWebRoot(webroot);

		// 初始化Log4J
		String logConfig = SysConfig.concat(webroot, "log4j_config.xml");
		System.out.println(logConfig);
		DOMConfigurator.configure(logConfig);

		TestRest.excute();
	}

	/**
	 * 根据程序执行的方式(jar或web)分析执行路径，环境无关<br>
	 * 如果是web方式运行，那么路径是webapp的class路径，形如d:\\tomcat\\webapps\\datamining\\form\\WEB-INF\\classes<br>
	 * 如果是jar，那么路径是jar包所在路径，形如e:\\data\\datamining<br>
	 * 如果是class方式运行，那么路径切换到src路径，形如f:\\java\\myeclipse9\\datamining\\src
	 * 
	 * @return
	 */
	private static String getWebRoot() {
		URL url = TestDM.class.getProtectionDomain().getCodeSource()
				.getLocation();
		String classpath = null;
		try {
			classpath = URLDecoder.decode(url.getPath(), Constants.ENCODE_UTF8);
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
		}
		// 可执行jar包运行的结果里包含"*.jar"
		// 注意，url.getPath()得到的是网址，是斜杠分割的
		if (classpath.endsWith(".jar")) {
			classpath = classpath.substring(0, classpath
					.lastIndexOf(Constants.MARK_SLASH));
		}
		File file = new File(classpath);
		classpath = file.getAbsolutePath();
		// 检查路径是否为class输出路径
		if (classpath.indexOf("classes") != -1) {
			classpath = classpath.replace("form" + Constants.FILE_SEPERATOR
					+ "WEB-INF" + Constants.FILE_SEPERATOR + "classes", "src");
		}
		return classpath;
	}
}
