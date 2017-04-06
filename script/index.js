$(document).ready(function() {

    $(window).on("load", function() {
        loadMoreMiage(); //预加载的数据 要多一点不然最开始无法滚动
        /*
        要滚动加载
        (1)准备要加载的图片的数据
        （2）准备滚动的时机，就是最后一个图片的中间的位置
        （3）创建图片容器，赋值
        */
        // window的滚动事件
         var imageMore = { "data": [{ "src": "1.jpg" }, { "src": "2.jpg" }, { "src": "3.jpg" }, { "src": "4.jpg" }, { "src": "5.jpg" }] };
        window.onscroll = function() {
            //准备多加载的数据
            //加载的时机的判断
            if (scrollLoadMore()) {
                $.each(imageMore.data, function(index, value) {
                    var box = $("<div>").addClass("box").appendTo($('#container'));
                    var content = $("<div>").addClass("content").appendTo(box);
                    $("<img>").attr("src", "./images/"+$(value).attr("src")).appendTo(content);
                })
                loadMoreMiage(); 

            }
        }

        window.onresize = function(){
            loadMoreMiage();
        }

    })
})

function scrollLoadMore() {
    var allBox = $(".box");
    //获取最后一个元素，最后一个摆放的元素，根据最后一个元素距离顶部的高度和自身高度的一半的位置作为触发点
    //当窗口滚动的高度+
    var lastBoxHeight = allBox.last().get(0).offsetTop + Math.floor(allBox.last().height() / 2);

    var documentHeight = $(document).height();
    var widnowHeight = $(window).height();
    var scrollHeight = $(window).scrollTop();
    // console.log('document',documentHeight);
    // console.log('widnowHeight',widnowHeight);
    // console.log('lastboxHeight',lastBoxHeight);
    // console.log('scrollHeight',scrollHeight);
    return (lastBoxHeight < scrollHeight + widnowHeight) ? true : false;

}


//加载图片的方法
//第一次调用为了加载默认要加载的图片的张数
function loadMoreMiage() {

    //获取所有的box的组件
    var boxArray = $(".box");
    //console.log(boxArray);
    //获取box 内的图片的宽度，因为是等宽的所以可以获取第一个就可以
    //转换为jq对象，也可以boxArray.eq(0)
    var imageWidth = boxArray.eq(0).width();
    console.log("宽度", imageWidth);

    //计算一排可以摆放多少个图片,转换为整数
    var number = Math.floor($(window).width() / imageWidth);
    //console.log("摆放的个数",number)

    // 我们需要一个数组存下第一排的图片对象的高度
    var boxView = [];
    boxArray.each(function(index, value) {
        value.style.cssText = "";
        var imageHeight = boxArray.eq(index).height();
        if (index < number) {
            boxView[index] = imageHeight;
        } else {
            //这时数组已经存了第一个排的图片的高度，我们要找到最小的高度
            var minHeight = Math.min.apply(null, boxView);
            //在找到最小的高度对应的index
            var minViewIndex = $.inArray(minHeight, boxView);
            //此时就可以修改value对应的css样式了。
            $(value).css({
                "position": "absolute",
                "top": minHeight,
                "left": boxArray.eq(minViewIndex).position().left
            })
            boxView[minViewIndex] += boxArray.eq(index).height();
        }
    })

}
