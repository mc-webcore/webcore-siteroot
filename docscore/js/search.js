$(document).ready(function () {
   
    $('#srchtxt').keydown(function (e) {
        if (e.keyCode == 13)
            search();
    });
});
var p="";
function search() {

    p = "";
    var sr = $('#srchtxt').val();

    var uri = "/home/ssearch?q=" + encodeURI(sr) + "&pge=0";

        loadpg(uri, srchRs);
}

function searchfaq() {

    var sr = $('#srchtxt').val();
    p = "FAQ";
    var uri = "/home/ssearch?q=" + encodeURI(sr) + "&path=" + p + "&pge=0";

    loadpg(uri, srchRs);
}

function srchRs(obj) {
    $("#loadr").addClass("hide");
    $("#srchrs").html(obj);

}

function srchNxtPage(pg) {

    var sr = $('#srchtxt').val();

    var uri = "/home/ssearch?q=" + encodeURI(sr) + "&path=" + p + "&pge=" + pg;

    loadpg(uri, srchRs);
}