package com.dm.rest.model;

public class CtxIOS {

	private String alert = ""; // 通知标题
	private String sound = "";
	private String badge = "0";

	public CtxIOS() {
		super();
	}

	public CtxIOS(String alert, String sound, String badge) {
		super();
		this.alert = alert;
		this.sound = sound;
		this.badge = badge;
	}

	public String getAlert() {
		return alert;
	}

	public void setAlert(String alert) {
		this.alert = alert;
	}

	public String getSound() {
		return sound;
	}

	public void setSound(String sound) {
		this.sound = sound;
	}

	public String getBadge() {
		return badge;
	}

	public void setBadge(String badge) {
		this.badge = badge;
	}
}
