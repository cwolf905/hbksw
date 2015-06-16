var examType;
var dictType = {
	"0" : "院校资讯",
	"1" : "普通资讯"
};
var dict101 = {
	"A" : "普通高考",
	"A12" : "关注高考",
	"A13" : "关注招生",
	"A19" : "专业介绍",
	"A20" : "填报志愿",
	"A272" : "高考政策",
	"B" : "艺术特长生",
	"B257" : "艺特动态",
	"B258" : "艺特指南",
	"C" : "体育特长生",
	"C260" : "体招动态",
	"D" : "艺术高考",
	"D246" : "艺考快讯",
	"D247" : "艺考政策",
	"D248" : "艺考指南",
	"D249" : "艺考备考",
	"E" : "高水平运动员",
	"E260" : "体招动态",
	"E261" : "体招指南",
	"E263" : "体招政策",
	"F" : "军校国防",
	"F265" : "国防招生",
	"F266" : "军校招生",
	"F269" : "报考指南",
	"F270" : "政策解读",
	"F271" : "常见问题",
	"G" : "招飞",
	"G233" : "招飞动态",
	"G234" : "招考政策",
	"G235" : "报名条件",
	"G236" : "招飞指南",
	"G237" : "招飞简章",
	"G238" : "常见问题"
};
var dict102 = {
	"A38" : "信息快递",
	"A39" : "招录政策",
	"A44" : "考务考籍"
};
var dict103 = {
	"A50" : "新闻动态",
	"A51" : "招录政策",
	"A53" : "报考指南"
};
var dict104 = {
	"A" : "全日制硕士",
	"A58" : "考研快讯",
	"B" : "在职硕士",
	"B65" : "政策动态"
};
var dict105 = {
	"A" : "四六级资讯专题",
	"A69" : "四六级资讯",
	"B" : "计算机等级考试资讯专题",
	"B283" : "计算机等级考试",
	"C" : "英语口语等级考试资讯专题",
	"C284" : "英语口语等级考试",
	"D" : "教师资格考试资讯专题",
	"D282" : "教师资格考试资讯"
};
var dictRecommend = {
	"0" : "否",
	"1" : "是"
};
var dictSelected = {
	"0" : "全部",
	"1" : "仅选中"
};

function initInfoSubjectList() {
	// sysSelectAll = true;
	// createSelObj($("#selExamtype"), "0");
	// sysSelectAll = false;
	$("#searchconds button").click(function() {
		doInfoSubjectList(1);
	});
	doInfoSubjectList(1);
}

function doInfoSubjectAll() {
	$("#txtTitle").val("");
	$("#selExamType").val("0");
	doInfoSubjectList(1);
}

function doInfoSubjectList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();

	var title = $("#txtTitle").val();
	// var examtype = $("#selExamtype").val();
	var examtype = $.cookie("examType");
//	alert(examtype);
	examType = examtype;
	var infosubject = {};
	infosubject.title = title;
	infosubject.examtype = examtype;
	infosubject.pagestart = (page - 1) * sysPageSize;
	infosubject.pagesize = sysPageSize;
	InfoSubjectDS.countInfoSubjects(infosubject, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		InfoSubjectDS.findInfoSubjectsByPage(infosubject, function(data) {
			if (!data)
				return;
			for ( var i = 0; i < data.length; i++) {
				var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "")
						+ ">";
				atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\">" + dictExamtype[data[i].examtype]
						+ "&nbsp;</td>";
				atr += "<td align=\"center\">"
						+ getSidName(data[i].examtype, data[i].sid)
						+ "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-title\">"
						+ data[i].title + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-recommend\">"
						+ getRecommendTd(data[i].recommend) + "&nbsp;</td>";
				atr += "<td align=\"center\">"
						+ getTime("dt14f", data[i].recommendtime, true)
						+ "&nbsp;</td>";
				atr += "<td align=\"center\" nowrap>"
						+ getActionTd(data[i].recommend)
						+ "<label style=\"display:none\">" + data[i].sid
						+ "</label>" + "<label style=\"display:none\">"
						+ data[i].examtype + "</label>" + "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doInfoSubjectList(?)", count, page);
			buildPagesStyle();
		});
	});
}

/**
 * 得到栏目名称
 * 
 * @param {Object}
 *            examtype
 * @param {Object}
 *            sid
 */
function getSidName(examtype, sid) {
	if (sid == 0)
		return "";
	var dictObj = eval("dict" + examtype);
	for ( var key in dictObj) {
		if (key.substr(1) == sid)
			return dictObj[key];
	}
}

function getRecommendTd(recommend) {
	var atd = "";
	atd += (recommend == 0 ? "" : "<span style=\"color:red;\">")
			+ dictRecommend[recommend] + (recommend == 0 ? "" : "</span>");
	atd += "<label style=\"display:none\">" + recommend + "</label>";
	return atd;
}

