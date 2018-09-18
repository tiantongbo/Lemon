function ajax(obj){
	var promise=new Promise(function(resolve,reject){	
 
    //实例化一个ajax对象
	if(window.XMLHttpRequest){
		var xhr=new XMLHttpRequest();
	}else{
		var xhr=new ActiveXObject('Microsoft.XMLHTTP');
       //var xhr =new ActiveXobject('Msxml2.XMLHTTP');
	}
	
	//监听状态改变
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status>=200||status<=300){
				var data=xhr.responseText;
					resolve(data);//回调函数处理数据
			}else{
				reject()
			}
		}else{
			reject()
		}
	};
	//处理数据
	var str='';
	for(var key in obj.data){
		str+=key+'='+obj.data[key]+'&';
	}
//	 str=str.replace(/&$/,'');
      str=str.substring(0,str.length-1);
	if(obj.type.toLowerCase()=='get'){
		if(obj.data){
			 var url=obj.url+'?'+str;
		}else{
			var url=obj.url;
		}	
		xhr.open('get',url,true); 
		xhr.send();
	}
//  xhr.open('get/post',url,true);
  if(obj.type.toLowerCase()=='post'){
  	 xhr.open('post',obj.url,true);
  	 xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  	 xhr.send(str);
  }	
});
	 return promise;
}
