
/**
 * 页面初始化操作
 */
function initCustomPushAuditList() {
	$("#divTip").dialog({
		autoOpen: false,
		height: 500,
		width: 650,
		modal: true,
		buttons: {
			'关闭':function(){
				$("#divTip").dialog("close");
			}
		}
	});
	
	$("#divAudit").dialog({
		autoOpen: false,
		height: 200,
		width: 470,
		modal: true,
		//position:[300,5],
		buttons: {}
	});
	
	$("#searchconds button").click(function() {
		doCustomPushAuditList(1);
	});
	doCustomPushAuditList(1);
}

/**
 * 查看全部
 */
function doCustomAll() {
	$("#txtTitle").val("");
	doCustomPushAuditList(1);
}

/**
 * 分页查看列表
 * @param page
 */
function doCustomPushAuditList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").remove();
	//获取标题值
	var title = $.trim($("#txtTitle").val());
	//设置请求参数
	var customPush = {};
	//设置页码和每页展示条数
	customPush.title = title;
	customPush.pagestart = (page-1)*sysPageSize;
	customPush.pagesize = sysPageSize;
	//到后台请求数据
	CustomPushDS.getCustomPushAuditListCount(customPush,function(data){
		if (!data || data == "0") {
			buildListsBlankHTML();
			return;
		}
		var count = parseInt(data);
		CustomPushDS.getCustomPushAuditList(customPush,function(data2){
			//
			if (!data2) {
				errHandle(-1); return;
			}
			for (var i = 0; i < data2.length; i++) {
				var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "") + ">";
				atr += "<td align=\"center\">" + data2[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-title\">" + data2[i].title + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-pushTitle\">" + data2[i].pushTitle + "&nbsp;</td>";
				atr += "<td align=\"center\" nowrap>" + getPushActionTd() 
					+ "<label style=\"display:none\">" + data2[i].id + "</label>"
					+ "<input id=\"tag_"+ data2[i].id +"\" style=\"display:none\" value=\""+ data2[i].pushTag +"\">"
					+ "<input id=\"exam_"+ data2[i].id +"\" style=\"display:none\" value=\""+ data2[i].examType +"\">"
					+ "<input id=\"pushtype_"+ data2[i].id +"\" style=\"display:none\" value=\""+ data2[i].pushType +"\">"
					+ "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doCustomPushAuditList(?)", count, page);
			buildPagesStyle();
		});
	});
	
}
/**
 * 设置操作单元格
 * @returns {String}
 */
function getPushActionTd()
{
	var rok = false;
	var atd = "";
	rok = haveRight("customPush.audit");
	atd += "<a href=\"#\""
			+ (rok ? " onclick=\"hrefPushAudit(this);return false;\">" : ">")
			+ "<img src=\"../../css/former/images/review" + (rok ? "" : "2")
			+ ".png\" title=\"" + (rok ? "审核" : "不可审核")
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	return atd;
}

/**
 * 推动审核
 * @param obj
 */
function hrefPushAudit(obj)
{
	
	$("#divAudit").dialog("open");
	$("#ui-id-2").text("推送审核");
	$("#btnPushAuditOK").unbind("click").bind("click", function(){
		var tr = obj.parentNode.parentNode;
		var id = $.trim($(tr).find("td").eq(0).text());
		var customPush = {};
		customPush.id = id;
		var pushTitleAudit = $("#auditStatus").val();
		customPush.pushTitleAudit = pushTitleAudit;
		CustomPushDS.customPushTitleAudit(customPush, function(data){
			
			if(data)
			{
				if(pushTitleAudit == -1)
				{
					alert("资讯推送标题审核不通过");
					$("#divAudit").dialog("close");
					doCustomPushAuditList(1);
					return false;
				}
				else (pushTitleAudit == 1)
				{
					alert("资讯推送标题审核成功，马上进行推送！");
					$("#divAudit").dialog("close");
					
					var tr = obj.parentNode.parentNode;
					var id = customPush.id;
					var title = $.trim($(tr).find("td.w-pushTitle").text());
					var pushType = $("#pushtype_"+id).val();
					var tagName = $("#tag_"+id).val();
					var info = {};
					if(pushType==1){
						info.tagName = tagName;
					}else{
						info.tagName = "";
					}
					info.title = title;
					info.alert = title;
					//info.kaoshi_type = getExamtype(cid);
					info.msg_type = pushType; //1资讯2专题3分数4录取5招生答疑6院校答疑7事件8倒计时
					info.msg_id = id;
					info.kaoshi_type = $("#exam_"+id).val();
					if(pushType == 11){
						info.msg_id = tagName.split("_")[1];
					}
					info.isCustomPush = "1";
					var jsonstr = JSON.stringify(info);
					//alert(jsonstr);
					$.ajax({
						type: "post",
						url: "../../service/information/auraroPush",
						data: jsonstr,
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function(data, textStatus){
						if (data) {
							if (data.result == 0) {
								alert("资讯(" + title + ")推送成功!");
								doCustomPushAuditList(1);
							} else {
								errHandle(data.result, data.content);
							}
						} else {
							errHandle(-1);
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown){
						alert(errorThrown);
						errHandle(0, XMLHttpRequest.status);
					}
					});
				}
			}
		});
	});
	
	$("#btnPushAuditCancle").unbind("click").bind("click", function(){
		$("#divAudit").dialog("close");
	});
}