function getActionTd(recommend) {
	var rok = false;
	var atd = "";
	rok = haveRight("infosubject.update");
	atd += "<a href=\"#\""
			+ (rok ? " onclick=\"hrefUpdate(this);return false;\">" : ">")
			+ "<img src=\"../../css/former/images/edit" + (rok ? "" : "2")
			+ ".gif\" title=\"" + (rok ? "修改" : "不可修改")
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("infosubject.delete");
	atd += "<a href=\"#\""
			+ (rok ? " onclick=\"hrefDelete(this);return false;\">" : ">")
			+ "<img src=\"../../css/former/images/del" + (rok ? "" : "2")
			+ ".gif\" title=\"" + (rok ? "删除" : "不可删除")
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("infosubject.check");
	atd += "<a href=\"#\""
			+ (rok ? " onclick=\"hrefRecommend(this);return false;\">" : ">")
			+ "<img src=\"../../css/former/images/"
			+ (recommend == 0 ? "recommend" : "cancleRecommend")
			+ (rok ? "" : "2") + ".png\" title=\"" + (rok ? "" : "不可")
			+ (recommend == 0 ? "推荐" : "取消推荐")
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("infosubject.check");
	atd += "<a href=\"#\""
			+ (rok ? " onclick=\"hrefPush(this);return false;\">" : ">")
			+ "<img src=\"../../css/former/images/push" + (rok ? "" : "2")
			+ ".gif\" title=\"" + (rok ? "推送" : "不可推送")
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("infosubject.manage");
	atd += "<a href=\"#\""
			+ (rok ? " onclick=\"hrefManage(this);return false;\">" : ">")
			+ "<img src=\"../../css/former/images/content" + (rok ? "" : "2")
			+ ".png\" title=\"" + (rok ? "内容管理" : "不可内容管理")
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	rok = haveRight("infosubject.manage2");
	atd += "<a href=\"###\""
			+ (rok ? " onclick=\"hrefManage2(this);return false;\">" : ">") // 点击图片管理
			// 跳到添加图片页面
			+ "<img src=\"../../css/former/images/picture" + (rok ? "" : "2")
			+ ".png\" title=\"" + (rok ? "专题图片管理" : "不可管理专题图片")
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	return atd;
}

function hrefUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("infosubjectupdate", "修改专题信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["infosubjectupdate"], "?id=" + id);
}

function hrefDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var title = $.trim($(tr).find("td.w-title").text());
	if (confirm("是否确认删除该专题(" + title + ")?")) {
		InfoSubjectDS.deleteInfoSubject(id, function(data) {
			if (data) {
				alert("删除专题(" + title + ")成功!");
				doInfoSubjectList(1);
			}
		});
	}
}

function hrefRecommend(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var recommend = 1 - parseInt($.trim($(tr).find("td.w-recommend").find(
			"label").text()));
	var infosubject = {};
	infosubject.id = id;
	infosubject.recommend = recommend;
	if (infosubject.recommend == 1) {
		infosubject.recommendtime = new Date();
	}
	InfoSubjectDS.applyInfoSubjectRecommend(infosubject, function(data) {
		if (data) {
			alert((recommend == 0 ? "取消推荐" : "推荐") + "成功!");
			$(tr).find("td.w-recommend").html(getRecommendTd(recommend));
			$(tr).find("td.w-recommend").next("td").html(
					getTime("dt14f", infosubject.recommendtime, true));
			$(tr).find("td:last").find("img").eq(2).attr(
					"src",
					"../../css/former/images/"
							+ (recommend == 0 ? "up.gif" : "down.gif")).attr(
					"title", (recommend == 0 ? "推荐" : "取消推荐"));
		}
	});
}

function hrefPush(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var title = $.trim($(tr).find("td.w-title").text());
	var sid = $.trim($(tr).find("td:last").find("label").eq(0).text());
	var examtype = $.trim($(tr).find("td:last").find("label").eq(1).text());
	var info = {};
	var tagName = ''; 
	DWREngine.setAsync(false);
	InformationDS.findInformationTabBySubjectCid(sid, function(data){
		if(data)
		{
			for(var i=0; i<data.length; i++)
			{
				//modified by wanglei for 咨询推送时候暂停推送功能的用户也会收到推送
				tagName += "infotabId_" + data[i].id + ",";
			}
		}
	});
	info.tagName = tagName;
	info.title = title;
	info.alert = title;
	info.kaoshi_type = examtype;
	info.msg_type = "2"; // 1资讯2专题3分数4录取5招生答疑6院校答疑7事件8倒计时
	info.msg_id = id;
	var jsonstr = JSON.stringify(info);
	if (confirm("是否确认推送专题(" + title + ")?")) {
		$.ajax( {
			type : "post",
			url : "../../service/information/auraroPush",
			data : jsonstr,
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			success : function(data, textStatus) {
				if (data) {
					if (data.result == 0) {
						alert("专题(" + title + ")推送成功!");
					} else
						errHandle(data.result, data.content);
				} else
					errHandle(-1);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				errHandle(0, XMLHttpRequest.status);
			}
		});
	}
	DWREngine.setAsync(true);
}

/**
 * 只取每种考试类型中的组
 * 
 * @param {Object}
 *            cid
 */
