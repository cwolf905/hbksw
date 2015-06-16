function initPluginThirdCollection()
{
	
	initThirdProvideSelect();
	initYearSelect();
	
	$("#collectionByMonth").attr("checked", true);
	var paramArray = new Array();
	var selectYear = $("#yearSelect").val();
	var selectThirdProvide = $("#thirdProvideSelect").val();
	paramArray.push(selectThirdProvide);
	paramArray.push(selectYear);
	generateChart(paramArray);
	
	//选择按年统计
	$("#collectionByYear").click(function(){
		
			var collectionTime = $('input:radio[name="collectionTime"]:checked').val();
			if("collectionByYear" == collectionTime)
			{
				var selectYear = $("#yearSelect").val();
				var selectThirdProvide = $("#thirdProvideSelect").val();
				//把数组中数据压出
				paramArray.pop();
				paramArray.pop();
				paramArray.push(selectThirdProvide);
				paramArray.push(null);
				generateChart(paramArray);
			}
	});
	//选择按月统计
	$("#yearSelect").change(function(){
		
		var collectionTime = $('input:radio[name="collectionTime"]:checked').val();
		if("collectionByMonth" == collectionTime)
		{
			var selectYear = $("#yearSelect").val();
			var selectThirdProvide = $("#thirdProvideSelect").val();
			//把数组中数据压出
			paramArray.pop();
			paramArray.pop();
			paramArray.push(selectThirdProvide);
			paramArray.push(selectYear);
			generateChart(paramArray);
		}
	});
	
	$("#thirdProvideSelect").change(function(){
		
		var collectionTime = $('input:radio[name="collectionTime"]:checked').val();
		
		if("collectionByYear" == collectionTime)
		{
			var selectYear = $("#yearSelect").val();
			var selectThirdProvide = $("#thirdProvideSelect").val();
			//把数组中数据压出
			paramArray.pop();
			paramArray.pop();
			paramArray.push(selectThirdProvide);
			paramArray.push(null);
			generateChart(paramArray);
		}else
		{
			var selectYear = $("#yearSelect").val();
			var selectThirdProvide = $("#thirdProvideSelect").val();
//			alert(selectYear +":"+ selectThirdProvide);
			//把数组中数据压出
			paramArray.pop();
			paramArray.pop();
			paramArray.push(selectThirdProvide);
			paramArray.push(selectYear);
			generateChart(paramArray);
		}
	});

	 
	
}

function initThirdProvideSelect()
{
	
	DWREngine.setAsync(false);
	PluginOrderInfoDS.findAllThrirdProvideList( function(data) {
		var supplierStr = "";
		for ( var i = 0; i < data.length; i++) {
			
			supplierStr += "<option value='" +data[i].id + "'>"+ data[i].name +"</option>";
		}
		//alert(supplierStr);
		$("#thirdProvideSelect").append(supplierStr);
	});
	$('thirdProvideSelect').prop('selectedIndex', 0)
	DWREngine.setAsync(true);
}

function initYearSelect()
{
	DWREngine.setAsync(false);
	AdminUserDS.initYearSelect(function(data)
			{
				var atr = "";
				for(var i = 0; i < data.length; i++)
				{
					atr += "<option value="+data[i]+">"+data[i]+"</option>"
				}
				$("#yearSelect").append(atr);
			});
	DWREngine.setAsync(true);	
	var yearNow = new Date().getFullYear();
	$("#yearSelect").val(yearNow);
}

function generateChart(paramArray)
{
	
	var dataChart = new Array();
	DWREngine.setAsync(false);
	PluginOrderInfoDS.generateChartData(paramArray, function(data){
		dataChart = data;
		}); 
	DWREngine.setAsync(true);
	
	var chart = new Highcharts.Chart({  
        chart: {  
            renderTo: 'container',  
            type: 'column',  
            events: {  
              load: function() {      
                  var series = this.series[0];  
                  setInterval(function() {  
                      var data = [];
                      if(null != dataChart)
                      {
                    	  for(var i = 0; i < dataChart.length; i++)
                    	  {
                    		  data.push(eval("["+dataChart[i]+"]"));
                    	  }
                      }
                      series.setData(data);  
                  }, 2000);  
              }  
          }  
        },  
        title: {  
            text: '<b>第三方销售金额统计</b>'  
        },  
        xAxis: {  
            categories: []  
        },  
        yAxis: {  
            min: 0,  
            title: {  
                text: '销售金额'  
            },  
            stackLabels: {  
                enabled: true,  
                style: {  
                    fontWeight: 'bold',  
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'  
                }  
            }  
        },  
        legend: {  
//            align: 'right',  
//            x: -100,  
//            verticalAlign: 'top',  
//            y: 20,  
//            floating: true,  
//            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',  
//            borderColor: '#CCC',  
//            borderWidth: 1,  
//            shadow: false
        	enabled: false
        },  
        tooltip: {  
            formatter: function() {  
                return '<b>'+ this.x +'</b><br/>'+  
                    this.series.name +': '+ this.y +'<br/>'+  
                    'Total: '+ this.point.stackTotal;  
            }  
        },  
        plotOptions: {  
            column: {  
                stacking: 'normal',  
                dataLabels: {  
                    enabled: true,  
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'  
                }  
            }  
        },  
        series: [{  
//            name: 'John',  
//            data: [5, 3, 4, 7, 2]  
        }]  
    });  
}

