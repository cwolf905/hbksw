function initPluginPackageList() {
	
	//alert("22");
	
//lirongrong begin
	
	//插件包名
	pluginOrderPackageDs.findAllPluginPackageNameList( function(data) {
		//alert("22");
		var pluginPackagestr = "<option value='-1'>--全部--</option>";
		for ( var i = 0; i < data.length; i++) {
			pluginPackagestr += "<option value='" +data[i].id + "'>"+ data[i].name +"</option>";
		}
		//alert(supplierStr);
		$("#pluginPackage").html(pluginPackagestr);
	});
	//lirongrong end
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
		doPluginPackageList(1);
	});
	doPluginPackageList(1);
}
function  doPluginPackageAll(){
	$("#doPluginPackageAll").val("");
	$("#pluginPackage").val(-1);
	$("#startTime").val(null);
	$("#endTime").val(null);
	doPluginPackageList(1);
}

function doPluginPackageList(page) {
	$("#totalPriceDivs").remove();
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	var startTime = $("#startTime").val();                   
	var endTime=$("#endTime").val();
	//获得下拉框插件包名的值
	var id= $("#pluginPackage").find("option:selected").val();
	var pluginOrderStatistic = {};
	pluginOrderStatistic.startTime = startTime;
	pluginOrderStatistic.endTime = endTime;
	pluginOrderStatistic.pluginPackageNameId=id;
	//alert(id);
	pluginOrderStatistic.pagestart = (page - 1) * sysPageSize;
	pluginOrderStatistic.pagesize= sysPageSize;
	pluginOrderPackageDs.countPluginPackages(pluginOrderStatistic, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		pluginOrderPackageDs.findAllPluginPackageList(pluginOrderStatistic, function(data) {
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
				if(data[i].pluginPackageName!=null){
					atr += "<td align=\"center\">" + data[i].pluginPackageName
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
			pluginOrderPackageDs.pluginPricetotal(pluginOrderStatistic, function(data) {
				var totalPrices = "<div id='totalPriceDivs'>"+"总价："+data+"</div>";
				$("#totalPrices").html(totalPrices);
			});
			buildListsStyle();
			buildPagesHTML("$doPluginPackageList(?)", count, page);
			buildPagesStyle();
		});
	});
}
function exportPluginPackageExcel(){
	
	/*if (confirm("确定到导出吗")){
			var startTime = $("#startTime").val();
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
			});   */
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
		
		var id= $("#pluginPackage").find("option:selected").val();
		var curWwwPath=window.document.location.href;
	    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
		var pathName=window.document.location.pathname;
	    var pos=curWwwPath.indexOf(pathName);
	    //获取主机地址，如： http://localhost:8083
	    var localhostPaht=curWwwPath.substring(0,pos);
	    //获取带"/"的项目名，如：/uimcardprj
    	var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
		
    	var url = localhostPaht + projectName + "/downServletFour?startTime="+startTime+"&endTime="+endTime+"&pluginPackageNameId="+id;
    	
//form.at  tr("action","http://localhost:8080/hbksy/downServletFour?startTime="+startTime+"&endTime="+endTime+"&pluginPackageNameId="+id);
		form.attr("action",url);
		$("body").append(form);//将表单放置在web中
		form.submit();
			
	} 

