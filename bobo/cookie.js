function setCookie(cName,value,n){
   	            var oDate=new Date();
   	            oDate.setDate(oDate.getDate()+n);
               document.cookie=cName+'='+value+';expires='+oDate;
                   }
   function getCookie(cName){
             var str=document.cookie.split('; ');
             for(var i=0;i<str.length;i++){
               var arr=str[i].split('=');
             	if(arr[0]==cName){
             		return arr[1];
             	          }
                    }
            }
   function removeCookie(cName){
           setCookie(cName,1,-1);
         }