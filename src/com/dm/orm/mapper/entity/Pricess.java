package com.dm.orm.mapper.entity;


/**
 * 对应数据库表是t_prices
 * @author Administrator
 *
 */
public class Pricess {
	private int id;
	private float price;//价格
    private String description;//描述
    private String appleId ;//苹果内置ID
    //set get
	
	
	public float getPrice() {
		return price;
	}
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
	public void setPrice(float price) {
		this.price = price;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
}
