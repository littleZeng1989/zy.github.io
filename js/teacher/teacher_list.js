define(['jquery', 'nprogress', 'template'], function ($, Nprogress, template) {
    //调用进度条结束的方法
    Nprogress.done();

    //向服务器发送一个get的ajax请求
    $.get('/v6/teacher',function(data){
        //判断是否成功响应
        if(data.code==200){
            console.log(data);
          var str=  template('teacher-list-tpl',{list:data.result});

        }
        //将数据渲染出来
     $('#teacher-list').html(str);
    });

    //判断是否查看链接的点击事件,由于其是动态生成的，所以应该通过事件委托来注册事件，否则注册时会找不到那个元素
    $('#teacher-list').on('click','.teacher-see',function(){
        var tc_id=$(this).parent().attr('data-id');
        console.log(tc_id);
         //向后台发送ajax请求
        $.get('/v6/teacher/view',{tc_id:tc_id},function(data){
            if(data.code==200){
                console.log(data.result);
                //渲染模板并展示出来
                $('#teacherModal').html(template('teacher-info-tpl',data.result));
            }

        })
    })

    //开启或者注销讲师
    $('#teacher-list').on('click','.teacher-switch',function(){
        var $self=$(this);
        var tc_id=$(this).parent().attr('data-id');
        //向后台发送ajax请求
        $.post('/v6/teacher/handle',{tc_id:tc_id,tc_status:$(this).parent().attr('data-status')},function(data){
            console.log(data.result);
            if(data.code==200){
        /*
                 $self.html($self.parent().attr('data-status')==0?'开启':'注销');
                 $self.parent().attr('data-status',$self.parent().attr('data-status')=='0'?'1':'0');*/
                //1修改模板里的注销按钮里的值
                $self.html(data.result.tc_status==0?'开启':'注销');
                //2更新当前的tc_status的状态
                $self.parent().attr('data-status',data.result.tc_status);
            }

        })
    })
})