package com.dm.rest.resource;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dm.core.Constants;
import com.dm.core.SysConfig;

/**
 *
 * 
 * @author Anthony
 * 
 */

@Controller
@RequestMapping("/uploadController")
public class UploadControllerRS extends BasicRS {

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
	public @ResponseBody void uploadFile(@RequestParam(value = "type", required = false) String type,
			HttpServletRequest request, HttpServletResponse response) 
	{
		
		//String type = request.getParameter("type");
		//String type = req.getParameter("type");
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
			list = sfu.parseRequest(request);
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
		try {
			String encode = URLEncoder.encode(name, Constants.ENCODE_UTF8);
			PrintWriter writer = response.getWriter();
			writer.write(encode);
			writer.flush();
//			writer.print(encode);
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(type);
		
	}
}