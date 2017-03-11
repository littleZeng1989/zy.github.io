define([],function(){
    return{
        //创建一个方法，不传参数时返回url传递参数的对象，传递参数时返回对应的属性值
        queryUrl:  function(key){
        var href,tempArr,newArr=null,objSearch={};
        href=location.search;
        //截取？
        href=href.slice(1);
        //截取每个属性
        tempArr= href.split('&');
        console.log(tempArr);
        //遍历数组，获取到每一个属性以及属性值，并添加到对象中
        for(var i= 0,len=tempArr.length;i<len;i++){
            newArr=tempArr[i].split('=');
            objSearch[newArr[0]]=newArr[1];
        }
        //判断有没有参数传递，有则返回对应的属性值，无则返回对象
        return  arguments.length?objSearch[key]:objSearch;
    }


    }
})