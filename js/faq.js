

$(function () {

    var bk = getParameterByName("bk");
    $('#' + bk).addClass("highlight");

    if ($('#' + bk).is_on_screen()) {

    } else {
        ScrollTo(bk);
    }

});

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


$.fn.is_on_screen = function () {

    var win = $(window);

    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};

function ScrollTo(id) {
    var pos = 0;
    try {
        $('#faq').scrollTop(0, 0);
        pos = $("#" + id).position().top - 50;
        cp = $("#faq").position().top;
    } catch (er) {
        pos = 0;
    }


    $('html,body').animate({
        scrollTop: pos
    }, 500);

}