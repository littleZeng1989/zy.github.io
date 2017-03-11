define(['jquery','nprogress'],function($,Nprogress){

    //调用进度条结束的方法
    Nprogress.done();


    //提交表单时触发
    $('#add-course-form').on('submit',function(){
        //发送ajax请求，创建课程
        $.post('/v6/course/create',$('#add-course-form').serialize(),function(data){
            (data.code==200) &&(location.href='/html/course/course_add_step1.html?cs_id='+data.result.cs_id);
        });
        return false;
    })


})