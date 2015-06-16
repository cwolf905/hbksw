function initPluginOrderStatisticList() {
	
	
	
	// 查询提供方begin
	PluginOrderStatisticDs.findAllThrirdProvideList( function(data) {
		var supplierStr = "<option value='-1'>--全部--</option>";
		for ( var i = 0; i < data.length; i++) {
			
			supplierStr += "<option value='" +data[i].id + "'>"+ data[i].name +"</option>";
		}
		//alert(supplierStr);
		$("#supplierSelect").html(supplierStr);
	});
	//查询提供方end
	
	//查询全部插件名start
	PluginOrderStatisticDs.findAllPluginNameList(function(data){
		var pluginNamesStr="<option value='-1'>--全部--</option>" ;
		for ( var i = 0; i < data.length; i++) {
			
			pluginNamesStr += "<option value='" +data[i].id + "'>"+ data[i].name +"</option>";
		}
		$("#pluginNames").html(pluginNamesStr);
	});
	//查询全部插件名end
	
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
		doPluginOrderStatisticList(1);
	});
	doPluginOrderStatisticList(1);
}

function  doPluginOrderStaticAll(){
	$("#doPluginOrderStaticAll").val("");
	$("#startTime").val(null);
	$("#endTime").val(null);
	$("#supplierSelect").val(-1);
	$("#pluginNames").val(-1);
	 doPluginOrderStatisticList(1);
	
}

function doPluginOrderStatisticList(page) {
	$("#totalPriceDivs").remove();
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();

	var startTime = $("#startTime").val();
	var endTime=$("#endTime").val();
	//获得下拉框提供方的值
	var id= $("#supplierSelect").find("option:selected").val();
	//获得下拉框插件名的值
	var  ids=$("#pluginNames").find("option:selected").val();
	//alert(ids);
	var pluginOrderStatistic = {};
	pluginOrderStatistic.startTime = startTime;
	pluginOrderStatistic.endTime = endTime;
	pluginOrderStatistic.pagestart = (page - 1) * sysPageSize;
	pluginOrderStatistic.pagesize= sysPageSize;
	pluginOrderStatistic.thirdProvideId=id;
	pluginOrderStatistic.pluginNameId=ids;
	PluginOrderStatisticDs.countPluginOrderStatistics(pluginOrderStatistic, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		PluginOrderStatisticDs.findAllPluginOrderStatisticList(pluginOrderStatistic, function(data) {
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
				if(data[i].pluginName!=null){
					atr += "<td align=\"center\">" + data[i].pluginName
					+ "&nbsp;</td>";
				}else{
					atr += "<td align=\"center\">" + " "
					+ "&nbsp;</td>";
				}
				atr += "<td align=\"center\">" + data[i].counts
						+ "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].prices + "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			//alert("55");
			PluginOrderStatisticDs.pluginPricetotal(pluginOrderStatistic, function(data) {
				var totalPrices = "<div id='totalPriceDivs'>"+"总价："+data+"</div>";
				$("#totalPrices").html(totalPrices);
			});
			buildListsStyle();
			buildPagesHTML("$doPluginOrderStatisticList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function exportPluginOrderStatisticExcel(){
	if (confirm("确定到导出吗")){
			/*var startTime = $("#startTime").val();
			var endTime=$("#endTime").val();
			//获得下拉框的值
			var id= $("#supplierSelect").find("option:selected").val();
			var pluginOrderStatistic = {};
			pluginOrderStatistic.startTime = startTime;
			pluginOrderStatistic.endTime = endTime;
			pluginOrderStatistic.thirdProvideId=id;
			//调用后台的下载方法dexportPluginOrderInfosExcel
			PluginOrderStatisticDs.exportPluginOrderStatisticExcelList(pluginOrderStatistic,function(data){
				if(data=="ok"){
					alert("已成功下载到c盘  请到c盘查看");
				}
			});   
	*/
		
		
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
			//获得下拉框提供方的值
			var id= $("#supplierSelect").find("option:selected").val();
			//获得下拉框插件名的值
			var  ids=$("#pluginNames").find("option:selected").val();
			var curWwwPath=window.document.location.href;
		    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
			var pathName=window.document.location.pathname;
		    var pos=curWwwPath.indexOf(pathName);
		    //获取主机地址，如： http://localhost:8083
		    var localhostPaht=curWwwPath.substring(0,pos);
		    //获取带"/"的项目名，如：/uimcardprj
	    	var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	    	var url = localhostPaht + projectName + "/downServletThree?startTime="+startTime+"&endTime="+endTime+"&thirdProvideId="+id+"&pluginNameId="+ids;
	        //form.attr("action","http://localhost:8080/hbksy/downServletThree?startTime="+startTime+"&endTime="+endTime+"&thirdProvideId="+id+"&pluginNameId="+ids);
			form.attr("action",url);
			$("body").append(form);//将表单放置在web中
			form.submit();
			
			
	} 
}
