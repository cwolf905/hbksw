package com.dm.core.io;

import java.io.InputStream;

public interface ConfigReader {

	void init(String fileName) throws Exception;

	void init(InputStream is) throws Exception;

	String getProperty(String key);

	String getProperty(String key, String def);
}
