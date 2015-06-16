
function doCollegeAll() {
	$("#txtSchoolName").val("");
	$("#selT").val("0");
	doCollegeList(1);
}

function doCollegeList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").remove();
	
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
						atr += "<td align=\"center\"><a href=\"###\" onclick=\"hrefChoose('" 
							+ data[i].cid + "','" + data[i].schoolName + "');return false;\">" 
							+ data[i].schoolName + "&nbsp;</td>";
						atr += "<td align=\"center\">" + data[i].type1 + "&nbsp;</td>";
						atr += "<td align=\"center\">" + data[i].type2 + "&nbsp;</td>";
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