package com.dm.core;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;

public class UploadServlet extends HttpServlet {

	private static final long serialVersionUID = -7246795176244499885L;

	private Logger log = Logger.getLogger(UploadServlet.class);

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	@SuppressWarnings("unchecked")
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		log.debug(">>> uploadFile starting...");

		String type = req.getParameter("type");
		String dir = SysConfig
				.concat(SysConfig.getWebAddr(), "uploadify", type);
		File d = new File(dir);
		if (!d.exists()) {
			d.mkdirs();
		}
		ServletFileUpload sfu = new ServletFileUpload(new DiskFileItemFactory());
		sfu.setHeaderEncoding(Constants.ENCODE_UTF8);
		List<FileItem> list = null;
		try {
			list = sfu.parseRequest(req);
		} catch (FileUploadException ex) {
			throw new RuntimeException("uploadify file is null!");
		}
		Iterator<FileItem> it = list.iterator();
		String name = null;
		while (it.hasNext()) {
			FileItem item = it.next();
			if (!item.isFormField()) {
				name = item.getName();
				if (name == null || "".equals(name.trim())) {
					continue;
				}
				// 版本文件名不需要加时间戳
				if (!"release".equals(type)) {
					int k = name.indexOf(".");
					name = name.substring(0, k) + "_"
							+ System.currentTimeMillis() + name.substring(k);
				}
				File saveFile = new File(SysConfig.concat(dir, name));
				try {
					item.write(saveFile);
				} catch (Exception ex) {
					throw new RuntimeException("uploadify file error!");
				}
			}
		}
		log.debug(">>> uploadFile end");
		resp.getWriter().print(URLEncoder.encode(name, Constants.ENCODE_UTF8));
	}
}
