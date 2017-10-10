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
        'project/jsFileTwo'
    ],
    function(jsFileOne,jsFileTwo) {

        jsFileOne();
        jsFileTwo();

    });
