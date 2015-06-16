package com.dm.core;

import java.io.File;

public class Constants {

	// mark (system)
	public final static String FILE_SEPERATOR = File.separator;
	public final static String LINE_SEPERATOR = System
			.getProperty("line.separator");
	public final static String SUBFIX_TXT = ".txt";
	public final static String SUBFIX_LOG = ".log";
	public final static String SUBFIX_CSV = ".csv";

	// mark
	public final static String MARK_BLANK = " ";
	public final static String MARK_ZERO = "0";
	public final static String MARK_CARET = "^";
	public final static String MARK_DOLLAR = "$";
	public final static String MARK_AND = "&";
	public final static String MARK_TILDE = "~";
	public final static String MARK_EXCLAMATION = "!";
	public final static String MARK_EQUAL = "=";
	public final static String MARK_POUND = "#";
	public final static String MARK_ASTERISK = "*";
	public final static String MARK_DOT = ".";
	public final static String MARK_COLON = ":";
	public final static String MARK_COMMA = ",";
	public final static String MARK_SEMICOLON = ";";
	public final static String MARK_QUESTION = "?";
	public final static String MARK_QUOTATION = "'";
	public final static String MARK_DOUBLE_QUOTATION = "\"";
	public final static String MARK_LEFT_PAREN = "(";
	public final static String MARK_RIGHT_PAREN = ")";
	public final static String MARK_LEFT_BRACKET = "[";
	public final static String MARK_RIGHT_BRACKET = "]";
	public final static String MARK_LEFT_BRACE = "{";
	public final static String MARK_RIGHT_BRACE = "}";
	public final static String MARK_DOUBLESLASH = "//";
	public final static String MARK_SLASH = "/";
	public final static String MARK_BACKLASH = "\\";
	public final static String MARK_UNDERLINE = "_";
	public final static String MARK_VIRGULE = "-";
	public final static String MARK_VIRTICALVIRGULE = "|";
	public final static String MARK_TAB = "\t";
	public final static String MARK_WRAP = "\n";
	public final static String MARK_RETURN = "\r";

	// tag
	public final static String TAG_HTTP = "http://";
	public final static String TAG_START_LEFT = "<";
	public final static String TAG_START_RIGHT = ">";
	public final static String TAG_END_LEFT = "</";
	public final static String TAG_END_RIGHT = "/>";
	public final static String TAG_A = "a";
	public final static String TAG_A_START = "<a>";
	public final static String TAG_A_END = "</a>";
	public final static String TAG_BLANK = "&nbsp;";

	// encode
	public final static String ENCODE_UTF8 = "utf-8";
	public final static String ENCODE_GBK = "gbk";
	public final static String URL_VIRTICALVIRGULE = "%7C";

	// format
	public final static String DATE_ZH4 = "MMMdd";
	public final static String DATE_ZH8 = "MMMddyyyy";
	public final static String REGULAR_FNAME_ILLEGAL = "[/\\\\:?*\"<>|]";
	public final static String REGULAR_VIRTICALVIRGULE = "\\|";
	public final static String REGULAR_VIRTICALVIRGULE_THREE = "\\|\\|\\|";
	public final static String REGULAR_TAB = "\t";
	public final static String REGULAR_NUMBER = "[0-9.:]+";
	public final static String REGULAR_IP = "[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}";
	public final static String REGULAR_DOMAIN = "[a-zA-Z0-9]+\\.[a-zA-Z0-9.]+";

	// web-config
	public static final String LOG4J_CONFIG = "log4j_config";
}
