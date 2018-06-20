/* Loading */

$(window).load(function () {
    setTimeout(function () {
        $("#loading.other").addClass('fadeOut')
    }, 500),
        setTimeout(function () {
            $("#loading.other").css('display', 'none')
        }, 1500)
});


// iframe
// if (window.matchMedia('(height: 1200px)').matches) {
//     $("iframe.video").css('height', '1200');
// } else {
//     $("iframe.video").css('height', '1080');
// }

// Loading-none
var tag = location.hash;
if (tag != '') {
    $('#loading').hide();
    $(window).load(function () {
        setTimeout(function () {
            $("#loading.ind").addClass('slideOutUp')
            $('#bgvid').get(0).play()
            $(function fade(idx) {
                var $elements = $('.i-content h1.title');
                var $elements2 = $('.i-content h4.subtitle');

                $elements.parent().parent().find('.i-hr').fadeIn(1500, function () {
                    $(this).addClass('on');
                    $elements.eq(idx).fadeIn(1500);
                    $elements2.eq(idx).fadeIn(1500);
                }).delay(2000).fadeOut(6000, function () {
                    $elements.eq(idx).fadeOut();
                    $elements2.eq(idx).fadeOut();
                    $(this).removeClass('on');
                    fade(idx + 1 < $elements.length ? idx + 1 : 0);
                })


            }(0));

        }, 0)

    });
} else {
    $(window).load(function () {
        setTimeout(function () {
            $("#loading.ind").addClass('slideOutUp')

            $('#bgvid').get(0).play()

            $(function fade(idx) {
                var $elements = $('.i-content h1.title');
                var $elements2 = $('.i-content h4.subtitle');

                $elements.parent().parent().find('.i-hr').fadeIn(1500, function () {
                    $(this).addClass('on');
                    $elements.eq(idx).fadeIn(1500);
                    $elements2.eq(idx).fadeIn(1500);
                }).delay(2000).fadeOut(6000, function () {
                    $elements.eq(idx).fadeOut();
                    $elements2.eq(idx).fadeOut();
                    $(this).removeClass('on');
                    fade(idx + 1 < $elements.length ? idx + 1 : 0);
                })


            }(0));

        }, 3000)

    });
}




/* header */

$("header #open").click(function () {
    $("header").toggleClass('on');
    $("body").toggleClass('nav_open');
    $("header nav").toggleClass('on');
    if ($("header").hasClass('on')) {
        $("header #open p").text('Close');
    } else {
        $("header #open p").text('');
    }
    $("h1.header2").toggleClass('service_h1');
});





/* Service */
$(document).ready(function () {
    $("#service").addClass('start start_effect');
});

var $service = $('#service .column li');
$service.on('click', function () {
    if ($service.hasClass('on')) {
        $service.removeClass('on off');
    } else {
        $service.removeClass('on off');
        $(this).addClass('on');
        $service.addClass('off');
    }

    if ($('#service_in_r').hasClass('on')) {
        $('#service_in_r').removeClass('on');
    } else {
        $('#service_in_r').removeClass('on');
        setTimeout(function () {
            $('#service_in_r').addClass('on');
        }, 500)
    }

    if ($service.eq(0).hasClass('on')) {
        $('#service_in_r .open_in_r').removeClass('on');
        $('#service_in_r .open_in_r').eq(0).addClass('on');
    } else if ($service.eq(1).hasClass('on')) {
        $('#service_in_r .open_in_r').removeClass('on');
        $('#service_in_r .open_in_r').eq(1).addClass('on');
    } else if ($service.eq(2).hasClass('on')) {
        $('#service_in_r .open_in_r').removeClass('on');
        $('#service_in_r .open_in_r').eq(2).addClass('on');
    } else if ($service.eq(3).hasClass('on')) {
        $('#service_in_r .open_in_r').removeClass('on');
        $('#service_in_r .open_in_r').eq(3).addClass('on');
    }
});

// go top

$(function () {
    $('#go-top img').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 1200);
    });

});

// contact

$("#inquiry").click(function () {
    $(".inright, .inleft").addClass('on');
    $("#menu").addClass('none');
    $("#send.btn").removeClass('none');
});
$(".inquiry_close").click(function () {
    $(".inright, .inleft").removeClass('on');
    $("#menu").removeClass('none');
    $("#send.btn").addClass('none');
});

//skrollr
$(document).ready(function () {
    var skrollr_obj = skrollr.init({
        smoothScrolling: true,
        mobileCheck: function () { },
        mobileDeceleration: 0.004
    });
});


// oncontextmenu
document.oncontextmenu = new Function("return false");