function getParentCid(cid) {
	if (cid == "0")
		return "0";
	// 高考1-7
	for ( var key in dict101) {
		if (key.substr(1) == cid) {
			return key.charCodeAt(0) - "A".charCodeAt(0) + 1;
		}
	}
	// 成考8-10
	var idx = 8;
	for ( var key in dict102) {
		if (key.substr(1) == cid)
			return idx;
		idx++;
	}
	// 自考11-13
	for ( var key in dict103) {
		if (key.substr(1) == cid)
			return idx;
		idx++;
	}
	// 考研14-15
	for ( var key in dict104) {
		if (key.substr(1) == cid) {
			return idx + key.charCodeAt(0) - "A".charCodeAt(0) + 1;
		}
	}
}
// 原先的专题资讯打包改为专题内容项
// function hrefManage(obj) {
// var tr = obj.parentNode.parentNode;
// var id = $.trim($(tr).find("td").eq(0).text());
// var idx = parent.addTab("infosubjectmanage", "专题资讯打包", "?id=" + id);
// if (idx == -1)
// return;
// hrefHandle(parent.frames["infosubjectmanage"], "?id=" + id);
// }
// 专题内容项 start
function hrefManage(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("infosubjectaddcontent", "专题内容编辑", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["infosubjectaddcontent"], "?id=" + id);
}
// 专题内容项 end
/** ************ 专题内容项编辑start*************** */

function initInfoSubjectAddContent() {

	$("#divTip").dialog( {
		autoOpen : false,
		height : 300,
		width : 550,
		modal : true,
		buttons : {}
	});

	// 1.获得下拉框类型的值
	createSelObj($("#selAdtype"));
	// 获得下拉框类型的值end
	// 2.点击保存按钮
	$("#btnSubmit").click(function() {
		addContent(); // 添加内容

		});
	// 3.全部查询标题列表
	var infosubid = getArgFromHref("id");
	$("#txtId").val(infosubid);
	selectContentList();
	// 根据标题进行搜索
	$("#searchconds button").click(function() {
		doSelectTypeConentByTitle();
	});
}
// 添加内容
function addContent() {
	// 获取值
	var infoSubjectContent = {};
	var frmxxx = new autoForm("#frmInfoSubject");
	if (!frmxxx.valid()) {
		return false;
	}
	var infosubid = getArgFromHref("id");
	infoSubjectContent.infosubid = infosubid;
	infoSubjectContent.title = $("#txtExamtypeIntro").val();
	infoSubjectContent.type = $("#selAdtype").val();
	var content = $("#txtTitleIntro").val();
	if(content.length > 250)
	{
		alert("专题内容项内容长度必须在0~250字符之间");
		return false;
	}
	infoSubjectContent.content = content;
	InfoSubjectDS.doAddContent(infoSubjectContent, function(data) {
		alert("保存成功");
		$("#txtExamtypeIntro").val("");
		$("#selAdtype").val(1);
		$("#txtTitleIntro").val("");
		selectContentList();

	});
}

// 3.标题列表全部查询
function selectContentList() {
	var infosubid = $("#txtId").val();
	InfoSubjectDS
			.selectContentListByInfosubid(
					
					infosubid,
					function(data) {
						$("#showlists").empty();
						for ( var i = 0; i < data.length; i++) {
							var atr = "<tr"
									+ (i % 2 == 0 ? " class=\"list-tr\"" : "")
									+ ">";
							atr += "<td align=\"center\">" + data[i].id
									+ "&nbsp;</td>";
							atr += "<td align=\"center\">" + data[i].title
									+ "&nbsp;</td>";
							if (data[i].type == 1) {
								atr += "<td align=\"center\">" + "资讯" + "</td>";
							} else if (data[i].type == 2) {
								atr += "<td align=\"center\">" + "专题"
										+ "&nbsp;</td>";
							} else if (data[i].type == 3) {
								atr += "<td align=\"center\">" + "院校"
										+ "&nbsp;</td>";
							} else if (data[i].type == 4) {
								atr += "<td align=\"center\">" + "院校资讯"
										+ "&nbsp;</td>";
							} else if (data[i].type == 5) {
								atr += "<td align=\"center\">" + "插件"
										+ "&nbsp;</td>";
							} else if (data[i].type == 6) {
								atr += "<td align=\"center\">" + "外部链接"
										+ "&nbsp;</td>";
							}
//							atr += "<td><textarea  rows=\"2\" cols=\"55\">"+ data[i].content+"</textarea>&nbsp;</td>";
							atr += "<td align=\"center\">"+ data[i].content+ "&nbsp;</td>";
							atr += "<td align=\"center\" nowrap>"
									+ "<a href=\"###\" onclick=\"titleContentUpdate(this);return false;\">"
									+ "<img src=\"../../css/former/images/edit.gif\" title=\"修改\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;"
									+ "<a href=\"###\" onclick=\"titleContentDelete("
									+ data[i].id
									+ ");return false;\">"
									+ "<img src=\"../../css/former/images/del.gif\" title=\"删除\" width=\"16\" height=\"16\"/></a>&nbsp;</td>";
							atr += "</tr>";
							$("#showlists").append(atr);
						}
					});

}

function titleContentDelete(id) {
	alert("确定删除吗？")
	var infosubid = getArgFromHref("id");
	InfoSubjectDS.titleContentDelete(id, function(data) {
        alert("删除成功");
		selectContentList();

	});

}

