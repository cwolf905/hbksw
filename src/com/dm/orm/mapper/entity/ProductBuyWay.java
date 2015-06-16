package com.dm.orm.mapper.entity;

/**
 * 插件或插件包的购买方式
 * @author M.simple
 *
 */
public class ProductBuyWay 
{
	
	private int id;
	
	/**
	 * 插件与插件包Id
	 */
	private int productId;
	
	/**
	 * 购买方式描述
	 */
	private String buyWay;
	
	/**
	 * 价格定义
	 */
	private float price;
	
	/**
	 * 产品类型 0 插件包 1 插件
	 */
	private int productType;
	
	/**
	 * 购买产品时间（按月）0：按次购买，-1：永久性购买
	 */
	private int buyMonth;
	/**
	 * 苹果内置ID
	 * @return
	 */
	private String appleId;

	public String getAppleId() {
		return appleId;
	}

	public void setAppleId(String appleId) {
		this.appleId = appleId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public String getBuyWay() {
		return buyWay;
	}

	public void setBuyWay(String buyWay) {
		this.buyWay = buyWay;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getProductType() {
		return productType;
	}

	public void setProductType(int productType) {
		this.productType = productType;
	}

	public int getBuyMonth() {
		return buyMonth;
	}

	public void setBuyMonth(int buyMonth) {
		this.buyMonth = buyMonth;
	}
}
