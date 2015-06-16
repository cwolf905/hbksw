package com.dm.core;

import java.io.File;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

public class InitServlet extends HttpServlet 
{

	private static final long serialVersionUID = -4421484991788326962L;

	@Override
	public void init() throws ServletException 
	{
		
		super.init();
		SysConfig.setWebRoot(getServletContext().getRealPath("/WEB-INF")
				+ File.separator + "classes" + File.separator);
	}
}
