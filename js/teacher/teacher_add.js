define(['jquery','nprogress','util','template','datepicker','datelanguage'],
    function($,Nprogress,util,template,undefined,undefined){

    //console.log(util);
    // console.log(datepicker);
    //调用进度条结束的方法
    Nprogress.done();

    //根据列表传来的tc_id来编辑讲师信息
     var tc_id=util.queryUrl('tc_id');
     //根据id来判断是编辑讲师还是要添加讲师
    if(tc_id){
        //发送ajax请求，获取当前讲师的信息，并展示到表单中
        $.get('/v6/teacher/edit',{tc_id:tc_id},function(data){
            //判断是否成功响应
            if(data.code==200){
                //调用模板引擎，并渲染
              var html= template('teacher-form-tpl',data.result);
                //追加到dom中
                $('.teacher-add').html(html);
                console.log();
                $('.datepicker').datepicker({
                    language:'zh-CN',
                    endDate:new Date(),
                    format:'yyyy-mm-dd'
                });
            }
        })
    }else{
        //调用模板引擎，并渲染,显示空白的表单
        var html= template('teacher-form-tpl',{});
        //追加到dom中
        $('.teacher-add').html(html);
        $('.datepicker').datepicker({
            language:'zh-CN',
            endDate:new Date(),
            format:'yyyy-mm-dd',
            todayHighlight:true
        });
    }

    //监听表单提交事件，根据是否是有tc_id来发送不同的ajax请求
    //由于表单是动态生成的，所以绑定事件是需要事件委托来绑定
    $('.teacher-add').on('submit',function(){
          //console.log('提交了');
         //console.log($('#teacher_add_form').serialize());
        //发送ajax有两种情况，一种是添加发送的ajax请求，一种是编辑的功能
        console.log(tc_id);
        $.ajax({
            url:'/v6/teacher/'+(tc_id?'update':'add'),
            data:tc_id?$('#teacher_add_form').serialize()+'&tc_id='+tc_id:$('#teacher_add_form').serialize(),
            success:function(data){
                if(data.code==200){
                    //跳转页面到用户列表
                    location.href='/html/teacher/teacher_list.html';
                }
            }
        });
        return false;
    })

    //获取用户输入的添加讲师的信息
    /* $('#teacher-add-form').on('submit',function(){
     //获取用户输入的数据，并向后台发送请求
     $.post('/v6/teacher/add',$('#teacher-add-form').serialize(),function(data){
     if(data.code==200){
     //添加成功
     location.href='/html/teacher/teacher_list.html';
     }
     });
     //通过ajax方式发送请求
     /!*$.ajax({
     url:'/v6/teacher/add',
     type:'post',
     data:$('#teacher-add-form').serialize(),
     success:function(data){
     if(data.code==200){
     location.href='/html/teacher/teacher_list.html';
     }
     }
     })*!/
     return false;
     })*/
})