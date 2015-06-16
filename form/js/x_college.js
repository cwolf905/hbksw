function initCollegeList() {
	$("#searchconds button").click(function() {
		doCollegeList(1);
	});
//	sysSelectAll = true;
//	createSelObj($("#selT"), "0");
//	sysSelectAll = false;
	examType = $.cookie("examType");
	$("#selT").val($.cookie("examType"));
//	alert(examType);
	doCollegeList(1);
}

function doCollegeAll() {
	$("#txtSchoolName").val("");
	$("#selT").val("0");
	doCollegeList(1);
}

function doCollegeList(page) {
	examType = $.cookie("examType");
	$("#selT").val($.cookie("examType"));
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	
	var schoolName = $.trim($("#txtSchoolName").val());
	var t = $("#selT").val();
	//if (t == "0") t = "";
	$.ajax({
		type: "get",
		url: "../../service/college/count?t=" + t + "&schoolName=" + encodeURIComponent(schoolName),
		dataType: "text",
		success: function(data, textStatus){
			if (!data || data == "0") {
				buildListsBlankHTML();
				return;
			}
			var count = parseInt(data);
			$.ajax({
				type: "get",
				url: "../../service/college/list?t=" + t + "&schoolName=" + encodeURIComponent(schoolName) 
					+ "&curPage=" + page + "&pageSize=" + sysPageSize,
				dataType: "json",
				success: function(data, textStatus){
					if (!data) {
						errHandle(-1); return;
					}
					for (var i = 0; i < data.length; i++) {
						var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "") + ">";
						atr += "<td align=\"center\">" + data[i].cid + "&nbsp;</td>";
						atr += "<td align=\"center\">" + data[i].schoolName + "&nbsp;</td>";
						atr += "<td align=\"center\">" + data[i].type1 + "&nbsp;</td>";
						atr += "<td align=\"center\">" + data[i].type2 + "&nbsp;</td>";
						atr += "<td align=\"center\">" + data[i].province + "&nbsp;</td>";
						atr += "<td align=\"center\" nowrap>" + getActionTd() + "&nbsp;</td>";
						atr += "</tr>";
						$("#showlists").append(atr);
					}
					buildListsStyle();
					buildPagesHTML("$doCollegeList(?)", count, page);
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
	atd += "<a href=\"#\" onclick=\"hrefInfo(this);return false;\">"
		+ "<img src=\"../../css/former/images/ewm.png\" title=\"二维码\" width=\"16\" height=\"16\"/></a>";
	return atd;
}

function hrefInfo(obj) {
	var tr = obj.parentNode.parentNode;
	var cid = $.trim($(tr).find("td").eq(0).text());
	var examType = $("#selT").val();
	var idx = parent.addTab("collegeinfo", "院校二维码", "?cid=" + cid + "&examType=" + examType);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["collegeinfo"], "?cid=" + cid + "&examType=" + examType);
}

function hrefBatch() {
	if (!haveRight("college.batch")) {
		alert("相关操作的权限不足!");
		return;
	}
	
	var examType = $("#selT").val();
	var idx = parent.addTab("collegebatch", "批量创建二维码", "?examType=" + examType);
	if (idx == -1)
		return;
	parent.frames["collegebatch"].doCollegeBeforeBatch();
}

var collegeForm = new autoForm("#frmCollege");

function initCollegeInfo() {
	var cid = getArgFromHref("cid");
	var examType = getArgFromHref("examType");
	$("#btnSubmit").click(function(){
		var qrcode = {};
		qrcode.cid = cid; 
		qrcode.schoolName = $("#txtSchoolName").val();
		qrcode.schoolUrl = $("#imgUrl").val();
		qrcode.examtype = examType;
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
					if (data.reslut == 0) {
						alert("更新二维码成功!");
						if("" == data.content.schoolUrl || null == data.content.schoolUrl)
						{
							$("#trImgPath").hide();
						}
						else
						{
							$("#imgPath").attr("src", data.content.imgPath);
							$("#trImgPath").show();
						}
					} else 
						errHandle(data.reslut, data.content);
				} else 
					errHandle(-1); 
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				errHandle(0, XMLHttpRequest.status);
			}
		});
	});
	doCollegeInfo(cid,examType);
}

