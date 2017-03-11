define(['jquery','nprogress'],function($,Nprogress){

    //调用进度条结束的方法
    Nprogress.done();

    console.log($('#repass-form').serialize());
    //修改密码
    $('#repass-form').on('submit',function(){
        $.ajax({
            url:'/v6/teacher/repass',
            type:'post',
            data:$('#repass-form').serialize(),
            success: function(data){
                if(data.code==200){
                    alert('修改密码成功!');
                    //退出登录
                    $('#logout').trigger('click');
                }
            },
            beforeSend:function(){
                if($('.passwordOne').val()!=$('.passwordTwo').val()){
                    alert('两次密码不一致请重新输入!');
                    return false;
                }
            }
        })
        return false;
    })



})