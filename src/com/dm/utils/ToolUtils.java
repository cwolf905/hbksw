package com.dm.utils;

import java.math.BigDecimal;
import java.util.regex.Pattern;

import com.dm.core.Constants;

/**
 * 数值、字符串运算
 * 
 * @author Anthony
 * 
 */
public class ToolUtils {

	public static final String ROUNDING_FLAG_DOWN4_UP5 = "1"; // 四舍五入
	public static final String ROUNDING_FLAG_CUT_DOWN = "2"; // 舍去尾数
	public static final String ROUNDING_FLAG_CUT_UP = "3"; // 直接升位

	/**
	 * 将两个数值字符串求和
	 * 
	 * @param str1
	 * @param str2
	 * @param Rnd
	 * @return
	 */
	public static String addString(String str1, String str2, int Rnd) {
		if (str1 == null || str2 == null) {
			return "";
		}
		String added = "";
		try {
			BigDecimal val1 = new BigDecimal(str1);
			BigDecimal val2 = new BigDecimal(str2);
			added = val1.add(val2).setScale(Rnd, BigDecimal.ROUND_HALF_UP)
					.toString();
		} catch (NumberFormatException nfe) {
		}
		return added;
	}

	/**
	 * 将两个数值字符串相减
	 * 
	 * @param str1
	 * @param str2
	 * @param Rnd
	 * @return
	 */
	public static String subString(String str1, String str2, int Rnd) {
		if (str1 == null || str2 == null) {
			return "";
		}
		String added = "";
		try {
			BigDecimal val1 = new BigDecimal(str1);
			BigDecimal val2 = new BigDecimal(str2);
			added = val1.subtract(val2).setScale(Rnd, BigDecimal.ROUND_HALF_UP)
					.toString();
		} catch (NumberFormatException nfe) {
		}
		return added;
	}

	/**
	 * 将两个数值字符串相乘
	 * 
	 * @param str1
	 * @param str2
	 * @param Rnd
	 * @return
	 */
	public static String multiString(String str1, String str2, int Rnd) {
		if (str1 == null || str2 == null) {
			return "";
		}
		String added = "";
		try {
			BigDecimal val1 = new BigDecimal(str1);
			BigDecimal val2 = new BigDecimal(str2);
			added = val1.multiply(val2).setScale(Rnd, BigDecimal.ROUND_HALF_UP)
					.toString();
		} catch (NumberFormatException nfe) {
		}
		return added;
	}

	/**
	 * 将两个数值字符串相除
	 * 
	 * @param str1
	 * @param str2
	 * @param Rnd
	 * @return
	 */
	public static String divideString(String str1, String str2, int Rnd) {
		if (str1 == null || str2 == null) {
			return "";
		}
		String added = "";
		try {
			BigDecimal val1 = new BigDecimal(str1);
			BigDecimal val2 = new BigDecimal(str2);
			added = val1.divide(val2, Rnd, BigDecimal.ROUND_HALF_UP).toString();
		} catch (NumberFormatException nfe) {
		}
		return added;
	}

	/**
	 * 比较数值字符串
	 * 
	 * @param str1
	 * @param str2
	 * @return
	 */
	public static int compareString(String str1, String str2) {
		try {
			BigDecimal bd1 = null;
			BigDecimal bd2 = null;
			try {
				bd1 = new BigDecimal(str1);
			} catch (Exception ex) {
				return -1;
			}
			try {
				bd2 = new BigDecimal(str2);
			} catch (Exception ex) {
				return 1;
			}
			return bd1.compareTo(bd2);
		} catch (Exception ex) {
			return 0;
		}
	}

	/**
	 * 格式化数字 9999999 -> 9,999,999
	 * 
	 * @param input
	 * @return
	 */
	public static String formatNumber(String input) {
		if (input == null || input.trim().length() == 0) {
			return "0";
		}
		boolean neg = input.startsWith("-");
		input = neg ? input.substring(1).trim() : input.trim();
		int point = (input.indexOf(".") > 0) ? input.indexOf(".") : input
				.length();

		StringBuffer result = new StringBuffer();
		for (int i = 0; i < point - 1; i++) {
			if ((point - i - 1) % 3 == 0) {
				result.append(input.charAt(i)).append(",");
			} else {
				result.append(input.charAt(i));
			}
		}
		result.append(input.substring(point - 1));
		return neg ? "-" + result.toString() : result.toString();
	}

