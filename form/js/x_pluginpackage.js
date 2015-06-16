
var dictCharge = {"0":"否", "1":"是"};
var dictIsdefault = {"0":"否", "1":"是"};
var dictRecommend = {"0":"否", "1":"是"};

function test(){
	alert("test");
}

function initPluginPackageList() {
	
	$("#divTip").dialog({
		autoOpen: false,
		height: 200,
		width: 550,
		modal: true,
		buttons: {}
	});
	$("#searchconds button").click(function() {
		doPluginPackageList(1);
	});
	doPluginPackageAll();
}

function doPluginPackageAll() {
	$("#txtName").val("");
	$("#packType").val(2);
	doPluginPackageList(1);
}

/**
 * 查询插件包列表
 * @param page
 * @return
 */
function doPluginPackageList(page) {
	//alert("@");
	$("#showlists").empty();
	$("#showpages").find("tr").eq(0).nextAll().remove();
	
	var name = $("#txtName").val();
	//var isVip = $("#packType").val();
	var pluginpackage = {};
	pluginpackage.name = name;
	//pluginpackage.isVip = isVip;
	pluginpackage.pagestart = (page - 1) * sysPageSize;
	pluginpackage.pagesize = sysPageSize;
	PluginPackageDS.countPluginPackages(pluginpackage, function(count) {
		if (count == 0) {
			buildListsBlankHTML();
			return;
		}
		PluginPackageDS.findPluginPackagesByPage(pluginpackage, function(data) {
			if (!data) 
				return;
			for (var i=0; i<data.length; i++) {
				var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
				atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].name + "&nbsp;</td>";
//				if(data[i].isVip == 1){
//					atr += "<td align=\"center\">" + "会员包" + "&nbsp;</td>";
//				}else if (data[i].isVip == 0){
//					atr += "<td align=\"center\">" + "插件包" + "&nbsp;</td>";
//				}
//				if(data[i].vipimg=="" || data[i].vipimg==null){
//					atr += "<td align=\"center\" nowrap>&nbsp;</td>";
//				}else{
//					atr += "<td align=\"center\"><img src=\"" 
//						+ data[i].vipimg + "\" width=\"32\" height=\"32\"/>&nbsp;</td>";
//				}
				atr += "<td align=\"center\" nowrap>" + omit(data[i].description) + "&nbsp;</td>";
				if(data[i].isfee == 1){
					atr += "<td align=\"center\" nowrap>" + "是" + "&nbsp;</td>";
				}else if(data[i].isfee == 0){
					atr += "<td align=\"center\" nowrap>" + "否" + "&nbsp;</td>";
				}
				atr += "<td align=\"center\" class='w-recommend'>" + getConfigTd(data[i].status, data[i].isfee, data[i].recommend) + "&nbsp;</td>";
				atr += "</tr>";
				$("#showlists").append(atr);
			}
			buildListsStyle();
			buildPagesHTML("$doPluginPackageList(?)", count, page);
			buildPagesStyle();
		});
	});
}

function getConfigTd(status, isfee, recommend) {
	var rok = false;
	var atd = "";
	rok = haveRight("pluginPackage.update");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefUpdate(this);return false;\">" : ">") 
		+ "<img src=\"../../css/former/images/edit" 
		+ (rok ? "" : "2") + ".gif\" title=\"" + (rok ? "修改" : "不可修改")
		+ "\" width=\"16\" height=\"16\"/></a>&nbsp;&nbsp;";
	rok = haveRight("pluginPackage.check");
	if(recommend == 0)
	{
		atd += "<a href=\"#\" onclick=\"hrefRecommend(this);return false;\">"
		+ "<img src=\"../../css/former/images/recommend.png\" title='推荐' width=\"16\" height=\"16\"/></a>&nbsp;";
	}else
	{
		atd += "<a href=\"#\" onclick=\"hrefCancleRecommend(this);return false;\">"
		+ "<img src=\"../../css/former/images/cancleRecommend.png\" title='取消推荐' width=\"16\" height=\"16\"/></a>&nbsp;";
	}
	rok = haveRight("pluginPackage.mamage");
	atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefManage(this);return false;\">" : ">") 
		+"<img src='../../css/former/images/content.png' title='插件管理'>"+"</a>&nbsp;&nbsp;";
	if(isfee == 1){
		atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefFee(this);return false;\">" : ">") 
		+"<img src='../../css/former/images/priceControl.png' title='收费定义'>"+"</a>&nbsp;&nbsp;";
	}
	if(status == 0){
		atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefRelease(this);return false;\">" : ">") 
		+"<img src='../../css/former/images/release.png' title='发布'>"+"</a>&nbsp;&nbsp;";
	}else if(status == 1){
		atd += "<a href=\"#\"" + (rok ? " onclick=\"hrefUnRelease(this);return false;\">" : ">") 
		+"<img src='../../css/former/images/dn.png' title=' 下架'>"+"</a>&nbsp;&nbsp;";
	}
	return atd;
}

