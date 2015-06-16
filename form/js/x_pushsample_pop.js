
function doPushSampleList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").empty();
	
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
				atr += "<td align=\"center\"><a href=\"###\" onclick=\"hrefChoose('" 
							+ data[i].sample + "');return false;\">" 
							+ data[i].name + "&nbsp;</td>";
				atr += "<td align=\"center\">" + omit(data[i].sample, "") + "&nbsp;</td>";
				atr += "<td align=\"center\">" + getTime("dt14f", data[i].createtime) + "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doPushSampleList(?)", count, page);
			buildPagesStyle();
		});
	});
}