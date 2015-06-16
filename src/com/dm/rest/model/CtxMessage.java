package com.dm.rest.model;

public class CtxMessage {

	private String title = ""; // 通知标题
	private String description = "点击查看详细信息";
	private CtxAndroid custom_content = new CtxAndroid();
	private CtxIOS aps = new CtxIOS();
	private String kaoshi_type = "101"; // 默认高考
	private String msg_type = "1"; // 默认资讯推送
	private String msg_id = ""; // 默认空

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public CtxAndroid getCustom_content() {
		return custom_content;
	}

	public void setCustom_content(CtxAndroid custom_content) {
		this.custom_content = custom_content;
	}

	public CtxIOS getAps() {
		return aps;
	}

	public void setAps(CtxIOS aps) {
		this.aps = aps;
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
