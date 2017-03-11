define(['jquery', 'jqueryCookie'], function ($, undefinded) {
    //1左侧导航点击处理
    //注册点击课程管理事件
    $('.navs a').on('click', function () {
        $(this).next().slideToggle();
    });
    //3点击到的对应的a链接显示active样式，其余的链接active干掉，同时如果点击的是子链接，把它上一级的所有父类都show一下
    //设置地址的映射表
    var navigationMap = {
        //课程添加相关的地址映射：
        '/html/course/course_add_step1.html': '/html/course/course_add.html',
        '/html/course/course_add_step2.html': '/html/course/course_add.html',
        '/html/course/course_add_step3.html': '/html/course/course_add.html',
        //课程分类相关的地址映射
       '/html/course/course_category_add.html':'/html/course/course_category.html',
        //教师管理相关的地址映射
        '/html/teacher/teacher_add.html':'/html/teacher/teacher_list.html'
    };
    var pathname = location.pathname;
    if(navigationMap[pathname]){
        pathname=navigationMap[pathname];
    }
    $('.navs a').removeClass('active').filter('[href="' + pathname + '"]').addClass('active').parents('ul').show();

    //2 退出登录，发送ajax请求，告诉后台，干掉cookie
    $('#logout').on('click', function () {
        console.log('asa');
        $.post('/v6/logout', function (data) {
            console.log(data);
            if (data.code == 200) {
                location.href = '/html/home/login.html';
            }
        });
    })

    //3将数据填充进来
    var userInfo = JSON.parse($.cookie('userInfo') ? $.cookie('userInfo') :null);
    if (userInfo) {
        $('.aside .profile img').attr('src', userInfo.tc_avatar ? userInfo.tc_avatar : '/images/uploads/default.jpg');
        $('.aside .profile h4').html(userInfo.tc_name ? userInfo.tc_name : '');
    }


    //4在ajax请求刚刚发送的时候，就监听一下ajaxStart事件
    $(document).ajaxStart(function () {
        console.log('ajaxStart');
        $('.overlay').show();
    })

    //5发送完请求的时候，就监听一下ajaxStop事件
    $(document).ajaxStop(function () {
        console.log('ajaxStop');
        $('.overlay').hide();
    })

})