function hrefRecommend(obj) 
{
	
	var tr = obj.parentNode.parentNode;
	var id = parseInt($.trim($(tr).find("td").eq(0).text()));
	var name = $.trim($(tr).find("td").eq(1).text());
	if(confirm("推荐" + name + "吗?"))
	{
		var pluginpackage = {};
		pluginpackage.id = id;
		pluginpackage.recommend = 1;
		PluginPackageDS.applyPluginPackageRecommend(pluginpackage, function(data) {
			if (data) 
			{
				alert("推荐成功!");
				doPluginPackageList(1);
			}
		});
	}
}

function hrefCancleRecommend(obj) 
{
	
	var tr = obj.parentNode.parentNode;
	var id = parseInt($.trim($(tr).find("td").eq(0).text()));
	var name = $.trim($(tr).find("td").eq(1).text());
	var pluginpackage = {};
	if(confirm("取消推荐" + name + "吗?"))
	{
		pluginpackage.id = id;
		pluginpackage.recommend = 0;
		PluginPackageDS.applyPluginPackageRecommend(pluginpackage, function(data) {
			if (data) 
			{
				alert("取消推荐成功!");
				doPluginPackageList(1);
			}
		});
	}
}

function getRecommendTd(recommend) {
	var atd = "";
	atd += (recommend == 0 ? "" : "<span style=\"color:red;\">")
		+ dictRecommend[recommend] 
		+ (recommend == 0 ? "" : "</span>");
	atd += "<label style=\"display:none\">" + recommend + "</label>";
	return atd;
}

/**
 * 初始化插件管理界面
 * @return
 */
function initPluginPackageManage(){
	$("#divTip").dialog({
		autoOpen: false,
		height: 200,
		width: 550,
		modal: true,
		buttons: {}
	});
	$("#xxxxxx button").click(function() {
		doPluginPackageManager();
	});
	var id = getArgFromHref("id");
	doPluginPackageManagerInfo(id);
}

/**
 * 插件管理界面提交
 * @return
 */
function doPluginPackageManager(){
	var name = $("#txtName").val();
	var description = $("#taDescription").val();
	var  pluginIds = "";
	$("input[name='select']").each(function(){
		var select = this.value;
		pluginIds += select + ",";
	});
	pluginIds = pluginIds.substring(0, pluginIds.length-1);
	var id = getArgFromHref("id");
	var pluginpackage = {};
	pluginpackage.id = id;
	pluginpackage.name = name;
	pluginpackage.description = description;
	pluginpackage.pluginids = pluginIds;
	pluginpackage.vipimg="";
	
	PluginPackageDS.managePluginPackage(pluginpackage, function(data)
	{
		if(data){
			alert("管理成功！");
			parent.removeTab("pluginPackageManage");
		}
	});
}

/**
 * 根据插件包ID加载插件管理界面信息
 * @return
 */
function doPluginPackageManagerInfo(id){
	
	//查询插件信息
	PluginPackageDS.getPluginPackage(id, function(data1){
		$("#txtName").val(data1.name);
		$("#taDescription").val(data1.description);
		//查询插件包中包含的插件列表
		PluginPackageDS.getPluginListByPluginIds(data1.pluginids, function(data){
			if (!data) 
				return;
			if (data.length == 0) {
				buildListsBlankHTML();
				return;
			}
			var dataSelect = data[0];
			var dataNotSelect = data[1];
			if(dataSelect != null){
				for (var i=0; i<dataSelect.length; i++) {
					if(dataSelect[i] != null)
					{
						var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + " id="+dataSelect[i].id+" >";
						atr += "<td align=\"center\">";
						atr += "<input type=\"checkbox\" id=\"select\"  pluginPackName="+dataSelect[i].name+" value="+dataSelect[i].id+" name=\"select\" pluginPackDesc="+dataSelect[i].description+" ></input>";
						atr += "<td align=\"center\">" + dataSelect[i].name + "&nbsp;</td>";
						atr += "<td align=\"center\">" + omit(dataSelect[i].description, "") + "&nbsp;</td>";
						atr += "</tr>";
						$("#showSelectlists").append(atr);
					}
				}
			}
			if(dataNotSelect != null){
				for (var i=0; i<dataNotSelect.length; i++) {
//					alert(dataNotSelect.length);
					if(dataNotSelect[i] != null)
					{
						//只有已发布和下架审核中的插件允许放入插件包中
						if(dataNotSelect[i].pluginStatus == 5 || dataNotSelect[i].pluginStatus == 6)
						{
							var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + " id="+dataNotSelect[i].id+" >";
							atr += "<td align=\"center\">";
							atr += "<input type=\"checkbox\"  id=\"notSelect\" pluginPackName="+dataNotSelect[i].name+" value="+dataNotSelect[i].id+" name=\"notSelect\" pluginPackDesc="+dataNotSelect[i].description+" ></input>";
							atr += "<td align=\"center\">" + dataNotSelect[i].name + "&nbsp;</td>";
							atr += "<td align=\"center\">" + omit(dataNotSelect[i].description, "") + "&nbsp;</td>";
							atr += "</tr>";
							$("#showNotSelectlists").append(atr);
						}
					}
				}
			}
		});
	});
}

