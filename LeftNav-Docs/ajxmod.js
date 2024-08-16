//// ver 3.0  webcore ajx
/*!
* Webcore CMX v2.0 (https://start.webcore.ws)
* Copyright 2009-2022 go4travel / webcore solutions
*/
var showGlobLdr = true;
var isAuto = false;

var isTimer = false;
var isError = false;
var showLdr = true;


(function ($) {
    $.QueryString = (function (a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);


$(function () { //DOM Ready

    $('#loadr').addClass("hide");

    $("form").submit(function (e) {
        e.preventDefault();
    });

    $("button[type!='submit']").click(function (e) {
        e.preventDefault();
    });

    $(document)
        .ajaxStart(function () {
            if (showGlobLdr) {
                loader('show');
                $(".wc-modal").addClass("fadeOut");
               
                //$('#loadr').addClass("show");
                //$('#loadr').removeClass("hide");
            }
        })
        .ajaxStop(function () {
            setloader('hide');
            showLdr = false;

            $(".wc-modal").removeClass("fadeOut");
            $(".wc-modal").removeClass("hide");
            $(".aborder").removeClass("aborder");
            //$('#loadr').addClass("hide");
            //$('#loadr').removeClass("show");
            //   showGlobLdr = true;
        });


});



function loader(a,vw) {
    showLdr = true;

    if (a == 'hide') { setloader('hide', vw); }
    else {
        setTimeout(function () { setloader(a, vw) }, 1000);
    }
    

}


function setloader(a,vw) {

        
        if (a == 'show') {
            if (showGlobLdr && showLdr) {
                $(".wc-modal").addClass("fadeOut");
                $('#loadr').addClass("show");
                $('#loadr').removeClass("hide");
                $('#rsView').addClass("pnloading");
                if (vw != null) { $(vw).addClass("pnloading");}
            }
            ScrollTop();

        } else {
            $('#loadr').addClass("hide");
            $('#loadr').removeClass("show");
            $('#rsView').removeClass("pnloading");
            $(".wc-modal").removeClass("fadeOut");
            $(".wc-modal").removeClass("hide");

            if (vw != null) { $(vw).removeClass("pnloading"); }
        }
    

    showLdr = false;

}

function setBorderLoader(pnl) {

    $(pnl).addClass("aborder");

}

function getQueryParam(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function loadpg(pg, fn, obj) {

    if (obj != null) {
        var p = $(obj).attr('aria-expanded');

        if (p == 'true') {
            return false;
        }
    }


    $("#errorpn").hide();
  
    $.ajax({
        url: pg,
        cache: false,
        data: $("form").serialize(),
        type: "POST",
        success: fn,
        error: (function (result) {
            if (result.responseText == null) {
                $("#errDet").html('<i class="fa fa-exclamation-triangle"></i>Error Connection Failed');
            } else {
                $("#errDet").html(result.responseText);

            }
            isError = true;
            showErr();
            loader('hide');
            
        }),
        failure: (function (errMsg) {
            $("#errDet").html("error" + result.responseText);
            showErr();
            loader('hide');
            $("#errorpn").show();
            $('#loadr').addClass("hide");
            isError = true;
        })
    });

    return false;
}

function loadjsn(pg, fn,vw,setcache,formEl) {

    if (setcache == null) { setcache = false;}

    var sdata = $("form").serialize()
    if (formEl != null) {
        sdata = $(formEl).serialize()
    }

    if (isTimer) {

    } else {
        $("#errorpn").hide();
    }

   
    $.ajax({
        url: pg,
        cache: setcache,
        contentType: "application/x-www-form-urlencoded",
        data: sdata,
        type: "POST",
        
        success: function (obj,status,xhr) {

             fn(obj,vw)
        },
        error: (function (result) {

          
            jsnError(result);
           
        }),
        failure: (function (errMsg) {
            if (errMsg.responseText == null) {

                if (errMsg.status = "500") {
                    $("#errDet").html('<i class="fa fa-exclamation-triangle"></i> Server Error - action failed');
                } else {
                    $("#errDet").html('<i class="fa fa-exclamation-triangle"></i>Error Connection Failed');
                }

                
            } else {
                $("#errDet").html(errMsg.responseJSON.errorVw);
                $("#errorpn").show();
                loader('hide');
            }
            loader('hide');
            if (vw != null) { $(vw).removeClass("pnloading"); } else { $('#rsView').removeClass("pnloading"); }
            isError = true;
            showGlobLdr = true;
        })
    });
   
    return false;
}

function loadjsnAuth(pg, fn, vw, setcache) {

    if (setcache == null) { setcache = false; }

    if (isTimer) {

    } else {
        $("#errorpn").hide();
    }


    $.ajax({
        url: pg,
        cache: setcache,
        contentType: "application/x-www-form-urlencoded",
        data: $("form").serialize(),
        type: "POST",
        xhrFields: {
            withCredentials: true
        },
        success: function (obj) {

            fn(obj, vw)
        },
        error: (function (result) {

            jsnError(result);

        }),
        failure: (function (errMsg) {
            if (errMsg.responseText == null) {
                $("#errDet").html('<i class="fa fa-exclamation-triangle"></i>Error Connection Failed');
            } else {
                $("#errDet").html(errMsg.responseJSON.errorVw);
                $("#errorpn").show();
                loader('hide');
            }
            loader('hide');
            if (vw != null) { $(vw).removeClass("pnloading"); } else { $('#rsView').removeClass("pnloading"); }
            isError = true;
            showGlobLdr = true;
        })
    });

    return false;
}

function pnlHtml(obj, vw) {

    $(vw).html(obj.vw);
}


function loadpgm(pg, vw, obj) {

    if (obj != null) {
        var p = $(obj).attr('aria-expanded');

        if (p == 'true') {
            return false;
        }
    }


    $("#errorpn").hide();
    loader('show');
    $.ajax({
        url: pg,
        cache: false,
        data: $("form").serialize(),
        type: "POST",
        success: (function (partialViewResult) {

            loader('hide');

            $(vw).html(partialViewResult);
            isError = false;
        }),
        error: (function (result) {
            if (result.responseText == null) {
                $("#errDet").html('<i class="fa fa-exclamation-triangle"></i>Error Connection Failed');
            } else {
                $("#errDet").html(result.responseText);

            }
            isError = true;
            $("#errorpn").show();
            loader('hide');
        }),
        failure: (function (errMsg) {
            $("#errDet").html("error" + result.responseText);
            $("#errorpn").show();
            loader('hide');
            isError = true;
        })
    });

    return false;
}


var openpg;
var scrolltag = "";
function loadjsnm(pg, fn, obj,typ,vw) {


    if (mnuNoClick) { return false; }


    $(".selrw").removeClass("selrw");
    $(".focus").removeClass("focus");
    if (obj != null) {
        var p = $(obj).attr('aria-expanded');

        // only load on expand
        //if (p == 'true') {
        //    return false;
        //}
    
        $(obj).parent().addClass("selrw");
        $(obj).parent().addClass("focus");
    }

    if (typ == "scroll") {

        var ac = pg.split('#');
        pg = ac[1];
        if (ac[0] == 'inpage') {
            pg = '/viewpart' + ac[1];
        }

        if (openpg != pg) {
            typ = ac[0];
            scrolltag = ac[2];
        } else {

            ScrollTo(ac[2]);
            return false;
        }

        
    }


    if (openpg != pg) {

    if (typ == "pageload") {
               
        window.open(pg,"_self");
    }
    else if (typ == "external") {
        window.open(pg, "_self");
    }
    else if (typ == "href") {
        window.open(pg, "_self");
    }
    else if (typ == "externaltab") {

        window.open(pg, "_blank");
        } 
    else {

        $('.mega-menu-active').removeClass('mega-menu-active');
        $('.mega-dropdown-show').removeClass('mega-dropdown-show');
        if (vw != null) {
            loader('show',vw);
            
            openpg = pg;
            loadjsn(pg, fn,vw,true);
        } else {
            loader('show', vw);
            openpg = pg;
            loadjsn(pg, fn,null,true);
        }
        
    }

    }

    return false;
}

function loadvwpart(pg,vw,fn) {
   

    $("#errorpn").hide();
  
    $.ajax({
        url: pg,
        cache: false,
        data: $("form").serialize(),
        type: "POST",
        success: (function (obj) {

            loader('hide');

            $(vw).html(obj.PageContent.htmcontent);
            isError = false;
            if (fn != null) { fn(obj);}
        }),
        error: (function (result) {
            if (result.responseText == null) {
                $("#errDet").html('<i class="fa fa-exclamation-triangle"></i>Error Connection Failed');
            } else {
                $("#errDet").html(result.responseText);

            }
            isError = true;
            $("#errorpn").show();
            loader('hide');
        }),
        failure: (function (errMsg) {
            $("#errDet").html("error" + result.responseText);
            $("#errorpn").show();
            loader('hide');
            isError = true;
        })
    });

    return false;


   

}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function silent() { }

function dateTimeReviver(value) {
    var a;
    if (typeof value === 'string') {
        a = /\/Date\((\d*)\)\//.exec(value);
        if (a) {
            return new Date(+a[1]);
        }
    }
    return value;
}

function isDateObj(myDate) {
    return myDate.constructor.toString().indexOf("Date") > -1;
}

function JsnFmFill(data, pn) {


    $.each(data, function (key, value) {
        var ctrl = $(pn).find('[data-bind="' + key + '"]');
        switch (ctrl.prop("type")) {
            case "radio": case "checkbox": case "select":
                ctrl.each(function () {

                    if (value == 1 || value == true) {
                        $(this).prop('checked', true);
                    } else {
                        $(this).prop('checked', false);
                    }

                    if ($(this).attr('value') == value) $(this).prop("checked", value);
                });
                break;
            case "select-one":
                // manipulate select?
                ctrl.val(value);
                break;
            case "select":
                // manipulate select?
                ctrl.val(value);
                break;
            default:
                var d = dateTimeReviver(value);
                if (isDateObj(d)) {

                    ctrl.val(formatDate(d, "yyyy-MM-dd"));

                } else {
                    ctrl.val(d);
                }

        }
    });

}


function ScrollTop() {
    $('body').scrollTop(0);
    window.scrollTo(0, 0);
    $('#lnav').scrollTop(0, 0);
}
function showErr(msg) {

    if (msg != null) {
        $("#errDet").html('<i class="fa fa - exclamation - triangle"></i> ' + msg);
    }
    ScrollTop();
    $("#cmserrpn").slideDown(800);
    $("#vaerrpn").slideDown(800)
    $("#errorpn").slideDown(800);

}

function closeErr(el) {
    $(el).fadeOut(600);
}


function Success(obj, msg) {

    loader('hide');
    if (msg != null) {
        if (msg == 'success') {
            $("#confDet").html('<i class="fa fa-check-circle"></i> Transaction Successful');
        } else {
            $("#confDet").html(msg);
        }
    } else {
        $("#confDet").html('<i class="fa fa-check-circle"></i> Saved Successfully');
    }

    $(".aborder").removeClass("aborder");

    $("#cmsconfpn").slideDown(800).delay(900).fadeOut(600);
    $("#vaconfpn").slideDown(800).delay(900).fadeOut(600);
    $("#confpn").slideDown(800).delay(900).fadeOut(600);

}

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

function jsnError(obj) {

    if (obj.status == 403 || obj.status == 401) {

               
            $("#errDet").html('<i class="fa fa-exclamation-triangle"></i> Access Denied. You do not have permission to perform this action.');

            $('#unauth').show();

            if (obj.responseJSON != null) {

                $("#errDet").html(obj.responseJSON.errorVw);


                if (obj.responseJSON.RedirectUrl) {
                    var uri = obj.responseJSON.RedirectUrl;
                    window.location.replace(uri);
                }

            } else {
                window.location.replace("/account/login");
            }
        
       
    }   
    else if (obj.status == 303) {
       $("#errDet").html('<i class="fa fa-exclamation-triangle"></i> Access Denied. You do not have permission to perform this action.');

        if (obj.responseJSON != null) {
            isError = true;
            showErr();
            loader('hide');
            if (obj.responseJSON.RedirectUrl) {
                var uri = obj.responseJSON.RedirectUrl;
                window.location.replace(uri);
            } else {
                window.location.replace("/");
            }
        } else {
            window.location.replace("/");
        }
        
    }
    else if (obj.status == 500) {
        $("#errDet").html('<i class="fa fa-exclamation-triangle"></i> Server Error - action failed');
    }
    else if (obj.responseJSON == null) {
        $("#errDet").html('<i class="fa fa-exclamation-triangle"></i> Error Connection Failed');
    } else {
        $("#errDet").html(obj.responseJSON.errorVw);

    }
    isError = true;
    showErr();

    loader('hide');
    $('#rsView').removeClass("pnloading");

}


function closeErr(el) {
    $(el).fadeOut(600);
}

function myError(msg) {
    loader('hide');
    $("#errDet").html(msg);
    showErr();
}

function openInNewTab(url) {
    window.open(url, '_blank').focus();
}

function openNewUri(uri) {
    window.location.replace(uri);
}