requirejs.config({
    baseUrl: '/',
    paths: {
        //第三方库
        jquery: 'node_modules/jquery/dist/jquery.min',
        bootstrap: 'node_modules/bootstrap/dist/js/bootstrap.min',
        echarts: 'lib/echarts/echarts.min',
        jqueryCookie: 'lib/jquery-cookie/jquery.cookie',
        template:'node_modules/art-template/dist/template',
        nprogress:'lib/nprogress/nprogress',
        util:'js/common/util',
        datepicker:'lib/bootstrap-datepicker/js/bootstrap-datepicker.min',
        datelanguage:'lib/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        uploadify:'lib/uploadify/jquery.uploadify',
        region:'lib/region/jquery.region',
        ckeditor:'lib/ckeditor/ckeditor',


        // 配置用户信息的js
        userlist: 'js/user/user_list',
        userprofile: 'js/user/user_profile',

        //配置课程信息的js
        course_add: 'js/course/course_add',
        course_add_step1: 'js/course/course_add_step1',
        course_add_step2: 'js/course/course_add_step2',
        course_add_step3: 'js/course/course_add_step3',
        course_category: 'js/course/course_category',
        course_category_add: 'js/course/course_category_add',
        course_list: 'js/course/course_list',
        course_topic: 'js/course/course_topic',

        //配置教师信息的js
        teacher_add: 'js/teacher/teacher_add',
        teacher_list: 'js/teacher/teacher_list',

        //配置登录的js
        login: 'js/home/login',
        repass: 'js/home/repass',
        settings: 'js/home/settings',

        //配置首页的js
        index: 'js/common/index',
        common: 'js/common/common'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: '$'
        },
        //datepicker是依赖于bootstrap来实现的
        datelanguage:{
            deps:['jquery','datepicker']
        },
        //uploadify图片上传也是非define模块
        uploadify:{
            deps:['jquery']
        },
        //富文本编辑器,非模块块第三方
        ckeditor:{
            exports: 'CKEDITOR'
        }
    }
});
//最先加载进度条插件
require(['nprogress'],function(NProgress){
    //加载进度条
    NProgress.start();
});

//所有都是依赖于bootstrap、jq、common
require(['jquery', 'bootstrap', 'common']);
//根据url来判断不同的模块加载不同的js
//沙箱模式
(function (w) {
    //获取到每个页面的目录路径
    var path = w.location.pathname;

    //判断当前是否已经有cookie，如果没有表明没有登录成功
    //登录页处理：判断是否有cookie，有了则跳转首页
    //非登录页处理：判断是否有cookie，没有则跳转登录页
    //加载js模块
    require(['jquery', 'jqueryCookie'], function ($, undefined) {
        var cookies = $.cookie('PHPSESSID')
        //判断当前页面是否是登录页
        if (path == '/html/home/login.html' && cookies) {
            //跳转回首页
            location.href = '/';
        }else if(path != '/html/home/login.html'&&!cookies){
            location.href = '/html/home/login.html';
        }

    })
    //根据不同的路径加载其网页对应的js
    switch (path) {
        case "/html/user/user_list.html":
            require(['userlist']);
            break;
        case "/html/user/user_profile.html":
            require(['userprofile']);
            break;

        case "/":
            require(['index']);
            break;

        case "/html/teacher/teacher_list.html":
            require(['teacher_list']);
            break;
        case "/html/teacher/teacher_add.html":
            require(['teacher_add']);
            break;

        case "/html/course/course_add.html":
            require(['course_add'], function () {
                //$('.toggle').css('display', 'block');
            });
            break;
        case "/html/course/course_add_step1.html":
            require(['course_add_step1'], function () {
                //$('.toggle').css('display', 'block');
            });
            break;
        case "/html/course/course_add_step2.html":
            require(['course_add_step2'], function () {
                //$('.toggle').css('display', 'block');
            });
            break;
        case "/html/course/course_add_step3.html":
            require(['course_add_step3'], function () {
                //$('.toggle').css('display', 'block');
            });
            break;
        case "/html/course/course_category.html":
            require(['course_category'], function () {
                //$('.toggle').css('display', 'block');
            });
            break;
        case "/html/course/course_category_add.html":
            require(['course_category_add'], function () {
                //$('.toggle').css('display', 'block');
            });
            break;
        case "/html/course/course_list.html":
            require(['course_list'], function () {
                //$('.toggle').css('display', 'block');
            });
            break;
        case "/html/course/course_topic.html":
            require(['course_topic'], function () {
                //$('.toggle').css('display', 'block');
            });
            break;

        case "/html/home/login.html":
            require(['login']);
            break;
        case "/html/home/settings.html":
            require(['settings']);
            break;
        case "/html/home/repass.html":
            require(['repass']);
            break;
    };

})(window)