/**
 * 查询左侧未选择列表
 * @return
 */
function doSearchNotSelectList(){
	
	//先做清除
	$("input[name='notSelect']").each(function(){
		var notSelect = this.value;
		$("#"+notSelect).remove();
	});
	var name = $("#txtSearchName").val();
	//再做添加
	var id = getArgFromHref("id");
	PluginPackageDS.getPluginPackage(id, function(data1){
		//查询插件包中包含的插件列表
		PluginPackageDS.getPluginListByPluginIds(data1.pluginids, function(data){
			if (!data) 
				return;
			if (data.length == 0) {
				buildListsBlankHTML();
				return;
			}
			var dataNotSelect = data[1];
			for (var i=0; i<dataNotSelect.length; i++) {
				
				//只有已发布和下架审核中的插件允许放入插件包中
				if(dataNotSelect[i].pluginStatus == 5 || dataNotSelect[i].pluginStatus == 6)
				{
					if(dataNotSelect[i].name.indexOf(name) >= 0){
						var flag = 1;
						$("input[name='select']").each(function(){
							var select = this.value;
							if(select == dataNotSelect[i].id){
								flag = 0;
								return;
							}
						});
						if(flag == 1)
						{
							var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + " id="+dataNotSelect[i].id+" >";
							atr += "<td align=\"center\">";
							atr += "<input type=\"checkbox\"  id=\"notSelect\" pluginPackName="+dataNotSelect[i].name+" value="+dataNotSelect[i].id+" name=\"notSelect\" pluginPackDesc="+dataNotSelect[i].description+" ></input>";
							atr += "<td align=\"center\">" + dataNotSelect[i].name + "&nbsp;</td>";
							atr += "<td align=\"center\">" + omit(dataNotSelect[i].description, "") + "&nbsp;</td>";
							atr += "</tr>";
							$("#showNotSelectlists").append(atr);
						}
					}
				}
			}
		});
	});
	
}

/**
 * 左移
 * @param obj
 * @return
 */
function toLeft(obj){
	
	//选中左移
	$("input[name='select']:checked").each(function(){
		var select = this.value;
		var pluginPackName = $(this).attr("pluginPackName");
		var pluginPackDesc = $(this).attr("pluginPackDesc");
		var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") +" id="+select+" >";
		atr += "<td align=\"center\">";
		atr += "<input type=\"checkbox\"  id=\"notSelect\" pluginPackName="+pluginPackName+" value="+select+" name=\"notSelect\" pluginPackDesc="+pluginPackDesc+" ></input>";
		atr += "<td align=\"center\">" + pluginPackName + "&nbsp;</td>";
		atr += "<td align=\"center\">" + omit(pluginPackDesc, "") + "&nbsp;</td>";
		atr += "</tr>";
		$("#"+select).remove();
		$("#showNotSelectlists").append(atr);
	});
	 //全部左移
	 if(obj ==true){
		 $("input[name='select']").each(function(){
			 var select = this.value;
			 var pluginPackName = $(this).attr("pluginPackName");
			 var pluginPackDesc = $(this).attr("pluginPackDesc");
			 var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") +" id="+select+" >";
			 atr += "<td align=\"center\">";
			 atr += "<input type=\"checkbox\"  id=\"notSelect\" pluginPackName="+pluginPackName+" value="+select+" name=\"notSelect\" pluginPackDesc="+pluginPackDesc+" ></input>";
			 atr += "<td align=\"center\">" + pluginPackName + "&nbsp;</td>";
			 atr += "<td align=\"center\">" + omit(pluginPackDesc, "") + "&nbsp;</td>";
			 atr += "</tr>";
			 $("#"+select).remove();
			 $("#showNotSelectlists").append(atr);
		 });
	 }
}