//function doSelectTypeConentByTitle() {
//
//	var infoSubjectContent = {};
//	infoSubjectContent.title = $("#txtTitle").val();
//	InfoSubjectDS
//			.doSelectTypeConentByTitle(
//					infoSubjectContent,
//					function(data) {
//						$("#showlists").empty();
//						for ( var i = 0; i < data.length; i++) {
//							var atr = "<tr"
//									+ (i % 2 == 0 ? " class=\"list-tr\"" : "")
//									+ ">";
//							atr += "<td align=\"center\">" + data[i].id
//									+ "&nbsp;</td>";
//							atr += "<td align=\"center\">" + data[i].title
//									+ "&nbsp;</td>";
//							if (data[i].type == 1) {
//								atr += "<td align=\"center\">" + "资讯" + "</td>";
//							} else if (data[i].type == 2) {
//								atr += "<td align=\"center\">" + "专题"
//										+ "&nbsp;</td>";
//							} else if (data[i].type == 3) {
//								atr += "<td align=\"center\">" + "院校"
//										+ "&nbsp;</td>";
//							} else if (data[i].type == 4) {
//								atr += "<td align=\"center\">" + "院校资讯"
//										+ "&nbsp;</td>";
//							} else if (data[i].type == 5) {
//								atr += "<td align=\"center\">" + "插件"
//										+ "&nbsp;</td>";
//							} else if (data[i].type == 6) {
//								atr += "<td align=\"center\">" + "外部链接"
//										+ "&nbsp;</td>";
//							}
//
//							atr += "<td align=\"center\">" + data[i].content
//									+ "&nbsp;</td>";
//
//							atr += "<td align=\"center\" nowrap>"
//									+ "<a href=\"###\" onclick=\"titleContentUpdate(this);return false;\">"
//									+ "<img src=\"../../css/former/images/edit.gif\" title=\"修改\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;"
//									+ "<a href=\"###\" onclick=\"titleContentDelete("
//									+ data[i].id
//									+ ");return false;\">"
//									+ "<img src=\"../../css/former/images/del.gif\" title=\"删除\" width=\"16\" height=\"16\"/></a>&nbsp;</td>";
//							atr += "</tr>";
//							$("#showlists").append(atr);
//						}
//
//					});
//
//}
//
//function doTitleContentAll() {
//	var infosubid = getArgFromHref("id");
//	selectContentList();
//
//}

// 去编辑
function titleContentUpdate(obj) {
	
	$("#divTip").dialog("open");
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	// initinfosubjectaddcontentupdate(id);

	$("#btnUpdateOK").unbind("click").bind(
			"click",
			function() {
				var infoSubjectContent = {};
				infoSubjectContent.id = id;
				var infosubid = $("#txtId").val();
				
				// alert(infosubid);
				infoSubjectContent.title = $("#txtExamtypeIntroxx").val();
				infoSubjectContent.type = $("#selAdtypeOne").find("option:selected").val();
				var content = $("#txtTitleIntroxx").val();
				if(content.length > 250)
				{
					alert("专题内容项内容长度需在0~250字符之间");
					return false;
				}
				infoSubjectContent.content = content;
				infoSubjectContent.infosubid = infosubid;
				InfoSubjectDS.doTitleContentUpdateById(infoSubjectContent,
						function(data) {

							selectContentList();
//							parent.removeTab('infosubjectaddcontentupdate');
							$("#divTip").dialog("close");
						});
			});

	toTitleContentUpdateById(id);
	
	$("#btnUpdateCancle").unbind("click").bind("click",function(){
		$("#divTip").dialog("close");
	});
	
	
	
	// var idx = parent.addTab("infosubjectaddcontentupdate", "专题内容编辑", "?id=" +
	// id);
	// if (idx == -1)
	// return;
	// hrefHandle(parent.frames["infosubjectaddcontentupdate"], "?id=" + id );
}

function toTitleContentUpdateById(id) {

	createSelObj($("#selAdtype"));
	InfoSubjectDS.toTitleContentUpdateById(id, function(data) {

		$("#txtExamtypeIntroxx").val(data.title);
		$("#txtTitleIntroxx").val(data.content);
//		$("#infosubidxx").val(data.infosubid);

	});
}
//function initinfosubjectaddcontentupdate(id) {
//	// 1.获得下拉框类型的值
//	// createSelObj($("#selAdtypexx"));
//	// 获得下拉框类型的值end
//	// var id = getArgFromHref("id");
//	toTitleContentUpdateById(id);
//	// 2.点击保存按钮
//	$("#btnUpdateOK").unbind("click").bind(
//			"click",
//			function() {
//
//				var infoSubjectContent = {};
//				infoSubjectContent.id = id;
//				var infosubid = $("#infosubid").val();
//				// alert(infosubid);
//				infoSubjectContent.title = $("#txtExamtypeIntro").val();
//				infoSubjectContent.type = $("#selAdtype").val();
//				infoSubjectContent.content = $("#txtTitleIntro").val();
//				InfoSubjectDS.doTitleContentUpdateById(infoSubjectContent,
//						function(data) {
//
//							selectContentList();
//							parent.removeTab('infosubjectaddcontentupdate');
//
//						});
//			});
//	// $("button[name=btnSubmit]").click(function(){
//	//			  
//	// });
//
//}

//function doTitleContentUpdateById(id) {
//	// alert(101);
//	var infoSubjectContent = {};
//	infoSubjectContent.id = id;
//	var infosubid = $("#infosubid").val();
//	// alert(infosubid);
//	infoSubjectContent.title = $("#txtExamtypeIntroxx").val();
////	infoSubjectContent.type = $("#selAdtypexx").val();
//	infoSubjectContent.content = $("#txtTitleIntroxx").val();
//	InfoSubjectDS.doTitleContentUpdateById(infoSubjectContent, function(data) {
//
//		selectContentList();
//		parent.removeTab('infosubjectaddcontentupdate');
//
//	});
//
//}

