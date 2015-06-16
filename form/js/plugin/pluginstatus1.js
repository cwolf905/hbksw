
function initPluginStatusList() {
		$("#divTip").dialog({
			autoOpen: false,
			height: 200,
			width: 550,
			modal: true,
			buttons: {}
		});
		$("#searchconds button").click(function() {
			doPluginStatusList(1);
		});
		doPluginStatusList(1);
}

function doPluginStatusAll() {
	$("#txtName").val("");
	doPluginStatusList(1);
}

function doPluginStatusList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	
	var name = $("#txtName").val();
	var plugin = {};
	plugin.name = name;
	plugin.pluginStatus = 5;//过滤插件状态
	plugin.pagestart = (page - 1) * sysPageSize;
	plugin.pagesize = sysPageSize;
	PluginDS.countPlugins(plugin, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		PluginDS.findPluginsByPage(plugin, function(data) {
			if (!data) 
				return;
			for (var i=0; i<data.length; i++) {
				var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
				atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].name + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].provider + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-pluginStatus\">" 
					+ getPluginStatus(data[i].pluginStatus) + "&nbsp;</td>";
				atr += "<td align=\"center\">" + omit(data[i].description, "") + "&nbsp;</td>";
				atr += "<td align=\"center\" class=\"w-pluginType\">" 
					+ getPluginType(data[i].pluginType) + "&nbsp;</td>";
				atr += "<td align=\"center\">" + dictCharge[data[i].isfee] + "&nbsp;</td>";
				atr += "<td align=\"center\" nowrap>" + getStatusActionTd(data[i].name,data[i].cancleMsg) + "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doPluginStatusList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function getStatusActionTd(name,canclemsg) {
	var rok = false;
	var atd = "";
	rok = haveRight("plugin.update");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefUpdate(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/edit" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "修改" : "不可修改") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	/*rok = haveRight("plugin.check");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefpluginStatus(this,'"+name+"');return false;\">" : ">")
		+"<img src=\"../../css/former/images/down.gif\" title=\"下架\" width=\"16\" height=\"16\"/></a>&nbsp";*/
	rok = haveRight("plugin.manage2");
	atd += "<a href=\"#\"" + (true ? " onclick=\"downmess(this,'"+canclemsg+"','"+name+"');return false;\">" : ">")
		+"<img src=\"../../css/former/images/review.png\" title=\"审核\" width=\"16\" height=\"16\"/></a>&nbsp";
	return atd;
}

function hrefpluginStatus(obj,name) {
	var tr = obj.parentNode.parentNode;
	var id = parseInt($.trim($(tr).find("td").eq(0).text()));
	var plugin = {};
	plugin.id = id;
	plugin.pluginStatus = 3;
	//alert("确定下架"+name+"吗？");
	PluginDS.applyPluginStatus(plugin, function(data) {
		if (data) {
			alert("下架成功！");
			parent.callRefresh("pluginStatuslist1");
		}
	});
}

function downmess(obj,mess,name){
		$("#mess").remove();
		var atr = "<textarea rows=\"2\" style=\"width:100%;resize:none;\" id=\"mess\" readonly>"+mess+"</textarea>";
		$("#tdTip").append(atr);
		$("#divTip").dialog({
				autoOpen: false,
				height: 200,
				width: 550,
				modal: true,
				buttons:{"下架":function(){
											var tr = obj.parentNode.parentNode;
											var id = parseInt($.trim($(tr).find("td").eq(0).text()));
											var plugin = {};
											plugin.id = id;
											plugin.pluginStatus = 3;
											PluginDS.applyPluginStatus(plugin, function(data) {
												if (data) {
													alert("下架成功！");
													parent.callRefresh("pluginStatuslist1");
												}
											});
											$(this).dialog("close");
										},
						"关闭":function(){$(this).dialog("close");}
						}
			}).dialog("open");
		$("#ui-id-1").text("插件下架审核");
}

