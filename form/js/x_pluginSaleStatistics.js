function iniPluginSaleStatisticsList() {
	//alert("d");
	$("#divTip").dialog( {
		autoOpen : false,
		height : 200,
		width : 550,
		modal : true,
		buttons : {}
	
	});
	$("#searchconds button").click(function() {
		var startTime = $("#startTime").val();
		var endTime=$("#endTime").val();
		if("" != startTime && "" != endTime)
		{
			if(startTime>endTime){
				alert("开始时间不能大于结束时间");
				return ;
			}
		}
		doPluginSaleStatisticsList(1);
	});
	doPluginSaleStatisticsTimeList(1);
}

function formatDate(myDate)
{
	 
	var year = myDate.getFullYear();
    var month = myDate.getMonth();
    var date = myDate.getDate();
    var returnDate;
    if(month < 10)
    {
    	returnDate = year + "-0" + (month+1);
	 }else
	 {
		 returnDate = year + "-" + (month+1);
	 }
    if(date < 10)
    {
    	returnDate = returnDate + "-0" + date
	 }else
	 {
		 returnDate = returnDate + "-" + date
	 }
    
    return returnDate;
}

//默认根据销售数量和当前时间排序
function doPluginSaleStatisticsTimeList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();

    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    var firstDay = formatDate(firstDay);  
    var lastDay = formatDate(lastDay);
    $("#startTime").val(firstDay);
 	$("#endTime").val(lastDay);
 	var startTime=$("#startTime").val();
 	var endTime=$("#endTime").val();
	$("#countId").val("1");
	var countId=$("#countId").val();
	var pluginSaleStatistics={};
	startTime += " 00:00:00";
	endTime += " 24:00:00";
	pluginSaleStatistics.startTime = startTime;
	pluginSaleStatistics.endTime = endTime;
	pluginSaleStatistics.flag=countId
	pluginSaleStatistics.pagestart = (page - 1) * sysPageSize;
	pluginSaleStatistics.pagesize= sysPageSize;
	PluginSaleStatisticsDS.countPluginSaleStatistics(pluginSaleStatistics, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		PluginSaleStatisticsDS.findAllPluginSaleStatisticsList(pluginSaleStatistics, function(data) {
			if (!data)
				return;
			for ( var i = 0; i < data.length; i++) {
				var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "")
						+ ">";
				if(data[i].orderNo!=null){
					atr += "<td align=\"center\">" + data[i].orderNo+ "&nbsp;</td>";
				}else{

					atr += "<td align=\"center\">" + " "
					+ "&nbsp;</td>";
				}
				if(data[i].productType == 1)
				{
					atr += "<td align=\"center\">" + data[i].pluginName
					+ "&nbsp;</td>";
				}else
				{
					atr += "<td align=\"center\">" + data[i].pluginPackageName
					+ "&nbsp;</td>";
				}
				if(data[i].thirdName!=null){
					atr += "<td align=\"center\">" + data[i].thirdName
					+ "&nbsp;</td>";
				}else{
					
					atr += "<td align=\"center\">" + " "
					+ "&nbsp;</td>";
				}
				atr += "<td align=\"center\">" + data[i].counts + "&nbsp;</td>";
				atr += "<td align=\"center\" nowrap>" + data[i].prices
						+ "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doPluginSaleStatisticsList(?)", count, page);
			buildPagesStyle();
		});
	});
}
//end
	

