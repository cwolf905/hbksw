
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

function initInformationList() {
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
	
//	sysSelectAll = true;
//	createSelObj($("#selT"), "0");
//	sysSelectAll = false;
	$("#searchconds button").click(function() {
		doInformationList(1);
	});
	doInformationList(1);
}

function doInformationAll() {
	$("#txtTitle").val("");
	$("#selT").val("0");
	doInformationList(1);
}

function doInformationList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").remove();
	
	var examType = $.cookie("examType");
	var title = $.trim($("#txtTitle").val());
	//var t = $("#selT").val();
	$.ajax({
		type: "get",
		url: "../../service/information/count?cid=&title=" + encodeURIComponent(title) 
			+ (examType=="-1" ? "" : "&t=" + examType),
		dataType: "text",
		success: function(data, textStatus){
			if (!data || data == "0") {
				buildListsBlankHTML();
				return;
			}
			//alert(data);
			var count = parseInt(data);
			$.ajax({
				type: "get",
				url: "../../service/information/list?cid=&title=" + encodeURIComponent(title) 
					+ (examType=="-1" ? "" : "&t=" + examType)
					+ "&curPage=" + page + "&pageSize=" + sysPageSize,
				dataType: "json",
				success: function(data, textStatus){
					if (!data) {
						errHandle(-1); return;
					}
					for (var i = 0; i < data.length; i++) {
						var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "") + ">";
						atr += "<td align=\"center\">" + data[i].iid + "&nbsp;</td>";
						atr += "<td align=\"center\">" + getSidName(data[i].cid) + "&nbsp;</td>";
						atr += "<td align=\"center\">" + data[i].cid + "&nbsp;</td>";
						atr += "<td align=\"center\" class=\"w-title\">" + data[i].title + "&nbsp;</td>";
						//atr += "<td align=\"center\">" + nvl(data[i].subTitle, "", true) + "&nbsp;</td>";
						//atr += "<td align=\"center\">" + omit(data[i].infoRemark, "") + "&nbsp;</td>";
//						atr += "<td align=\"center\">" + nvl(data[i].author, "", true) + "&nbsp;</td>";
						//atr += "<td align=\"center\">" + nvl(data[i].source, "", true) + "&nbsp;</td>";
						atr += "<td align=\"center\">" + data[i].addtime + "&nbsp;</td>";
//						atr += "<td align=\"center\">" + omit(data[i].content, "") + "&nbsp;</td>";
						if(null != data[i].back_contentaudit)
						{
							atr += "<td align=\"center\">是&nbsp;</td>";
						}
						else
						{
							atr += "<td align=\"center\">否&nbsp;</td>";
						}
						//atr += "<td align=\"center\">" + data[i].cid + "&nbsp;</td>";
						atr += "<td align=\"center\" style=\"display:none\" class=\"w-commend\">" + getCommendTd(nvl(data[i].recommend, 0)) + "&nbsp;</td>";
						//atr += "<td align=\"center\" class=\"w-push\">" + getPushTd(data[i].push) + "&nbsp;</td>";
						atr += "<td align=\"center\" nowrap>" + getActionTd(nvl(data[i].recommend, 0), data[i].iid, data[i]) 
							+ "<label style=\"display:none\">" + data[i].cid + "</label>"
							+ "&nbsp;</td>";
						atr += "</tr>";
						$("#showlists").append(atr);
					}
					buildListsStyle();
					buildPagesHTML("$doInformationList(?)", count, page);
					buildPagesStyle();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
					errHandle(0, XMLHttpRequest.status);
				}
			});
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			errHandle(0, XMLHttpRequest.status);
		}
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

function getActionTd(commend, infoId, data) {
	var rok = false;
	var atd = "";
//	rok = haveRight("information.update");
	atd += "<a href=\"#\" onclick=\"hrefUpdate(this);return false;\">" 
		+ "<img src=\"../../css/former/images/edit.gif\" title=\"编辑\" width=\"16\" height=\"16\"/></a>&nbsp;";
	
	rok = haveRight("information.check");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefCommend(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/" 
		+ (commend == 0 ? "recommend" : "cancleRecommend") 
		+ (rok ? "" : "2") + ".png\" title=\"" + (rok ? "" : "不可") 
		+ (commend == 0 ? "推荐" : "取消推荐")
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	rok = haveRight("information.check");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefPush(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/push" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "推送" : "不可推送")
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	rok = haveRight("information.up");
	if(data.back_topstatus == 1)
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

function hrefUpdate(obj)
{
	var tr = obj.parentNode.parentNode;
	var iid = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("informationUpdate", "修改资讯信息", "?id=" + iid);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["informationUpdate"], "?id=" + iid);
}

function hrefCommend(obj) {
	var tr = obj.parentNode.parentNode;
	var iid = $.trim($(tr).find("td").eq(0).text());
	var commend = 1- parseInt($.trim($(tr).find("td.w-commend").find("label").text()));
//	DWREngine.setAsync(false);
	$.ajax({
		type: "get",
		url: "../../service/information/commend?iid=" + iid + "&commend=" + commend,
		dataType: "json",
		success: function(data, textStatus){
			if (data) {
				if (data.result == 0) {
					alert((commend == 0 ? "取消" : "") + "推荐成功!");
					$(tr).find("td.w-commend").html(getCommendTd(commend));
					$(tr).find("td:last").find("img").eq(1)
						.attr("src", "../../css/former/images/" 
							+ (commend == 0 ? "recommend.png" : "cancleRecommend.png"))
						.attr("title", (commend == 0 ? "" : "取消") + "推荐");
					if (commend == 1)
					{
						alert("推荐成功，等待推送");
						push(obj);
					}
				} else 
					errHandle(data.result, data.content);
			} else 
				errHa
				ndle(-1);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			errHandle(0, XMLHttpRequest.status);
		}
	});
//	DWREngine.setAsync(true);
}

function hrefSetTop(obj)
{
	
	var tr = obj.parentNode.parentNode;
	var iid = $.trim($(tr).find("td").eq(0).text());
	var title = $.trim($(tr).find("td.w-title").text());
	var informationBack = {};
	informationBack.informationId = iid;
	informationBack.title = title;
	informationBack.topStatus = 1;
	informationBack.topTime = new Date();
	InformationDS.topInformationBackAsInformationId(informationBack, function(data){
		if(data)
		{
			alert("设置置顶成功！");
			$("#divPush").dialog("close");
			doInformationList(1);
		}
	});
}

function hrefCancleTop(obj)
{
	
	var tr = obj.parentNode.parentNode;
	var iid = $.trim($(tr).find("td").eq(0).text());
	var informationBack = {};
	informationBack.informationId = iid;
	informationBack.topStatus = 0;
	informationBack.topTime = new Date();
	InformationDS.topInformationBackAsInformationId(informationBack, function(data){
		if(data)
		{
			alert("取消置顶成功！");
			$("#divPush").dialog("close");
			doInformationList(1);
		}
	});
}

function push(obj) {
	var tr = obj.parentNode.parentNode;
	var iid = $.trim($(tr).find("td").eq(0).text());
	var title = $.trim($(tr).find("td.w-title").text());
	var cid = $.trim($(tr).find("td:last").find("label").text());
	var info = {};
//	info.tagName = getParentCid(cid);
	info.title = title;
	info.alert = title;
	info.kaoshi_type = getExamtype(cid);
	info.msg_type = "1"; //1资讯2专题3分数4录取5招生答疑6院校答疑7事件8倒计时
	info.msg_id = iid;
	var jsonstr = JSON.stringify(info);
	if (confirm("是否确认推送资讯(" + title + ")?")) {
		$.ajax({
			type: "post",
			url: "../../service/information/auraroPush",
			data: jsonstr,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data, textStatus){
				if (data) {
					if (data.result == 0) {
						alert("资讯(" + title + ")推送成功!");
						//$(tr).find("td.w-push").html(getPushTd(1));
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
}

function hrefPush(obj) {
	var tr = obj.parentNode.parentNode;
	var iid = $.trim($(tr).find("td").eq(0).text());
	var title = $.trim($(tr).find("td.w-title").text());
	var cid = $.trim($(tr).find("td:last").find("label").text());
	var info = {};
//	info.tagName = getParentCid(cid);
	info.title = title;
	info.alert = title;
	info.kaoshi_type = getExamtype(cid);
	info.msg_type = "1"; //1资讯2专题3分数4录取5招生答疑6院校答疑7事件8倒计时
	info.msg_id = iid;
	var jsonstr = JSON.stringify(info);
	
	
	$("#divPush").dialog("open");
	$("#ui-id-2").text("推送");
	//$("#divPush").find(".tb-head").html("添加步骤");
	$("#btnOK").unbind("click").bind("click", function() {
		
		var informationBack = {};
		informationBack.informationId = iid;
		informationBack.title = title;
		//获取修改的推送标题
		informationBack.pushTitle = $("#pushTitle").val();
		//默认修改后的推送标题审核不通过
		informationBack.pushTitleAudit = 0;
		InformationDS.updatePushTitleAsInformationId(informationBack, function(data){
			if(data)
			{
				alert("此推送已提交审核！");
				$("#divPush").dialog("close");
//				parent.frames["informationPushAuditlist"].doInformationPushAuditList(1);
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





function initInformationUpdate()
{
	
	var editor;
	KindEditor.ready(function(K) {
		editor = K.create('textarea[name="content"]', {
			allowFileManager : true
		});
		var id = getArgFromHref("id");
		doInformationBeforeUpdate(id, editor);
	});
	
	$("button[name=btnSubmit]").click(function(){
		doInformationUpdate(editor);
	});
//	doInformationBeforeUpdate(id);
}

function doInformationUpdate(editor)
{
	
	editor.sync();
	var informationId = getArgFromHref("id");
	var title = $("#txtTitle").val();
	var content = $("#content").val();
	var informationBack = {};
	informationBack.informationId = informationId;
	informationBack.title = title;
	informationBack.content = content;
	//默认审核不通过
	informationBack.contentAudit = 0;
	InformationDS.addInformationBack(informationBack, function(data){
		if (data) {
			alert("修改资讯信息成功!");
//			doInformationList(1);
			parent.removeTab("informationUpdate");
//			parent.frames["informationContentAuditlist"].doInformationContentAuditList(1);
		}
	});
}

function doInformationBeforeUpdate(id, editor)
{
	
	InformationDS.findInformationById(id, function(data){
		
		if(!data)
			return;
		$("#txtTitle").val(data.title);
		$("#content").val(data.content);
		editor.html(data.content);
	});
}