/** ************ 专题内容项编辑end*************** */

/** ************ 专题图片管理start*************** */

// 何朋 点击专题图片管理 start
function hrefManage2(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("infosubjectpicturemanage", "专题图片管理", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["infosubjectpicturemanage"], "?id=" + id);
}
// 何朋 点击专题图片管理 end 打开新的页面infosubjecttoaddpicture

function initInfoSubjectPictureManage() {
	$("button[name=btnSubmit]").click(function() {
		hrefInfoSubjectPictureAdd();
	});

	var id = getArgFromHref("id");
	doInfoSubjectPictureBeforeManage(id);
}

function doInfoSubjectPictureBeforeManage(id) {
	InfoSubjectDS.getInfoSubject(id, function(data) {
		if (data) {
			$("#txtInfoSubjectid").val(data.id);
			$("#txtName").val(data.title);
			infoSubjectForm.readonly();

			buildInfoSubjectPictureTh();
			doInfoSubjectPictureListBeforeManage(data.id);
		}
	});
}

function buildInfoSubjectPictureTh() {
	$("#tblInfoSubjectPicture").empty();
	var atr = "<tr bgcolor=\"#cccccc\">";
	atr += "<td align=\"center\" width=\"15%\">序号</td>";
	atr += "<td align=\"center\">图片</td>";
	atr += "<td align=\"center\" width=\"15%\">操作</td>";
	atr += "</tr>";
	$("#tblInfoSubjectPicture").append(atr);
}

function doInfoSubjectPictureListBeforeManage(infoSubjectid) {
	var infoSubjectpicture = {};
	infoSubjectpicture.infoSubjectId = infoSubjectid;
	InfoSubjectPictureDS.findAllInfoSubjectPictures(infoSubjectpicture,
			function(data) {
				if (data) {
					$("#tblInfoSubjectPicture").find("tr").eq(0).nextAll()
							.remove();
					for ( var i = 0; i < data.length; i++) {
						buildInfoSubjectPictureTr(data[i]);
					}
				}
			});
}

function buildInfoSubjectPictureTr(data) {
	var atr = "<tr>";
	atr += "<td align=\"center\" class=\"w-id\">" + data.id + "&nbsp;</td>";
	atr += "<td align=\"center\" class=\"w-picture\"><img style='width:100px; height:50px;' src=\""
			+ data.picture + "\"/>&nbsp;</td>";
	atr += "<td align=\"center\" nowrap>"
			+ "<a href=\"###\" onclick=\"hrefInfoSubjectPictureUpdate(this);return false;\">"
			+ "<img src=\"../../css/former/images/edit.gif\" title=\"修改\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;"
			+ "<a href=\"###\" onclick=\"hrefInfoSubjectPictureDelete(this);return false;\">"
			+ "<img src=\"../../css/former/images/del.gif\" title=\"删除\" width=\"16\" height=\"16\"/></a>&nbsp;</td>";
	$("#tblInfoSubjectPicture").append(atr);
}

function hrefInfoSubjectPictureUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td.w-id").text());
	var infoSubjectid = $("#txtInfoSubjectid").val();
	var idx = parent.addTab("infosubjectpictureupdate", "修改图片",
			"?infoSubjectPicId=" + id + "&infoSubjectid=" + infoSubjectid);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["infosubjectpictureupdate"], "?infoSubjectPicId="
			+ id + "&infoSubjectid=" + infoSubjectid);
}

function hrefInfoSubjectPictureDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td.w-id").text());
	var img = $.trim($(tr).find("td.w-picture").find("img").attr("src"));
	if (confirm("是否确认删除该图片(" + id + ")?")) {
		InfoSubjectPictureDS.deleteInfoSubjectPicture(id, function(data) {
			if (data) {
				$(tr).remove();
				img = img.substr(img.lastIndexOf("/") + 1);
				InfoSubjectPictureDS.deleteInfoSubjectPictureFile(
						"infoSubjectpicture", img, function(code) {
							// do nothing;
					});
			}
		});
	}
}

function hrefInfoSubjectPictureAdd() {
	var infoSubjectid = $("#txtInfoSubjectid").val();
	var idx = parent.addTab("infosubjectpictureadd", "添加专题图片",
			"?infoSubjectid=" + infoSubjectid);
	if (idx == -1)
		return;
	parent.frames["infosubjectpictureadd"]
			.doInfoSubjectPictureBeforeAdd(infoSubjectid);
}

var infoSubjectPictureForm = new autoForm("#frmInfoSubjectPicture");

function initInfoSubjectPictureAdd() {
	$("#txtJpg").uploadify(
			{
				"uploader" : "../../uploadify?type=infoSubjectpicture",
				"swf" : "../../jquery/uploadify/uploadify.swf",
				"queueID" : "divJpg",
				"multi" : false,
				"fileSizeLimit" : "1MB",
				"buttonText" : "添加文件",
				"width" : "60",
				"height" : "20",
				"fileTypeDesc" : "所有文件",
				"fileTypeExts" : "*.*",
				"onSelectError" : function(file, errorCode, errorMsg) {
					if (errorCode == -110)
						alert("文件大小超过限制(1MB)!");
					else if (errorCode == -120)
						alert("文件内容为空，请重新选择!");
				},
				"onUploadSuccess" : function(file, data, response) {
					var img = $("#txtPicture").val();
					var newimg = getWebAddr("/html/")
							+ "/uploadify/infoSubjectpicture/"
							+ decodeURI(data);
					if (img && newimg != img) {
						img = img.substr(img.lastIndexOf("/") + 1);
						InfoSubjectPictureDS.deleteInfoSubjectPictureFile(
								"infoSubjectpicture", img, function(code) {
									// do nothing;
							});
					}
					$("#txtPicture").val(newimg);
				},
				"onUploadError" : function(file, errorCode, errorMsg) {
					alert("文件" + file.name + "上传失败!");
				}
			});

	$("#btnSubmit").click(function() {
		doInfoSubjectPictureAdd();
	});
	infoSubjectPictureForm.readonly("#txtPicture");
	var infoSubjectid = getArgFromHref("infoSubjectid");
	doInfoSubjectPictureBeforeAdd(infoSubjectid);
}