function toRight(obj){
	//选中右移
	$("input[name='notSelect']:checked").each(function(){
		var notSelect = this.value;
		var pluginPackName = $(this).attr("pluginPackName");
		var pluginPackDesc = $(this).attr("pluginPackDesc");
		var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") +" id="+notSelect+" >";
		atr += "<td align=\"center\">";
		atr += "<input type=\"checkbox\"  id=\"select\" pluginPackName="+pluginPackName+" value="+notSelect+" name=\"select\" pluginPackDesc="+pluginPackDesc+" ></input>";
		atr += "<td align=\"center\">" + pluginPackName + "&nbsp;</td>";
		atr += "<td align=\"center\">" + omit(pluginPackDesc, "") + "&nbsp;</td>";
		atr += "</tr>";
		$("#showSelectlists").append(atr);
		$("#"+notSelect).remove();
	});
	 //全部右移
	 if(obj ==true){
		 $("input[name='notSelect']").each(function(){
			 var notSelect = this.value;
			 var pluginPackName = $(this).attr("pluginPackName");
			 var pluginPackDesc = $(this).attr("pluginPackDesc");
			 var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") +" id="+notSelect+" >";
			 atr += "<td align=\"center\">";
			 atr += "<input type=\"checkbox\"  id=\"select\" pluginPackName="+pluginPackName+" value="+notSelect+" name=\"select\" pluginPackDesc="+pluginPackDesc+" ></input>";
			 atr += "<td align=\"center\">" + pluginPackName + "&nbsp;</td>";
			 atr += "<td align=\"center\">" + omit(pluginPackDesc, "") + "&nbsp;</td>";
			 atr += "</tr>";
			 $("#showSelectlists").append(atr);
			 $("#"+notSelect).remove();
		 });
	 }
}

function hrefManage(obj){
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("pluginPackageManage", "插件管理", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["pluginPackageManage"], "?id=" + id);
}

function hrefRelease(obj){
	
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	
	PluginPackageDS.releasePluginPackage(id,function(data){
		
		if(data){
			alert("发布成功！！");
			doPluginPackageList(1)
		}
	});
}

function hrefUnRelease(obj){
	
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	
	PluginPackageDS.unReleasePluginPackage(id,function(data){
		
		if(data){
			alert("取消发布成功！！");
			doPluginPackageList(1)
		}
	});
}

function hrefUpdate(obj) {
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("pluginPackageUpdate", "修改插件包信息", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["pluginPackageUpdate"], "?id=" + id);
}

function hrefDelete(obj) {
	var tr = obj.parentNode.parentNode;
	var $td = $(tr).find("td");
	var id = $.trim($td.eq(0).text());
	var name = $.trim($td.eq(1).text());
	if (confirm("是否确认删除该插件包(" + name + ")?")) {
		PluginPackageDS.deletePluginPackage(id, function(data){
			if (data) {
				alert("删除插件包(" + name + ")成功!");
				doPluginPackageList(1);
			}
		});
	}
}

/**
 * 跳转到收费定义界面
 * @param obj
 * @return
 */
function hrefFee(obj){
	var tr = obj.parentNode.parentNode;
	var id = $.trim($(tr).find("td").eq(0).text());
	var idx = parent.addTab("pluginPackageFeeDefi", "收费定义", "?id=" + id);
	if (idx == -1)
		return;
	hrefHandle(parent.frames["pluginPackageFeeDefi"], "?id=" + id);
}

/**
 * 初始化插件包收费定义界面
 * @return
 */
function initPluginPackageFeeDefi(){
	//下拉框值start
	PluginPackageDS.findPrices( function(datas){
		var supplierStr =" ";
		for ( var i = 0; i < datas.length; i++) {
			supplierStr += "<option value='" +datas[i].price + "'>"+ datas[i].price +"元"+"</option>";
		}
		$("#buyAsForverPrice").append(supplierStr);
		$("#buyAsTimesPrice").append(supplierStr);
	});
	//下拉框的值end
	$("button[name=btnSubmit]").click(function(){
		doPluginPackageFee();
	});
	doPluginPackageFeeDefiBefore();
}

