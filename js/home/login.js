define(['jquery','jqueryCookie','nprogress'],function($,undefined,Nprogress){

     //如果之前用户已经登录过了，显示用户的历史头像
     var userMeg=$.cookie('userInfo');
    //console.log(userMeg);
     try{
         userMeg= JSON.parse(userMeg);
     }catch(e){
         userMeg={};
     }
    //console.log(userMeg.tc_avatar);
     //设置用户的头像
     $('.login img').attr('src',userMeg.tc_avatar?userMeg.tc_avatar:'/images/default.png');

    //监听表单的submit事件，并发送一个ajax请求，阻止默认跳转行为
    $('#form_login').on('submit',function(){
        console.log($(this).serialize());
        $.ajax({
            url:'/v6/login',
            type:'post',
            //将表单序列化:tc_name=xxx&tc_pass=xxx格式
            data:$(this).serialize(),
            success:function(data){
                console.log(data);
               if(data.code==200){
                   //先把后台返回的数据用cookie存储起来
                   //默认存储为当前的路径:/html/home
                   $.cookie('userInfo',JSON.stringify(data.result),{
                       path:'/'
                   });
                   //登录成功则跳转到首页
                    location.href='/';
               }
            },
            error:function(){
              alert('出错了！')
            }
        });

        //取值默认跳转事件
        return false;
    });

   //调用进度条结束的方法
    Nprogress.done();

})