define(['echarts','nprogress'],function(echarts,Nprogress){
    var myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '传智精品课程'
        },
        tooltip: {},
        legend: {
            data:['课程数目']
        },
        xAxis: {
            data: ["java","php","html5","ios","android","ui"]
        },
        yAxis: {},
        series: [{
            name: '课程数目',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    //调用进度条结束方法
    Nprogress.done();
})