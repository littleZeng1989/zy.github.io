define(['jquery', 'nprogress', 'template', 'util', 'uploadify'],
    function ($, Nprogress, template, util, undefined) {

        //调用进度条结束的方法
        Nprogress.done();

        var cs_id = util.queryUrl('cs_id');
        //发送ajax请求picture
        $.get('/v6/course/picture', {cs_id: cs_id}, function (data) {
            if (data.code == 200) {
                $('.steps').html(template('add-step2-tpl', data.result));
                //设置当前的侧边栏为选中状态
                $('#course-aside a').removeClass('active').eq(1).addClass('active');

                //设置上传图片
                $('#upfile').uploadify({
                    swf: '/lib/uploadify/uploadify.swf',
                    uploader:'/v6/uploader/cover',
                    buttonText:'选择图片',
                    fileObjName:'cs_cover_original',
                    fileTypeExts: '*.gif; *.jpg; *.png',
                    fileSizeLimit:'2MB',
                    width:'100%',
                    height:'100%',
                    buttonClass:'btn btn-success btn-sm',
                    formData:{cs_id:cs_id},
                    'itemTemplate' : '<p></p>',
                    onUploadSuccess:function(file,data){
                        console.log(file);
                        var newData=JSON.parse(data);
                        $('#showImage').attr('src',newData.result.path);
                    }
                });
            }

        })


    })