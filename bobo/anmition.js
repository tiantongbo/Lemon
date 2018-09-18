function  getStyle(obj,attr) {
    if(obj.currentStyle){
         return obj.currentStyle[attr];
    }
    return getComputedStyle(obj,null)[attr];
}
function startMove(obj,json,fn) {
    clearInterval(obj.timer);
      obj.timer=setInterval(function () {
        var flag=true;
        for(var attr in json){
            if(attr=='opacity'){
                var iCur=parseInt(getStyle(obj,'opacity')*100);
            }else{
                var iCur=parseInt(getStyle(obj,attr));
            }
            var iTarget=json[attr];
            var speed=(iTarget-iCur)/7;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            if(attr=='opacity'){
                obj.style.opacity=(iCur+speed)/100;
                obj.style.filter="alpha(opacity="+(iCur+speed)+")";
            }else {
                obj.style[attr] = iCur + speed + "px";
            }
            if(iCur!=iTarget) {
                flag = false;
            }
        }
            if(flag){
                clearInterval(obj.timer);
                 if(fn){
                    fn();
                }
            }

    },200)
}



