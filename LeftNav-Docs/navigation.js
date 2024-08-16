//// ver 3.0  webcore ajx
/*!
* Webcore CMX v2.0 (https://start.webcore.ws)
* Copyright 2009-2022 go4travel / webcore solutions
*/

var mnuNoClick = false;
$(function () { //DOM Ready
       


    is_mobile = detectmob();

    $(window).bind("load resize", function () {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 1324) {

            $("#trigger").unbind();
            $("#sdmenu").slideReveal({
                trigger: $("#trigger"),
                push: false,
                mobile: false,
                width: 310, top: 0
            });
            $("#sdmenu").slideReveal('hide');
        } else {
            $("#sdmenu").removeAttr("style");

        }
    });

    addSlideMnu();

    GetRevisions();
    loadImgPop();
    getpageIndex(0);
    ReloadPrism();
  

    $("#navfilter").on('keyup change search', function () {
        var value = this.value.toLowerCase().trim();
        if (value == '') {
            $("#lftmnu ul.collapse").removeClass('show_filter');
        } else {
            $("#lftmnu ul.collapse").addClass('show_filter');
        }

        $("#lftmnu a").show().filter(function () {

            return $(this).text().toLowerCase().trim().indexOf(value) == -1;
        }).hide();

    });



        $('.side-menu a').click(function (e) {
            e.preventDefault();

        });

    $(document).on('click', '[data-toggle="collapse"]', function (e) {

        var t = e.target.getAttribute("data-target")
        $(t).collapse('toggle');
    });

    var subm = false;
    $(".colpn").on('shown.bs.collapse', function (e) {
        if (subm) {

        } else {
            $('#' + this.id + '-ic').toggleClass('ti-angle-down , ti-angle-left');

        }
        subm = false;
        return false;
    });

    $(".colpn").on('hidden.bs.collapse', function (e) {
        if (subm) {
        } else {
            $('#' + this.id + '-ic').toggleClass('ti-angle-down , ti-angle-left');

        }
        subm = false;
        return false;
    });
    $(".colpn2").on('shown.bs.collapse', function (e) {
        $('#' + this.id + '-ic').toggleClass('ti-angle-down , ti-angle-left');
        subm = true;
        return false;
    });

    $(".colpn2").on('hidden.bs.collapse', function (e) {
        $('#' + this.id + '-ic').toggleClass('ti-angle-down , ti-angle-left');
        subm = true;
        return false;
    });
    //$(document).on('click', 'a[href^="#"]', function (e) {
    //    // target element id
    //    var id = $(this).attr('href');

    //    // target element
    //    var $id = $(id);
    //    if ($id.length === 0) {
    //        return;
    //    }

    //    // prevent standard hash navigation (avoid blinking in IE)
    //    e.preventDefault();

    //    // top position relative to the document
    //    var pos = $id.position().top - 250;

    //    // animated top scrolling
    //    $('#lnav').animate({
    //        scrollTop: pos
    //    }, 1000);
    //});

    if (!is_mobile) { 

    var key = window.location.pathname;
    var mnu = $("#sideNav li").find('[data-link="' + key.toLowerCase() + '"]').parent().addClass('selrw focus');

        var slc = $("#sideNav li").find('[data-link="' + key.toLowerCase() + '"]');
        var kyd = slc.attr('data-target');
        var mitm = $('*[data-target="' + kyd + '"]');
        mitm.click();

        mnu.parents('ul').each(function () {
        mnuNoClick = true;

        var elementType = $(this).prop('nodeName');
        if (elementType == "UL") {
            // $(this).addClass("in");

            var mnuP = $('*[data-target="#' + this.id + '"]');
            mnuP.click();
        }

    })
    mnuNoClick = false;

}
   /* var mnu =  $("#sideNav ul li").find('a:contains('+ pgn +')').parent().addClass('active');*/

});





function pnClose(pn) {

    $('.overlay').hide();
    $('#wrapper2').removeClass('pnloading');
    $(pn).hide();
}

function pnOpen(pn) {
    $('.overlay').show();
    $('#wrapper2').addClass('pnloading');
    $(pn).show();
}


var is_mobile = false;
function detectmob() {
    if (window.innerWidth <= 1324) {
        return true;
    } else {
        return false;
    }
}

function ScrollToTag(container) {

    if (scrolltag != "") {

        ScrollTo(scrolltag);

    } else {

        $('#lnav').animate({
            scrollTop: 0
        }, 200);

    }
    scrolltag = "";

}



