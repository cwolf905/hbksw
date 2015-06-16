
var dict101 = {"A":"普通高考", "A12":"关注高考", "A13":"关注招生", "A19":"专业介绍", "A20":"填报志愿", "A272":"高考政策",
			"B":"艺术特长生", "B257":"艺特动态", "B258":"艺特指南",
			"C":"体育特长生", "C260":"体招动态",
			"D":"艺术高考", "D246":"艺考快讯", "D247":"艺考政策", "D248":"艺考指南", "D249":"艺考备考",
			"E":"高水平运动员", "E260":"体招动态", "E261":"体招指南", "E263":"体招政策",
			"F":"军校国防", "F265":"国防招生", "F266":"军校招生", "F269":"报考指南", "F270":"政策解读", "F271":"常见问题",
			"G":"招飞", "G233":"招飞动态", "G234":"招考政策", "G235":"报名条件", "G236":"招飞指南", "G237":"招飞简章", "G238":"常见问题"};
var dict102 = {"A38":"信息快递", "A39":"招录政策", "A44":"考务考籍"};
var dict103 = {"A50":"新闻动态", "A51":"招录政策", "A53":"报考指南"};
var dict104 = {"A":"全日制硕士", "A58":"考研快讯", "B":"在职硕士", "B65":"政策动态"};
var dict105 = {"A":"四六级资讯插件", "A69":"四六级资讯",
			"B":"计算机等级考试资讯插件", "B283":"计算机等级考试",
			"C":"英语口语等级考试资讯插件", "C284":"英语口语等级考试",
			"D":"教师资格考试资讯插件", "D282":"教师资格考试资讯"};
var dictCommend = {"0":"否", "1":"是"};
var dictPush = {"0":"否", "1":"是"};

function initAcademynewsList() {
	$("#divTip").dialog({
		autoOpen: false,
		height: 300,
		width: 550,
		modal: true,
		buttons: {}
	});
	
	$("#divPush").dialog({
		autoOpen: false,
		height: 200,
		width: 470,
		modal: true,
		//position:[300,5],
		buttons: {}
	});
	
	sysSelectAll = true;
	sysSelectAll = false;
	$("#searchconds button").click(function() {
		doacademynewsList(1);
	});
	doacademynewsList(1);
}

function doInformationAll() {
	$("#txtTitle").val("");
	$("#selT").val("0");
	doacademynewsList(1);
}

function doacademynewsList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").remove();
	
	var title = $.trim($("#txtTitle").val());
	//