function initPluginOrderInfoList() {
	
	//lirongrong begin
	
	//var thrirdProvide = {};thrirdProvide,
	PluginOrderInfoDS.findAllThrirdProvideList( function(data) {
		var supplierStr = "";
		for ( var i = 0; i < data.length; i++) {
			
			supplierStr += "<option value='" +data[i].id + "'>"+ data[i].name +"</option>";
		}
		//alert(supplierStr);
		$("#supplierSelect").append(supplierStr);
	});
	
	
	//lirongrong endd
	
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
		doPluginOrderInfoList(1);
	});
	doPluginOrderInfoList(1);
}
function  doPluginOrderInfoAll(){
	
	$("#supplierSelect").val(-1);
	$("#startTime").val(null);
	$("#endTime").val(null);
	$("#txtMobileNo").val('');
	doPluginOrderInfoList(1);
	
}

function doPluginOrderInfoList(page) {
	$("#totalPriceDiv").remove();
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	
	//获得下拉框的值
	var thirdProvideId = $("#supplierSelect").val(); 
	var startTime = $("#startTime").val();
	var endTime=$("#endTime").val();
	var mobileNo = $("#txtMobileNo").val();
	
	//var supplierName=$("#supplierName");
	var pluginOrderInfo = {};
	pluginOrderInfo.userId = mobileNo;
	pluginOrderInfo.startTime = startTime;
	pluginOrderInfo.endTime = endTime;
	pluginOrderInfo.thirdProvideId = thirdProvideId;
	
	pluginOrderInfo.pagestart = (page - 1) * sysPageSize;
	pluginOrderInfo.pagesize= sysPageSize;
	
	PluginOrderInfoDS.countPluginOrderInfos(pluginOrderInfo, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
	PluginOrderInfoDS.findAllPluginOrderInfoList(pluginOrderInfo, function(data) {
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
				if(data[i].thirdName!=null){
					atr += "<td align=\"center\">" + data[i].thirdName+ "&nbsp;</td>";
				}else{
					atr += "<td align=\"center\">" + "&nbsp;"+"</td>";
				}
				
				if(data[i].pluginType == 0)
				{
					atr += "<td align=\"center\">" + "阅读式"+"</td>";
				}else if(data[i].pluginType == 1)
				{
					atr += "<td align=\"center\">" +"关卡式"+ "&nbsp;</td>";
				}
				else if(data[i].pluginType == null){
					atr += "<td align=\"center\">" +"&nbsp;"+ "&nbsp;</td>";
				}else{
					
					atr += "<td align=\"center\">" +"其他"+ "&nbsp;"+"</td>";
				}
				
				
				if(data[i].productType == 1)
				{
					atr += "<td align=\"center\">" + ((data[i].pluginName != null)?data[i].pluginName:'')
					+ "&nbsp;</td>";
				}else if(data[i].productType == 0){
					atr += "<td align=\"center\">" + ((data[i].pluginPackageName != null)?data[i].pluginPackageName:'') + "&nbsp;</td>";
				}
				else 
				{
					atr += "<td align=\"center\">" + "&nbsp;</td>";
				}
				
				
				if(data[i].orderTime != null)
				{
					atr += "<td align=\"center\">" + data[i].orderTime.substring(0,19) + "&nbsp;</td>";
					
				}else
				{
					atr += "<td align=\"center\">" + "&nbsp;</td>";
				}
				if(data[i].productType==0){
					atr += "<td align=\"center\">" + "是"
						+ "&nbsp;</td>";
				}else{atr += "<td align=\"center\">" + "否"
					+ "&nbsp;</td>";}
				
				if(data[i].userId != null)
				{
					atr += "<td align=\"center\" nowrap>" + data[i].userId + "&nbsp;</td>";
					
				}else
				{
					atr += "<td align=\"center\">" + "&nbsp;"+"</td>";
				}
				atr += "<td align=\"center\" nowrap>" + data[i].price
				+ "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			
			PluginOrderInfoDS.countPluginOrderPrice(pluginOrderInfo, function(data) {
				var totalPrice = "<div id='totalPriceDiv' style='float:left;'>"+"总价："+data+"</div>";
				$("#totalPrice").append(totalPrice);
			});
			
			buildListsStyle();
			buildPagesHTML("$doPluginOrderInfoList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function exportPluginOrderInfosExcelList(){
	
	var thirdProvideId = $("#supplierSelect").val(); 
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
		
		var supplierName=$("#supplierSelect").val();
		
		var curWwwPath=window.document.location.href;
	    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
		var pathName=window.document.location.pathname;
	    var pos=curWwwPath.indexOf(pathName);
	    //获取主机地址，如： http://localhost:8083
	    var localhostPaht=curWwwPath.substring(0,pos);
	    //获取带"/"的项目名，如：/uimcardprj
    	var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	
    	var url = localhostPaht + projectName + "/downServlet?startTime="+startTime+"&endTime="+endTime+"&thirdProvidId="+supplierName;
    	form.attr("action",url);
    	$("body").append(form);//将表单放置在web中
		form.submit();
	} 
}
