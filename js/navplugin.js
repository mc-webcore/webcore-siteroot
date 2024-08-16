
var navLocation = '#nav';
var maxlev = 3;
var lev = 0;
function setNavigation(navgrp,styl) {

    var uri = "/wmx/GetSiteNavigation?id=" + navgrp +"&style=" +styl;
    loadjsn(uri, renderNav);

}

function rendervw(obj) {

    if (obj.vw != null) {
        
        $(navLocation).html(obj.vw);
    }
}

function renderNav(obj) {

    var hg = "";
    var ot = "";
    $.each(obj.SiteStructure, function (index, el) {

        if (el.childItems.length > 0) {
            ot = ot + "<li class=\"dropdown\">"
                + "<a href=\"" + el.virtualPath + "\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" "
                    + "aria-expanded=\"false\"> "+ el.Name + "   <span class=\"ion-ios-arrow-down\" ></span ></a >"
                + "<ul class=\"dropdown-menu\">"
                + loadchild(el)
                + "</ul>";

        }
        else {
            ot = ot + "<li class=\"" + hg + "\"><a href=\"" + el.virtualPath + "\">" + el.Name + "</a></li>";
        }

        lev = 0;
    });

    $(navLocation).html(ot);
}


function loadchild(elx) {
    var hg = "";
    var ot = "";
    lev++;
        
    $.each(elx.childItems, function (_index, el) {

        if (el.childItems.length> 0 && lev<maxlev) {
            ot = ot + "<li class=\"dropdown\">"
                
                + "<a href=\"" + el.virtualPath + "\">" + el.Name + "</a>"
                + "<ul class=\"dropdown-menu\">"
                + loadchild(el)
                + "</ul>";

        }
        else {
            ot = ot + "<li class=\"" + hg + "\"><a href=\"" + el.virtualPath + "\">" + el.Name + "</a></li>";
        }

    });

    return ot;

}