function doPluginPackageFee(){
	
	//验证价格
	var match = /^\d{0,8}\.{0,1}(\d{1,2})?$/;
	//正整数
	var timeMatch = /^[1-9]\d*$/;
	//插件包Id
	var id = getArgFromHref("id");
	//先清空数据
	PluginPackageDS.delectBuyWayASPluginPackage(id, function(data){
		
	});
	
	var productBuyWayList = [];
	//判断是否需要永久性购买
	if($("#buyAsForver").prop("checked") == true){
		var buyAsForverPrice = $("#buyAsForverPrice").val();
		//var buyAsForverPrice= $("#buyAsForverPrice").find("option:selected").val();
		if(buyAsForverPrice.length<=0){
			alert("请填写金额！");
			return;
		}
		if(buyAsForverPrice != null){
			if(!match.test(buyAsForverPrice)){
				alert("请输入正确价格-'永久性购买'！");
				return;
			}
			var productBuyWay = {};
			productBuyWay.productId = id;
			productBuyWay.buyWay = "永久性购买";
			productBuyWay.price = buyAsForverPrice;
			productBuyWay.productType = 0;
			productBuyWay.buyMonth = -1;
			
			productBuyWayList.push(productBuyWay);
		}
	}
	
	//判断是否需要按月购买
	if($("#buyAsMonth").prop("checked") == true){
		
		$("input[name='buyWayMonth']").each(function(){
			
			var price = this.nextSibling.nextSibling.value;
			var month = this.value;
			if(month.length <= 0){
				alert("请填写时间月份！");
				return false;
			}
			if(null != month)
			{
				if(!timeMatch.test(month)){
					alert("请输入正确的时间月份！");
					return;
				}
			}
			if(price.length<=0){
				alert("请填写金额！");
				return;
			}
			if(price != null){
				if(!match.test(price)){
					alert("请输入正确价格-'按月购买'！");
					return;
				}
				var productBuyWay = {};
				productBuyWay.productId = id;
				productBuyWay.buyWay = this.value + "个月";
				productBuyWay.buyMonth = this.value;
				productBuyWay.price = price;
				productBuyWay.productType = 0;
				
				productBuyWayList.push(productBuyWay);
			}
		});
	}
	
	//判断是否需要一次性购买
	if($("#buyAsTimes").prop("checked") == true){
		var buyAsTimesPrice = $("#buyAsTimesPrice").val();
		if(buyAsTimesPrice.length<=0){
			alert("请填写金额！");
			return;
		}
		if(buyAsTimesPrice != null){
			if(!match.test(buyAsTimesPrice)){
				alert("请输入正确价格-'一次性购买'！");
				return;
			}
			var productBuyWay = {};
			productBuyWay.productId = id;
			productBuyWay.buyWay = "一次性购买";
			productBuyWay.price = buyAsTimesPrice;
			
			productBuyWay.productType = 0;
			productBuyWay.buyMonth = 0;
			
			productBuyWayList.push(productBuyWay);
		}
	}
	if(productBuyWayList=="")
	{
		alert("请填写收费定义信息！");
		return;
	}
	PluginPackageDS.definePluginPackFee(productBuyWayList, function(data){
		if(data){
			alert("插件包收费定义成功！");
			parent.removeTab("pluginPackageFeeDefi");
		}
	});
}
var j=0;
function addBuyWayAsMonth(){
	
	j++;
	var atr = "<div>";
	atr += "<input type='text' size='2' name='buyWayMonth' id='mon' value=''/>个月" //+
		//   "<input type='text' size='5' name='buyWayMonthPrice' />元";
	atr += "<select id="+j+" name="+j+">"+
				"<option value='-1' selected=''>--请选择价格--</option>"+
		   "</select>";
	atr += "<span style='color: red' onclick='deleteBuyWayAsMonth(this)'>—</span>";
	atr += "</div>";
	$("#buyWayByMonth").append(atr);
	//下拉框值start
	PluginPackageDS.findPrices( function(datas){
		var supplierStr =" ";
		for ( var i = 0; i < datas.length; i++) {
			supplierStr += "<option value='" +datas[i].price  + "'>"+ datas[i].price +"元"+"</option>";
		}
		$("#"+j+"").append(supplierStr);
		
	});
	//下拉框的值end
}

function deleteBuyWayAsMonth(obj){
	
	var parentNode = obj.parentNode;
	var childs = parentNode.childNodes;    
	for(var i = childs.length-1;i >= 0;i--)
	{    
		parentNode.removeChild(childs.item(i));    
	}   
}

/**
 * 初始化插件列表数据
 * @return
 */