function NavPage(obj,vw) {


    if (vw == null) {
        vw = '#rsView';
    }

    ScrollTop();

    loader('hide',vw);
    $(vw).removeClass("pnloading");

    $('#revisions').addClass("hide");

    if (obj.errorVw != null) {

        var htm = '<div class="container-fluid pgcontent mt-20"><div class="row">';
        htm = htm + '<div class="col-sm-12 col-md-12 red" >'
        htm = htm + obj.errorVw
        htm = htm + '</div></div></div>'


        $(vw).html(htm);

    }else if (obj.PageContent.htmcontent != null) {
        document.title = obj.PageContent.title;


        $('#title').html(obj.PageContent.title);

        if (obj.PageContent.subtitle == null || obj.PageContent.subtitle == "") {
            $('#subtitle').html("");
            document.title = obj.PageContent.title + "";
        } else {
            $('#subtitle').html(obj.PageContent.subtitle);
            document.title = obj.PageContent.title + " - " + obj.PageContent.subtitle;
        }

      /*  $('#revtitle').removeClass('lab');*/
        $('#revtitle').html('');
        $('#revlst').html("");
        $('#revlst').addClass("hide");
        if (obj.PageContent.revision != null && obj.PageContent.revision != "") {
            $('#revtitle').html("" + obj.PageContent.revision);
            document.title = document.title + " v" + obj.PageContent.revision;
            /*  $('#revtitle').addClass('lab');*/

        } else {
          
            $('#revtitle').html(" v" + obj.PageContent.version.toFixed(1));
        }

        $('#pgId').val(obj.PageContent.id);
        $('#uqId').val(obj.PageContent.unique_id);


        $(vw).html(obj.PageContent.htmcontent);

        $("subsection").html(obj.PageContent.metaTags);
        $("scriptsection").html(obj.PageJsInclude);
        $("stylessection").html(obj.PageCssInclude);

        $('#lu-usrnm').html(obj.PageContent.LastUpdatedBy);
        $('#lu-usrnm').attr('title', obj.PageContent.Username);
        $('#updt').html('LastUpdated : ' + obj.PageContent.LastUpdatedOn);

        var docpath = obj.PageContent.pathurl + obj.PageContent.linkurl;
        $('#breadcrumb').html('<a href="' + docpath + '" title="Open & Copy Link to Clipboard"><i class="ti-share" ></i></a>');

    }
    else {

        var htm = '<div class="container-fluid pgcontent mt-20"><div class="row">';
        htm = htm + '<div class="col-sm-12 col-md-12 red" > <h2>Network Error&nbsp; Page Cannot be Loaded</h2>';
        htm = htm + '<p> Sorry something has gone wrong or this page has moved.&nbsp;</p></div></div></div>'


        $(vw).html(htm);
    }
   

    ScrollToTag('#lnav');


    GetRevisions();
    getpageIndex(400);
    loadImgPop();
    ReloadPrism();
    is_mobile = detectmob();

    if (is_mobile) {
        sideMenu('hide');
    }
}

function loadImgPop() {

    $(document).ready(function () {
        $('img-link').magnificPopup({ type: 'image' });
        $('[data-widget="image"]').magnificPopup({ type: 'image' });
    });
}

function ReloadPrism() {
    Prism.highlightAll();
    $(window).trigger('resize');
}

function ScrollTo(id) {
    var pos = 0;
    try {
        $('#lnav').scrollTop(0, 0);
        $('html, body').scrollTop(0, 0);
        pos = $("#" + id).position().top ;
        pos = $("#" + id).offset().top - 90;
        cp = $("#lnav").position().top;

        if (pos == -90) {

            var p = $("#" +id).last();
            var offset = p.offset();
            pos = offset.top;
        }


    } catch (er) {
        pos = 0;
    }
    
    $('html, body').animate({ scrollTop: pos }, 500);

    //$('#lnav').animate({
    //        scrollTop: pos
    //    }, 500);
    
}

function scrollPos(pos) {

    $('html, body').animate({ scrollTop: pos }, 500);

}

