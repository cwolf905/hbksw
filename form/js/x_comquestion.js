
var myId = getCookie("teacherId");
var myCid = getCookie("cid");
var isEn = (getCookie("cid") == 0);
var myRole = getCookie("role");

var dictType = {"1":"计划信息","2":"政策规定","3":"投档线","4":"投档规则","5":"录取规则","6":"录取状态","7":"投诉举报","8":"征集志愿","9":"录取进程","10":"其他问题"}; // +sel
var dictStatus = {"1":"待审核", "2":"审核通过", "3":"未通过审核"}; // +sel

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
	createSelObj($("#selT"), "0");
	sysSelectAll = false;
	doQuestionList(1);
}

function doQuestionAll() {
	$("#txtKeyword").val("");
	$("#selT").val("0");
	doQuestionList(1);
}

function doQuestionList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	
	var keyword = $.trim($("#txtKeyword").val());
	var t = $("#selT").val();
	$.ajax({
		type: "get",
		url: "../../service/comquestion/count?teacherId=" + myId + "&collegeId=" + myCid 
			+ "&title=" + encodeURIComponent(keyword) + "&t=" + t + "&status=1",
		dataType: "text",
		success: function(data, textStatus){
			if (!data || data == "0") {
				buildListsBlankHTML();
				return;
			}
			var count = parseInt(data);
			$.ajax({
				type: "get",
				url: "../../service/comquestion/list?teacherId=" + myId + "&collegeId=" + myCid
					+ "&title=" + encodeURIComponent(keyword) + "&t=" + t + "&status=1"
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
						atr += "<td align=\"center\">" + data[i].title + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(dictT[data[i].t], "") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + omit(data[i].content, "") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].addTime, "") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + omit(data[i].answer, "") + "&nbsp;</td>";
						//atr += "<td align=\"center\">" + nvl(data[i].answerTime, "") + "&nbsp;</td>";
						//atr += "<td align=\"center\">" + omit(data[i].review, "") + "&nbsp;</td>";
						//atr += "<td align=\"center\">" + dictStatus[data[i].status] + "&nbsp;</td>";
						atr += "<td align=\"center\">" + getActionTd() + "&nbsp;</td>";
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

function getActionTd() {
	var rok = false;
	var atd = "";
	rok = haveRight("question.update");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefUpdate(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/edit" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "修改" : "不可修改") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("question.delete");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefDelete(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/del" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "删除" : "不可删除") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	return atd;
}

function hrefInfo(questionId) {
	var title = "查看常见问题信息";
	var idx = parent.addTab("comquestioninfo", title, "?questionId=" + questionId);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["comquestioninfo"], "?questionId=" + questionId);
}

function hrefUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var questionId = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("comquestionupdate", "修改常见问题信息", "?questionId=" + questionId);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["comquestionupdate"], "?questionId=" + questionId);
}

function hrefDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var questionId = $.trim($(tr).find("td").eq(0).text());
	if (confirm("是否确认删除该常见问题(" + questionId + ")?")) {
		$.ajax({
			type: "get",
			url: "../../service/comquestion/" + questionId + "/delete",
			dataType: "json",
			success: function(data, textStatus){
				if (data) {
					if (data.result == 0) {
						alert("删除常见问题(" + questionId + ")成功!");
						doQuestionList(1);
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

function hrefAdd() {
	if (!haveRight("question.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("comquestionadd", "新增常见问题");
	if (idx == -1)
		return;
	parent.frames["comquestionadd"].doQuestionBeforeAdd();
}

var questionForm = new autoForm("#frmQuestion");

/**
 * 扩展自x_form.js
 * @param {Object} obj
 * @param {Object} defval
 */
function createSelTeacher(obj, defval) {
	obj.empty();
	obj.append("<option value=''>---</option>");
	$.ajax({
		type: "get",
		url: "../../service/teacher/list?userName=&cid=" + myCid
			+ "&curPage=1&pageSize=" + sysPageSize,
		dataType: "json",
		success: function(data, textStatus){
			if (!data) {
				errHandle(-1); return;
			}
			//alert(JSON.stringify(data));
			for (var i = 0; i < data.length; i++) {
				obj.append("<option value='" + data[i].teacherId + "'>" + data[i].userName + "</option>");
			}
			if (defval) selHandle(obj, defval);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			errHandle(0, XMLHttpRequest.status);
		}
	});
}

function initQuestionInfo() {
	if (isEn) $("#trType").hide();	
	var questionId = getArgFromHref("questionId");
	doQuestionBeforeInfo(questionId);
}

function doQuestionBeforeInfo(questionId) {
	$.ajax({
		type: "get",
		url: "../../service/comquestion/" + questionId,
		dataType: "json",
		success: function(data, textStatus){
			if (data) {
				data.t = dictT[data.t];
				data.type = dictType[data.type];
				data.addTime = data.addTime.substring(0, 10);
				//data.answerTime = data.answerTime.substring(0, 10);
				//data.reviewTime = data.reviewTime.substring(0, 10);
				questionForm.init(data);
				questionForm.readonly();
				/*
				$.ajax({
					type: "get",
					url: "../../service/teacher/" + data.answererId,
					dataType: "json",
					success: function(data, textStatus){
						if (data) $("#txtAnswererId").val(data.userName);
					}
				});
				$.ajax({
					type: "get",
					url: "../../service/teacher/" + data.reviewerId,
					dataType: "json",
					success: function(data, textStatus){
						if (data) $("#txtReviewerId").val(data.userName);
					}
				});
				*/
			} else 
				errHandle(-1);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			errHandle(0, XMLHttpRequest.status);
		}
	});
}

function initQuestionAdd() {
	$("#txtAddTime").datepicker({
		dateFormat : "yy-mm-dd",
		changeMonth : true,
		changeYear : true,
		showButtonPanel : true,
		showOn : "both",
		buttonImage : "../../jquery/calendar3.gif",
		buttonImageOnly : true,
		beforeShow : function (i, e) {
			var z = jQuery(i).closest(".ui-dialog").css("z-index") + 1;
			e.dpDiv.css("z-index", z);
		}
	}).css("ime-mode", "disabled");
	$("#txtAddTime").attr("readonly", true);
	
	$("#btnSubmit").click(function(){
		doQuestionAdd();
	});
	if (isEn) $("#trType").hide();
	doQuestionBeforeAdd();
}

function doQuestionBeforeAdd() {
	var question = {};
	question.mobileNo = "";
	question.title = "";
	question.type = "1";
	question.t = "101";
	question.addTime = getTime("dt8f");
	question.content = "";
	question.answer = "";
	//question.answererId = "";
	//question.answerTime = getTime("dt8f");
	//question.review = "";
	//question.reviewerId = "";
	//question.reviewTime = getTime("dt8f");
	questionForm.init(question);
}

function doQuestionAdd() {
	if (!questionForm.valid()) {
		return false;
	}
	var question = questionForm.toBean();
	question.collegeId = myCid;
	if (isEn) question.type = 0;
	question.answererId = myId;
	question.answerTime = getTime("dt8f");
	question.status = 1; // 待审核
	question.classic = 1; 
	var jsonstr = JSON.stringify(question);
	//alert(jsonstr);
	$.ajax({
		type: "post",
		url: "../../service/comquestion/new",
		data: jsonstr,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data, textStatus){
			if (data) {
				if (data.result == 0) {
					alert("新增常见问题成功!");
					parent.removeTab('comquestionadd');
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

function initQuestionUpdate() {
	$("#txtAddTime").datepicker({
		dateFormat : "yy-mm-dd",
		changeMonth : true,
		changeYear : true,
		showButtonPanel : true,
		showOn : "both",
		buttonImage : "../../jquery/calendar3.gif",
		buttonImageOnly : true,
		beforeShow : function (i, e) {
			var z = jQuery(i).closest(".ui-dialog").css("z-index") + 1;
			e.dpDiv.css("z-index", z);
		}
	}).css("ime-mode", "disabled");
	$("#txtAddTime").attr("readonly", true);
	
	$("#btnSubmit").click(function(){
		doQuestionUpdate();
	});
	if (isEn) $("#trType").hide();
	var questionId = getArgFromHref("questionId");
	doQuestionBeforeUpdate(questionId);
}

function doQuestionBeforeUpdate(questionId) {
	$.ajax({
		type: "get",
		url: "../../service/comquestion/" + questionId,
		dataType: "json",
		success: function(data, textStatus){
			if (data) {
				data.addTime = data.addTime.substring(0, 10);
				//data.answerTime = data.answerTime.substring(0, 10);
				//data.reviewTime =data.reviewTime.substring(0, 10);
				questionForm.init(data);
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
	question.collegeId = myCid;
	if (isEn) question.type = 0;
	question.answererId = myId;
	question.answerTime = getTime("dt8f");
	question.status = 1; // 待审核
	question.classic = 1; 
	var jsonstr = JSON.stringify(question);
	//alert(jsonstr);
	$.ajax({
		type: "post",
		url: "../../service/comquestion/" + question.questionId,
		data: jsonstr,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data, textStatus){
			if (data) {
				if (data.result == 0) {
					alert("修改常见问题信息成功!");
					parent.removeTab('comquestionupdate');
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