function doPluginPackageFeeDefiBefore(){
	//alert(5);
	var id = getArgFromHref("id");
	
	PluginPackageDS.getPluginPackage(id, function(data1){
		$("#packageName1").html(data1.name);
		$("#packageName2").html(data1.name);
	});
	
	PluginPackageDS.getPluginListByPluginPackId(id, function(data){
			if (!data) 
				return;
			if (data.length == 0) {
				buildListsBlankHTML();
				return;
			}
			for (var i=0; i<data.length; i++) {
				var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + " id="+data+" >";
				atr += "<td align=\"center\">" + data[i].id + "&nbsp;</td>";
				atr += "<td align=\"center\">" + data[i].name + "&nbsp;</td>";
				atr += "<td align=\"center\">" + omit(data[i].description, "") + "&nbsp;</td>";
				if(data[i].isfee == 1){
					atr += "<td align=\"center\">" + "是" + "&nbsp;</td>";
				}else{
					atr += "<td align=\"center\">" + "否" + "&nbsp;</td>";
				}
				atr += "</tr>";
				$("#showlists").append(atr);
			}
	});
	
	
	PluginPackageDS.getProductBuywayByPluginPackId(id, function(data){
		
		var count = 0;
		for(var i = 0; i < data.length; i++)
		{
			if(data[i].buyMonth == 0)
			{
				$("#buyAsTimesPrice").val(data[i].price);
				$("#buyAsTimes").attr("checked", true);
			}else if(data[i].buyMonth == -1)
			{
				$("#buyAsForverPrice").val(data[i].price);
				$("#buyAsForver").attr("checked", true);
			}else if(data[i].buyMonth > 0)
			{
				count ++;
				$("#buyAsMonth").attr("checked", true);
				var atr = "<div>";
			
				//atr += "<input type='text' size='2' value="+data[i].buyMonth+" name='buyWayMonth'/>个月<input type='text' size='5' value="+data[i].price+" name='buyWayMonthPrice' />元";
				atr += "<input type='text' size='2' value="+data[i].buyMonth+" name='buyWayMonth'/>个月";
				atr += "<select id="+data[i].id+" name='buyAsMonths'>"+
							"<option value='-1' selected=''>--请选择价格--</option>"+
					  "</select>";
				atr += "<span style='color: red' onclick='deleteBuyWayAsMonth(this)'>—</span>";
				atr += "</div>";
				$("#buyWayByMonth").append(atr);
				
					var selectId = data[i].id;
					//alert("");
					
				DWREngine.setAsync(false);
				//下拉框值start
				var supplierStr =" ";
				PluginPackageDS.findPrices( function(datas){
					for ( var i = 0; i < datas.length; i++) {
						supplierStr += "<option value="+datas[i].price+">"+ datas[i].price +"元"+"</option>";
					}
					
					
					$("#"+selectId).append(supplierStr);
					
				});
				DWREngine.setAsync(true);
				//下拉框的值end
				$("#"+selectId).val(data[i].price);
			}
		}
		
		
		
		if(count == 0)
		{
			//alert("ee");
			var atr = "<div>";
			atr += "<input type='text' size='2' name='buyWayMonth'/>个月";
			atr += "<select id='buyAsMonths' name='buyAsMonths'>"+
					"<option value='-1' selected=''>--请选择价格--</option>"+
				 "</select>";
			atr += "<span style='color: red' onclick='deleteBuyWayAsMonth(this)'>—</span>";
			atr += "</div>";
			$("#buyWayByMonth").append(atr);
			
			//下拉框值start
			var supplierStr ="";
			PluginPackageDS.findPrices( function(datas){
				for ( var i = 0; i < datas.length; i++) {
					supplierStr += "<option value='" +datas[i].price  + "'>"+ datas[i].price +"元"+"</option>";
				}
				
				$("#buyAsMonths").append(supplierStr);
				
			});
		}
//		$("#550").val(6);
	})
	
}

function hrefAdd() {
	if (!haveRight("pluginPackage.add")) {
		alert("相关操作的权限不足!");
		return;
	}
	var idx = parent.addTab("pluginPackageAdd", "新增插件包");
	if (idx == -1)
		return;
	parent.frames["pluginPackageAdd"].doPluginPackageBeforeAdd();
}

//function hrefAdd() {
//	if (!haveRight("pluginPackage.add")) {
//		alert("相关操作的权限不足!");
//		return;
//	}
//	var idx = parent.addTab("pluginPackageAdd", "新增插件包");
//	if (idx == -1)
//		return;
//	parent.frames["pluginPackageAdd"].doPluginPackageBeforeAdd();
//}

var pluginPackageForm = new autoForm("#frmPluginPackage");

