package com.dm.orm.mapper.entity;

import java.math.BigDecimal;

/**
 *  对应数据库表pluginorder
 * @author Administrator
 *
 */
public class PluginOrderInfo {
	//编号id
	private Integer orderId;
	//插件名         对应表plugin  name
	private String pluginName;
	
	private Integer productId;
	/**
	 * 插件类型：0 ：阅读式   1：关卡式    注：插件包没有
	 */
	private String pluginType;
	
	/**
	 * 插件包名称
	 */
	private String pluginPackageName;
	
	/**
	 * 订购时间
	 */
	private String orderTime;
	
	/**
	 * 订购编号
	 */
	private String orderNo;
	
	/**
	 * 购买用户
	 */
	private String mobileNo;
	
	private int thirdProvideId;
	private String thirdName;
	
	public String getThirdName() {
		return thirdName;
	}
	public void setThirdName(String thirdName) {
		this.thirdName = thirdName;
	}
	//购买日期
	public String payTime;
	
	//是否是按包购买 0插件包   1插件
	public String productType;
	
	//购买用户     
	public String userId;
	//购买价格
	public BigDecimal price;
	//前台输入的开始时间
	public String startTime;
	//前台输入的结束时间
	public String endTime;
    //前台提供方
	public String supplierName;
	
	private int pagestart;
	private int pagesize;
	
	public int getPagestart() {
		return pagestart;
	}
	public void setPagestart(int pagestart) {
		this.pagestart = pagestart;
	}
	public int getPagesize() {
		return pagesize;
	}
	public void setPagesize(int pagesize) {
		this.pagesize = pagesize;
	}
	public Integer getProductId() {
		return productId;
	}
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	public int getThirdProvideId() {
		return thirdProvideId;
	}
	public void setThirdProvideId(int thirdProvideId) {
		this.thirdProvideId = thirdProvideId;
	}
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public String getPluginType() {
		return pluginType;
	}
	public void setPluginType(String pluginType) {
		this.pluginType = pluginType;
	}
	public String getPluginPackageName() {
		return pluginPackageName;
	}
	public void setPluginPackageName(String pluginPackageName) {
		this.pluginPackageName = pluginPackageName;
	}
	public String getOrderTime() {
		return orderTime;
	}
	public void setOrderTime(String orderTime) {
		this.orderTime = orderTime;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	//set get 
	public String getSupplierName() {
		return supplierName;
	}
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	
	public String getPluginName() {
		return pluginName;
	}
	public void setPluginName(String pluginName) {
		this.pluginName = pluginName;
	}
	public String getPayTime() {
		return payTime;
	}
	public void setPayTime(String payTime) {
		this.payTime = payTime;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	public Integer getOrderId() {
		return orderId;
	}
	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}
	public String getProductType() {
		return productType;
	}
	public void setProductType(String productType) {
		this.productType = productType;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	

}
