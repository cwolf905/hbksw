
function initQRCodeList() {	
	$("#searchconds button").click(function() {
		doQRCodeList(1);
	});
	doQRCodeList(1);
}

function doQRCodeAll() {
	$("#txtSchoolName").val("");
	doQRCodeList(1);
}

function doQRCodeList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	
	var schoolName = $.trim($("#txtSchoolName").val());
	$.ajax({
		type: "get",
		url: "../../service/qrcode/count?schoolName=" + encodeURIComponent(schoolName),
		dataType: "text",
		success: function(data, textStatus){
			if (!data || data == "0") {
				buildListsBlankHTML();
				return;
			}
			var count = parseInt(data);
			$.ajax({
				type: "get",
				url: "../../service/qrcode/list?schoolName=" + encodeURIComponent(schoolName)
					+ "&curPage=" + page + "&pageSize=" + sysPageSize,
				dataType: "json",
				success: function(data, textStatus){
					if (!data) {
						errHandle(-1); return;
					}
					//alert(JSON.stringify(data));
					for (var i = 0; i < data.length; i++) {
						var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "") + ">";
						atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
						atr += "<td align=\"center\">" + data[i].schoolName + "&nbsp;</td>";
						atr += "<td align=\"center\">" + data[i].schoolUrl + "&nbsp;</td>";
						atr += "<td align=\"center\" nowrap>" + getActionTd() + "&nbsp;</td>";
						atr += "</tr>";
						$("#showlists").append(atr);
					}
					buildListsStyle();
					buildPagesHTML("$doQRCodeList(?)", count, page);
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
	atd += "<a href=\"###\" onclick=\"hrefInfo(this);return false;\">"
		+ "<img src=\"../../css/former/images/ewm.png\" "
		+ "title=\"二维码\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("qrcode.delete");
	atd += "<a href=\"#\" onclick=\"hrefDelete(this);return false;\">"
		+ "<img src=\"../../css/former/images/del" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "删除" : "不可删除") 
		+ "\" width=\"16\" height=\"16\"/></a>";
	return atd;
}

function hrefInfo(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("qrcodeinfo", "查看二维码", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["qrcodeinfo"], "?id=" + id);
}

function hrefDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	if (confirm("是否确认删除该二维码(" + id + ")?")) {
		$.ajax({
			type: "get",
			url: "../../service/qrcode/" + id + "/delete",
			dataType: "json",
			success: function(data, textStatus){
				if (data) {
					if (data.result == 0) {
						alert("删除二维码(" + id + ")成功!");
						doQRCodeList(1);
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
	if (!haveRight("qrcode.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("qrcodeadd", "创建二维码");
	if (idx == -1)
		return;
	parent.frames["qrcodeadd"].doQRCodeBeforeAdd();
}

var qrcodeForm = new autoForm("#frmQRCode");

function initQRCodeInfo() {
	$("#divCollege").dialog({
		autoOpen: false,
		height: 400,
		width: 750,
		modal: true,
		buttons: {}
	});
	$("#searchconds button").click(function() {
		doCollegeList(1);
	});
	createSelObj($("#selT"), "101");
	
	$("#btnBrowse").click(function() {
		$("#divCollege").dialog("open");
		$("#txtSchoolName").val($("#txtCname").val());
		doCollegeList(1);
	});
	$("#btnSubmit").click(function(){
		doQRCodeUpdate();
	});	
	var id = getArgFromHref("id");
	doQRCodeInfo(id);
}

function doQRCodeInfo(id) {
	$.ajax({
		type: "get",
		url: "../../service/qrcode/" + id,
		dataType: "json",
		success: function(data, textStatus){
			if (data) {
				qrcodeForm.init(data);
				//qrcodeForm.readonly();
				$("#imgPath").attr("src", data.imgPath);
			} else 
				errHandle(-1);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			errHandle(0, XMLHttpRequest.status);
		}
	});
}

function initQRCodeAdd() {
	$("#divCollege").dialog({
		autoOpen: false,
		height: 400,
		width: 750,
		modal: true,
		buttons: {}
	});
	$("#searchconds button").click(function() {
		doCollegeList(1);
	});
	createSelObj($("#selT"), "101");
	
	$("#btnBrowse").click(function() {
		$("#divCollege").dialog("open");
		$("#txtSchoolName").val($("#txtCname").val());
		doCollegeList(1);
	});
	$("#btnSubmit").click(function(){
		doQRCodeAdd();
	});	
	doQRCodeBeforeAdd();
}

function doQRCodeBeforeAdd() {
	var qrcode = {};
	qrcode.cname = "";
	qrcode.id = "";
	qrcode.schoolUrl = "";
	qrcodeForm.init(qrcode);
	qrcodeForm.readonly("#txtCid");
}

function doQRCodeAdd() {
	if (!qrcodeForm.valid()) {
		return false;
	}
	var qrcode = qrcodeForm.toBean();
	qrcode.schoolName = qrcode.cname; // 保存备用
	qrcode.cname = undefined;
	var jsonstr = JSON.stringify(qrcode);
	//alert("ADD:"+jsonstr);
	$.ajax({
		type: "post",
		url: "../../service/qrcode/new",
		data: jsonstr,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data, textStatus){
			if (data) {
				//alert(JSON.stringify(data));
				if (data.reslut == 0) {
					alert("创建二维码成功!");
					$("#imgPath").attr("src", data.content.imgPath);
					$("#trImgPath").show();
				} else 
					errHandle(data.reslut, data.content);
			} else 
				errHandle(-1); 
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			errHandle(0, XMLHttpRequest.status);
		}
	});
}

function doQRCodeUpdate() {
	if (!qrcodeForm.valid()) {
		return false;
	}
	var qrcode = qrcodeForm.toBean();
	//qrcode.schoolName = qrcode.cname; // 保存备用
	var id = getArgFromHref("id");
	qrcode.id = id;
	qrcode.cname = undefined;
	var jsonstr = JSON.stringify(qrcode);
	//alert(jsonstr);
	$.ajax({
		type: "post",
		url: "../../service/qrcode/update",
		data: jsonstr,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data, textStatus){
			if (data) {
				//alert(JSON.stringify(data));
				if (data.reslut == 0) {
					alert("创建二维码成功!");
					$("#imgPath").attr("src", data.content.imgPath);
					$("#trImgPath").show();
				} else 
					errHandle(data.reslut, data.content);
			} else 
				errHandle(-1); 
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			errHandle(0, XMLHttpRequest.status);
		}
	});
}

/**
 * 处理弹出窗口的返回
 * @param {Object} cid
 * @param {Object} cname
 */
function hrefChoose(cid, cname) {
	$("#txtCid").val(cid);
	$("#txtCname").val(cname);
	$("#txtSName").val(cname);
	$("#divCollege").dialog("close");
}