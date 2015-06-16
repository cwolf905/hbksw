
var dictIsBind = {"1":"未绑定手机用户", "2":"已绑定手机用户"}; // +sel

function initWebUserList() {
	$("#searchconds button").click(function() {
		doWebUserList(1);
	});
	sysSelectAll = true;
	createSelObj($("#selIsBind"), "0");
	sysSelectAll = false;
	doWebUserList(1);
}

function doWebUserAll() {
	$("#txtUserName").val("");
	$("#selIsBind").val("0");
	doWebUserList(1);
}

function doWebUserList(page) {
	//alert("@");
	$("#showlists").empty();
	$("#showpages").find("tr").remove();
	
	var userName = $.trim($("#txtUserName").val());
	var isBind = $("#selIsBind").val();
	isBind = (isBind == "0") ? "" : (parseInt(isBind) - 1);
	$.ajax({
		type: "get",
		url: "../../service/webUser/count?userName=" + encodeURIComponent(userName)
				+ "&phoneBind=" + isBind,
		dataType: "text",
		success: function(data, textStatus){
			if (!data || data == "0") {
				buildListsBlankHTML();
				return;
			}
			// alert(data);
			var count = parseInt(data);
			$.ajax({
				type: "get",
				url: "../../service/webUser/list?userName=" + encodeURIComponent(userName) 
					+ "&phoneBind=" + isBind 
					+ "&curPage=" + page + "&pageSize=" + sysPageSize,
				dataType: "json",
				success: function(data, textStatus){
					if (!data) {
						errHandle(-1); return;
					}
					// alert(data.length);
					for (var i = 0; i < data.length; i++) {
						var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "") + ">";
						atr += "<td align=\"center\">" + data[i].userId + "&nbsp;</td>";
						atr += "<td align=\"center\">" + data[i].userName + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].email,"") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].regTime,"") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].loginTime1,"") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].loginIp1,"") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].loginTime2,"") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].loginIp2,"") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].expiryDate,"") + "&nbsp;</td>";
						atr += "</tr>";
						$("#showlists").append(atr);
					}
					buildListsStyle();
					buildPagesHTML("$doWebUserList(?)", count, page);
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

function initMobileUserList() {	
	$("#searchconds button").click(function() {
		doMobileUserList(1);
	});
	doMobileUserList(1);
}

function doMobileUserAll() {
	$("#txtMobileNo").val("");
	doMobileUserList(1);
}

function doMobileUserList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").remove();
	
	var mobileNo = $.trim($("#txtMobileNo").val());
	$.ajax({
		type: "get",
		url: "../../service/mobileUser/count?mobileNo=" + encodeURIComponent(mobileNo),
		dataType: "text",
		success: function(data, textStatus){
			if (!data || data == "0") {
				buildListsBlankHTML();
				return;
			}
			var count = parseInt(data);
			$.ajax({
				type: "get",
				url: "../../service/mobileUser/list?mobileNo=" + encodeURIComponent(mobileNo) 
					+ "&curPage=" + page + "&pageSize=" + sysPageSize,
				dataType: "json",
				success: function(data, textStatus){
					if (!data) {
						errHandle(-1); return;
					}
					for (var i = 0; i < data.length; i++) {
						var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "") + ">";
						atr += "<td align=\"center\">" + data[i].mobileId + "&nbsp;</td>";
						atr += "<td align=\"center\">" + data[i].mobileNo + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].phoneModel, "") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + data[i].registerDate + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].lastLogin, "") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].userId, "") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].imei, "") + "&nbsp;</td>";
						atr += "<td align=\"center\">" + nvl(data[i].mid, "") + "&nbsp;</td>";
						atr += "</tr>";
						$("#showlists").append(atr);
					}
					buildListsStyle();
					buildPagesHTML("$doMobileUserList(?)", count, page);
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

function initFeedBackList() {
	$("#divTip").dialog({
		autoOpen: false,
		height: 300,
		width: 550,
		modal: true,
		buttons: {}
	});
	
	$("#divShowTip").dialog({
		autoOpen: false,
		height: 300,
		width: 550,
		modal: true,
		buttons: {}
	});
	
	$("#searchconds button").click(function() {
		doFeedBackList(1);
	});
	doFeedBackList(1);
}

function doFeedBackAll()
{
	$("#txtMobileNo").val("");
	$("#txtPluginName").val("")
	doFeedBackList(1);
}

function doFeedBackList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").remove();
	var mobileNo = $.trim($("#txtMobileNo").val());
	var pluginName = $.trim($("#txtPluginName").val());
	
	$.ajax({
		type: "get",
		url: "../../service/feedBack/count?mobileNo=" + encodeURIComponent(mobileNo)+
		"&pluginName=" + encodeURIComponent(pluginName),
		dataType: "text",
		contentType: "application/x-www-form-urlencoded; charset=utf-8", 
		success: function(data, textStatus){
			if (!data || data == "0") {
				buildListsBlankHTML();
				return;
			}
			var count = parseInt(data);
			$.ajax({
				type: "get",
				url: "../../service/feedBack/list?mobileNo=" + encodeURIComponent(mobileNo)+
				"&pluginName=" + encodeURIComponent(pluginName) + "&curPage=" + page + "&pageSize=" + sysPageSize,
				dataType: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8", 
				success: function(data, textStatus){
					if (!data) {
						errHandle(-1); return;
					}
					for (var i = 0; i < data.length; i++) {
						var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "") + ">";
						atr += "<td align=\"center\"><a href=\"###\" onclick=\"hrefInfo('" 
							+ data[i].id + "');return false;\">" 
							+ data[i].id + "&nbsp;</td>";
						atr += "<td align=\"center\">" + data[i].userId + "&nbsp;</td>";
						atr += "<td align=\"center\">" + data[i].pluginName + "&nbsp;</td>";
						atr += "<td align=\"center\">" + omit(data[i].content, "") + "</td>";
						atr += "<td align=\"center\">" + data[i].createtime + "&nbsp;</td>";
						atr += "</tr>";
						$("#showlists").append(atr);
					}
					buildListsStyle();
					buildPagesHTML("$doFeedBackList(?)", count, page);
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

function hrefInfo(id) {
	var idx = parent.addTab("feedbackinfo", "反馈意见", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["feedbackinfo"], "?id=" + id);
}

var feedBackForm = new autoForm("#frmFeedBack");

function initFeedBackInfo() {
	var id = getArgFromHref("id");
	doFeedBackInfo(id);
}

function doFeedBackInfo(id) {
	$.ajax({
		type: "get",
		url: "../../service/feedBack/" + id,
		dataType: "json",
		success: function(data, textStatus){
			if (data) {
				feedBackForm.init(data);
				feedBackForm.readonly();
			} else 
				errHandle(-1);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			errHandle(0, XMLHttpRequest.status);
		}
	});
}