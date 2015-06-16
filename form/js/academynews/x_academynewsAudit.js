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

function initAcademyNewsContentAuditList() {
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
		doAcademyNewsContentAuditList(1);
	});
	doAcademyNewsContentAuditList(1);
}

function doAcademyNewsbackAll() {
	$("#txtTitle").val("");
	doAcademyNewsContentAuditList(1);
}

function doAcademyNewsContentAuditList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").remove();
	
	var examType = $.cookie("examType");
	var title = $.trim($("#txtTitle").val());
	
	var news = {};
	news.title = title;
	news.t = examType;
	news.contentAudit = 0;
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
				atr += "<td align=\"center\">" + data[i].title + "&nbsp;</td>";
				atr += "<td align=\"center\">" + "<a onclick='hrefContent(this);return false;'>查看内容</a>" + "&nbsp;</td>";
				atr += "<td align=\"center\">" + getContentActionTd(data[i].nid,data[i].cid)+ "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doAcademyNewsContentAuditList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function getContentActionTd(nid,cid)
{
	var rok = false;
	var atd = "";
	rok = haveRight("academyNewsContent.audit");
	atd += "<a href=\"#\""
			+ (rok ? " onclick=\"hrefContentAudit(this);return false;\">" : ">")
			+ "<img src=\"../../css/former/images/review" + (rok ? "" : "2")
			+ ".png\" title=\"" + (rok ? "审核" : "不可审核")
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	return atd;
}

function getPushActionTd(nid,cid)
{
	var rok = false;
	var atd = "";
	rok = haveRight("academyNewsPush.audit");
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
		var id = $.trim($(tr).find("td").eq(0).text());
		var newsBack = {};
		newsBack.newsId = id;
		var contentAudit = $("#auditStatus").val();
		newsBack.contentAudit = contentAudit;
		AcademyNewsDS.academynewsContentAudit(newsBack, function(data){
			
			if(data)
			{
				alert("资讯内容审核" + (contentAudit == 1 ? "通过" : "不通过") + "!");
				alert("资讯内容审核成功！");
				$("#divAudit").dialog("close");
				doAcademyNewsContentAuditList(1);
			}
		});
	});
	
	$("#btnContentAuditCancle").unbind("click").bind("click", function(){
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
		var newsBack = {};
		newsBack.newsId = id;
		var pushTitleAudit = $("#auditStatus").val();
		newsBack.pushTitleAudit = pushTitleAudit;
		AcademyNewsDS.academynewsPushTitleAudit(newsBack, function(data){
			
			if(data)
			{
				if(pushTitleAudit == 0)
				{
					alert("资讯推送标题审核成功");
					$("#divAudit").dialog("close");
					return false;
				}else if(pushTitleAudit == 1)
				{
					alert("资讯推送标题审核成功，马上进行推送！");
					$("#divAudit").dialog("close");
					var tr = obj.parentNode.parentNode;
					var iid = $.trim($(tr).find("td").eq(0).text());
					var pushTitle = $.trim($(tr).find("td.w-title").text());
					var cid = $.trim($(tr).find("td:last").find("label").text());
					var news = {};
					news.pushTitle = pushTitle;
					news.nid = iid;
					DWREngine.setAsync(false);
					var tagName = '';
					AcademyNewsDS.findCollegeByNewId(iid, function(data){
						if(data)
						{
							for(var i=0; i<data.length; i++)
							{
								tagName += "collegeId_" + data[i].cid + ",";
							}
						}
					});
					tagName = tagName.substring(0, tagName.length-1);
//					info.tagName = getParentCid(cid);
					news.tagName = tagName;
					
//					news.title = title;
//					news.alert = pushTitle;
//					news.kaoshi_type = getExamtype(cid);
//					news.msg_type = "9"; //1资讯2专题3分数4录取5招生答疑6院校答疑7事件8倒计时
//					news.msg_id = iid;
					var jsonstr = JSON.stringify(news);
					$.ajax({
						type: "post",
						url: "../../service/news/auraroPush",
						data: jsonstr,
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function(data, textStatus){
							if (data) {
								if (data.result == 0) {
									alert("资讯(" + pushTitle + ")推送成功!");
									doAcademynewsPushAuditList(1);
									//$(tr).find("td.w-push").html(getPushTd(1));
								} else 
									errHandle(data.result, data.content);
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


function initAcademynewsPushAuditList() {
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
		doAcademynewsPushAuditList(1);
	});
	doAcademynewsPushAuditList(1);
}

function doInformationPushAuditAll() {
	$("#txtTitle").val('');
	doAcademynewsPushAuditList(1);
}

function doAcademynewsPushAuditList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").remove();
	
	var examType = $.cookie("examType");
	var title = $.trim($("#txtTitle").val());
	//var t = $("#selT").val();
	
	var news = {};
	news.title = title;
	news.t = examType;
	news.pushTitleAudit = 0;
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
				var pushtitle;
				if(data[i].pushTitle==null)
				{
					pushtitle="";
				}
				else
				{
					pushtitle=data[i].pushTitle
				}
				var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "")
						+ ">";
				atr += "<td align=\"center\">" + data[i].nid + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].title + "&nbsp;</td>";
				atr += "<td align=\"center\" class='w-title'>" + pushtitle + "&nbsp;</td>";
				atr += "<td align=\"center\">" + getPushActionTd(data[i].nid,data[i].cid)+ "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doAcademynewsPushAuditList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function hrefContent(obj)
{
	
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	$("#divTip").dialog("open");
	AcademyNewsDS.findNewsBackByNewsId(id, function(data){
		$("#divTip").empty();
		if(data)
		{
			$("#divTip").html(data.content);
		}
	});
}

