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

function initInformationContentAuditList() {
	$("#divTip").dialog({
		autoOpen: false,
		height: 500,
		width: 650,
		modal: true,
		buttons: {}
	});
	
	$("#divAudit").dialog({
		autoOpen: false,
		height: 200,
		width: 470,
		modal: true,
		//position:[300,5],
		buttons: {}
	});
	
	$("#searchconds button").click(function() {
		doInformationContentAuditList(1);
	});
	doInformationContentAuditList(1);
}

function doInformationContentAuditAll() {
	$("#txtTitle").val("");
	doInformationContentAuditList(1);
}

function doInformationContentAuditList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").remove();
	
	var examType = $.cookie("examType");
	var title = $.trim($("#txtTitle").val());
	//var t = $("#selT").val();
	$.ajax({
		type: "get",
		url: "../../service/information/count?cid=&title=" + encodeURIComponent(title) 
			+ (examType=="-1" ? "" : "&t=" + examType) + "&contentAudit=0",
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
					+ (examType=="-1" ? "" : "&t=" + examType) + "&contentAudit=0"
					+ "&curPage=" + page + "&pageSize=" + sysPageSize,
				dataType: "json",
				success: function(data, textStatus){
					if (!data) {
						errHandle(-1); return;
					}
					for (var i = 0; i < data.length; i++) {
						var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "") + ">";
						atr += "<td align=\"center\">" + data[i].iid + "&nbsp;</td>";
//						atr += "<td align=\"center\">" + getSidName(data[i].cid) + "&nbsp;</td>";
						atr += "<td align=\"center\" class=\"w-title\">" + data[i].title + "&nbsp;</td>";
//						atr += "<td align=\"center\" class=\"w-title\">" + data[i].title + "&nbsp;</td>";
//						//atr += "<td align=\"center\">" + nvl(data[i].subTitle, "", true) + "&nbsp;</td>";
//						//atr += "<td align=\"center\">" + omit(data[i].infoRemark, "") + "&nbsp;</td>";
//						atr += "<td align=\"center\">" + nvl(data[i].author, "", true) + "&nbsp;</td>";
//						//atr += "<td align=\"center\">" + nvl(data[i].source, "", true) + "&nbsp;</td>";
//						atr += "<td align=\"center\">" + data[i].addtime + "&nbsp;</td>";
						atr += "<td align=\"center\">" + "<a onclick='hrefContent(this);return false;'>查看内容</a>" + "&nbsp;</td>";
//						//atr += "<td align=\"center\">" + data[i].cid + "&nbsp;</td>";
//						atr += "<td align=\"center\" class=\"w-commend\">" + getCommendTd(nvl(data[i].recommend, 0)) + "&nbsp;</td>";
//						//atr += "<td align=\"center\" class=\"w-push\">" + getPushTd(data[i].push) + "&nbsp;</td>";
						atr += "<td align=\"center\" nowrap>" + getContentActionTd() 
							+ "&nbsp;</td>";
						atr += "</tr>";
						$("#showlists").append(atr);
					}
					buildListsStyle();
					buildPagesHTML("$doInformationContentAuditList(?)", count, page);
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

function getContentActionTd()
{
	var rok = false;
	var atd = "";
	rok = haveRight("informationContent.audit");
	atd += "<a href=\"#\""
			+ (rok ? " onclick=\"hrefContentAudit(this);return false;\">" : ">")
			+ "<img src=\"../../css/former/images/review" + (rok ? "" : "2")
			+ ".png\" title=\"" + (rok ? "审核" : "不可审核")
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	return atd;
}

function getPushActionTd()
{
	var rok = false;
	var atd = "";
	rok = haveRight("informationPush.audit");
	atd += "<a href=\"#\""
			+ (rok ? " onclick=\"hrefPushAudit(this);return false;\">" : ">")
			+ "<img src=\"../../css/former/images/review" + (rok ? "" : "2")
			+ ".png\" title=\"" + (rok ? "审核" : "不可审核")
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	return atd;
}

function hrefContentAudit(obj)
{

	$("#divAudit").dialog("open");
	$("#ui-id-2").text("内容审核");
	$("#btnContentAuditOK").unbind("click").bind("click", function(){
		var tr = obj.parentNode.parentNode;
		var iid = $.trim($(tr).find("td").eq(0).text());
		var informationBack = {};
		informationBack.informationId = iid;
		var contentAudit = $("#auditStatus").val();
		informationBack.contentAudit = contentAudit;
		InformationDS.informationContentAudit(informationBack, function(data){
			
			if(data==1)
			{
				alert("资讯内容审核" + (contentAudit == 1 ? "通过" : "不通过") + "!");
			}else{
				alert("资讯内容审核不通过！");
			}
			doInformationContentAuditList(1);
			$("#divAudit").dialog("close");
		});
	});
	
	$("#btnContentAuditCancle").unbind("click").bind("click",function(){
		$("#divAudit").dialog("close");
	});
	
}

function hrefPushAudit(obj)
{
	
	$("#divAudit").dialog("open");
	$("#ui-id-2").text("推送审核");
	$("#btnPushAuditOK").unbind("click").bind("click", function(){
		var tr = obj.parentNode.parentNode;
		var id = $.trim($(tr).find("td").eq(0).text());
		var informationBack = {};
		informationBack.informationId = id;
		var pushTitleAudit = $("#auditStatus").val();
		informationBack.pushTitleAudit = pushTitleAudit;
		DWREngine.setAsync(false);
		InformationDS.informationPushTitleAudit(informationBack, function(data){
			
			if(data)
			{
				if(pushTitleAudit == 0)
				{
					alert("资讯推送标题审核不通过");
					$("#divAudit").dialog("close");
					return false;
				}
				else (pushTitleAudit == 1)
				{
					alert("资讯推送标题审核成功，马上进行推送！");
					$("#divAudit").dialog("close");
					
					var tr = obj.parentNode.parentNode;
					var iid = $.trim($(tr).find("td").eq(0).text());
					var title = $.trim($(tr).find("td.w-pushTitle").text());
					var cid = $.trim($(tr).find("td:last").find("label").text());
					var info = {};
					var tagName = ''; 
					InformationDS.findInformationTabByInformationId(iid, function(data){
						if(data)
						{
							for(var i=0; i<data.length; i++)
							{
								//modified by wanglei for 咨询推送时候暂停推送功能的用户也会收到推送
								tagName += "infotabId_" + data[i].id + ",";
							}
						}
					});
//				info.tagName = getParentCid(cid);
					tagName = tagName.substring(0, tagName.length-1);
					info.tagName = tagName;
					info.title = title;
					info.alert = title;
					info.kaoshi_type = getExamtype(cid);
					info.msg_type = "1"; //1资讯2专题3分数4录取5招生答疑6院校答疑7事件8倒计时
					info.msg_id = iid;
					var jsonstr = JSON.stringify(info);
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
								doInformationPushAuditList(1);
							} else {
								errHandle(data.result, data.content);
							}
						} else {
							errHandle(-1);
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown){
						errHandle(0, XMLHttpRequest.status);
					}
					});
					DWREngine.setAsync(true);
				}
			}
		});
	});
	
	$("#btnPushAuditCancle").unbind("click").bind("click", function(){
		$("#divAudit").dialog("close");
	});
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