function initPluginPackageAdd() {
	
	$("#txtJpg").uploadify({
		"uploader" : "../../uploadify?type=pluginPackagePicture",
	    "swf" : "../../jquery/uploadify/uploadify.swf",
		"queueID" : "divJpg",
		"multi": false,
		"fileSizeLimit" : "1MB",
		"buttonText" : "添加文件",
		"width":"60",
		"height":"20",
        "fileTypeDesc" : "所有文件",
        "fileTypeExts" : "*.*",
		"onSelectError" : function(file, errorCode, errorMsg) {
			if (errorCode == -110)
				alert("文件大小超过限制(1MB)!");
			else if (errorCode == -120)
				alert("文件内容为空，请重新选择!");
		},
		"onUploadSuccess" : function(file, data, response) {
			var img = $("#txtPicture").val();
			var newimg = getWebAddr("/html/") + "/uploadify/pluginPackagePicture/" + decodeURI(data);
			if (img && newimg != img) {
				img = img.substr(img.lastIndexOf("/") + 1);
				PluginPackageDS.deletePluginPictureFile("pluginPackagePicture", img, function(code) {});
			}
			$("#txtPicture").val(newimg);
		},
		"onUploadError": function(file, errorCode, errorMsg){
			alert("文件" + file.name + "上传失败!");
		}
	});
	
	$("#packType").change(function(){
		var packType = this.value;
		if(packType == 0){
			$("#vipPicture").hide();
			$("#trJpg").hide();
		}else{
			$("#vipPicture").show();
			$("#trJpg").show();
		}
		
	});
	
	$("button[name=btnSubmit]").click(function(){
		doPluginPackageAdd();
	});
	doPluginPackageBeforeAdd();
}

function doPluginPackageBeforeAdd() {
	var pluginpackage = {};
	pluginpackage.name = "";
	pluginpackage.description = "";
	pluginPackageForm.init(pluginpackage);
	//createTblPlugin("");
	//默认为插件包的时候屏蔽上传vip图片功能
	$("#vipPicture").hide();
	$("#trJpg").hide();
}

function createTblPlugin(pluginids) {
	$("#tblPlugin").find("tr").eq(0).nextAll().remove();
	
	var pluginids = pluginids.split(",");
	var plugin = {};
	PluginDS.findAllPlugins(plugin, function(data) {
		if (!data) 
			return;
		if (data.length == 0) {
			buildListsBlankHTML();
			return;
		}
		for (var i=0; i<data.length; i++) {
			var atr = "<tr" + (i%2==0 ? " class=\"list-tr\"" : "") + ">";
			atr += "<td align=\"center\">" 
				+ getChkTd(data[i].id, pluginids, (i%2==0 ? "background-color:#ffe4ca" : "")) + "&nbsp;</td>";
			atr += "<td align=\"center\">" + data[i].name + "&nbsp;</td>";
			atr += "<td align=\"center\">" + omit(data[i].description, "") + "&nbsp;</td>";
			atr += "<td align=\"center\">" + dictCharge[data[i].charge] + "&nbsp;</td>";
			//atr += "<td align=\"center\">" + omit(data[i].chargemark, "") + "&nbsp;</td>";
			atr += "<td align=\"center\">" + data[i].favor + "&nbsp;</td>";
			atr += "<td align=\"center\">" + getIsDefaultTd(data[i].isdefault) + "&nbsp;</td>";
			atr += "<td align=\"center\">" + getTime("dt8f", data[i].begintime, true) + "&nbsp;</td>";
			atr += "<td align=\"center\">" + getTime("dt8f", data[i].expiredate, true) + "&nbsp;</td>";
			atr += "<td align=\"center\">" + getRecommendTd(data[i].recommend) + "&nbsp;</td>";
			atr += "</tr>";
			$("#tblPlugin").append(atr);
		}
	});
}

function getChkTd(id, pluginids, bgcolor) {
	var atd = "";
	var str = pluginids.inArray(id) ? " checked" : "";
	atd += "<input type=\"checkbox\" style=\"border:0px;" + bgcolor + "\" value=\"" + id + "\"" + str + "/>";
	return atd;
}

function getIsDefaultTd(isdefault) {
	var atd = "";
	atd += (isdefault == 0 ? "" : "<span style=\"color:red;\">")
		+ dictIsdefault[isdefault] 
		+ (isdefault == 0 ? "" : "</span>");
	return atd;
}

function getRecommendTd(recommend) {
	var atd = "";
	atd += (recommend == 0 ? "" : "<span style=\"color:red;\">")
		+ dictRecommend[recommend] 
		+ (recommend == 0 ? "" : "</span>");
	return atd;
}