function doCollegeInfo(cid, examType) {
	$.ajax({
		type: "get",
		url: "../../service/college/" + cid,
		dataType: "json",
		success: function(data, textStatus){
			if (data) {
				collegeForm.init(data);
				collegeForm.readonly();
				$("#imgUrl").removeAttr("readonly").removeClass("ReadOnlyYes");
				$.ajax({
					type: "get",
					url: "../../service/college/" + cid + "/qrcode" + "?examType=" + examType,
					dataType: "json",
					success: function(data, textStatus){
						if (data) {
							if (data) {
								if("" == data.schoolUrl || null == data.schoolUrl)
								{
									$("#trImgPath").hide();
								}
								else
								{
									$("#imgPath").attr("src", data.imgPath);
									$("#imgUrl").val(data.schoolUrl);
									$("#trImgPath").show();
								}
							}
							else 
								errHandle(data.reslut, data.content);
						} else 
							errHandle(-1);
					},
					error: function(XMLHttpRequest, textStatus, errorThrown){
						errHandle(0, XMLHttpRequest.status);
					}
				});
			} else 
				errHandle(-1);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			errHandle(0, XMLHttpRequest.status);
		}
	});
}

function initCollegeBatch() {	
	$("#btnSubmit").click(function(){
		doCollegeBatch();
	});
	doCollegeBeforeBatch();
}

function doCollegeBeforeBatch() {
	$("#txtStartCid").val("");
	$("#txtEndCid").val("");
}

function doCollegeBatch() {
	if (!collegeForm.valid()) {
		return false;
	}
	var examType = getArgFromHref("examType");
	var college = collegeForm.toBean();
	$.ajax({
		type: "get",
		url: "../../service/college/batch/" + college.startCid + "/" + college.endCid + "/" + examType,
		dataType: "json",
		success: function(data, textStatus){
			if (data) {
				if (data.result == 0) {
					alert("批量创建二维码成功!");
					parent.removeTab('collegebatch');
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

function initCollegeOrder() {
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
//	createSelObj($("#selT"), "101");
//	alert($.cookie("examType"));
	$("#selExamtype").val($.cookie("examType"))
	$("#sortable").sortable();
	$("#sortable").disableSelection();
//	$("#selExamtype").change(function() {
//		doCollegeOrderList();
//	});
	$("#btnAdd").click(function() {
		examType = $.cookie("examType");
		
		$("#divCollege").dialog("open");
		$("#ui-id-1").text("添加院校");
		
		$("#selT").val(examType);
		//alert(5);
		doCollegeList(1);
	});
	$("#btnImport").click(function() {
		doCollegeOrderImport();
	});
//	createSelObj($("#selExamtype"), "101");
	doCollegeOrderList();
}

function doCollegeOrderList() {
	$("#sortable").empty();
//	var t = $("#selExamtype").val();
	var t = $.cookie("examType");
	PopularCollegeDS.findAll(t, function(data) {
		if (data) {
			for (var i=0; i<data.length; i++)
				createCollegeLi(data[i].cid, data[i].schoolName);
		}
	});
}

function createCollegeLi(cid, cname) {
	var aLi = "";
	aLi += "<li class=\"ui-state-default\" id=\"" + cid + "\">";
	aLi += "<div align=\"right\" class=\"topDiv\">";
	aLi += "<a href=\"###\" onclick=\"removeCollegeLi(this);return false;\">";
	aLi += "<img src=\"../../css/former/images/del.gif\"></img></a></div>";
	aLi += "<div align=\"center\" class=\"bottomDiv\">" + cname + "</div></li>";
	$("#sortable").append(aLi);
}

function removeCollegeLi(obj) {
	$(obj).parent().parent().remove();
}

function doCollegeOrderImport() {
	var arr = $("#sortable").sortable("toArray");
//	alert(arr);return;
	if (arr.length == 0)
		return;
	//var t = $("#selExamtype").val();
	var t = $.cookie("examType");
//	alert('t:'+t);
	PopularCollegeDS.applyCollegeImport(t, arr, function(data) {
		if (data) {
			alert("保存推荐院校列表成功!");
		}
	});
}

/**
 * 处理弹出窗口的返回
 * @param {Object} cid
 * @param {Object} cname
 */
function hrefChoose(cid, cname) {
	var arr = $("#sortable").sortable("toArray");
	if (arr.inArray(cid)) {
		alert("院校(" + cname + ")已经是推荐院校!");
		return;
	}
	createCollegeLi(cid, cname);
	$("#divCollege").dialog("close");
}
