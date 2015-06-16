package com.dm.core.io;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.HashMap;
import java.util.Properties;

import com.dm.core.Constants;

public class PropertyReader implements ConfigReader {

	private Properties props = new Properties();

	public void init(String filename) throws IOException {
		props.clear();
		InputStreamReader is = new InputStreamReader(new FileInputStream(
				filename), Constants.ENCODE_UTF8);
		props.load(is);
		is.close();
	}

	public void init(InputStream is) throws IOException {
		props.clear();
		props.load(is);
	}

	public void save(String filename) throws IOException {
		OutputStreamWriter os = new OutputStreamWriter(new FileOutputStream(
				filename), Constants.ENCODE_UTF8);
		props.store(os, "properties");
		os.flush();
		os.close();
	}

	public void save(OutputStream os) throws IOException {
		props.store(os, "properties");
	}

	public Properties getAll() {
		return props;
	}

	public String getProperty(String key) {
		return props.getProperty(key);
	}

	public String getProperty(String key, String def) {
		return props.getProperty(key, def);
	}

	public void putAll(Properties props) {
		this.props = props;
	}

	public void putAll(HashMap<String, String> map) {
		props.clear();
		props.putAll(map);
	}

	public void setProperty(String key, String value) {
		props.setProperty(key, value);
	}

	public void removeProperty(String key) {
		props.remove(key);
	}
}
