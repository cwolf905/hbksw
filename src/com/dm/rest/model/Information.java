package com.dm.rest.model;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Information {

	private String tagName = ""; // 分组ID
	private String userId = ""; // 用户ID
	private String title = ""; // 提醒标题
	private String description = "点击查看详细信息"; // 提醒内容
	private String alert = ""; // 通知内容
	private String kaoshi_type = ""; // 考试类型
	private String msg_type = ""; // 消息类型
	private String msg_id = ""; // 链接内容ID
	/**
	 * 是否为客户端自定义推送
	 */
	private String isCustomPush = "0";

	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

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

	public String getAlert() {
		return alert;
	}

	public void setAlert(String alert) {
		this.alert = alert;
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
	

	public String getIsCustomPush() {
		return isCustomPush;
	}

	public void setIsCustomPush(String isCustomPush) {
		this.isCustomPush = isCustomPush;
	}

	public TagPush toTagPush() {
		TagPush t = new TagPush();
//		t.setTagName(tagName);
		CtxMessage m = new CtxMessage();
		m.setTitle(title);
		m.setDescription(description);
		m.getCustom_content().setKaoshi_type(kaoshi_type);
		m.getCustom_content().setMsg_type(msg_type);
		m.getCustom_content().setMsg_id(msg_id);
		m.getAps().setAlert(alert);
		m.setKaoshi_type(kaoshi_type);
		m.setMsg_type(msg_type);
		m.setMsg_id(msg_id);
//		t.setMessage(m);
		return t;
	}

	public Notification toNotification() {
		Notification t = new Notification();
		t.setUserId(userId);
		CtxMessage m = new CtxMessage();
		m.setTitle(title);
		m.setDescription(description);
		m.getCustom_content().setKaoshi_type(kaoshi_type);
		m.getCustom_content().setMsg_type(msg_type);
		m.getCustom_content().setMsg_id(msg_id);
		m.getAps().setAlert(alert);
		m.setKaoshi_type(kaoshi_type);
		m.setMsg_type(msg_type);
		m.setMsg_id(msg_id);
		t.setMessage(m);
		return t;
	}

	public BroadCastPush toBoardCastPush() {
		BroadCastPush t = new BroadCastPush();
		CtxMessage m = new CtxMessage();
		m.setTitle(title);
		m.setDescription(description);
		m.getCustom_content().setKaoshi_type(kaoshi_type);
		m.getCustom_content().setMsg_type(msg_type);
		m.getCustom_content().setMsg_id(msg_id);
		m.getAps().setAlert(alert);
		m.setKaoshi_type(kaoshi_type);
		m.setMsg_type(msg_type);
		m.setMsg_id(msg_id);
		t.setMessage(m);
		return t;
	}
	
	public PushRequest toAuraroPush()
	{
		
		PushRequest pushRequest = new PushRequest();
		pushRequest.setMsg(this.getTitle());
		pushRequest.setType(this.getMsg_type());
		pushRequest.setInfo_id(this.getMsg_id());
		pushRequest.setSub_id(this.getMsg_id());
		List<String> tag = new ArrayList<String>();
		String infoTab = this.getTagName();
		if(!"".equals(infoTab))
		{
			String[] split = infoTab.split(",");
			for(String tab : split)
			{
				tag.add(tab);
			}
		}
		pushRequest.setTag(tag);
		
		
		return pushRequest;
	}
	/**
	 * 客户端自定义推送推送封装方法
	* @Title: toAuraroPushCustomPush 
	* @Description: TODO(客户端自定义推送推送封装方法) 
	* @param @return    设定文件 
	* @return PushRequest    返回类型 
	* @throws
	 */
	public PushRequest toAuraroPushCustomPush()
	{
		
		PushRequest pushRequest = new PushRequest();
		pushRequest.setMsg(this.getTitle());
		pushRequest.setType(this.getMsg_type());
		pushRequest.setIsCustomPush(this.isCustomPush);
		if("1".equals(this.getMsg_type())){
			pushRequest.setInfo_id(this.getMsg_id());
		}else if("9".equals(this.getMsg_type())){
			pushRequest.setC_id(this.getMsg_id());
		}else if("11".equals(this.getMsg_type())){
			pushRequest.setCollegeId(this.getMsg_id());
			pushRequest.setExamtype(this.getKaoshi_type());
		}
		List<String> tag = new ArrayList<String>();
		String infoTab = this.getTagName();
		if(!"".equals(infoTab))
		{
			String[] split = infoTab.split(",");
			for(String tab : split)
			{
				tag.add(tab);
			}
		}
		pushRequest.setTag(tag);
		
		
		return pushRequest;
	}
}
