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
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
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
import com.dm.core.io.ChartData;
import com.dm.core.io.PropertyReader;
import com.dm.orm.biz.PluginOrderInfoBiz;
import com.dm.orm.mapper.PluginOrderInfoMapper;
import com.dm.orm.mapper.entity.PluginOrderInfo;
import com.dm.orm.mapper.entity.ThirdProvide;
import com.dm.utils.DateUtil;

@SuppressWarnings("serial")
public class PluginOrderInfoBizImpl extends HttpServlet implements
		PluginOrderInfoBiz 
	{

	private Logger log = Logger.getLogger(ThirdProvideBizImpl.class);

	public PluginOrderInfoMapper mapper;

	public void setMapper(PluginOrderInfoMapper mapper) 
	{
		this.mapper = mapper;
	}
	
	/**
	 * 生成饼图数据
	 * @param paramArray
	 * @return
	 */
	public String[] generatePieChartData(Integer[] paramArray)
	{
		
		String[] chartData = null;
		try
		{
			Map<String, Integer> paramMap = new HashMap<String, Integer>();
			paramMap.put("year", paramArray[0]);
			paramMap.put("month", paramArray[1]);
			
			List<ChartData> collectionByYearAndMonth = mapper.collectionByYearAndMonth(paramMap);
			if(null != collectionByYearAndMonth && collectionByYearAndMonth.size() != 0)
			{
				
				chartData = new String[collectionByYearAndMonth.size()];
				for(int i = 0; i < collectionByYearAndMonth.size(); i++)
				{
					
					ChartData chart = collectionByYearAndMonth.get(i);
					chartData[i] = "'" + chart.getHorizontalStr() + "'," + chart.getVertical();
				}
			}
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		
		return chartData;
	}
	
	/**
	 * 对某第三方按照进行统计
	 * @param thirdProvideId
	 * @return
	 */
	public String[] generateChartData (Integer[] paramArray)
	{
		
		log.debug("generateChartData starting...");
		
		String[] chartData = null;
		Integer selectYear = paramArray[1];
		if(null != selectYear)
		{
			
			Map<String, Integer> paramMap = new HashMap<String, Integer>();
			paramMap.put("year", selectYear);
			paramMap.put("thirdProvideId", paramArray[0]);
			List<ChartData> collectionByMonth = mapper.collectionByMonth(paramMap);
			if(null != collectionByMonth && collectionByMonth.size() != 0)
			{
				Integer firstYear = 1;
				//横坐标值
				Integer indexYear = firstYear;
				String horizontalSign = "月";
				Integer lastYear = 12;
				chartData = new String[lastYear - firstYear + 1];
				//list中数据索引
				Integer index = 0;
				for(int m = 0; m < lastYear - firstYear + 1; m++)
				{
					try
					{
						Integer horizontal = Integer.MIN_VALUE;
						String vertical = null;
						if(index < collectionByMonth.size())
						{
							horizontal = collectionByMonth.get(index).getHorizontal();
							vertical = collectionByMonth.get(index).getVertical().toString();
						}
						if(horizontal.intValue() == indexYear.intValue())
						{
							chartData[m] = "'" + indexYear.toString() + horizontalSign + "'," + vertical;
							index ++;
						}else
						{
							chartData[m] = "'" + indexYear.toString() + horizontalSign + "'," + 0;
						}
						indexYear ++;
					}catch(Exception e)
					{
						e.printStackTrace();
					}
				}
			}
		}else
		{
			List<ChartData> collectionByYear = mapper.collectionByYear(paramArray[0]);
			if(null != collectionByYear && collectionByYear.size() != 0)
			{
				Integer firstYear = collectionByYear.get(0).getHorizontal();
				//横坐标值
				Integer indexYear = collectionByYear.get(0).getHorizontal();
				String horizontalSign = "年";
				Integer lastYear = collectionByYear.get(collectionByYear.size() - 1).getHorizontal();
				chartData = new String[lastYear - firstYear + 1];
				//list中数据索引
				Integer index = 0;
				for(int m = 0; m < lastYear - firstYear + 1; m++)
				{
					
					Integer horizontal = collectionByYear.get(index).getHorizontal();
					String vertical = collectionByYear.get(index).getVertical().toString();
					if(horizontal.intValue() == indexYear.intValue())
					{
						chartData[m] = "'" + indexYear.toString() + horizontalSign + "'," + vertical;
						index ++;
					}else
					{
						chartData[m] = "'" + indexYear.toString() + horizontalSign + "'," + 0;
					}
					indexYear ++;
				}
			}
		}
		
		log.debug("generateChartData end...");
		return chartData;
		
	}
	
	/**
	 * 初始化年份下拉框
	 * @return
	 */
	public List<Integer> initYearSelect()
	{
		List<Integer> yearSelect = DateUtil.initYearSelect();
		
		return yearSelect;
	}
	

	/**
	 * 统计所有的插件数据量
	 * 
	 * @param cond
	 * @return
	 */
	@Override
	public int countPluginOrderInfos(PluginOrderInfo pluginOrderInfo) 
	{

		log.debug("countThirdProvides starting...");
		int count = 0;
		count = mapper.countPluginOrderInfos(pluginOrderInfo);
		log.debug("countThirdProvides end");
		return count;
	}

	/**
	 * 统计所有插件订单金额
	 * 
	 * @param
	 * @return
	 */
	@Override
	public BigDecimal countPluginOrderPrice(PluginOrderInfo pluginOrderInfo) 
	{

		log.debug("findAllPluginOrderInfo starting...");

		BigDecimal totalPrice = BigDecimal.ZERO;
		List<PluginOrderInfo> list = null;
		try {
			list = mapper.findAllPluginOrderInfo(pluginOrderInfo);
		} catch (Exception e) {
			e.printStackTrace();
		}
		for (PluginOrderInfo pluginOrderIn : list) {
			totalPrice = totalPrice.add(pluginOrderIn.getPrice());
		}

		log.debug("findAllPluginOrderInfo end");
		return totalPrice;
	}

	/**
	 * 查询所有插件订单
	 * 
	 * @param
	 * @return
	 */
	@Override
	public List<PluginOrderInfo> findAllPluginOrderInfoList
	(
			PluginOrderInfo pluginOrderInfo) {

		log.debug("findAllPluginOrderInfo starting...");

		List<PluginOrderInfo> list = null;
		try {
			list = mapper.findAllPluginOrderInfoByPage(pluginOrderInfo);
		} catch (Exception e) {
			e.printStackTrace();
		}

		log.debug("findAllPluginOrderInfo end");
		return list;
	}

	/**
	 * 导出查到的插件订单功能
	 */
	protected void service(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException 
	{

		log.debug("service xxxx start");
		
		String startTime = request.getParameter("startTime");
		String endTime = request.getParameter("endTime");
		Integer thirdProvidId = Integer.valueOf(request.getParameter("thirdProvidId"));

		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		String sql = null;
		
		List<PluginOrderInfo> list = new ArrayList<PluginOrderInfo>();
		
		//通过配置文件获取数据库信息
		PropertyReader readerConfig = new PropertyReader();
		readerConfig.init(SysConfig.concat(SysConfig.getPropertyPath(), "config.properties"));
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
			conn = DriverManager.getConnection(url, user, password);
		} catch (SQLException e) 
		{
			System.out.println("数据库链接错误");
			e.printStackTrace();
		}
		try 
		{
			stmt = conn.createStatement();
			
			sql = "	SELECT o.*,m.`userId`,p.`name` AS pluginName,p.`pluginType`,p.`thirdProvideId`,pp.`name` AS pluginPackageName ,th.`name`as thirdName FROM `plugin_order` o "
					+ "LEFT JOIN mobileUser m ON(o.`userId` = m.`mobileId`)"
					+ "LEFT JOIN plugin p ON (o.`productId` = p.`id`)"
					+ "LEFT JOIN pluginPackage pp ON(o.`productId` = pp.`id`)  LEFT JOIN  thirdprovide th ON(th.`id`=p.`thirdProvideId`)where 1 = 1 AND o.`status`=1";

			if (null != startTime && !"".equals(startTime)) {
				sql += " and orderTime >=" +"'"+ startTime+"'";
			}
			if (null != endTime && !"".equals(endTime)) {
				sql += " and orderTime <=" +"'"+ endTime+"'";
			}
			if (null != thirdProvidId && thirdProvidId != -1) {
				sql += " and p.`thirdProvideId` =" + thirdProvidId;
			}
			sql += " order by o.`orderId` desc";
			System.out.println(sql);

			rs = stmt.executeQuery(sql);// 执行sql语句
			while (rs.next()) 
			{
				PluginOrderInfo p = new PluginOrderInfo();
				p.setOrderId(rs.getInt("orderId"));
				p.setThirdName(rs.getString("thirdName"));
				p.setOrderNo(rs.getString("orderNo"));
				p.setUserId(rs.getString("userId"));
				p.setPluginType(rs.getString("pluginType"));
				p.setPluginName(rs.getString("pluginName"));
				p.setPayTime(rs.getString("payTime").substring(0, 19));
				p.setProductType(rs.getString("productType"));
				p.setPrice(rs.getBigDecimal("price"));
				p.setPluginPackageName(rs.getString("pluginPackageName"));
				p.setThirdProvideId(rs.getInt("thirdProvideId"));
				
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

		creatExcel(response, list);
		
		log.debug("service xxxx start");
	}

	/**
	 * 创建excel文件
	 * @param response 服务区响应数据流
	 * @param list 数据集
	 */ 
	private void creatExcel(HttpServletResponse response,
			List<PluginOrderInfo> list) 
	{
		
		if (list != null && list.size() > 0) 
		{

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
				DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
				Date date= new Date();
				String time=dateFormat.format(date);
				
				response.setHeader("Content-disposition",
						"attachment; filename="
								+ time + new String("pluginOrder".getBytes("GB2312"),
										"UTF-8") + ".xls");
			} catch (UnsupportedEncodingException e2) {
				e2.printStackTrace();
			}// 设定输出文件头
			response.setContentType("application/msexcel");// 定义输出类型
			// 创建EXCEL文档
			WritableWorkbook workbook = null;			
			try 
			{
				workbook = Workbook.createWorkbook(os);
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				// flag = false;
				e1.printStackTrace();
			}
			if (workbook != null) 
			{
				
				// 创建一个SHEET
				WritableSheet sheet = workbook.createSheet("sheet1", 0);

				// 设置标题 sheet.addCell(new jxl.write.Label(列(从0开始), 行(从0开始),
				// 内容.));
				try {
					// 4 创建单元格的内容
					// new Label(0, 0, "订单号")
					// 先简单创建一个字符串类型的cell，其他的在详细解
					// 把创建好的单元格内容添加到WritableSheet中。
					// ws.addCell(labelStr1);
					sheet.addCell(new Label(0, 0, "编号"));
					sheet.addCell(new Label(1, 0, "提供方"));
					sheet.addCell(new Label(2, 0, "插件类型"));
					sheet.addCell(new Label(3, 0, "插件名"));
					sheet.addCell(new Label(4, 0, "购买时间"));
					sheet.addCell(new Label(5, 0, "是否是按包购买"));
					sheet.addCell(new Label(6, 0, "购买用户"));
					sheet.addCell(new Label(7, 0, "购买价格"));
					// 设置每行的高度
					sheet.setColumnView(0, 30);
					sheet.setColumnView(1, 30);
					sheet.setColumnView(2, 30);
					sheet.setColumnView(3, 30);
					sheet.setColumnView(4, 30);
					sheet.setColumnView(5, 30);
					sheet.setColumnView(6, 30);
					sheet.setColumnView(7, 30);

					for (int r = 0; r < list.size(); r++) 
					{
						PluginOrderInfo log = list.get(r);
						// 序号
						if (null != log.getOrderNo()) 
						{
							sheet.addCell(new Label(0, r + 1, log.getOrderNo()
									.toString()));
						}
						//提供方
						if (null != log.getThirdName()) 
						{
							sheet.addCell(new Label(1, r + 1, log.getThirdName()
									.toString()));
						}

						// 插件类型
						if (log.getPluginType() != null) 
						{
							if ("0".equals(log.getPluginType()))
							{
								sheet.addCell(new Label(2, r + 1, "阅读式"));
							} else if ("1".equals(log.getPluginType()))
							{
								sheet.addCell(new Label(2, r + 1, "关卡式"));
							}else{
								sheet.addCell(new Label(2, r + 1, "其他"));
								
							}
						}

						// 插件名
						if (log.getProductType().equals("0")) 
						{
							sheet.addCell(new Label(3, r + 1, log.getPluginPackageName()));
						} else 
						{
							sheet.addCell(new Label(3, r + 1, log.getPluginName()));
						}
						// 购买时间

						if (null != log.getPayTime()) {
							sheet.addCell(new Label(4, r + 1, log.getPayTime()));
						}
						// 是否是按包购买
						if (log.getProductType().toString().equals("0")) 
						{
							sheet.addCell(new Label(5, r + 1, "是"));
						} else {

							sheet.addCell(new Label(5, r + 1, "否"));
						}

						if (null != log.getUserId()) 
						{
							sheet.addCell(new Label(6, r + 1, log.getUserId()
									.toString()));
						}

						// 购买价格
						sheet.addCell(new Label(7, r + 1, log.getPrice().toString()));
					}

					//计算总价格
					BigDecimal totalPrice = BigDecimal.ZERO;
					for (PluginOrderInfo pluginOrderIn : list) 
					{
						totalPrice = totalPrice.add(pluginOrderIn.getPrice());
					}
					sheet.addCell(new Label(7, list.size() + 1, "总计：￥"+ totalPrice));

					// 从内存中写入文件中
					workbook.write();
					// 关闭资源，释放内存

				} catch (Exception e) 
				{
					e.printStackTrace();
				} finally 
				{
					try 
					{
						workbook.close();
					} catch (WriteException e) 
					{
						e.printStackTrace();
					} catch (IOException e) 
					{
						e.printStackTrace();
					}
				}
			}

			// 导出Excel end
		}
	}

	/**
	 * 查询全部第三方名称
	 */
	@Override
	public List<ThirdProvide> findAllThrirdProvideList() {
		List<ThirdProvide> list = null;
		try {
			list = mapper.findAllThrirdProvideList();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

}
