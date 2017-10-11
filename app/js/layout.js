/**
 * Created by zhangwei36 on 2017/10/11.
 */
define("project/layout", function(require, exports, module) {
    module.exports = function layout() {
        positionFooter();
        function positionFooter () {
            var footerHeight = 0;
            var footerTop = 0;
            // 获取页脚的高度
            footerHeight = $(".com-footer").height();
            footerTop = ($(window).scrollTop()+$(window).height()-footerHeight)+"px";
            //如果页面内容高度小于屏幕高度，div#footer将绝对定位到屏幕底部，否则div#footer保留它的正常静态定位
            if(($(document.body).height()+footerHeight) < $(window).height()) {
                $(".com-footer").css({ position: "absolute",left:"0" }).stop().css({top:footerTop});
            }
        }
        $(window).resize(positionFooter);
    }
})