$(function () { //DOM Ready

    
        $('.side-menu a').click(function (e) {
            e.preventDefault();
           
        });
  

    var subm = false;
    $(".colpn").on('shown.bs.collapse', function (e) {
        if (subm) {

        } else {
            $('#' + this.id + '-ic').toggleClass('fa-angle-down , fa-angle-left');
            
        }
        subm = false;
       
    });

    $(".colpn").on('hidden.bs.collapse', function (e) {
        if (subm) {
        } else {
        $('#' + this.id + '-ic').toggleClass('fa-angle-down , fa-angle-left');
       
        }
        subm = false;
    });
    $(".colpn2").on('shown.bs.collapse', function (e) {
        $('#' + this.id + '-ic').toggleClass('fa-angle-down , fa-angle-left');
        subm = true; 
    });

    $(".colpn2").on('hidden.bs.collapse', function (e) {
        $('#' + this.id + '-ic').toggleClass('fa-angle-down , fa-angle-left');
        subm = true;  
    });



    $(window).bind("load resize", function () {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 1324) {

            $("#trigger").unbind();
            $("#sdmenu").slideReveal({
                trigger: $("#trigger"),
                push: false,
                mobile: false,
                width: 322,top: 0
            });
            $("#sdmenu").slideReveal('hide');
        } else {
            $("#sdmenu").removeAttr("style");
        }
    });

    addSlideMnu();

    GetRevisions();
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

    loader('hide',vw);
    $(vw).removeClass("pnloading");

    $('#revisions').addClass("hide");

    if (obj.PageContent.htmcontent != null) {
        document.title = obj.PageContent.title;


        $('#title').html(obj.PageContent.title);

        if (obj.PageContent.subtitle == null || obj.PageContent.subtitle == "") {
            $('#subtitle').html("");
            document.title = obj.PageContent.title + "";
        } else {
            $('#subtitle').html(obj.PageContent.subtitle);
            document.title = obj.PageContent.title + " - " + obj.PageContent.subtitle;
        }

        $('#revtitle').removeClass('lab');
        $('#revtitle').html('');
        if (obj.PageContent.revision != null && obj.PageContent.revision != "") {
            $('#revtitle').html( " Version : " + obj.PageContent.revision);
            document.title = document.title + " Version : " + obj.PageContent.revision;
            $('#revtitle').addClass('lab');
        }

        $('#uqId').val(obj.PageContent.unique_id);

        $(vw).html(obj.PageContent.htmcontent);
        $("subsection").html(obj.PageContent.metaTags);
        $("scriptsection").html(obj.PageContent.pageScripts);
        $("stylessection").html(obj.PageContent.pageStyles);

        $('#usrnm').html(obj.PageContent.LastUpdatedBy);
        $('#usrnm').attr('title', obj.PageContent.Username);
        $('#updt').html('LastUpdated : ' + obj.PageContent.LastUpdatedOn);

        var docpath = obj.PageContent.pathurl + obj.PageContent.linkurl;
        $('#breadcrumb').html('<a href="' + docpath + '" title="Open & Copy Link to Clipboard"><i class="fa fa-copy" ></i></a>');

    }
    else {

        var htm = '<div class="container-fluid pgcontent mt-20"><div class="row">';
        htm = htm + '<div class="col-sm-12 col-md-12 red" > <h2>Network Error&nbsp; Page Cannot be Loaded</h2>';
        htm = htm + '<p> Sorry something has gone wrong or this page has moved.&nbsp;</p></div></div></div>'


        $(vw).html(htm);
    }
   

    ScrollToTag('#lnav');

    GetRevisions();
}


function ReloadPrism() {
    Prism.highlightAll();
}

function ScrollTo(id) {
    var pos = 0;
    try {
        $('#lnav').scrollTop(0, 0);
        $('html, body').scrollTop(0, 0);
        pos = $("#" + id).position().top - 50;
        cp = $("#lnav").position().top;


    } catch (er) {
        pos = 0;
    }
    
    $('html, body').animate({ scrollTop: pos }, 500);

    //$('#lnav').animate({
    //        scrollTop: pos
    //    }, 500);
    
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
                width: 322, top: 0
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

   
        var uqid = $("#uqId").val();

        var uri = "/home/GetRevisions?id=" + uqid;

        loadjsn(uri, setRevisions);
    
}

var ldrev = "";
function setRevisions(obj) {

    if (obj != null) {
    
        var sl= '<select id="revsel" onchange="loadRev();" >'
        if (obj.length > 0) {

            $.each(obj, function (index, data) {
                if (ldrev == data.iid) {
                    sl = sl + '<option selected value="' + data.iid + '">' + data.revision;
                } else {
                    sl = sl + '<option  value="' + data.iid + '">' + data.revision;
                }       
            sl = sl + '</option>';
        })
        sl = sl + "</select>";

        $('#revisions').html(sl);
        $('#revisions').removeClass("hide");
        }
    }

}

function loadRev() {

    
    var iid = $('#revsel').val();
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
