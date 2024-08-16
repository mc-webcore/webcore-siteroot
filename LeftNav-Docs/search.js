$(document).ready(function () {
   
    $('#srchtxt').keydown(function (e) {
        if (e.keyCode == 13)
            search();
    });


    var sr = jQuery.QueryString["q"];
    if (sr != null) {
        searchq(sr);
        $('#srchtxt').val(sr);
    }
    

    $('#srchtop').keydown(function (e) {
        if (e.keyCode == 13)
            doSearch();
    });
});

function toggleMenu() {
    var x = document.getElementById("myheader");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}



function getParameterByName(parameterName, url) {
    if (!url) {
        url = window.location.href;
    }

    parameterName = parameterName.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + parameterName + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



function doSearch() {
    var sr = $('#srchtop').val();
    if (sr != "") {
        var uri = "/search?q=" + encodeURI(sr);
        window.open(uri, "_self");
    }
}

var p="";
function search() {

    p = "";
    var sr = $('#srchtxt').val();

    var uri = "/home/ssearch?q=" + encodeURI(sr) + "&pge=0";

        loadpg(uri, srchRs);
}

function searchq(sr) {

    var uri = "/home/search?q=" + encodeURI(sr) + "&pge=0";
    loadpg(uri, srchRs);
}

function searchfaq() {

    var sr = $('#srchtxt').val();
    p = "FAQ";
    var uri = "/home/ssearch?q=" + encodeURI(sr) + "&path=" + p + "&pge=0";

    loadpg(uri, srchRs);
}

function srchRs(obj) {
    loader('hide');
    $("#srchrs").html(obj);

}

function srchNxtPage(pg) {

    var sr = $('#srchtxt').val();

    var uri = "/home/ssearch?q=" + encodeURI(sr) + "&path=" + p + "&pge=" + pg;

    loadpg(uri, srchRs);
}