function doInfoSubjectPictureBeforeAdd(infoSubjectid) {
	var infoSubjectpicture = {};
	infoSubjectpicture.infoSubjectid = infoSubjectid;
	infoSubjectpicture.picture = "";
	infoSubjectPictureForm.init(infoSubjectpicture);
}

function doInfoSubjectPictureAdd() {
	if (!infoSubjectPictureForm.valid()) {
		return false;
	}
	var infoSubjectpicture = infoSubjectPictureForm.toBean();
	var infoSubjectid = getArgFromHref("infoSubjectid");
	infoSubjectpicture.infoSubjectId = infoSubjectid;
	InfoSubjectPictureDS.addInfoSubjectPicture(infoSubjectpicture, function(
			data) {
		if (data) {
			alert("添加图片成功!");
			parent.frames["infosubjectpicturemanage"]
					.doInfoSubjectPictureListBeforeManage(infoSubjectid);
			parent.removeTab("infosubjectpictureadd");
		}
	});
}

function initInfoSubjectPictureUpdate() {
	$("#txtJpg").uploadify(
			{
				"uploader" : "../../uploadify?type=infoSubjectpicture",
				"swf" : "../../jquery/uploadify/uploadify.swf",
				"queueID" : "divJpg",
				"multi" : false,
				"fileSizeLimit" : "1MB",
				"buttonText" : "添加文件",
				"width" : "60",
				"height" : "20",
				"fileTypeDesc" : "所有文件",
				"fileTypeExts" : "*.*",
				"onSelectError" : function(file, errorCode, errorMsg) {
					if (errorCode == -110)
						alert("文件大小超过限制(1MB)!");
					else if (errorCode == -120)
						alert("文件内容为空，请重新选择!");
				},
				"onUploadSuccess" : function(file, data, response) {
					var img = $("#txtPicture").val();
					var newimg = getWebAddr("/html/")
							+ "/uploadify/infoSubjectpicture/"
							+ decodeURI(data);
					if (img && newimg != img) {
						img = img.substr(img.lastIndexOf("/") + 1);
						InfoSubjectPictureDS.deleteInfoSubjectPictureFile(
								"infoSubjectpicture", img, function(code) {
									// do nothing;
							});
					}
					$("#txtPicture").val(newimg);
				},
				"onUploadError" : function(file, errorCode, errorMsg) {
					alert("文件" + file.name + "上传失败!");
				}
			});

	$("#btnSubmit").click(function() {
		doInfoSubjectPictureUpdate();
	});
	infoSubjectPictureForm.readonly("#txtPicture");
	var id = getArgFromHref("infoSubjectPicId");
	doInfoSubjectPictureBeforeUpdate(id);
}

function doInfoSubjectPictureBeforeUpdate(id) {
	InfoSubjectPictureDS.getInfoSubjectPicture(id, function(data) {
		if (data) {
			infoSubjectPictureForm.init(data);
		}
	});
}

function doInfoSubjectPictureUpdate() {
	if (!infoSubjectPictureForm.valid()) {
		return false;
	}
	var infoSubjectpicture = infoSubjectPictureForm.toBean();
	var infoSubjectid = getArgFromHref("infoSubjectid");
	InfoSubjectPictureDS.updateInfoSubjectPicture(infoSubjectpicture, function(
			data) {
		if (data) {
			alert("修改图片成功!");
			parent.frames["infosubjectpicturemanage"]
					.doInfoSubjectPictureListBeforeManage(infoSubjectid);
			parent.removeTab("infosubjectpictureupdate");
		}
	});
}

