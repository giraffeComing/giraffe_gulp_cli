/**
 * Created by zhangwei36 on 2017/9/18.
 */
$(function () {

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


    var initBlock={
        init:function () {
            initBlock.initBlockPos();
            initBlock.bindMouseEnter();
            initBlock.bindMouseLeave();
            // initBlock.bindLeave();
        },
        initBlockPos: function () {
            // 初始化滑块位置
            $('.Jblock').stop().animate({
                left: ($('.currentLi').index()-1)*140
            },300)
        },
        bindMouseEnter:function () {
            $('.navUl .nav-li').on('mouseenter',function () {

                $(this).find('.child-ul').stop().slideDown(300)

                // var _index = $(this).index();
                //
                // $('.Jblock').stop().animate({
                //     left: (_index-1)*140
                // },300)
            });
        },
        bindMouseLeave:function () {
            $('.navUl .nav-li').on('mouseleave',function () {

                $(this).find('.child-ul').stop().slideUp(300)

            });
        },
        // 连续点击偶尔会触发这个方法
        // bindLeave:function () {
        //     $('.navUl').on('mouseleave',function () {
        //         $('.Jblock').stop().animate({
        //             left: ($('.currentLi').index()-1)*140
        //         },300)
        //     })
        // }
    }

    initBlock.init();



    !function  () {
        $(document).on('click','[data-type]',function () {
            if($(this).is('.active')) return;

            var type = $(this).data('type');
            $(this).addClass('active').siblings().removeClass('active');
            $('[data-node='+type+']').show().siblings().hide();
        })
    }();


})