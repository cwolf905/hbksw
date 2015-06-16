package com.dm.rest.model;

public class CtxAndroid {

	private String kaoshi_type = "101"; // 默认高考
	private String msg_type = "1"; // 默认资讯推送
	private String msg_id = ""; // 默认空

	public CtxAndroid() {
		super();
	}

	public CtxAndroid(String kaoshi_type, String msg_type, String msg_id) {
		super();
		this.kaoshi_type = kaoshi_type;
		this.msg_type = msg_type;
		this.msg_id = msg_id;
	}

	public String getKaoshi_type() {
		return kaoshi_type;
	}

	public void setKaoshi_type(String kaoshi_type) {
		this.kaoshi_type = kaoshi_type;
	}

	public String getMsg_type() {
		return msg_type;
	}

	public void setMsg_type(String msg_type) {
		this.msg_type = msg_type;
	}

	public String getMsg_id() {
		return msg_id;
	}

	public void setMsg_id(String msg_id) {
		this.msg_id = msg_id;
	}
}