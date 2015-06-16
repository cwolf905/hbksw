
//1资讯2专题3分数4录取5招生答疑6院校答疑7事件8倒计时
var dictPushtype = {"3":"分数推送", "4":"录取状态推送", "7":"系统事件推送", "8":"倒计时提醒"};

function initPushErrorList() {
	$("#divTip").dialog({
		autoOpen: false,
		height: 300,
		width: 550,
		modal: true,
		buttons: {}
	});
	
	sysSelectAll = true;
	createSelObj($("#selPushtype"), "0");
	sysSelectAll = false;
	$("#searchconds button").click(function() {
		doPushErrorList(1);
	});
	doPushErrorList(1);
}

function doPushErrorAll() {
	$("#selPushtype").val("0");
	doPushErrorList(1);
}

function doPushErrorList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	
	var pushtype = $("#selPushtype").val();
	var push = {};
	push.pushtype = pushtype;
	push.pagestart = (page - 1) * sysPageSize;
	push.pagesize = sysPageSize;
	PushErrorDS.countPushErrors(push, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		PushErrorDS.findPushErrorsByPage(push, function(data) {
			if (!data) 
				return;
			for (var i=0; i<data.length; i++) {
				var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
				atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-pushtype\">" + dictPushtype[data[i].pushtype] + "&nbsp;</td>";
				atr += "<td align=\"center\">" + omit(data[i].context, "") + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].addtime + "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("doPushErrorList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function hrefPush() {
	$.blockUI({
    	message: '<image src="../../css/former/images/wait.gif"></image>',
        css: {border: 'none', width:"20px", top:"40%", left:"45%"}
    });
	var pushtype = $("#selPushtype").val();
	PushErrorDS.deletePushErrorBatch(pushtype, function(data){
		if (data) {
			doPushErrorList(1);
		}
		setTimeout($.unblockUI, 100);
	});
}
