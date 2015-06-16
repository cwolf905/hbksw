package com.dm.orm.biz.impl;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
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

import com.dm.core.SysConfig;
import com.dm.core.io.PropertyReader;
import com.dm.orm.biz.PluginOrderPackageBiz;
import com.dm.orm.mapper.PluginOrderPackageMapper;
import com.dm.orm.mapper.entity.PluginOrderStatistic;
import com.dm.orm.mapper.entity.PluginPackage;

public class PluginOrderPackageBizImpl  extends HttpServlet implements PluginOrderPackageBiz{

	private Logger log = Logger.getLogger(PluginOrderPackageBizImpl.class);
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private PluginOrderPackageMapper mapper;
	public void setMapper(PluginOrderPackageMapper mapper) {
		this.mapper = mapper;
	}
	/**
	 * 查询所有插件包订单统计 数据量
	 */
	@Override
	public int countPluginPackages(PluginOrderStatistic pluginOrderStatistic) {
		log.debug("countThirdProvides starting...");
		int count = 0;
		List<Integer> list = null;
		try{
			list = mapper.countPluginPackages(pluginOrderStatistic);
		}catch(Exception e){
			e.printStackTrace();
		}
		
	   count =list.size();
		log.debug("countThirdProvides end");
		return count;
	}
	/**
	 * 查询所有插件包订单统计
	 */
	@Override
	public List<PluginOrderStatistic> findAllPluginPackageList(
			PluginOrderStatistic pluginOrderStatistic) {
		 
		log.debug("findAllPluginOrderInfo starting...");
		List<PluginOrderStatistic> list = null;
		try{
		list = mapper.findAllPluginPackageList(pluginOrderStatistic);
		}catch(Exception e){
			e.printStackTrace();
		}
		log.debug("findAllPluginOrderInfo end");
		return list;
	}
	/**
	 * 查询全部插件包名
	 */
	@Override
	public List<PluginPackage> findAllPluginPackageNameList() {
		List<PluginPackage> list = null;
		try{
			list = mapper.findAllPluginPackageNameList();
			}catch(Exception e){
			e.printStackTrace();
		}
		return list;
	}
	/**
	 * 计算总金额
	 */
	@Override
	public BigDecimal pluginPricetotal(PluginOrderStatistic pluginOrderStatistic) {
		BigDecimal totalPrice = BigDecimal.ZERO;
		log.debug("findAllPluginOrderInfo starting...");
		List<PluginOrderStatistic> list = null;
		try{
		list = mapper.pluginPricetotal(pluginOrderStatistic);
		}catch(Exception e){
			e.printStackTrace();
		}
		log.debug("findAllPluginOrderInfo end");
		if(list!=null&&list.size()>0){
			
			for( int i =0;i<list.size();i++){
				list.get(i);
				try{totalPrice = totalPrice.add(list.get(i).getPrices());
				}catch(Exception e){
					e.printStackTrace();
					}
			}
			
		}
		return totalPrice;
	}
	/**
	 * 导出功能
	 */
	
	protected void service(HttpServletRequest request,HttpServletResponse response){
		
		log.debug("service xxxx start");
		String startTime = request.getParameter("startTime");
		String endTime = request.getParameter("endTime");
		String pluginPackageNameId = request.getParameter("pluginPackageNameId");
		
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		String sql = null;
		List<PluginOrderStatistic> list = new ArrayList<PluginOrderStatistic>();
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
		try {
			stmt = conn.createStatement();
			sql = "	SELECT o.*,m.`mobileNo`,p.`name` AS pluginName,p.`pluginType`,p.`thirdProvideId`,pp.`name` AS pluginPackageName ,SUM(o.price)AS prices,COUNT(*) AS counts,tt.name AS thirdName"
				+" FROM `plugin_order` o "
				+" LEFT JOIN mobileUser m ON(o.`userId` = m.`mobileId`) "
				+" LEFT JOIN plugin p ON (o.`productId` = p.`id`)"
				+" LEFT JOIN pluginPackage pp ON(o.`productId` = pp.`id`) "
				+" LEFT JOIN thirdprovide tt ON(p.`thirdProvideId`=tt.`id`)"
				+" WHERE 1=1 AND o.productType =0 AND o.`status`=1"
				;
			if (null != startTime && !"".equals(startTime)) {
				sql += " and orderTime >=" +"'"+ startTime+"'";
			}
			if (null != endTime && !"".equals(endTime)) {
				sql += " and orderTime <=" +"'"+ endTime+"'";
			}
			if (null != pluginPackageNameId && !"-1".equals(pluginPackageNameId)) {
				sql += " and pp.id=" + pluginPackageNameId;
			}
			
			
			sql += "  GROUP BY o.productType , o.productId";
			
			sql += " order by orderId desc";

			System.out.println(sql);

			rs = stmt.executeQuery(sql);// 执行sql语句
			while (rs.next()) 
			{
				
				PluginOrderStatistic p = new PluginOrderStatistic();
				//序号  //插件包名称 ///购买数量 //购买金额
				p.setOrderNo(rs.getString("OrderNo"));
				p.setPluginType(rs.getString("pluginType"));
				//p.setPluginName(rs.getString("pluginName"));
				p.setProductType(rs.getString("productType"));
				p.setPluginPackageName(rs.getString("pluginPackageName"));
				p.setCounts(rs.getInt("counts"));
				p.setPrices(rs.getBigDecimal("prices"));
				list.add(p);
			}
		} catch (SQLException e) {
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
									+ new String("PluginOrderStatistic".getBytes("GB2312"),
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
						sheet.addCell(new Label(0, 0, "编号"));
						sheet.addCell(new Label(1, 0, "插件名称"));
						//sheet.addCell(new Label(2, 0, "提供商名称"));
						sheet.addCell(new Label(2, 0, "购买数量"));
					    sheet.addCell(new Label(3, 0, "购买价格"));
						// 设置每行的高度
						sheet.setColumnView(0, 30);
						sheet.setColumnView(1, 30);
						sheet.setColumnView(2, 30);
						sheet.setColumnView(3, 30);
						//sheet.setColumnView(4, 30);
						for (int r = 0; r < list.size(); r++) {
							// 行编号
							PluginOrderStatistic log = list.get(r);
							// 序号
							if(log.getOrderNo()!=null){
							sheet.addCell(new Label(0, r + 1, log.getOrderNo()
									));
							}
							// 插件包名称
								if(log.getPluginPackageName()!=null){
									sheet.addCell(new Label(1, r + 1, log.getPluginPackageName()));
								}
							// 购买数量
							if(log.getCounts().toString()!=null){
								sheet.addCell(new Label(2, r + 1, log.getCounts().toString()));
							}
							// 购买金额
							if(log.getPrices().toString()!=null){
								sheet.addCell(new Label(3, r + 1, log.getPrices().toString()));
							}
							
							//计算总价格
							BigDecimal totalPrice = BigDecimal.ZERO;
							for (PluginOrderStatistic pluginOrderStatistic : list) 
							{
								totalPrice = totalPrice.add(pluginOrderStatistic.getPrices());
							}
							sheet.addCell(new Label(3, list.size() + 1, "总计：￥"+ totalPrice));
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

			}
		
		
		
		
		
		
	}

}
