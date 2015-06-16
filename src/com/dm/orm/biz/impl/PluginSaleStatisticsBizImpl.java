package com.dm.orm.biz.impl;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

import org.apache.log4j.Logger;
import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;

import com.dm.core.SysConfig;
import com.dm.core.io.PropertyReader;
import com.dm.orm.biz.PluginSaleStatisticsBiz;
import com.dm.orm.mapper.PluginSaleStatisticsMapper;
import com.dm.orm.mapper.entity.PluginSaleStatistics;

public class PluginSaleStatisticsBizImpl extends HttpServlet implements PluginSaleStatisticsBiz  {

	
/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

private Logger log = Logger.getLogger(ThirdProvideBizImpl.class);
	
    public PluginSaleStatisticsMapper mapper;
    
	

	public void setMapper(PluginSaleStatisticsMapper mapper) {
		this.mapper = mapper;
	}

	/**
	 * 查询插件销售排行统计 数据量
	 * 
	 * @param 
	 * @return
	 */
	@Override
	public int countPluginSaleStatistics(
			PluginSaleStatistics pluginSaleStatistics) {
		log.debug("countThirdProvides starting...");
		int count = 0;
		try{
			List<PluginSaleStatistics> list = null;
			list = mapper.countPluginSaleStatistics(pluginSaleStatistics);
			count =list.size();
		}catch(Exception e){
			e.printStackTrace();
			}
		
		log.debug("countThirdProvides end");
		return count;
	}
	