var $indxObj;
function getpageIndex(ofs) {
    $('#lnav').scrollTop(0, 0);

    $("#pgidx").html("");
    $("#tb-pgindex").html("");

    var $hdr = $("h1,h2, h3, hcode, hindex");

    indxObj = $hdr;

    var li = "";
    var cnt = 1;
    $.each($hdr, function (i, item) {

        let noIdx = item.getAttribute("noindex");
        let setIdx = item.getAttribute("setindex");

        if (noIdx == null) {

            let title = item.innerHTML;
            if (setIdx != null) {
                title = setIdx;
                
                title = HTMLEncode(title);
            }

            offset = $(item).offset().top;

            var oxx = $('#lnav').offset().top;

            if (ofs > 0) { oxx = 0; }

            offset = offset - oxx;

            if (offset < 10) { offset = 10; }

            item.id = "idx-" + cnt;

            if (item.nodeName == "H2" || item.nodeName == "h2" || item.nodeName == "h1" || item.nodeName == "H1" || item.nodeName == "HCODE") {
                li = li + "<li onclick=\"ScrollTo('" + item.id + "');\" >" + title + "</li>";
            } else {
                li = li + "<li class=\"subhd\" onclick=\"ScrollTo('" + item.id + "');\" >" + title + "</li>";
            }

            cnt++;
        }

    });

    if (li == "") {
        $("#pgindex").hide();
        $("#tbcontent").addClass('hide');
        $('#rtpush').removeClass('rtpush');

    } else {

        $("#pgidx").html(li);

        $("#tb-pgindex").html(li);
        $('#rtpush').addClass('rtpush');
        $("#pgindex").show();
        $("#tbcontent").removeClass('hide');
    }
        

    
}

function removepageIndex() {
    $("#pgidx").html("");
    $("#tb-pgindex").html("");
    $("#pgindex").hide();
    $("#tbcontent").addClass('hide');
    $('#rtpush').removeClass('rtpush');
}
function HTMLEncode(str) {
    var i = str.length,
        aRet = [];

    while (i--) {
        var iC = str[i].charCodeAt();
        if (iC < 65 || iC > 127 || (iC > 90 && iC < 97)) {
            aRet[i] = '&#' + iC + ';';
        } else {
            aRet[i] = str[i];
        }
    }
    return aRet.join('');
}

function pgIndexToggle() {

    if ($("#tbrtpn").hasClass('hide')) {

        $("#tbrtpn").removeClass('hide');
        $('#rtpush').addClass('rtpush');
        $('#rtpush').removeClass('rtpush-close');
        $('#tbcontent').removeClass('pin-pn');
        $('#pin').removeClass('pin-close');

    } else {

        $("#tbrtpn").addClass('hide');
        $('#rtpush').removeClass('rtpush');
        $('#rtpush').addClass('rtpush-close');
        $('#tbcontent').addClass('pin-pn');
        $('#pin').addClass('pin-close');
    }

   


}



function ScrollTop() {
    $('body').scrollTop(0);
    window.scrollTo(0, 0);
    $('#lnav').scrollTop(0, 0);
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
                width: 310, top: 0
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

function GetRevisions() {

    $("#docver").hide();
        var uqid = $("#uqId").val();

        var uri = "/GetRevisions?id=" + uqid;

        loadjsn(uri, setRevisions);
    
}

var ldrev = "";
function setRevisions(obj) {

    if (obj != null) {

        $("#docver").show();
        var sl = "";
        
        if (obj.length > 0) {

            $.each(obj, function (index, data) {
               
                sl = sl + "<li onclick=\"loadRev('" + data.iid + "','" + data.revision +"');\">"
                    sl = sl + "<a><i class=\"far fa-bookmark fa-sm pr5\"></i> " + data.revision + "</a>"

        })
            sl = sl + "";

            $('#revlst').html(sl);

            $('#revlst').removeClass("hide");
        }
    }

}

function loadRev(iid,drev) {

    
 /*   var iid = $('#revsel').val();*/
    ldrev = iid;    
    loadjsnm('/viewpart/page?v=' + iid + '' , NavPage, this, 'inpage')

}


function copyLink(link) {

    var loc = window.location;

    var pth = loc.protocol + loc.host + link

    copyTextToClipboard(pth);

}

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {

    
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

function findNode(mn, nodeId) {


    var node = $('#sideNav').find(nodeId);



}


function findWords(srch) {

    $(window).scrollTop($("*:contains('" + srch + "'):last").offset().top);

}


function sharepage() {

    isValid = true;
        
    validateEmail($('#emlshare'));

    if (isValid) {

        $('#emlsharepn').hide();
        $('#pnloader').show();
        var uqid = $("#uqId").val();
        var uri = "/profile/sharepage";
        loadjsn(uri, shareSent);

    }

}
function shareSent(obj) {

    $('#emlsharepn').show();
    $('#pnloader').hide();
    $('#eml-msg').show();


}