/** ************ 专题图片管理end*************** */
function hrefAdd() {
	if (!haveRight("infosubject.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("infosubjectadd", "新增专题", "?examType=" + examType);
	if (idx == -1)
		return;
	parent.frames["infosubjectadd"].doInfoSubjectBeforeAdd();
	// hrefHandle(parent.frames["infosubjectadd"], "?examType=" + examType);
}

var infoSubjectForm = new autoForm("#frmInfoSubject");

function initInfoSubjectAdd() {
	// alert(getArgFromHref("examType"));
//	$("#selExamtype").change(function() {
//		var examtype = $(this).val();
//		createSidObject(examtype);
//	});
	$("#btnSubmit").click(function() {
		doInfoSubjectAdd();
	});
	doInfoSubjectBeforeAdd();
}

function createSidObject(examtype, defval) {
	var obj = $("#selSid");
	var dictObj = eval("dict" + examtype);
	obj.empty();
	if (sysSelectAll)
		obj.append("<option value='0'>全部</option>");
	for ( var key in dictObj) {
		var indent = "";
		if (key.length > 1)
			indent = "&nbsp;&nbsp;&nbsp;&nbsp;";
		obj.append("<option value='" + key + "'>" + indent + dictObj[key]
				+ "</option>");
	}
	if (defval)
		selHandle(obj, defval);
}

function doInfoSubjectBeforeAdd() {
	var infosubject = {};
	var examType = getArgFromHref("examType");
	infosubject.examtype = examType;
	// infosubject.type = "0";
	infosubject.sid = "A12";
	infosubject.title = "";
	infoSubjectForm.init(infosubject);
//	createSidObject("101", "A12");
	if(101 == examType)
	{
		//高考的逻辑分为2层
		createSidObject(examType,"A12");
	}else
	{
		createSidObject(examType);
	}
}

function doInfoSubjectAdd() {
	if (!infoSubjectForm.valid()) {
		return false;
	}

	var examType = getArgFromHref("examType");
	if ("undefined" == typeof (examType)) {
		examType = $.cookie("examType");
	}
//	alert(examType);
	var infosubject = infoSubjectForm.toBean();
	infosubject.examtype = examType;
	// if (infosubject.type == "0") {
	// infosubject.sid = "0";
	// } else {
	if (infosubject.sid.length == 1) {
		alert("栏目无效，请重新选择!");
		return false;
	}
	var description = $("#txtDescription").val();
	if(description.length > 500)
	{
		alert("简介长度需要在0~500之间");
		return false;
	}
	infosubject.description = description;
	infosubject.sid = infosubject.sid.substr(1);
	// }
	InfoSubjectDS.addInfoSubject(infosubject, function(data) {
		if (data) {
			alert("新增专题成功!");
			parent.removeTab("infosubjectadd");
		}
	});
}

function initInfoSubjectUpdate() {
	$("#selExamtype").change(function() {
		var examtype = $(this).val();
		createSidObject(examtype);
	});
	$("#btnSubmit").click(function() {
		doInfoSubjectUpdate();
	});
	var id = getArgFromHref("id");
	doInfoSubjectBeforeUpdate(id);
}

function doInfoSubjectBeforeUpdate(id) {
	InfoSubjectDS.getInfoSubject(id, function(data) {
		if (data) {
			// data.type = (data.sid == 0) ? 0 : 1;
			infoSubjectForm.init(data);
			$("#txtDescription").val(data.description);
			createSidObject(data.examtype, getSidKey(data.examtype, data.sid));
		}
	});
}

/**
 * 得到栏目在字典中的key
 * 
 * @param {Object}
 *            examtype
 * @param {Object}
 *            sid
 */
function getSidKey(examtype, sid) {
	var dictObj = eval("dict" + examtype);
	for ( var key in dictObj) {
		if (sid == 0 && key.length > 1)
			return key;
		if (key.substr(1) == sid)
			return key;
	}
}

function doInfoSubjectUpdate() {
	if (!infoSubjectForm.valid()) {
		return;
	}
	var infosubject = infoSubjectForm.toBean();
	// if (infosubject.type == "0") {
	// infosubject.sid = "0";
	// } else {
	if (infosubject.sid.length == 1) {
		alert("栏目无效，请重新选择!");
		return false;
	}
	var description = $("#txtDescription").val();
	if(description.length > 500)
	{
		alert("简介长度需要在0~500之间");
		return false;
	}
	infosubject.description = description;
	infosubject.sid = infosubject.sid.substr(1);
	// }
	InfoSubjectDS.updateInfoSubject(infosubject, function(data) {
		if (data) {
			alert("修改专题成功!");
			parent.removeTab("infosubjectupdate");
		}
	});
}

// 全局数组
var iids = [];

function initInfoSubjectManage() {
	$("#divTip").dialog( {
		autoOpen : false,
		height : 300,
		width : 550,
		modal : true,
		buttons : {}
	});
	$("#searchconds button").click(function() {
		doInformationList(1);
	});
	$("#chkFilter").click(function() {
		var chk = $(this).prop("checked");
	});
	createSelObj($("#selSelected"), "0");

	$("#btnSubmit").click(function() {
		doInfoSubjectManage();
	});
	var id = getArgFromHref("id");
	doInfoSubjectBeforeManage(id);
}

function doInfoSubjectBeforeManage(id) {
	InfoSubjectDS.getInfoSubject(id, function(data) {
		if (data) {
			if (!isInvalid(data.iids)) {
				iids = data.iids.split(",");
			}
			// data.type = (data.sid == 0) ? 0 : 1;
			infoSubjectForm.init(data);
			infoSubjectForm.readonly();
			$("#txtExamtypeIntro").val(dictExamtype[data.examtype]);
			// $("#txtTypeIntro").val(dictType[data.type]);
			// if (data.sid == 0) {
			// $("#trSid").hide();
			// doNewsList(1);
			// } else {
			$("#txtSidIntro").val(getSidName(data.examtype, data.sid));
			$("#trSid").show();
			doInformationList(1);
			// }
			$("#txtTitleIntro").val(data.title);
		}
	});
}

function cacheIids() {
	$("#showlists").find("input:checkbox").each(function() {
		var chk = $(this).prop("checked");
		var v = $(this).val();
		if (chk) {
			// alert("a:" + v);
			if (!iids.inArray(v))
				iids.push(v);
		} else {
			// alert("r:" + v);
			iids.remove(v);
		}
		// alert(iids);
	});
}

function doInformationAll() {
	$("#txtTitle").val("");
	$("#selSelected").val("0");
	doInformationList(1);
}

function doInformationList(page) {
	var cid = $("#txtSid").val();
	if (cid == "0") {
		doNewsList(1);
		return;
	}
	cacheIids();
	$("#showlists").empty();
	$("#showpages").find("tr").remove();

	var cid = $("#txtSid").val();
	var title = $("#txtTitle").val();
	var selected = $("#selSelected").val();
	var iidstr = "";
	if (selected == "1")
		iidstr = "&iids=" + iids.join(",");
	$
			.ajax( {
				type : "get",
				url : "../../service/information/count?cid=" + cid + "&title="
						+ encodeURIComponent(title) + iidstr,
				dataType : "text",
				success : function(data, textStatus) {
					if (!data || data == "0") {
						buildListsBlankHTML();
						return;
					}
					var count = parseInt(data);
					$
							.ajax( {
								type : "get",
								url : "../../service/information/list?cid="
										+ cid + "&title="
										+ encodeURIComponent(title) + iidstr
										+ "&curPage=" + page + "&pageSize="
										+ sysPageSize,
								dataType : "json",
								success : function(data, textStatus) {
									if (!data) {
										errHandle(-1);
										return;
									}
									for ( var i = 0; i < data.length; i++) {
										var atr = "<tr"
												+ (i % 2 == 0 ? " class=\"list-tr\""
														: "") + ">";
										atr += "<td align=\"center\">"
												+ getChkTd(
														data[i].iid,
														(i % 2 == 0 ? "background-color:#ffe4ca"
																: ""))
												+ "&nbsp;</td>";
										atr += "<td align=\"center\" class=\"w-title\">"
												+ data[i].title + "&nbsp;</td>";
										atr += "<td align=\"center\">"
												+ data[i].addtime
												+ "&nbsp;</td>";
										atr += "<td align=\"center\">"
												+ omit(data[i].content, "")
												+ "&nbsp;</td>";
										atr += "</tr>";
										$("#showlists").append(atr);
									}
									buildListsStyle();
									buildPagesHTML("$doInformationList(?)",
											count, page);
									buildPagesStyle();
								},
								error : function(XMLHttpRequest, textStatus,
										errorThrown) {
									errHandle(0, XMLHttpRequest.status);
								}
							});
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					errHandle(0, XMLHttpRequest.status);
				}
			});
}

function doNewsList(page) {
	cacheIids();
	$("#showlists").empty();
	$("#showpages").find("tr").remove();

	var examtype = $("#txtExamtype").val();
	var title = $("#txtTitle").val();
	var selected = $("#selSelected").val();
	var iidstr = "";
	if (selected == "1")
		iidstr = "&nids=" + iids.join(",");
	$
			.ajax( {
				type : "get",
				url : "../../service/news/count?t=" + examtype + "&title="
						+ encodeURIComponent(title) + iidstr,
				dataType : "text",
				success : function(data, textStatus) {
					if (!data || data == "0") {
						buildListsBlankHTML();
						return;
					}
					var count = parseInt(data);
					$
							.ajax( {
								type : "get",
								url : "../../service/news/list?t=" + examtype
										+ "&title=" + encodeURIComponent(title)
										+ iidstr + "&curPage=" + page
										+ "&pageSize=" + sysPageSize,
								dataType : "json",
								success : function(data, textStatus) {
									if (!data) {
										errHandle(-1);
										return;
									}
									for ( var i = 0; i < data.length; i++) {
										var atr = "<tr"
												+ (i % 2 == 0 ? " class=\"list-tr\""
														: "") + ">";
										atr += "<td align=\"center\">"
												+ getChkTd(
														data[i].nid,
														(i % 2 == 0 ? "background-color:#ffe4ca"
																: ""))
												+ "&nbsp;</td>";
										atr += "<td align=\"center\" class=\"w-title\">"
												+ data[i].title + "&nbsp;</td>";
										atr += "<td align=\"center\">"
												+ data[i].addTime
												+ "&nbsp;</td>";
										atr += "<td align=\"center\">"
												+ omit(data[i].content, "")
												+ "&nbsp;</td>";
										atr += "</tr>";
										$("#showlists").append(atr);
									}
									buildListsStyle();
									buildPagesHTML("$doNewsList(?)", count,
											page);
									buildPagesStyle();
								},
								error : function(XMLHttpRequest, textStatus,
										errorThrown) {
									errHandle(0, XMLHttpRequest.status);
								}
							});
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					errHandle(0, XMLHttpRequest.status);
				}
			});
}

function getChkTd(iid, bgcolor) {
	var atd = "";
	var str = iids.inArray(iid) ? " checked" : "";
	atd += "<input type=\"checkbox\" style=\"border:0px;" + bgcolor
			+ "\" value=\"" + iid + "\"" + str + "/>";
	return atd;
}

function doInfoSubjectManage() {
	cacheIids();
	var infosubject = {};
	infosubject.id = $("#txtId").val();
	infosubject.iids = iids.join(",");
	InfoSubjectDS.applyInfoSubjectManage(infosubject, function(data) {
		if (data) {
			alert("专题打包成功!");
			parent.removeTab("infosubjectmanage");
		}
	});
}
