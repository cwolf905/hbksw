function selecttype(pid,name) {
	var atr = "<input name=\"savetype\" class=\"n_ptype\" categoryId=\""+pid+"\" onclick=\"notselecttype('"+pid+"','"+name+"')\" id=c_n_"+pid+" value="+name+"></input>";
	$("#c_"+pid).remove();
	$("#saveplugintype").append(atr);
}

function selectlabel(pid,name) {
	var atr = "<input name=\"savelabel\" class=\"n_plabel\" tagId=\""+pid+"\" onclick=\"notselectlabel('"+pid+"','"+name+"')\" id=t_n_"+pid+" value="+name+"></input>";
	$("#t_"+pid).remove();
	$("#savepluginlabel").append(atr);
}

function notselecttype(pid,name) {
	var atr = "<input class=\"ptype\" onclick=\"selecttype('"+pid+"','"+name+"')\" id=c_"+pid+" value="+name+"></input>";
	$("#c_n_"+pid).remove();
	$("#plugintype").append(atr);
}

function notselectlabel(pid,name) {
	var atr = "<input class=\"plabel\" onclick=\"selectlabel('"+pid+"','"+name+"')\" id=t_"+pid+" value="+name+"></input>";
	$("#t_n_"+pid).remove();
	$("#pluginlabel").append(atr); 
}
	

	
	
	
	
	
	