	/**
	 * 查询插件销售排行统计
	 * 
	 * @param 
	 * @return
	 */
	@Override
	public List<PluginSaleStatistics> findAllPluginSaleStatisticsList(
			PluginSaleStatistics pluginSaleStatistics) {
		log.debug("findAllPluginOrderInfo starting...");
		List<PluginSaleStatistics> list = null;
		//FLAG=0按照金额排序  flag=1按照销售量排序
		if(pluginSaleStatistics.getFlag().equals("0")){
			list = mapper.findAllPluginSaleStatistics(pluginSaleStatistics);
		}
		if(pluginSaleStatistics.getFlag().equals("1")){
			list=mapper.findAllPluginSaleStatisticsOrderByCounts(pluginSaleStatistics);
		}
		log.debug("findAllPluginOrderInfo end");
		return list;
	}
	
	
	
	
	/**
	 * 导出
	 * 
	 * @param 
	 * @return
	 */
	@Override
	public String exportPluginSaleStatisticsExcelList(
			PluginSaleStatistics pluginSaleStatistics) {
		List<PluginSaleStatistics> list = null;
		//FLAG=0按照金额排序  flag=1按照销售量排序
		if(pluginSaleStatistics.getFlag().equals("0")){
			list = mapper.findAllPluginSaleStatisticsExport(pluginSaleStatistics);
		}
		if(pluginSaleStatistics.getFlag().equals("1")){
			list=mapper.findAllPluginSaleStatisticsOrderByCountsExport(pluginSaleStatistics);
		}
		
        if(list!=null&&list.size()>0){
			WebContext webContext = WebContextFactory.get();  
			HttpServletResponse response=webContext.getHttpServletResponse();
			// 导出Excel start
			// 取得输出流
			// this.getResponse();
			//HttpServletResponse response = ((ServletWebRequest) RequestContextHolder.getRequestAttributes()).getResponse();
			OutputStream os =null;
			try {
				os = response.getOutputStream();
			} catch (Exception e2) {
				// TODO Auto-generated catch block
				e2.printStackTrace();
			}
			
			// 清空输出流
			response.reset();
			try {
				response.setHeader(
						"Content-disposition",
						"attachment; filename="
								+ new String("daily".getBytes("GB2312"), "UTF-8")
								+ ".xls");
			} catch (UnsupportedEncodingException e2) {
				// TODO Auto-generated catch block
				e2.printStackTrace();
			}// 设定输出文件头
			response.setContentType("application/msexcel");// 定义输出类型
			// 创建EXCEL文档
			WritableWorkbook workbook = null;
			try {
				//workbook = Workbook.createWorkbook(os);
				DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
				Date date= new Date();
				String startTime=dateFormat.format(date);
				workbook = Workbook.createWorkbook(new File("c:"+File.pathSeparator+"插件销售排行统计"+startTime+".xls"));
				//workbook = Workbook.createWorkbook(new File("c:/插件销售排行统计"+startTime+".xls"));
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			if (workbook != null) {
				 //创建一个工作簿
		        
				// 创建一个SHEET
				WritableSheet sheet = workbook.createSheet("sheet1", 0);

				// 设置标题 sheet.addCell(new jxl.write.Label(列(从0开始), 行(从0开始), 内容.));
				try {
					// 4 创建单元格的内容
					// new Label(0, 0, "订单号")
					// 先简单创建一个字符串类型的cell，其他的在详细解
					// 把创建好的单元格内容添加到WritableSheet中。
					// ws.addCell(labelStr1);
					sheet.addCell(new Label(0, 0, "序号"));
					sheet.addCell(new Label(1, 0, "插件名称"));
					sheet.addCell(new Label(2, 0, "提供商名称"));
					sheet.addCell(new Label(3, 0, "购买数量"));
				    sheet.addCell(new Label(4, 0, "购买价格"));
					// 设置每行的高度
					sheet.setColumnView(0, 30);
					sheet.setColumnView(1, 30);
					sheet.setColumnView(2, 30);
					sheet.setColumnView(3, 30);
					sheet.setColumnView(4, 30);
					for (int r = 0; r < list.size(); r++) {
						// 行编号
						PluginSaleStatistics log = list.get(r);
						// 序号
						if(log.getOrderNo()!=null){
						sheet.addCell(new Label(0, r + 1, log.getOrderNo()
								));
						}
						// 插件名称
						// 插件名称
						if(log.getProductType().equals("1") ){
							if(log.getPluginName()!=null){
								sheet.addCell(new Label(1, r + 1, log.getPluginName()));
							}
						}else{
							if(log.getPluginPackageName()!=null){
							 sheet.addCell(new Label(1, r + 1, log.getPluginPackageName()));
							}
						}
						// 提供商名称
						if(log.getThirdName()!=null){
							sheet.addCell(new Label(2, r + 1, log.getThirdName()));
						}
						// 购买数量
						if(log.getCounts().toString()!=null){
							sheet.addCell(new Label(3, r + 1, log.getCounts().toString()));
						}
						// 购买金额
						if(log.getPrices().toString()!=null){
							sheet.addCell(new Label(4, r + 1, log.getPrices().toString()));
						}

					}
					// 从内存中写入文件中
					workbook.write();
					// 关闭资源，释放内存

				} catch (Exception e) {
					e.printStackTrace();
				} finally {
					try {
						workbook.close();
					} catch (WriteException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}

			// 导出Excel end
		}
		
       	
        String aa="ok";
		return aa ;	
	}
	/**
	 * 导出
	 */
	protected void service(HttpServletRequest request,HttpServletResponse response){
		
		String startTime = request.getParameter("startTime");
		String endTime = request.getParameter("endTime");
		String flag =request.getParameter("flag");
		
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		String sql = null;
		
		List<PluginSaleStatistics> list = new ArrayList<PluginSaleStatistics>();
		//通过配置文件获取数据库信息
		PropertyReader readerConfig = new PropertyReader();
		try {
			readerConfig.init(SysConfig.concat(SysConfig.getPropertyPath(), "config.properties"));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String driver = readerConfig.getProperty("jdbc.driverClassName");
		String user = readerConfig.getProperty("jdbc.username");
		String url = readerConfig.getProperty("jdbc.url");
		String password = readerConfig.getProperty("jdbc.password");
		try
		{
			Class.forName(driver); // 加载mysq驱动
		} catch (ClassNotFoundException e) {
			System.out.println("驱动加载错误");
			e.printStackTrace();// 打印出错详细信息
		}
		try 
		{
			//url = "jdbc:mysql://192.168.1.122:3306/hbksw?user=root&password=1234&useUnicode=true&&characterEncoding=gb2312&autoReconnect = true";// 简单写法：url
			conn = DriverManager.getConnection(url, user, password);
		} catch (SQLException e) 
		{
			System.out.println("数据库链接错误");
			e.printStackTrace();
		}
		
		try 
		{
			stmt = conn.createStatement();
			
			sql = "	SELECT o.*,m.`mobileNo`,p.`name` AS pluginName,p.`pluginType`,p.`thirdProvideId`,pp.`name` AS pluginPackageName ,SUM(o.price)AS prices,COUNT(*) AS counts,tt.name AS thirdName"
					+" FROM `plugin_order` o "
					+" LEFT JOIN mobileUser m ON(o.`userId` = m.`mobileId`) "
					+" LEFT JOIN plugin p ON (o.`productId` = p.`id`)"
					+" LEFT JOIN pluginPackage pp ON(o.`productId` = pp.`id`) "
					+" LEFT JOIN thirdprovide tt ON(p.`thirdProvideId`=tt.`id`)"
					+" WHERE 1=1 AND o.`status`=1 "
					;

			if (null != startTime && !"".equals(startTime)) {
				sql += " and orderTime >="+"'"+startTime+"'";
			}
			if (null != endTime && !"".equals(endTime) &&endTime.length()>7) {
				sql += " and orderTime <="+"'"+endTime+"'";
			}
			sql +="GROUP BY o.productType , o.productId";
			if(flag.equals("0")){
				sql += " order by `prices` desc";
			}
			if(flag.equals("1")){
				sql += " order by `counts` desc";
			}
			
			System.out.println(sql);

			rs = stmt.executeQuery(sql);// 执行sql语句
			while (rs.next()) 
			{
				
				PluginSaleStatistics p = new PluginSaleStatistics();
				//序号  //插件名称 //提供商名称 //购买数量 //购买金额
				p.setOrderNo(rs.getString("OrderNo"));
				p.setPluginType(rs.getString("pluginType"));
				p.setPluginName(rs.getString("pluginName"));
				p.setProductType(rs.getString("productType"));
				p.setPluginPackageName(rs.getString("pluginPackageName"));
				p.setThirdProvideId(rs.getInt("thirdProvideId"));
				p.setThirdName(rs.getString("thirdName"));
				p.setCounts(rs.getInt("counts"));
				p.setPrices(rs.getBigDecimal("prices"));
				
				list.add(p);
			}
		} catch (SQLException e) 
		{
			System.out.println("数据操作错误");
			e.printStackTrace();
		}
		// 关闭数据库
		try {
			if (rs != null) {
				rs.close();
				rs = null;
			}
			if (stmt != null) {
				stmt.close();
				stmt = null;
			}
			if (conn != null) {
				conn.close();
				conn = null;
			}
		} catch (Exception e) {
			System.out.println("数据库关闭错误");
			e.printStackTrace();
		}
		
		 if(list!=null&&list.size()>0){
			 OutputStream os = null;
				try 
				{
					os = response.getOutputStream();
				} catch (Exception e2) {
					// TODO Auto-generated catch block
					e2.printStackTrace();
				}

				// 清空输出流
				response.reset();
				try 
				{
					response.setHeader("Content-disposition",
							"attachment; filename="
									+ new String("pluginSaleStatistic".getBytes("GB2312"),
											"UTF-8") + ".xls");
				} catch (UnsupportedEncodingException e2) {
					e2.printStackTrace();
				}// 设定输出文件头
				response.setContentType("application/msexcel");// 定义输出类型
				// 创建EXCEL文档
				WritableWorkbook workbook = null;
				
				try {
					workbook = Workbook.createWorkbook(os);
					
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				if (workbook != null) {
					 //创建一个工作簿
			        
					// 创建一个SHEET
					WritableSheet sheet = workbook.createSheet("sheet1", 0);

					// 设置标题 sheet.addCell(new jxl.write.Label(列(从0开始), 行(从0开始), 内容.));
					try {
						// 4 创建单元格的内容
						// new Label(0, 0, "订单号")
						// 先简单创建一个字符串类型的cell，其他的在详细解
						// 把创建好的单元格内容添加到WritableSheet中。
						// ws.addCell(labelStr1);
						sheet.addCell(new Label(0, 0, "序号"));
						sheet.addCell(new Label(1, 0, "插件名称"));
						sheet.addCell(new Label(2, 0, "提供商名称"));
						sheet.addCell(new Label(3, 0, "购买数量"));
					    sheet.addCell(new Label(4, 0, "购买价格"));
						// 设置每行的高度
						sheet.setColumnView(0, 30);
						sheet.setColumnView(1, 30);
						sheet.setColumnView(2, 30);
						sheet.setColumnView(3, 30);
						sheet.setColumnView(4, 30);
						for (int r = 0; r < list.size(); r++) {
							// 行编号
							PluginSaleStatistics log = list.get(r);
							// 序号
							if(log.getOrderNo()!=null){
							sheet.addCell(new Label(0, r + 1, log.getOrderNo()
									));
							}
							// 插件名称
							// 插件名称
							if(log.getProductType().equals("1") ){
								if(log.getPluginName()!=null){
									sheet.addCell(new Label(1, r + 1, log.getPluginName()));
								}
							}else{
								if(log.getPluginPackageName()!=null){
								 sheet.addCell(new Label(1, r + 1, log.getPluginPackageName()));
								}
							}
							// 提供商名称
							if(log.getThirdName()!=null){
								sheet.addCell(new Label(2, r + 1, log.getThirdName()));
							}
							// 购买数量
							if(log.getCounts().toString()!=null){
								sheet.addCell(new Label(3, r + 1, log.getCounts().toString()));
							}
							// 购买金额
							if(log.getPrices().toString()!=null){
								sheet.addCell(new Label(4, r + 1, log.getPrices().toString()));
							}

						}
						// 从内存中写入文件中
						workbook.write();
						// 关闭资源，释放内存

					} catch (Exception e) {
						e.printStackTrace();
					} finally {
						try {
							workbook.close();
						} catch (WriteException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}

				// 导出Excel end
			}
		

		
		
	}
	 
	

}
