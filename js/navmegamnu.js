var mnuNoClick = false;
var mobnav = false; 

$(function () {

    $('#topmega').on({
        mouseleave: function () {
            if (!mobnav) {
                $('.mega-menu-active').removeClass('mega-menu-active');
                $('.mega-dropdown-show').removeClass('mega-dropdown-show');
            }
        }
    });



    $('.exo-menu > li').on({
        mouseover: function () {
            if (!mobnav) {
               $('.mega-menu-active').removeClass('mega-menu-active');
               $('.mega-dropdown-show').removeClass('mega-dropdown-show');
               $('.toptree',this).addClass('mega-menu-active');
               $('.mega-menu', this).addClass('mega-dropdown-show');
            }
        },
        mouseleave: function () {
            //$(this ).removeClass('mega-menu-active');
            //$(this > '.mega-menu').removeClass('mega-dropdown-show');
        },
        click: function () {
            
        }
    });

    $('.exo-menu > li > .mega-menu').on({
        mouseleave: function () {
            if (!mobnav) {
                $('.mega-menu-active').removeClass('mega-menu-active');
                $('.mega-dropdown-show').removeClass('mega-dropdown-show');
            }
        }
    });


    $(window).on("load resize", function () {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 991) {

            $("#trigger").off();
            $("#sdmenu").slideReveal({
                trigger: $("#trigger"),
                push: false,
                mobile: false,
                width: 302, top: 0
            });
            $("#sdmenu").slideReveal('hide');
            mobnav = true;
            $(".navbar-brand").removeAttr("style");
            $("#navx").removeAttr("style");
            $(".pushml30").removeAttr("style");
            $('.mega-menu').addClass('mega-dropdown-show-mob');
            combineLeftNav('#sidebarpn', '#leftnav-mob');
        } else {
            $("#sdmenu").removeAttr("style");
            $("#container").removeAttr("style");
            mobnav = false;
            $('.mega-menu-active').removeClass('mega-menu-active');
            $('.mega-dropdown-show-mob').removeClass('mega-dropdown-show-mob');
            //size menu margin
            var wd = $("#topnav").width();
            var cw = (width - wd) / 2;
           // $(".pushml30").attr("style", "margin-left:" + cw + "px");
            //$(".navbar-brand").attr("style", "margin-left:" + cw + "px");
            //$("#navx").attr("style", "margin-right:" + cw + "px");
        }



    });

    addSlideMnu();

   

});


var is_mobile = false;
function detectmob() {
    if (window.innerWidth <= 993) {
        return true;
    } else {
        return false;
    }
}

function combineLeftNav(frmEl, mobEl) {

    let mnu = $(frmEl).html();

    $(mobEl).html(mnu);

}

function sizeHdrMgn() {
    //size menu margin
    var wd = $("#rsView").find(".container").width();
    var cw = (width - wd) / 2;
   // $(".pushml30").attr("style", "margin-left:" + cw + "px");
    $(".navbar-brand").attr("style", "margin-left:" + cw + "px");
    $("#navx").attr("style", "margin-right:" + cw + "px");

}


function NavPage(obj, vw) {

    if (vw == null) {
        vw = '#rsView';
    }


    loader('hide', vw);
    
    $(vw).removeClass("pnloading");


    $('#title').html(obj.PageContent.title);
    if (obj.PageContent.subtitle == null || obj.PageContent.subtitle == "") {
        $('#subtitle').html("");

    } else {
        $('#subtitle').html(obj.PageContent.subtitle);
    }
    document.title = obj.PageContent.title;

    $(vw).html(obj.PageContent.htmcontent);
    $("subsection").html(obj.PageContent.metaTags);
    $("scriptsection").html(obj.PageJsInclude);
    $("stylessection").html(obj.PageCssInclude);

}


function ReloadPrism() {
    Prism.highlightAll();
}




function sideMenu(act) {
    $("#sdmenu").slideReveal(act);
}


function addSlideMnu() {



    is_mobile = detectmob();

    if (is_mobile) {


        $("#sdmenu").slideReveal({
            trigger: $("#trigger"),
            push: false,
            mobile: false,
            width: 302, top: 0
        });
        $("#sdmenu").slideReveal('hide');

   


    var mainPan = document.getElementById('container');
    var mc = new Hammer(mainPan);

    // listen to events...
    mc.on("swipeleft", function (ev) {
        $("#sdmenu").slideReveal('hide');


    });

    mc.on("swiperight", function (ev) {
        $("#sdmenu").slideReveal('show');

    });

        mc.get('swipe').set({ velocity: 0.80, threshold: 30 });

    }
}



