
function initPushSampleList() {
	doPushSampleList(1);
}

function doPushSampleList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	//modify by wanglei  for 页面异常
	if(!page){
		page = 1;
	}
	var push = {};
	push.pagestart = (page - 1) * sysPageSize;
	push.pagesize = sysPageSize;
	PushSampleDS.countPushSamples(push, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		PushSampleDS.findPushSamplesByPage(push, function(data) {
			if (!data) 
				return;
			for (var i=0; i<data.length; i++) {
				var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
				atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-name\">" + data[i].name + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].sample + "&nbsp;</td>";
				atr += "<td align=\"center\">" + getTime("dt14f", data[i].createtime) + "&nbsp;</td>";
				atr += "<td align=\"center\" nowrap>" + getActionTd() + "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doPushSampleList(?)", count, page);
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
	var idx = parent.addTab("pushsampleupdate", "修改推送模板信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["pushsampleupdate"], "?id=" + id);
}

function hrefDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var name = $.trim($(tr).find("td.w-name").text());
	if (confirm("是否确认删除该推送模板(" + name + ")?")) {
		PushSampleDS.deletePushSample(id, function(data){
			if (data) {
				alert("删除推送模板(" + name + ")成功!");
				doPushSampleList(1);
			}
		});
	}
}

function hrefAdd() {
	if (!haveRight("pushsample.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("pushsampleadd", "新增推送模板");
	if (idx == -1)
		return;
	parent.frames["pushsampleadd"].doPushSampleBeforeAdd();
}

var pushForm = new autoForm("#frmPushSample");

function initPushSampleAdd() {	
	$("#btnSubmit").click(function(){
		doPushSampleAdd();
	});
	doPushSampleBeforeAdd();
}

function doPushSampleBeforeAdd() {
	var push = {};
	push.name = "";
	push.sample = "";
	pushForm.init(push);
}

function doPushSampleAdd() {
	if (!pushForm.valid()) {
		return false;
	}
	var push = pushForm.toBean();
	PushSampleDS.addPushSample(push, function(data) {
		if (data) {
			alert("新增推送模板成功!");
			parent.removeTab("pushsampleadd");
		}
	});
}

function initPushSampleUpdate() {		
	$("#btnSubmit").click(function(){
		doPushSampleUpdate();
	});
	var id = getArgFromHref("id");
	doPushSampleBeforeUpdate(id);
}

function doPushSampleBeforeUpdate(id) {
	PushSampleDS.getPushSample(id, function(data){
		if (data) {
			pushForm.init(data);
		}
	});
}

function doPushSampleUpdate() {
	if (!pushForm.valid()) {
		return;
	}
	var push = pushForm.toBean();
	PushSampleDS.updatePushSample(push, function(data) {
		if (data) {
			alert("修改推送模板信息成功!");
			parent.removeTab("pushsampleupdate");
		}
	});
}