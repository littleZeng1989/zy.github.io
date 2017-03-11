define(['jquery','nprogress','template','util','ckeditor'],function($,Nprogress,template,util,ckeditor){

    //调用进度条结束的方法
    Nprogress.done();
    //获取当前课程的id
    var cs_id=util.queryUrl('cs_id');
    console.log(cs_id);
    //发送ajax请求获取数据
     $.ajax({
        url:'/v6/course/basic',
        type:'get',
        data:{cs_id:(+cs_id)},
        success:function(data){
          if(data.code==200){
              $('.steps').html(template('add-step1-tpl',data.result));
              //设置富文本编辑器
              var ck1=ckeditor.replace('ckeditor');
              //设置当前的侧边栏为选中状态
              $('#course-aside a').removeClass('active').first().addClass('active');

              //给顶级select注册change事件。当顶级选中时，获取到对应的子集数据
               $('#top-category').on('change',function(){
                   var cg_pid=$(this).val();
                   //获取子集
                   $.get('/v6/category/child',{cg_id:cg_pid},function(data){
                       if(data.code==200){
                         var source= '{{each list as value}}\
                       <option value="{{value.cg_id}}">{{value.cg_name}}</option>\
                           {{/each}}';
                          var render= template.compile(source);
                           $('#child-category').html(render({list:data.result}));
                       }
                   })
               });
              //当触发保存的时候，发送提交数据请求
              $('#step1-add-form').on('submit',function(){
                  //更新富文本的数据
                  ck1.updateElement();
                  console.log($(this).serialize()+('&cs_id='+cs_id));
                  var result=$(this).serialize()+('&cs_id='+cs_id);
                  $.post('/v6/course/update/basic',result,function(data){
                      if(data.code==200){
                          //响应成功，则跳转到step2
                          location.href='/html/course/course_add_step2.html?cs_id='+(data.result.cs_id);
                      }
                  })

              });


          }
        }
    })

})