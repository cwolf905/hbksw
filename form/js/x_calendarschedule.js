
function initCalendarScheduleList() {
//	sysSelectAll = true;
//	createSelObj($("#selExamtype"), "0");
//	sysSelectAll = false;
	$("#selExamtype").val($.cookie("examType"));
	$("#pluginId").val($.cookie("pluginId"));
	$("#searchconds button").click(function() {
		doCalendarScheduleList(1);
	});
	doCalendarScheduleList(1);
}

function doCalendarScheduleAll() {
	$("#txtName").val("");
	$("#selExamtype").val("0");
	doCalendarScheduleList(1);
}

function doCalendarScheduleList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	
	var name = $("#txtName").val();
//	var examtype = $("#selExamtype").val();
	var examtype = $.cookie("examType");
	var calendarschedule = {};
	calendarschedule.name = name;
	calendarschedule.examtype = examtype;
	calendarschedule.pagestart = (page - 1) * sysPageSize;
	calendarschedule.pagesize = sysPageSize;
	CalendarScheduleDS.countCalendarSchedules(calendarschedule, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		CalendarScheduleDS.findCalendarSchedulesByPage(calendarschedule, function(data) {
			if (!data) 
				return;
			for (var i=0; i<data.length; i++) {
				var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
				atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\">" + dictExamtype[data[i].examtype] + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-name\">" + data[i].name + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].content + "&nbsp;</td>";
				atr += "<td align=\"center\">" + getTime("dt8f", data[i].timing) + "&nbsp;</td>";
				atr += "<td align=\"center\" nowrap>" + getActionTd() + "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doCalendarScheduleList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function getActionTd(status) {
	var rok = false;
	var atd = "";
	rok = haveRight("calendarschedule.update");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefUpdate(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/edit" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "修改" : "不可修改") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("calendarschedule.delete");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefDelete(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/del" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "删除" : "不可删除") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	return atd;
}

function hrefUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("calendarscheduleupdate", "修改考试安排信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["calendarscheduleupdate"], "?id=" + id);
}

function hrefDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var name = $.trim($(tr).find("td.w-name").text());
	if (confirm("是否确认删除该考试安排(" + name + ")?")) {
		CalendarScheduleDS.deleteCalendarSchedule(id, function(data){
			if (data) {
				alert("删除考试安排(" + name + ")成功!");
				doCalendarScheduleList(1);
			}
		});
	}
}

function hrefAdd() {
	if (!haveRight("calendarschedule.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var examType = $("#selExamtype").val();
	var pluginId = $("#pluginId").val();
	var idx = parent.addTab("calendarscheduleadd", "新增考试安排", "?examType="+examType+"&pluginId="+pluginId);
	if (idx == -1)
		return;
	parent.frames["calendarscheduleadd"].doCalendarScheduleBeforeAdd();
}

var calendarScheduleForm = new autoForm("#frmCalendarSchedule");

function initCalendarScheduleAdd() {	
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
		doCalendarScheduleAdd();
	});
	doCalendarScheduleBeforeAdd();
}

function doCalendarScheduleBeforeAdd() {
	var calendarschedule = {};
	calendarschedule.examtype = "101";
	calendarschedule.name = "";
	calendarschedule.description = "";
	calendarschedule.timing = "";
	calendarScheduleForm.init(calendarschedule);
}

function doCalendarScheduleAdd() {
	if (!calendarScheduleForm.valid()) {
		return false;
	}
	var calendarschedule = calendarScheduleForm.toBean();
	var dt = calendarschedule.timing;
	calendarschedule.timing = new Date(dt);
	var examType = getArgFromHref("examType");
	if('undefined' == typeof(examType))
	{
		examType = $.cookie("examType");
	}
	calendarschedule.examtype = examType;
	var pluginId = getArgFromHref("pluginId");
	if('undefined' == typeof(pluginId))
	{
		pluginId = $.cookie("pluginId");
	}
	calendarschedule.pluginId = pluginId;
	CalendarScheduleDS.addCalendarSchedule(calendarschedule, function(data) {
		if (data) {
			alert("新增考试安排成功!");
			parent.removeTab("calendarscheduleadd");
		}
	});
}

function initCalendarScheduleUpdate() {	
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
		doCalendarScheduleUpdate();
	});
	var id = getArgFromHref("id");
	doCalendarScheduleBeforeUpdate(id);
}

function doCalendarScheduleBeforeUpdate(id) {
	CalendarScheduleDS.getCalendarSchedule(id, function(data){
		if (data) {
			data.timing = getTime("dt8f", data.timing);
			calendarScheduleForm.init(data);
		}
	});
}

function doCalendarScheduleUpdate() {
	if (!calendarScheduleForm.valid()) {
		return;
	}
	var calendarschedule = calendarScheduleForm.toBean();
	var dt = calendarschedule.timing;
	calendarschedule.timing = new Date(dt);
	CalendarScheduleDS.updateCalendarSchedule(calendarschedule, function(data) {
		if (data) {
			alert("修改考试安排信息成功!");
			parent.removeTab("calendarscheduleupdate");
		}
	});
}