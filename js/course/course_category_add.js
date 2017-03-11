define(['jquery', 'nprogress', 'template', 'util'], function ($, Nprogress, template, util) {

    //调用进度条结束的方法
    Nprogress.done();

    //判断传过来是否有参数，有代表了修改，没有代表了添加
    var cg_id = util.queryUrl('cg_id');
    console.log(cg_id);
    if (cg_id) {
        //表示是修改数据，先发送请求获取一下数据
        $.get('/v6/category/edit', {cg_id: cg_id}, function (data) {
            console.log(data);
            if (data.code == 200) {
                var html = template('category-add-tpl', data.result);
                $('.category-add').html(html);
            }
        });

    } else {
        //表示是添加数据
        //获取表单的数据，发送ajax请求,添加课程分类
        $.get('/v6/category/top', function (data) {
            console.log(data);
            if (data.code == 200) {
                //渲染模板
                var html = template('category-add-tpl', {top: data.result});
                console.log(html);
                $('.category-add').html(html);
            }
        });

    }

    //由于表单是动态生成的，所以，应该使用事件委托
    $('.category-add').on('submit', function () {
         console.log($('.category-form-add').serialize());
        //发送ajax请求，添加数据
        $.ajax({
            url:  '/v6/category/'+(cg_id?'modify':'add'),
            type:'post',
            data: $('.category-form-add').serialize()+'&cg_id='+(cg_id?cg_id:''),
            success:function(data){
                console.log(data);
                if (data.code == 200) {
                    location.href = '/html/course/course_category.html';
                }
            }
        });
        return false;
    });


})