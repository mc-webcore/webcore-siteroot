
$(document).ready(function () {
   
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


function doSearch() {
    var sr = $('#srchtop').val();
    if (sr != "") {
    var uri = "/search?q=" + encodeURI(sr);
        window.open(uri, "_self");
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