
var myId = getCookie("teacherId");
var myCid = getCookie("cid");
var myT = getCookie("t");
var myRole = getCookie("role");
var isCheck = (getCookie("role") == 1); // 审核

var dictStatus = {"1":"待审核", "2":"审核通过", "3":"未通过审核"}; // +sel
var dictClassic = {"0":"否", "1":"是"}; // td
var dictAgree = {"0":"否", "1":"是"}; // td

function initQuestionList() {
	$("#divTip").dialog({
		autoOpen: false,
		height: 200,
		width: 550,
		modal: true,
		buttons: {}
	});
	$("#searchconds button").click(function() {
		doQuestionList(1);
	});
	
	sysSelectAll = true;
	//createSelObj($("#selT"), "0");
	createSelObj($("#selStatus"), "0"); // (isCheck ? 2 : 1)
	sysSelectAll = false;
	if (isCheck) {
		$("#selStatus option[value='1']").remove(); // 删除待审核状态
	}
	doQuestionList(1);
}

function doQuestionAll() {
	$("#txtKeyword").val("");
	//$("#selT").val("0");
	$("#selStatus").val("0"); // (isCheck ? 2 : 1)
	doQuestionList(1);
}

function doQuestionList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").remove();
	
	var keyword = $.trim($("#txtKeyword").val());
	//var t = $("#selT").val();
	var t = myT;
	if (t == "null" || t == "0") t = "";
	var status = $("#selStatus").val();
	if (status == "0") status = "";
	$.ajax({
		type: "get",
		url: "../../service/enquestion/count?teacherId=" + myId + "&role=" + myRole
			+ "&filter=" + encodeURIComponent(keyword) + "&t=" + t + "&status=" + status,
		dataType: "text",
		success: function(data, textStatus){
			if (!data || data == "0") {
				buildListsBlankHTML();
				return;
			}
			var count = parseInt(data);
			$.ajax({
				type: "get",
				url: "../../service/enquestion/list?teacherId=" + myId + "&role=" + myRole 
					+ "&filter=" + encodeURIComponent(keyword) + "&t=" + t + "&status=" + status
					+ "&curPage=" + page + "&pageSize=" + sysPageSize,
				dataType: "json",
				success: function(data, textStatus){
					if (!data) {
						errHandle(-1); return;
					}
					//alert(JSON.stringify(data));
					for (var i=0; i<data.length; i++) {
						var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
						atr += "<td align=\"center\"><a href=\"###\" onclick=\"hrefInfo('" 
							+ data[i].questionId + "');return false;\">" 
							+ data[i].questionId + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].mobileNo, "") + "&nbsp;</td>";
						atr += "<td align=\"left\">" + data[i].title + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(dictT[data[i].t], "") + "&nbsp;</td>";
						atr += "<td align=\"left\">" + omit(data[i].content, "") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].addTime, "") + "&nbsp;</td>";
						atr += "<td align=\"left\">" + omit(data[i].answer, "") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].answerTime, "") + "&nbsp;</td>";
						atr += "<td align=\"left\">" + omit(data[i].review, "") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + dictClassic[data[i].classic] + "&nbsp;</td>";
						atr += "<td align=\"center\">" + dictStatus[data[i].status] + "&nbsp;</td>";
						atr += "</tr>";
						$("#showlists").append(atr);
					}
					buildListsStyle();
					buildPagesHTML("$doQuestionList(?)", count, page);
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

function initQuestionTodo() {
	$("#divTip").dialog({
		autoOpen: false,
		height: 200,
		width: 550,
		modal: true,
		buttons: {}
	});
	$("#searchconds button").click(function() {
		doQuestionTodo(1);
	});
	
	//sysSelectAll = true;
	//createSelObj($("#selT"), "0");
	//sysSelectAll = false;
	doQuestionTodo(1);
}

function doQuestionSet() {
	$("#txtKeyword").val("");
	//$("#selT").val("0");
	doQuestionTodo(1);
}

