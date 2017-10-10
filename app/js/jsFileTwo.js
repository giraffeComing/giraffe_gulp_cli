/**
 * Created by zhangwei36 on 2017/10/10.
 */
define("project/jsFileTwo", function(require, exports, module) {
    // 引入依赖
    var easing = require("project/jsFileThree");
    module.exports = function jsFileTwo() {
        console.log('jsFileTwo.js')
        easing()
    }
})