function initInformationPushAuditList() {
	$("#divTip").dialog({
		autoOpen: false,
		height: 500,
		width: 650,
		modal: true,
		buttons: {
			'关闭':function(){
				$("#divTip").dialog("close");
			}
		}
	});
	
	$("#divAudit").dialog({
		autoOpen: false,
		height: 200,
		width: 470,
		modal: true,
		//position:[300,5],
		buttons: {}
	});
	
	$("#searchconds button").click(function() {
		doInformationPushAuditList(1);
	});
	doInformationPushAuditList(1);
}

function doInformationPushAuditAll() {
	$("#txtTitle").val("");
	doInformationPushAuditList(1);
}

function doInformationPushAuditList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").remove();
	
	var examType = $.cookie("examType");
	var title = $.trim($("#txtTitle").val());
	//var t = $("#selT").val();
	$.ajax({
		type: "get",
		url: "../../service/information/count?cid=&title=" + encodeURIComponent(title) 
			+ (examType=="-1" ? "" : "&t=" + examType) + "&pushTitleAudit=0",
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
					+ (examType=="-1" ? "" : "&t=" + examType) + "&pushTitleAudit=0"
					+ "&curPage=" + page + "&pageSize=" + sysPageSize,
				dataType: "json",
				success: function(data, textStatus){
					if (!data) {
						errHandle(-1); return;
					}
					for (var i = 0; i < data.length; i++) {
						var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "") + ">";
						atr += "<td align=\"center\">" + data[i].iid + "&nbsp;</td>";
//						atr += "<td align=\"center\">" + getSidName(data[i].cid) + "&nbsp;</td>";
						atr += "<td align=\"center\" class=\"w-title\">" + data[i].title + "&nbsp;</td>";
						atr += "<td align=\"center\" class=\"w-pushTitle\">" + data[i].back_pushtitle + "&nbsp;</td>";
//						//atr += "<td align=\"center\">" + nvl(data[i].subTitle, "", true) + "&nbsp;</td>";
//						//atr += "<td align=\"center\">" + omit(data[i].infoRemark, "") + "&nbsp;</td>";
//						atr += "<td align=\"center\">" + nvl(data[i].author, "", true) + "&nbsp;</td>";
//						//atr += "<td align=\"center\">" + nvl(data[i].source, "", true) + "&nbsp;</td>";
//						atr += "<td align=\"center\">" + data[i].addtime + "&nbsp;</td>";
//						atr += "<td align=\"center\">" + "<a onclick='hrefContent(this);return false;'>查看内容</a>" + "&nbsp;</td>";
//						//atr += "<td align=\"center\">" + data[i].cid + "&nbsp;</td>";
//						atr += "<td align=\"center\" class=\"w-commend\">" + getCommendTd(nvl(data[i].recommend, 0)) + "&nbsp;</td>";
//						//atr += "<td align=\"center\" class=\"w-push\">" + getPushTd(data[i].push) + "&nbsp;</td>";
						atr += "<td align=\"center\" nowrap>" + getPushActionTd() 
							+ "<label style=\"display:none\">" + data[i].cid + "</label>"
							+ "&nbsp;</td>";
						atr += "</tr>";
						$("#showlists").append(atr);
					}
					buildListsStyle();
					buildPagesHTML("$doInformationPushAuditList(?)", count, page);
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

function hrefContent(obj)
{
	
	var tr = obj.parentNode.parentNode;
	var iid = $.trim($(tr).find("td").eq(0).text());
	$("#divTip").dialog("open");
	InformationDS.findInformationBackByInfomationId(iid, function(data){
		
		$("#divTip").empty();
		if(data)
		{
			$("#divTip").html(data.content);
		}
	});
}