function doQuestionTodo(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").remove();
	
	var keyword = $.trim($("#txtKeyword").val());
	//var t = $("#selT").val();
	var t = myT;
	if (t == "null" || t == "0") t = "";
	$.ajax({
		type: "get",
		url: "../../service/enquestion/size?cid=" + myCid + "&teacherId=" + myId + "&role=" + myRole
			+ "&filter=" + encodeURIComponent(keyword) + "&t=" + t,
		dataType: "text",
		success: function(data, textStatus){
			if (!data || data == "0") {
				buildListsBlankHTML();
				return;
			}
			var count = parseInt(data);
			$.ajax({
				type: "get",
				url: "../../service/enquestion/todo?cid=" + myCid + "&teacherId=" + myId + "&role=" + myRole
					+ "&filter=" + encodeURIComponent(keyword) + "&t=" + t
					+ "&curPage=" + page + "&pageSize=" + sysPageSize,
				dataType: "json",
				success: function(data, textStatus){
					if (!data) {
						errHandle(-1); return;
					}
					//alert(JSON.stringify(data));
					for (var i=0; i<data.length; i++) {
						var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
						atr += "<td align=\"center\"><a href=\"###\" onclick=\"hrefInfo('" 
							+ data[i].questionId + "');return false;\">" 
							+ data[i].questionId + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].mobileNo, "") + "&nbsp;</td>";
						atr += "<td align=\"left\">" + data[i].title + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(dictT[data[i].t], "") + "&nbsp;</td>";
						atr += "<td align=\"left\">" + omit(data[i].content, "") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].addTime, "") + "&nbsp;</td>";
						atr += "<td align=\"left\">" + omit(data[i].answer, "") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].answerTime, "") + "&nbsp;</td>";
						atr += "<td align=\"left\">" + omit(data[i].review, "") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + dictClassic[data[i].classic] + "&nbsp;</td>";
						atr += "<td align=\"center\" nowrap>" + getActionTd() + "&nbsp;</td>";
						atr += "</tr>";
						$("#showlists").append(atr);
					}
					buildListsStyle();
					buildPagesHTML("$doQuestionTodo(?)", count, page);
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

function getActionTd() {
	var atd = "";
	atd += "<a href=\"###\" onclick=\"hrefUpdate(this);return false;\">" 
		+ "<img src=\"../../css/former/images/" 
		+ (isCheck ? "check" : "answer") + ".gif\" title=\"" + (isCheck ? "审核" : "答疑") 
		+ "\" width=\"16\" height=\"16\"/></a>";
	return atd;
}

function hrefInfo(questionId) {
	var title = "问题" + (isCheck ? "审核" : "解答");
	var idx = parent.addTab("enquestionupdate", title, "?questionId=" + questionId);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["enquestionupdate"], "?questionId=" + questionId);
}

function hrefUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var questionId = $.trim($(tr).find("td").eq(0).text());
	hrefInfo(questionId);
}

var questionForm = new autoForm("#frmQuestion");

function initQuestionUpdate() {
	$("#btnSubmit").click(function(){
		doQuestionUpdate();
	});
	var title = "问题" + (isCheck ? "审核" : "解答");
	$(".tb-head").html(title);
	
	var questionId = getArgFromHref("questionId");
	doQuestionBeforeUpdate(questionId);
}

function doQuestionBeforeUpdate(questionId) {
	$.ajax({
		type: "get",
		url: "../../service/enquestion/" + questionId,
		dataType: "json",
		success: function(data, textStatus){
			if (data) {
				data.agree = 1; // 默认为审核通过
				questionForm.init(data);
				questionForm.readonly();
				if (isCheck) {
					questionForm.writable("#taReview");
				} else {
					questionForm.writable("#taAnswer");
					$("#trAgree").hide();
					if (isInvalid(data.review)) {
						$("#trReview").hide();
					} else {
						questionForm.readonly("#trReview");
					}
				}
			} else 
				errHandle(-1);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			errHandle(0, XMLHttpRequest.status);
		}
	});
}

function doQuestionUpdate() {
	if (!questionForm.valid()) {
		return;
	}
	var question = questionForm.toBean();
	question.addTime = undefined; // 字符串不能映射为日期
	var questionId = question.questionId;
	if (isCheck) {
		question.reviewerId = myId;
		question.status = (question.agree == 0 ? 3 : 2); 
		question.agree = undefined;
	} else {
		question.answererId = myId;
		question.status = 1; // 待审核 
		question.agree = undefined;
	}
	var jsonstr = JSON.stringify(question);
	//alert(jsonstr);
	$.ajax({
		type: "post",
		url: "../../service/enquestion/" + questionId,
		data: jsonstr,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data, textStatus){
			if (data) {
				if (data.result == 0) {
					// 如果问题审核通过，通知用户查看
					if (question.status == 2) {
						var info = {};
						var userId = question.mobileNo;
						info.pushTitle = "您有一条问题被解答!";
						info.newsType = "6"; //1资讯2专题3分数4录取5招生答疑6院校答疑7事件8倒计时
						info.nid = question.questionId;
						DWREngine.setAsync(false);
						var rid = '';
						PushRegistDS.findAuraroPushIdByUserId(userId, function(data){
							if(data)
							{
								rid =  data.registration_id ;
							}
						});
						info.tagName = rid;
						var jsonstr = JSON.stringify(info);
						DWREngine.setAsync(true);
						if(info.tagName !='' && info.tagName){
							$.ajax({
								type: "post",
								url: "../../service/news/auraroPush",
								data: jsonstr,
								contentType: "application/json; charset=utf-8",
								dataType: "json",
								success: function(data, textStatus){
									if (data) {
										if (data.result == 0) {
											alert("答疑推送成功!");
											//doAcademynewsPushAuditList(1);
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
						}
						
					}
					alert("问题" + (isCheck ? "审核" : "解答") + "完毕!");
					parent.removeTab('enquestionupdate');
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