//默认根据销售数量排序
function doPluginSaleStatisticsList(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	var startTime=$("#startTime").val();
	var endTime=$("#endTime").val();
	startTime += " 00:00:00";
	endTime += " 24:00:00";
	$("#countId").val("1");
	var countId=$("#countId").val();
	var pluginSaleStatistics={};
	pluginSaleStatistics.startTime = startTime;
	pluginSaleStatistics.endTime = endTime;
	pluginSaleStatistics.flag=countId
	pluginSaleStatistics.pagestart = (page - 1) * sysPageSize;
	pluginSaleStatistics.pagesize= sysPageSize;
	PluginSaleStatisticsDS.countPluginSaleStatistics(pluginSaleStatistics, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		PluginSaleStatisticsDS.findAllPluginSaleStatisticsList(pluginSaleStatistics, function(data) {
			if (!data)
				return;
			for ( var i = 0; i < data.length; i++) {
				var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "")
						+ ">";
				if(data[i].orderNo!=null){
					atr += "<td align=\"center\">" + data[i].orderNo+ "&nbsp;</td>";
				}else{
					atr += "<td align=\"center\">" + "&nbsp;"+"</td>";
				}
				if(data[i].productType == 1)
				{
					atr += "<td align=\"center\">" + data[i].pluginName
					+ "&nbsp;</td>";
				}else if(data[i].productType == 0)
				{
					atr += "<td align=\"center\">" + data[i].pluginPackageName
					+ "&nbsp;</td>";
				}else{
					atr += "<td align=\"center\">" + "&nbsp;"+"</td>";
				}
				
				if(data[i].thirdName!=null){
					atr += "<td align=\"center\">" + data[i].thirdName
					+ "&nbsp;</td>";
				}else{
					
					atr += "<td align=\"center\">" + " "
					+ "&nbsp;</td>";
				}
				atr += "<td align=\"center\">" + data[i].counts + "&nbsp;</td>";
				atr += "<td align=\"center\" nowrap>" + data[i].prices
						+ "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doPluginSaleStatisticsList(?)", count, page);
			buildPagesStyle();
		});
	});
}
//销售金额
function doPluginSaleStatisticsLists(page) {
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	var startTime=$("#startTime").val();
	var endTime=$("#endTime").val();
	var pluginSaleStatistics={};
	pluginSaleStatistics.startTime = startTime;
	pluginSaleStatistics.endTime = endTime;
	

	$("#countId").val("0");
	var countId=$("#countId").val();
	pluginSaleStatistics.flag=countId
	pluginSaleStatistics.pagestart = (page - 1) * sysPageSize;
	pluginSaleStatistics.pagesize= sysPageSize;
	PluginSaleStatisticsDS.countPluginSaleStatistics(pluginSaleStatistics, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		PluginSaleStatisticsDS.findAllPluginSaleStatisticsList(pluginSaleStatistics, function(data) {
			if (!data)
				return;
			for ( var i = 0; i < data.length; i++) {
				var atr = "<tr" + (i % 2 == 0 ? " class=\"list-tr\"" : "")
						+ ">";
				if(data[i].orderNo!=null){
					atr += "<td align=\"center\">" + data[i].orderNo+ "&nbsp;</td>";
				}else{
					atr += "<td align=\"center\">" + "&nbsp;"+"</td>";
				}
				if(data[i].productType == 1)
				{
					atr += "<td align=\"center\">" + data[i].pluginName
					+ "&nbsp;</td>";
				}else if(data[i].productType == 0)
				{
					atr += "<td align=\"center\">" + data[i].pluginPackageName
					+ "&nbsp;</td>";
				}else{
					atr += "<td align=\"center\">" + "&nbsp;"+"</td>";
				}
				
				if(data[i].thirdName!=null){
					atr += "<td align=\"center\">" + data[i].thirdName
					+ "&nbsp;</td>";
				}else{
					
					atr += "<td align=\"center\">" + " "
					+ "&nbsp;</td>";
				}
				atr += "<td align=\"center\">" + data[i].counts + "&nbsp;</td>";
				atr += "<td align=\"center\" nowrap>" + data[i].prices
						+ "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doPluginSaleStatisticsList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function exportPluginSaleStatisticsExcel(){
	if (confirm("是否确认导出?")){
		  var form=$("<form>");//定义一个form表单
			form.attr("style","display:none");
			form.attr("target","");
			form.attr("method","post");
			
			var startTime = $("#startTime").val();
			var endTime=$("#endTime").val();
			if("" != startTime && "" != endTime)
			{
				if(startTime>endTime){
					alert("开始时间不能大于结束时间");
					return ;
				}
			}
			var countId=$("#countId").val();
			var curWwwPath=window.document.location.href;
		    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
			var pathName=window.document.location.pathname;
		    var pos=curWwwPath.indexOf(pathName);
		    //获取主机地址，如： http://localhost:8083
		    var localhostPaht=curWwwPath.substring(0,pos);
		    //获取带"/"的项目名，如：/uimcardprj
	    	var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	    	var url = localhostPaht + projectName + "/downServletTwo?startTime="+startTime+"&endTime="+endTime+"&flag="+countId;
	    	
			form.attr("action",url);
			$("body").append(form);//将表单放置在web中
			form.submit();
	
	} 
}