	/**
	 * 格式化数字 9999999.9999 -> 9,999,999.9999
	 * 
	 * @param input
	 * @param dec
	 * @return
	 */
	public static String formatDecNum(String input, int dec) {
		if (input == null || input.trim().length() == 0) {
			return "0";
		}
		int point = input.indexOf(".");
		String result = formatNumber(input.substring(0, (point == -1) ? input
				.length() : point));
		if (dec == 0) {
			return result;
		}
		String decstr = (point == -1) ? "" : input.substring(point + 1);
		while (decstr.length() < dec) {
			decstr = decstr + "0";
		}
		return (result + "." + decstr.substring(0, dec));
	}

	/**
	 * 在前面补sAppend，形成定长的字符串
	 * 
	 * @param sOld
	 * @param sAppend
	 * @param remainLen
	 * @return
	 */
	public static String strAppend(String sOld, String sAppend, int remainLen) {
		String sNew = sAppend + sOld;
		return sNew.substring(sNew.length() - remainLen);
	}

	/**
	 * 转成HTML字符串，如'<','>','\n'
	 * 
	 * @param sIn
	 * @return
	 */
	public static String toHTMLStr(String sIn) {
		if (sIn == null) {
			return sIn;
		}
		sIn = sIn.replace("<", "&lt;");
		sIn = sIn.replace(">", "&gt;");
		sIn = sIn.replace(Constants.LINE_SEPERATOR, "<br>");
		return sIn;
	}

	/**
	 * 判断字符串是否为double数字
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isDouble(String str) {
		Pattern pattern = Pattern
				.compile("^[-+]?(\\d+(\\.\\d*)?|\\.\\d+)([eE]([-+]?([012]?\\d{1,2}|30[0-7])|-3([01]?[4-9]|[012]?[0-3])))?[dD]?$");
		return pattern.matcher(str).matches();
	}

	/**
	 * 计算以base为底的对数
	 * 
	 * @param value
	 * @param base
	 * @return
	 */
	public static double log(double value, double base) {
		return Math.log(value) / Math.log(base);
	}

	/**
	 * 字符串反转
	 * 
	 * @param str
	 * @return
	 */
	public static String reverseString(String str) {
		StringBuffer sb = new StringBuffer();
		for (int i = str.length() - 1; i >= 0; i--) {
			sb.append(str.charAt(i));
		}
		return sb.toString();
	}

	/**
	 * 字符串反转，时间复杂度O(n)，空间复杂度O(1)
	 * 
	 * @param letters
	 * @param begin
	 * @param end
	 * @return
	 */
	private static String reverseString(char[] letters, int begin, int end) {
		if (begin >= end) {
			return null;
		}
		for (int i = begin, j = end; i < j; i++, j--) {
			char tmp = letters[i];
			letters[i] = letters[j];
			letters[j] = tmp;
		}
		return new String(letters);
	}

	/**
	 * 左旋转字符串，abcdef->ab.cdef->ba.fedc->cdefab
	 * 
	 * @param str
	 * @param n
	 *            旋转的位数
	 * @return
	 */
	public static String leftRotateString(String str, int n) {
		if (str == null || str.length() == 0) {
			return str;
		}
		if (n <= 0 || n >= str.length()) {
			return str;
		}
		int begin = 0;
		int end = str.length() - 1;
		char[] letters = str.toCharArray();
		reverseString(letters, begin, n - 1);
		reverseString(letters, n, end);
		reverseString(letters, begin, end);
		return new String(letters);
	}

	/**
	 * 字符串是否包含问题的“最好的方法”，时间复杂度O(n + m)，空间复杂度O(1)
	 * 
	 * @param a
	 *            比b长
	 * @param b
	 *            判断b是否为a的真子集
	 * @return
	 */
	public static boolean comtain(char[] a, char[] b) {
		int hash = 0;
		for (int i = 0; i < a.length; ++i)
			hash |= (1 << (a[i] - 'A'));
		for (int i = 0; i < b.length; ++i) {
			if ((hash & (1 << (b[i] - 'A'))) == 0)
				return false;
		}
		return true;
	}

	public static void main(String[] args) {
		System.out.print(log(10, 2));
	}
}