//	var t = $("#selT").val();//考试类型
	
	
	var name = $("#txtName").val();
	var examType = $.cookie("examType");
	var news = {};
	news.title = title;
	news.t = examType;
	news.pagestart = (page - 1) * sysPageSize;
	news.pagesize = sysPageSize;
	AcademyNewsDS.countacademynews(news, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		AcademyNewsDS.findacademynewsByPage(news, function(data) {
			if (!data)
				return;
			for ( var i = 0; i < data.length; i++) {
				var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "")
						+ ">";
				atr += "<td align=\"center\">" + data[i].nid + "&nbsp;</td>";
				atr += "<td align=\"center\" class='w-title'>" + data[i].title + "&nbsp;</td>";
//				atr += "<td align=\"center\">" +  "&nbsp;</td>";
				if(null != data[i].contentAudit)
				{
					atr += "<td align=\"center\">是&nbsp;</td>";
				}else
				{
					atr += "<td align=\"center\">否&nbsp;</td>";
				}
				atr += "<td align=\"center\" nowrap>" + getActionTd(data[i])+ "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doacademynewsList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function getSidName(sid) {
	if (sid == 0) return "";
	for(var key in dict101) {
		if (key.substr(1) == sid) return dict101[key];
	}
	for(var key in dict102) {
		if (key.substr(1) == sid) return dict102[key];
	}
	for(var key in dict103) {
		if (key.substr(1) == sid) return dict103[key];
	}
	for(var key in dict104) {
		if (key.substr(1) == sid) return dict104[key];
	}
	for(var key in dict105) {
		if (key.substr(1) == sid) return dict105[key];
	}
}

function getCommendTd(commend) {
	var atd = "";
	atd += (commend == 0 ? "" : "<span style=\"color:red;\">")
		+ dictCommend[commend] 
		+ (commend == 0 ? "" : "</span>");
	atd += "<label style=\"display:none\">" + commend + "</label>";
	return atd;
}

function getPushTd(push) {
	var atd = "";
	atd += (push == 0 ? "" : "<span style=\"color:red;\">")
		+ dictPush[push] 
		+ (push == 0 ? "" : "</span>");
	atd += "<label style=\"display:none\">" + push + "</label>";
	return atd;
}

function getActionTd(data) {
	var rok = false;
	var atd = "";
	var pushFlag = false;
	var needTop = true;
	
	rok = haveRight("information.update");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefUpdate(this,"+data.cId+");return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/edit" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "编辑" : "不可编辑")
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
/*	rok = haveRight("information.check");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefCommend(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/" 
		+ (commend == 0 ? "check" : "del") 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "" : "不可") 
		+ (commend == 0 ? "设置焦点" : "取消焦点")
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";*/
	rok = haveRight("information.check");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefPush(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/push" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "推送" : "不可推送")
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	rok = haveRight("information.up");
	if(data.topStatus == 1)
	{
		atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefCancleTop(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/down.gif\" title=\"" + (rok ? "" : "不可") 
		+ "取消置顶"
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	}else
	{
		atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefSetTop(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/up.gif\" title=\"" + (rok ? "" : "不可") 
		+ "置顶"
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	}
	
	return atd;
}

function hrefUpdate(obj,cid)
{
	var tr = obj.parentNode.parentNode;
	var iid = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("academynewsUpdate", "修改资讯信息", "?id=" + iid+"&cid="+cid);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["academynewsUpdate"], "?id=" + iid+"&cid="+cid);
}

function hrefCommend(obj) {
	var tr = obj.parentNode.parentNode;
	var iid = $.trim($(tr).find("td").eq(0).text());
	var commend = 1- parseInt($.trim($(tr).find("td.w-commend").find("label").text()));
	$.ajax({
		type: "get",
		url: "../../service/information/commend?iid=" + iid + "&commend=" + commend,
		dataType: "json",
		success: function(data, textStatus){
			if (data) {
				if (data.result == 0) {
					alert((commend == 0 ? "取消" : "设置") + "焦点成功!");
					$(tr).find("td.w-commend").html(getCommendTd(commend));
					$(tr).find("td:last").find("img").eq(0)
						.attr("src", "../../css/former/images/" 
							+ (commend == 0 ? "check.gif" : "del.gif"))
						.attr("title", (commend == 0 ? "设置" : "取消") + "焦点");
					if (commend == 1)
						hrefPush(obj);
				} else 
					errHandle(data.result, data.content);
			} else 
				errHandle(-1);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			errHandle(0, XMLHttpRequest.status);
		}
	});
}

function hrefSetTop(obj)
{
	
	var tr = obj.parentNode.parentNode;
	var iid = $.trim($(tr).find("td").eq(0).text());
	var title = $.trim($(tr).find("td.w-title").text());
	var newsBack = {};
	newsBack.newsId = iid;
	newsBack.title = title;
	newsBack.topStatus = 1;
	AcademyNewsDS.topAcademynewsBackAsnId(newsBack, function(data){
		if(data)
		{
			alert("设置置顶成功！");
//			$("#divPush").dialog("close");
			doacademynewsList(1);
		}
	});
}

function hrefCancleTop(obj)
{
	
	var tr = obj.parentNode.parentNode;
	var iid = $.trim($(tr).find("td").eq(0).text());
	var newsBack = {};
	newsBack.newsId = iid;
	newsBack.topStatus = 0;
	AcademyNewsDS.topAcademynewsBackAsnId(newsBack, function(data){
		if(data)
		{
			alert("取消置顶成功！");
//			$("#divPush").dialog("close");
			doacademynewsList(1);
		}
	});
}

function hrefPush(obj) {
	var tr = obj.parentNode.parentNode;
	var newsId = $.trim($(tr).find("td").eq(0).text());
	var title = $.trim($(tr).find("td.w-title").text());
	var cid = $.trim($(tr).find("td:last").find("label").text());
	var info = {};
	info.tagName = getParentCid(cid);
	info.title = title;
	info.alert = title;
	info.kaoshi_type = getExamtype(cid);
	info.msg_type = "1"; //1资讯2专题3分数4录取5招生答疑6院校答疑7事件8倒计时
	info.msg_id = newsId;
	var jsonstr = JSON.stringify(info);
	
	
	$("#divPush").dialog("open");
	$("#ui-id-2").text("推送");
	//$("#divPush").find(".tb-head").html("添加步骤");
	$("#btnOK").unbind("click").bind("click", function() {
		
		var newsBack = {};
		newsBack.newsId = newsId;
		newsBack.title = title;
		//获取修改的推送标题
		newsBack.pushTitle = $("#pushTitle").val();
		//默认修改后的推送标题审核不通过
		newsBack.pushTitleAudit = 0;
		AcademyNewsDS.updatePushTitleAsNewsId(newsBack, function(data){
			if(data)
			{
				alert("此推送已提交审核！");
				$("#divPush").dialog("close");
				doacademynewsList(1);
//				parent.frames["academynewsPushAuditList"].doAcademynewsPushAuditList(1);
			}
		});
	});
	$("#btnCancle").unbind("click").bind("click", function() {
		$("#divPush").dialog("close");
	});
	$("#pushTitle").val(title)
//	if (confirm("是否确认推送资讯(" + title + ")?")) {
//		$.ajax({
//			type: "post",
//			url: "../../service/information/tagpush",
//			data: jsonstr,
//			contentType: "application/json; charset=utf-8",
//			dataType: "json",
//			success: function(data, textStatus){
//				if (data) {
//					if (data.result == 0) {
//						alert("资讯(" + title + ")推送成功!");
//						//$(tr).find("td.w-push").html(getPushTd(1));
//					} else 
//						errHandle(data.result, data.content);
//				} else 
//					errHandle(-1);
//			},
//			error: function(XMLHttpRequest, textStatus, errorThrown){
//				errHandle(0, XMLHttpRequest.status);
//			}
//		});
//	}
}

/**
 * 得到高考类型
 * @param {Object} sid
 */
function getExamtype(cid) {
	for(var key in dict101) {
		if (key.substr(1) == cid) return "101";
	}
	for(var key in dict102) {
		if (key.substr(1) == cid) return "102";
	}
	for(var key in dict103) {
		if (key.substr(1) == cid) return "103";
	}
	for(var key in dict104) {
		if (key.substr(1) == cid) return "104";
	}
}

/**
 * 只取每种考试类型中的组
 * @param {Object} cid
 */
function getParentCid(cid) {
	if (cid == "0") return "0";
	// 高考1-7
	for(var key in dict101) {
		if (key.substr(1) == cid) {
			return key.charCodeAt(0) - "A".charCodeAt(0) + 1;	
		}
	}
	// 成考8-10
	var idx = 8;
	for(var key in dict102) {
		if (key.substr(1) == cid)
			return idx;
		idx++;
	}
	// 自考11-13
	for(var key in dict103) {
		if (key.substr(1) == cid)
			return idx;
		idx++;
	}
	// 考研14-15
	for(var key in dict104) {
		if (key.substr(1) == cid) {
			return idx + key.charCodeAt(0) - "A".charCodeAt(0) + 1;
		}
	}
}





function initAcademynewsUpdate()
{
	
	var editor;
	KindEditor.ready(function(K) {
		editor = K.create('textarea[name="content"]', {
			allowFileManager : true
		});
		var id = getArgFromHref("id");
		doAcademynewsBeforeUpdate(id, editor);
	});
	
	$("button[name=btnSubmit]").click(function(){
		var cid = getArgFromHref("cid");
		doAcademynewsUpdate(editor,cid);
	});
//	doAcademynewsBeforeUpdate(id);
}

function doAcademynewsUpdate(editor,cid)
{
	editor.sync();
	var newsId = getArgFromHref("id");
	var title = $("#txtTitle").val();
	var content = $("#content").val();
	var newsBack = {};
	newsBack.newsId = newsId;
	newsBack.title = title;
	newsBack.content = content;
	newsBack.contentAudit = 0;
	AcademyNewsDS.addAcademynewsBack(newsBack, function(data){
		if (data) {
			alert("修改资讯信息成功!");
			doacademynewsList(1);
			parent.removeTab("academynewsUpdate");
//			parent.frames["academynewsContentAuditList"].doAcademyNewsContentAuditList(1);
		}
	});
}

function doAcademynewsBeforeUpdate(id, editor)
{
	
	AcademyNewsDS.findAcademynewsById(id, function(data){
		
		if(!data)
			return;
		$("#txtTitle").val(data.title);
		$("#content").val(data.content);
		editor.html(data.content);
	});
}

