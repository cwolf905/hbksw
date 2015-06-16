package com.dm.orm.mapper.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class PluginFee implements Serializable {

	private static final long serialVersionUID = 5458550010457667680L;
	
	private int id;
	private int pluginid;
	private double androidfee;
	private double iosfee;
	private String chargeremark;
	private Timestamp begintime;
	private Timestamp expirydate;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getPluginid() {
		return pluginid;
	}

	public void setPluginid(int pluginid) {
		this.pluginid = pluginid;
	}

	public double getAndroidfee() {
		return androidfee;
	}

	public void setAndroidfee(double androidfee) {
		this.androidfee = androidfee;
	}

	public double getIosfee() {
		return iosfee;
	}

	public void setIosfee(double iosfee) {
		this.iosfee = iosfee;
	}

	public String getChargeremark() {
		return chargeremark;
	}

	public void setChargeremark(String chargeremark) {
		this.chargeremark = chargeremark;
	}

	public Timestamp getBegintime() {
		return begintime;
	}

	public void setBegintime(Timestamp begintime) {
		this.begintime = begintime;
	}

	public Timestamp getExpirydate() {
		return expirydate;
	}

	public void setExpirydate(Timestamp expirydate) {
		this.expirydate = expirydate;
	}
}
