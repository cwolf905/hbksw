function initPluginCollectionAsThird()
{
	
	initYearSelect();
	initMonthSelect();
	
	$("#collectionByMonth").attr("checked", true);
	var paramArray = new Array();
	var selectYear = $("#yearSelect").val();
	var monthSelect = $("#monthSelect").val();
	paramArray.push(selectYear);
	paramArray.push(monthSelect);
	generateChart(paramArray);
	
	//选择按年统计
	$("#collectionByYear").click(function(){
		
			var collectionTime = $('input:radio[name="collectionTime"]:checked').val();
			if("collectionByYear" == collectionTime)
			{
				var selectYear = $("#yearSelect").val();
				var monthSelect = $("#monthSelect").val();
				//把数组中数据压出
				paramArray.pop();
				paramArray.pop();
				paramArray.push(selectYear);
				paramArray.push(null);
				generateChart(paramArray);
			}
	});
	//选择按月统计
	$("#monthSelect").change(function(){
		
		var collectionTime = $('input:radio[name="collectionTime"]:checked').val();
		if("collectionByMonth" == collectionTime)
		{
			var selectYear = $("#yearSelect").val();
			var monthSelect = $("#monthSelect").val();
			//把数组中数据压出
			paramArray.pop();
			paramArray.pop();
			paramArray.push(selectYear);
			paramArray.push(monthSelect);
			generateChart(paramArray);
		}
	});
	
	$("#yearSelect").change(function(){
		
		var collectionTime = $('input:radio[name="collectionTime"]:checked').val();
		
		if("collectionByYear" == collectionTime)
		{
			var selectYear = $("#yearSelect").val();
			var monthSelect = $("#monthSelect").val();
			//把数组中数据压出
			paramArray.pop();
			paramArray.pop();
			paramArray.push(selectYear);
			paramArray.push(null);
			generateChart(paramArray);
		}else
		{
			var selectYear = $("#yearSelect").val();
			var monthSelect = $("#monthSelect").val();
			//把数组中数据压出
			paramArray.pop();
			paramArray.pop();
			paramArray.push(selectYear);
			paramArray.push(monthSelect);
			generateChart(paramArray);
		}
	});

	 
	
}

function initMonthSelect()
{
	
	var supplierStr = "";
	for ( var i = 1; i <= 12; i++) {
		
		supplierStr += "<option value='" + i + "'>"+ i +"</option>";
	}
	
	$("#monthSelect").append(supplierStr);
	$("#monthSelect").val(new Date().getMonth() + 1);
	//
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
	PluginOrderInfoDS.generatePieChartData(paramArray, function(data){
		
		dataChart = data;
		var chart = new Highcharts.Chart({  
	        chart: {  
	            renderTo: 'container',  
	            type: 'area',  
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
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.y}</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }

	                },
	                //showInLegend: true
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: '销售金额',
	            data: []
	        }]
	    }); 
		}); 
	DWREngine.setAsync(true);
	

	
}