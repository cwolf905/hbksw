package com.dm.core;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import com.dm.core.io.PropertyReader;

/**
 * 全局配置，包括本地数据存储根目录、网络设置、默认数据库设置
 * 
 * @author Anthony
 * 
 */
public class SysConfig {

	private static String strWebRoot = "f:\\java\\myeclipse6\\datamining\\form\\WEB-INF\\classes";
	private static String strDataRoot = "e:\\data\\datamining";

	private static PropertyReader readerConfig = new PropertyReader();

	/**
	 * 获取WEB应用配置目录，默认f:\\java\\myeclipse9\\datamining\\form\\WEB-INF\\classes
	 * 如果非web方式运行，那么这个是当前的可执行路径
	 * 
	 * @return
	 */
	public static String getWebRoot() {
		return strWebRoot;
	}

	/**
	 * 根据程序的执行路径找到全局配置文件并初始化
	 * 
	 * @param webroot
	 */
	public static void setWebRoot(String webroot) {
		SysConfig.strWebRoot = webroot;
		try {
			readerConfig.init(concat(getPropertyPath(), "config.properties"));
		} catch (IOException ex) {
			ex.printStackTrace();
			throw new RuntimeException("Invalid config.properties");
		}
		SysConfig.strDataRoot = readerConfig.getProperty("dataroot");
	}

	/**
	 * 获取数据存储根目录，默认e:\\data\\datamining
	 * 
	 * @return
	 */
	public static String getDataRoot() {
		return strDataRoot;
	}

	/**
	 * 允许应用执行过程中临时修改数据存储根目录
	 * 
	 * @param dataroot
	 */
	public static void setDataRoot(String dataroot) {
		SysConfig.strDataRoot = dataroot;
	}

	/**
	 * 获取WEB应用地址，默认f:\\java\\myeclipse9\\datamining\\form
	 * 
	 * @return
	 */
	public static String getWebAddr() {
		return strWebRoot.replace("WEB-INF" + Constants.FILE_SEPERATOR
				+ "classes", "");
	}

	/**
	 * 获取模板文件路径
	 * 
	 * @return
	 */
	public static String getTemplatePath() {
		return concat(strWebRoot, "template");
	}

	/**
	 * 获取字典、状态文件路径，默认
	 * 
	 * @return
	 */
	public static String getPropertyPath() {
		return concat(strWebRoot, "properties");
	}

	public static String getProperty(String key, String def) {
		return readerConfig.getProperty(key, def);
	}

	/**
	 * 设置网络代理
	 * 
	 * @return
	 */
	public static int setHttpProxy() {
		String proxy = getProperty("proxy", "");
		String port = getProperty("port", "");
		String timeout = getProperty("timeout", "30000");
		if (proxy.length() > 0) {
			Properties prop = System.getProperties();
			prop.put("http.proxyHost", proxy);
			prop.put("http.proxyPort", port);
		}
		return Integer.parseInt(timeout);
	}

	/**
	 * 递归创建路径
	 * 
	 * @param srcpath
	 */
	public static void mkdirs(String srcpath) {
		File f = new File(srcpath);
		if (!f.exists()) {
			f.mkdirs();
		}
	}

	/**
	 * 获取文件名，不带后缀
	 * 
	 * @param srcfile
	 * @return
	 */
	public static String getFilename(String srcfile) {
		int i = srcfile.lastIndexOf(Constants.FILE_SEPERATOR);
		int j = srcfile.lastIndexOf(Constants.MARK_DOT, i);
		return srcfile.substring(i + 1, j);
	}

	/**
	 * 获取文件名，带后缀
	 * 
	 * @param srcfile
	 * @return
	 */
	public static String getFilenameEx(String srcfile) {
		int i = srcfile.lastIndexOf(Constants.FILE_SEPERATOR);
		return srcfile.substring(i + 1);
	}

	/**
	 * 拼接路径
	 * 
	 * @param dir
	 * @param subdir
	 * @return
	 */
	public static String concat(String dir, String... subdir) {
		List<String> subdirs = Arrays.asList(subdir);
		StringBuffer sb = new StringBuffer();
		if (dir.endsWith(Constants.FILE_SEPERATOR))
			sb.append(dir.substring(0, dir.length()
					- Constants.FILE_SEPERATOR.length()));
		else
			sb.append(dir);
		for (int i = 0; i < subdirs.size(); i++) {
			if (subdirs.get(i).startsWith(Constants.FILE_SEPERATOR))
				sb.append(subdirs.get(i));
			else
				sb.append(Constants.FILE_SEPERATOR).append(subdirs.get(i));
		}
		return sb.toString();
	}
}
