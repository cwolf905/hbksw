
function initPluginStatusList() {
		$("#divTip").dialog({
			autoOpen: false,
			height: 550,
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
	plugin.pluginStatus = 1;//过滤插件状态
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
				atr += "<td align=\"center\" nowrap>" + getStatusActionTd(data[i].name,data[i].pluginType,data[i].pluginStatus) + "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doPluginStatusList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function getStatusActionTd(name,pluginType,pluginStatus) {
	var rok = false;
	var atd = "";
	rok = haveRight("plugin.update");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefUpdate(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/edit" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "修改" : "不可修改") 
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	rok = haveRight("plugin.check");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefReview(this,'"+pluginType+"','"+name+"');return false;\">" : ">")
			+ "<img src=\"../../css/former/images/" 
			+ (pluginStatus == 1 ? "review" : "cancleReview")
			+ (rok ? "" : "2") + ".png\" title=\"" + (rok ? "" : "不可") 
			+ (pluginStatus == 1 ? "审核" : "取消审核")
			+ "\" width=\"16\" height=\"16\"/></a>&nbsp;";
	/*atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefpluginStatus(this,'"+name+"');return false;\">" : ">")
		+"<img src=\"../../css/former/images/up.gif\" title=\"发布\" width=\"16\" height=\"16\"/></a>&nbsp";*/
	return atd;
}

function hrefReview(obj,pluginType,name) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("pluginreview", "插件信息审核", "?id=" + id+"&pluginType="+pluginType+"&name="+name);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["pluginreview"], "?id=" + id+"&pluginType="+pluginType+"&name="+name);
}

function hrefpluginStatus(obj,name) {
	var tr = obj.parentNode.parentNode;
	var id = parseInt($.trim($(tr).find("td").eq(0).text()));
	var plugin = {};
	plugin.id = id;
	plugin.pluginStatus = 6;
	//alert("确定发布"+name+"吗？");
	PluginDS.applyPluginStatus(plugin, function(data) {
		if (data) {
			alert("待发布成功！");
			parent.callRefresh("pluginStatuslist");
		}
	});
}

