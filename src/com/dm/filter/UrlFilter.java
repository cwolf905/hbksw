package com.dm.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

public class UrlFilter implements Filter {  
  
    private Logger log = Logger.getLogger(UrlFilter.class);

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		// TODO Auto-generated method stub
		System.out.println("ssss");
		  HttpServletRequest httpRequest = (HttpServletRequest)arg0;  
          
	        //取的url相对地址，例如：/PrxWebCache/index.jsp  
	        String url = httpRequest.getRequestURI(); 
	        url = url.replaceAll("/", "");
	        if("hbksy".equals(url))
	        {
	        	arg0.getRequestDispatcher("/html/admin.html").forward(arg0, arg1);
	        	arg2.doFilter(arg0, arg1);
	        }else  if("teacher".equals(url))
	        {
	        	
	        }else  if("teacher1".equals(url))
	        {
	        	
	        }
	        System.out.println(url);  
	       
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		System.out.println("dddd");
	}  
      
    
  
}  