function doPluginPackageAdd() {
	if (!pluginPackageForm.valid()) {
		return false;
	}
	var pluginpackage = pluginPackageForm.toBean();
	pluginpackage.name = $("#txtName").val();
	
	//var packTypeStr = $("#packType").val();
	//pluginpackage.isVip = $("#packType").val();
	//将插件包类型全部默认为“插件包”，暂时取消“会员包”
	pluginpackage.isVip = 0;
	
	if($("input[name='isFee']").prop("checked") == true){
		pluginpackage.isfee = 1;
	}else{
		pluginpackage.isfee = 0;
	}
	
	pluginpackage.vipimg = $("#txtPicture").val();
	
	pluginpackage.description = $("#taDescription").val();
	pluginpackage.pluginids = "";
	PluginPackageDS.addPluginPackage(pluginpackage, function(data) {
		if (data) {
			alert("新增插件包成功!");
			//doPluginPackageList(1);
			parent.removeTab("pluginPackageAdd");
		}
	});
}

function getPluginids() {
	var pluginids = "";
	$("#tblPlugin").find("input:checkbox").each(function() {
		var chk = $(this).prop("checked");
		if (chk) 
			pluginids += "," + $(this).val();
	});
	if (pluginids.length > 0)
		pluginids = pluginids.substr(1);
	return pluginids;
}

function initPluginPackageUpdate() {
	
	$("#txtJpg").uploadify({
		"uploader" : "../../uploadify?type=pluginPackagePicture",
	    "swf" : "../../jquery/uploadify/uploadify.swf",
		"queueID" : "divJpg",
		"multi": false,
		"fileSizeLimit" : "1MB",
		"buttonText" : "添加文件",
		"width":"60",
		"height":"20",
        "fileTypeDesc" : "所有文件",
        "fileTypeExts" : "*.*",
		"onSelectError" : function(file, errorCode, errorMsg) {
			if (errorCode == -110)
				alert("文件大小超过限制(1MB)!");
			else if (errorCode == -120)
				alert("文件内容为空，请重新选择!");
		},
		"onUploadSuccess" : function(file, data, response) {
			var img = $("#txtPicture").val();
			var newimg = getWebAddr("/html/") + "/uploadify/pluginPackagePicture/" + decodeURI(data);
			if (img && newimg != img) {
				img = img.substr(img.lastIndexOf("/") + 1);
				PluginPackageDS.deletePluginPictureFile("pluginPackagePicture", img, function(code) {});
			}
			$("#txtPicture").val(newimg);
		},
		"onUploadError": function(file, errorCode, errorMsg){
			alert("文件" + file.name + "上传失败!");
		}
	});
	
	$("#packType").change(function(){
		var packType = this.value;
		if(packType == 0){
			$("#vipPicture").hide();
			$("#trJpg").hide();
		}else{
			$("#vipPicture").show();
			$("#trJpg").show();
		}
		
	});
	
	$("button[name=btnSubmit]").click(function(){
		doPluginPackageUpdate();
	});
	var id = getArgFromHref("id");
	doPluginPackageBeforeUpdate(id);
}

function doPluginPackageBeforeUpdate(id) {
	PluginPackageDS.getPluginPackage(id, function(data){
		if (data) {
			pluginPackageForm.init(data);
			$("#txtPicture").val(data.vipimg);
			$("#packType").val(data.isVip);
			if(data.isVip == 0){
				$("#vipPicture").hide();
				$("#trJpg").hide();
			}
			
			if(data.isfee == 1){
				$("#isFee").attr("checked", "checked");
				//$("#trJpg").hide();
			}
			//createTblPlugin(data.pluginids);
		}
	});
}

function doPluginPackageUpdate() {
	if (!pluginPackageForm.valid()) {
		return;
	}
	var pluginpackage = pluginPackageForm.toBean();
	var isVip = $("#packType").val();
	var vipPicture = "";
	if(isVip == 1){
		vipPicture = $("#txtPicture").val();
	}
	//pluginpackage.isVip = isVip;
	pluginpackage.isVip = 0;
	pluginpackage.vipimg = vipPicture;
	
	if($("input[name='isFee']").prop("checked") == true){
		pluginpackage.isfee = 1;
	}else{
		pluginpackage.isfee = 0;
	}
	//pluginpackage.pluginids = getPluginids();
	PluginPackageDS.updatePluginPackage(pluginpackage, function(data) {
		if (data) {
			alert("修改插件包信息成功!");
			parent.removeTab("pluginPackageUpdate");
		}
	});
}