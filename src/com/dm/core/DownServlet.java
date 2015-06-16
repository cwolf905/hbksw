package com.dm.core;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DownServlet extends HttpServlet 
{
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try
		  {
		   String startTime=request.getParameter("startTime");
		   String endTime=request.getParameter("endTime");
		   String thirdProvidId=request.getParameter("thirdProvidId");
			
			String downFilename = "1.txt";
		         response.setContentType("text/plain");
		         response.setHeader("Location",downFilename);
		         response.setHeader("Content-Disposition", "attachment; filename=" + downFilename);
		         OutputStream outputStream = response.getOutputStream();
		         InputStream inputStream = new FileInputStream("E://1.txt");
		         byte[] buffer = new byte[1024];
		         int i = -1;
		         while ((i = inputStream.read(buffer)) != -1) {
		          outputStream.write(buffer, 0, i);
		         }
		         outputStream.flush();
		         outputStream.close();
		  }catch(FileNotFoundException e1)
		  {
		   System.out.println("没有找到您要的文件");
		  }
		  catch(Exception e)
		  {
		   System.out.println("系统错误，请及时与管理员联系");
		  }
	}
}
