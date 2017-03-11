define(['jquery', 'nprogress', 'template', 'util'], function ($, Nprogress, template, util) {

    //调用进度条结束的方法
    Nprogress.done();

    //获取当前的课程id号
    var cs_id = util.queryUrl('cs_id');
     //获取课时id
    var ct_id;
    //获取课程信息，向lesson接口发送请求
    $.get('/v6/course/lesson', {cs_id: cs_id}, function (data) {
        if (data.code == 200) {
            //渲染模板
            $('.steps').html(template('add-step3-tpl', data.result));
            //设置当前的侧边栏为选中状态
            $('#course-aside a').removeClass('active').last().addClass('active');
            //获取当前的课时id
            ct_id=$('#editlesson').attr('data-ctId');


        }
    });
    //单击添加课时(由于是模板渲染的，需要事件委托)，触发modal弹出框
    $('.steps').on('click', '#addlesson', function () {
        //修改当前的操作为课时编辑
        $('#changeText').text('添加课程');
        //弹出模拟框
        $('#chapterModal').modal();
        //渲染数据
        $('#lesson-container').html(template('lesson-add-tpl', {}))

    });

    //单击编辑课时(由于是模板渲染的，需要事件委托)，触发modal弹出框
    $('.steps').on('click', '#editlesson', function () {
        //修改当前的操作为课时编辑
         $('#changeText').text('修改课程');
        //弹出模拟框
        $('#chapterModal').modal();
        //渲染数据
        $.get('/v6/course/chapter/edit',{ct_id:$(this).attr('data-ctId')},function(data){
              if(data.code==200){
                  $('#lesson-container').html(template('lesson-add-tpl', data.result));
              }
        })


    });

    //点击添加按钮时触发
    $('#addbtn').on('click', function () {
        if(ct_id){
            console.log($('#lesson-form').serialize()+('&ct_cs_id='+cs_id+'&ct_id='+ct_id));
            //编辑课时
            $.post('/v6/course/chapter/modify',$('#lesson-form').serialize()+('&ct_cs_id='+cs_id+'&ct_id='+ct_id),function(data){
                if(data.code==200){
                    location.reload();
                }
            })
        }else{
            //添加课时
            $.post('/v6/course/chapter/add', $('#lesson-form').serialize()+('&ct_cs_id='+cs_id), function (data) {
                if (data.code == 200) {
                    location.reload();
                }
            })
        }

    });

})