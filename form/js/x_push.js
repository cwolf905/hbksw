
//1资讯2专题3分数4录取5招生答疑6院校答疑7事件8倒计时
var dictPushtype = {"3":"分数推送", "4":"录取状态推送"};
var dictClock = {"6":"6点", "7":"7点", "8":"8点", "9":"9点", "10":"10点", "11":"11点", "12":"12点", 
			"13":"13点", "14":"14点", "15":"15点", "16":"16点", "17":"17点", "18":"18点", 
			"19":"19点", "20":"20点", "21":"21点", "22":"22点"};

function initPushList() {
	sysSelectAll = true;
	createSelObj($("#selPushtype"), "0");
	sysSelectAll = false;
	$("#searchconds button").click(function() {
		doPushList(1);
	});
	doPushList(1);
}

function doPushAll() {
	$("#selPushtype").val("0");
	doPushList(1);
}

function doPushList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	
	var pushtype = $("#selPushtype").val();
	var push = {};
	push.pushtype = pushtype;
	push.pagestart = (page - 1) * sysPageSize;
	push.pagesize = sysPageSize;
	PushTemplateDS.countPushTemplates(push, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		PushTemplateDS.findPushTemplatesByPage(push, function(data) {
			if (!data) 
				return;
			for (var i=0; i<data.length; i++) {
				var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
				atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-pushtype\">" + dictPushtype[data[i].pushtype] + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-examtype\">" + dictExamtype[data[i].examtype] + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-clock\">" + dictClock[data[i].clock] + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].message + "&nbsp;</td>";
				atr += "<td align=\"center\" nowrap>" + getActionTd() + "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doPushList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function getActionTd() {
	var rok = false;
	var atd = "";
	rok = haveRight("push.update");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefUpdate(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/edit" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "修改" : "不可修改") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("push.delete");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefDelete(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/del" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "删除" : "不可删除") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	return atd;
}

function hrefUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("pushupdate", "修改定时推送信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["pushupdate"], "?id=" + id);
}

function hrefDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var pushtype = $.trim($(tr).find("td.w-pushtype").text());
	var clock = $.trim($(tr).find("td.w-clock").text());
	if (confirm("是否确认删除该定时推送(" + clock + "点" + pushtype + ")?")) {
		PushTemplateDS.deletePushTemplate(id, function(data){
			if (data) {
				alert("删除定时推送(" + clock + "点" + pushtype + ")成功!");
				doPushList(1);
			}
		});
	}
}

function hrefAdd() {
	if (!haveRight("push.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("pushadd", "新增定时推送");
	if (idx == -1)
		return;
	parent.frames["pushadd"].doPushBeforeAdd();
}

function hrefManage() {
	if (!haveRight("push.manage")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("pushmanage", "实时推送");
	if (idx == -1)
		return;
	parent.frames["pushmanage"].doPushBeforeManage();
}

function hrefPushSample() {
	if (!haveRight("pushsample.list")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("pushsamplelist", "推送模板管理");
	if (idx == -1)
		return;
	parent.frames["pushsamplelist"].doPushSampleList();
}

var pushForm = new autoForm("#frmPush");

function initPushAdd() {
	$("#divSample").dialog({
		autoOpen: false,
		height: 300,
		width: 750,
		modal: true,
		buttons: {}
	});	
	
	$("#divTip").dialog({
		autoOpen: false,
		height: 200,
		width: 550,
		modal: true,
		buttons: {}
	});
	
	$("#btnSample").click(function(){
		$("#divSample").dialog("open");
		doPushSampleList(1);
	});
	$("#btnSubmit").click(function(){
		doPushAdd();
	});
	doPushBeforeAdd();
}

/**
 * 处理弹出窗口的返回
 * @param {Object} sample
 */
function hrefChoose(sample) {
	$("#taMessage").val(sample);
	$("#divSample").dialog("close");
}

function doPushBeforeAdd() {
	var push = {};
	push.pushtype = "3"; // 默认是分数推送
	push.examtype = "101";
	push.clock = "8";
	push.message = "";
	pushForm.init(push);
	$("#selExamtype").find("option[value=101]").siblings().remove(); //暂时只做高考
}

function doPushAdd() {
	if (!pushForm.valid()) {
		return false;
	}
	var push = pushForm.toBean();
	PushTemplateDS.addPushTemplate(push, function(data) {
		if (data) {
			alert("新增定时推送成功!");
			parent.removeTab("pushadd");
		}
	});
}

function initPushUpdate() {		
	$("#btnSubmit").click(function(){
		doPushUpdate();
	});
	var id = getArgFromHref("id");
	doPushBeforeUpdate(id);
}

function doPushBeforeUpdate(id) {
	PushTemplateDS.getPushTemplate(id, function(data){
		if (data) {
			pushForm.init(data);
			$("#selExamtype").find("option[value=101]").siblings().remove(); //暂时只做高考
		}
	});
}

function doPushUpdate() {
	if (!pushForm.valid()) {
		return;
	}
	var push = pushForm.toBean();
	var id = getArgFromHref("id");
	push.id = id;
	PushTemplateDS.updatePushTemplate(push, function(data) {
		if (data) {
			alert("修改定时推送信息成功!");
			parent.removeTab("pushupdate");
		}
	});
}

function initPushManage() {
	$("#divSample").dialog({
		autoOpen: false,
		height: 300,
		width: 750,
		modal: true,
		buttons: {}
	});	
	$("#btnSample").click(function(){
		$("#divSample").dialog("open");
		doPushSampleList(1);
	});
	$("#btnSubmit").click(function(){
		doPushManage();
	});
	var push = {};
	push.pushtype = "3"; // 默认分数推送
	push.examtype = "101";
	push.message = "";
	pushForm.init(push);
	$("#selExamtype").find("option[value=101]").siblings().remove(); //暂时只做高考
}

function doPushManage() {
	if (!pushForm.valid()) {
		return;
	}
	var push = pushForm.toBean();
	PushTemplateDS.applyPushTemplateNow(push.pushtype, push.examtype, push.message, function(data) {
		if (data) {
			alert("推送成功!");
			$("#taMessage").val("");
		}
	});
}