package com.dm.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * 时间类的工具类
 * 
 * @author M.simple
 * 
 */
public class DateUtil {

	/**
	 * 时间格式化格式
	 */
	private static final String date_format = "yyyy-MM-dd HH:mm:ss";

	/**
	 * 使用线程  对象独享
	 * 
	 */
	private static ThreadLocal<DateFormat> threadLocal = new ThreadLocal<DateFormat>();

	/**
	 * 当前时间
	 */
	private static Calendar calendar = Calendar.getInstance();
	
	/**
	 * 初始化下拉框
	 * @return
	 */
	public static List<Integer> initYearSelect()
	{
		
		List<Integer> yearSelect = new ArrayList<Integer>();
		Integer firstYear = 2011;
		while(firstYear <= 2030)
		{
			yearSelect.add(firstYear);
			firstYear++;
		}
		 
		return yearSelect;
	}

	/**
	 * 取当前时间的下N个小时
	 * 
	 * @param date
	 */
	public static String getNextHourse(String date, Integer hourse) 
	{

		calendar.setTime(parse(date));
		calendar.add(Calendar.HOUR, hourse);

		return formatDate(calendar.getTime());
	}

	/**
	 * 获取当前时间的上N个小时时间
	 * 
	 * @param date
	 * @return
	 */
	public static String getLastHourse(String date, Integer hourse)
	{

		calendar.setTime(parse(date));
		calendar.add(Calendar.HOUR, -hourse);

		return formatDate(calendar.getTime());
	}

	/**
	 * 获取当前时间的下N天时间
	 * 
	 * @param date
	 * @return
	 */
	public static String getNextDay(String date, Integer day)
	{

		calendar.setTime(parse(date));
		calendar.add(Calendar.DAY_OF_WEEK, day);

		return formatDate(calendar.getTime());
	}

	/**
	 * 获取当前时间的上N天时间
	 * 
	 * @param date
	 * @return
	 */
	public static String getLastDay(String date, Integer day) 
	{

		calendar.setTime(parse(date));
		calendar.add(Calendar.DAY_OF_WEEK, -day);

		return formatDate(calendar.getTime());
	}

	/**
	 * 获取当前时间的下N月时间
	 * 
	 * @param date
	 * @return
	 */
	public static String getNextMonth(String date, Integer month) {

		calendar.setTime(parse(date));
		calendar.add(Calendar.MONTH, month);

		return formatDate(calendar.getTime());
	}

	/**
	 * 获取当前时间的上N月时间
	 * 
	 * @param date
	 * @return
	 */
	public static String getLastMonth(String date, Integer month) {

		calendar.setTime(parse(date));
		calendar.add(Calendar.MONTH, -month);

		return formatDate(calendar.getTime());
	}

	public static String covertDateStr(Integer day) 
	{
		
		String dayStr = "";
		if (day == 5) {
			dayStr = "星期五";
		} else if (day == 4) {
			dayStr = "星期四";
		} else if (day == 3) {
			dayStr = "星期三";
		} else if (day == 2) {
			dayStr = "星期二";
		} else if (day == 1) {
			dayStr = "星期一";
		} else if (day == 0) {
			dayStr = "星期日";
		} else if (day == 6) {
			dayStr = "星期六";
		}

		return dayStr;
	}

	/**
	 * 获取时间格式化对象
	 * @return
	 */
	public static DateFormat getDateFormat() 
	{
		
		DateFormat df = threadLocal.get();
		if (df == null) 
		{
			df = new SimpleDateFormat(date_format);
			threadLocal.set(df);
		}
		return df;
	}

	/**
	 * 根据指定格式格式化时间
	 * @param date
	 * @return
	 * @throws ParseException
	 */
	public static String formatDate(Date date)
	{
		return getDateFormat().format(date);
	}

	/**
	 * 根据指定格式解析时间
	 * @param strDate
	 * @return
	 * @throws ParseException
	 */
	public static Date parse(String strDate)
	{
		
		try {
			return getDateFormat().parse(strDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return null;
	}

}
