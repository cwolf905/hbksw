
var dictStatus = {"1":"启用", "2":"停用"}; // sel

function initCalendarTimerList() {
	$("#selExamtype").val($.cookie("examType"));
	$("#pluginId").val($.cookie("pluginId"));
//	sysSelectAll = true;
//	createSelObj($("#selExamtype"), "0");
//	sysSelectAll = false;
	$("#searchconds button").click(function() {
		doCalendarTimerList(1);
	});
	doCalendarTimerList(1);
}

function doCalendarTimerAll() {
	$("#txtName").val("");
	$("#selExamtype").val("0");
	doCalendarTimerList(1);
}

function doCalendarTimerList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	
	var name = $("#txtName").val();
//	var examtype = $("#selExamtype").val();
	var examtype = $.cookie("examType");
//	var examtype = $.cookie("examType");
	var calendartimer = {};
	calendartimer.name = name;
	calendartimer.examtype = examtype;
	calendartimer.pagestart = (page - 1) * sysPageSize;
	calendartimer.pagesize = sysPageSize;
	CalendarTimerDS.countCalendarTimers(calendartimer, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		CalendarTimerDS.findCalendarTimersByPage(calendartimer, function(data) {
			if (!data) 
				return;
			for (var i=0; i<data.length; i++) {
				var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
				atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\">" + dictExamtype[data[i].examtype] + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-name\">" + data[i].name + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].description + "&nbsp;</td>";
				atr += "<td align=\"center\">" + getTime("dt8f", data[i].timing) + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-status\">" + getStatusTd(data[i].status) + "&nbsp;</td>";
				atr += "<td align=\"center\" nowrap>" + getActionTd(data[i].status) + "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doCalendarTimerList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function getStatusTd(status) {
	var atd = "";
	atd += (status == 0 ? "<span style=\"color:red;\">" : "")
		+ dictStatus[status] 
		+ (status == 0 ? "</span>" : "");
	atd += "<label style=\"display:none\">" + status + "</label>";
	return atd;
}

function getActionTd(status) {
	var rok = false;
	var atd = "";
	rok = haveRight("calendartimer.update");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefUpdate(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/edit" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "修改" : "不可修改") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("calendartimer.check");
	var opposite = (status == "1") ? "2" : "1";
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefStatus(this);return false;\">" : ">")
		+ "<img src=\"../../css/former/images/" 
		+ (opposite == 1 ? "freeze" : "freeze3") + (rok ? "" : "2") + ".gif\" "
		+ "alt=\"" + (rok ? "" : "不可") + dictStatus[opposite] 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("calendartimer.delete");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefDelete(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/del" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "删除" : "不可删除") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	return atd;
}

function hrefUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("calendartimerupdate", "修改倒计时信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["calendartimerupdate"], "?id=" + id);
}

function hrefStatus(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var status = $.trim($(tr).find("td.w-status").find("label").text());
	var opposite = (status == "1") ? "2" : "1";
	var calendartimer = {};
	calendartimer.id = id;
	calendartimer.status = opposite;
	CalendarTimerDS.applyCalendarTimerStatus(calendartimer, function(data) {
		if (data) {
			alert(dictStatus[opposite] + "成功!");
			$(tr).find("td.w-status").html(getStatusTd(opposite));
			$(tr).find("td:last").find("img").eq(1)
				.attr("src", "../../css/former/images/" 
					+ (status == "1" ? "freeze.gif" : "freeze3.gif"))
				.attr("alt", dictStatus[status]);
		}
	});
}

function hrefDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var name = $.trim($(tr).find("td.w-name").text());
	if (confirm("是否确认删除该倒计时(" + name + ")?")) {
		CalendarTimerDS.deleteCalendarTimer(id, function(data){
			if (data) {
				alert("删除倒计时(" + name + ")成功!");
				doCalendarTimerList(1);
			}
		});
	}
}

function hrefAdd() {
	if (!haveRight("calendartimer.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var examType = $("#selExamtype").val();
	var pluginId = $("#pluginId").val();
	var idx = parent.addTab("calendartimeradd", "新增倒计时", "?examType="+examType+"&pluginId="+pluginId);
	if (idx == -1)
		return;
	parent.frames["calendartimeradd"].doCalendarTimerBeforeAdd();
}

var calendarTimerForm = new autoForm("#frmCalendarTimer");

function initCalendarTimerAdd() {	
	$("#txtTiming").datepicker({
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
	$("#txtTiming").attr("readonly", true);
	
	$("#btnSubmit").click(function(){
		doCalendarTimerAdd();
	});
	doCalendarTimerBeforeAdd();
}

function doCalendarTimerBeforeAdd() {
	var calendartimer = {};
	calendartimer.examtype = "101";
	calendartimer.name = "";
	calendartimer.description = "";
	calendartimer.timing = "";
	calendarTimerForm.init(calendartimer);
}

function doCalendarTimerAdd() {
	if (!calendarTimerForm.valid()) {
		return false;
	}
	var calendartimer = calendarTimerForm.toBean();
	var dt = calendartimer.timing;
	calendartimer.timing = new Date(dt);
	calendartimer.status = 1; // 默认启用
	var examType = getArgFromHref("examType");
	if('undefined' == typeof(examType))
	{
		examType = $.cookie("examType");
	}
	calendartimer.examtype = examType;
	var pluginId = getArgFromHref("pluginId");
	if('undefined' == typeof(pluginId))
	{
		pluginId = $.cookie("pluginId");
	}
	calendartimer.pluginId = pluginId;
	CalendarTimerDS.addCalendarTimer(calendartimer, function(data) {
		if (data) {
			alert("新增倒计时成功!");
			parent.removeTab("calendartimeradd");
		}
	});
}

function initCalendarTimerUpdate() {	
	$("#txtTiming").datepicker({
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
	$("#txtTiming").attr("readonly", true);
	
	$("#btnSubmit").click(function(){
		doCalendarTimerUpdate();
	});
	var id = getArgFromHref("id");
	doCalendarTimerBeforeUpdate(id);
}

function doCalendarTimerBeforeUpdate(id) {
	CalendarTimerDS.getCalendarTimer(id, function(data){
		if (data) {
			data.timing = getTime("dt8f", data.timing);
			calendarTimerForm.init(data);
		}
	});
}

function doCalendarTimerUpdate() {
	if (!calendarTimerForm.valid()) {
		return;
	}
	var calendartimer = calendarTimerForm.toBean();
	var dt = calendartimer.timing;
	calendartimer.timing = new Date(dt);
	CalendarTimerDS.updateCalendarTimer(calendartimer, function(data) {
		if (data) {
			alert("修改倒计时信息成功!");
			parent.removeTab("calendartimerupdate");
		}
	});
}