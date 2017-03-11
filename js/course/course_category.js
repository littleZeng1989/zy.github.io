define(['jquery','nprogress','template'],function($,Nprogress,template){

    //调用进度条结束的方法
    Nprogress.done();

    //获取分类列表信息,向服务器发送请求
    $.get('/v6/category',function(data){
        console.log(data);
        //判断是否响应成功
        if(data.code==200){
          //调用模板引擎，渲染数据
           var html= template('course-category-tpl',{list:data.result});
            //追加元素
            $('#course-category').html(html);
        }
    })


})