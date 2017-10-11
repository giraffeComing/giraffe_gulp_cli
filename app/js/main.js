/**
 * Created by zhangwei36 on 2017/9/18.
 */
seajs.config({
    // 取消combo
    comboExcludes: /.*/,
    paths: {
        'project': '../js/'
    }
});
seajs.use([
        'project/jsFileOne',
        'project/jsFileTwo',
        // PC端页头页脚布局
        'project/layout'
    ],
    function(jsFileOne,jsFileTwo,layout) {
        // PC端页头页脚布局
        layout();
        jsFileOne();
        jsFileTwo();
    });
