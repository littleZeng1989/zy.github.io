define(['jquery','nprogress','template'],function($,Nprogress,template){

    //调用进度条结束的方法
    Nprogress.done();
    //发送ajax请求
    $.get('/v6/course',function(data){
        console.log(data);
        if(data.code==200){
            var html=template('course-list-tpl',{list:data.result});
            $('.course-list-container').html(html);
        }
    })

})