define(['jquery', 'nprogress', 'template', 'uploadify', 'datepicker', 'datelanguage', 'region', 'ckeditor','jqueryCookie'],
    function ($, Nprogress, template, undefined, datepicker, undefined, undefined, ckeditor,undefined) {

        //调用进度条结束的方法
        Nprogress.done();

        //发送ajax请求 获取当前用户的数据
        $.get('/v6/teacher/profile', function (data) {
            if (data.code == 200) {
                console.log(data.result);
                //渲染模板
                $('.settings').html(template('settings-from-tpl', data.result));

                //由于模板是动态生成的，所以要在回调函数里面调用以下方法

                // 1配置日期插件
                $('.datepicker').datepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    endDate: new Date()
                });

                //2配置三级联动插件
                $('#region').region({
                    url: '/lib/region/region.json'
                });

                //3图片上传
                $('#upfile').uploadify({
                    swf: '/lib/uploadify/uploadify.swf',
                    uploader: '/v6/uploader/avatar',
                    fileObjName: 'tc_avatar',
                    buttonText: '',
                    height: $('.preview').height(),
                    fileTypeExts: '*.gif; *.jpg; *.png',
                    onUploadSuccess: function (file, data) {
                        console.log(data);
                        var newData = JSON.parse(data);
                        console.log(newData);
                        //设置当前的头像为上传之后的头像
                        $('.uploadImg').attr('src', newData.result.path);
                        //设置侧边栏的头像为当前的头像
                        $('#touxiang img').attr('src',newData.result.path);
                        //$.cookie('userInfo',newData.result.path);
            }
                });

                //4富文本编辑器
                console.log(ckeditor);
                var ck1 = ckeditor.replace('ckeditor');
                //  console.log(ck1);

                //5监听表单的提交事件，发送ajax请求，进行对用户数据进行修改
                $('#settings-form').on('submit', function () {
                    //map返回的是伪数组
                    var arr = $('.hometown select').map(function (val, i) {
                        return $(this).find('option:selected').text();
                    })
                    //console.log(arr);
                    var hometown = arr.toArray().join('|');
                    //console.log(hometown);
                    console.log($(this).serialize() + ('&tc_hometown=' + hometown));
                    //更新绑定的textarea文本框的文本数据
                    ck1.updateElement();
                    //发送ajax请求
                    $.post('/v6/teacher/modify', $(this).serialize() + ('&tc_hometown=' + hometown), function (data) {
                        if (data.code == 200) {
                            //重新刷新页面
                            window.location.reload();
                        }
                    });
                    return false;
                })

                $('.resetPass').on('click', function () {
                    window.location.href = '/html/home/repass.html';
                })

            }
        })

    })