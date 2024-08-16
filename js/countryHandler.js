

function setCountry(c,vw) {
    var ct = $("#country").val();
    if (c != '') {
        ct = c;
        $("#country").val(c);
        setCookie('c', ct, 180);
    }

   
    location.reload();
    return false;

}

function setFlag(c) {
    var ct = $("#country").val();
    if (c != '') {
        ct = c;
        $("#country").val(c);
    
    }

    var fl = '<span class="flag-icon flag-icon-' + ct +'"></span>&nbsp;' + ct;

    $("#reg").html(fl);
}


function showFlagPn() {

    showGlobLdr = false;
    $('.overlay').show();
    var uri="/hub/GetCountries"
    loadpg(uri,setFlagPn);
    

}

function setFlagPn(obj) {

    $('#loadr').addClass("hide");

    $('#pnCTS').html(obj);
    isError = false;

    AddFilter();
}

function closePn(pn) {

    $('.overlay').hide();

}



function AddFilter() {

    $('#ac-fil').on('keyup', function () {
        var query = this.value;
        $('.chkLi').each(function (i, elem) {
            v1 = $(this).text().toLocaleLowerCase();

            if (v1.indexOf(query.toLowerCase()) != -1 || $(this).text().indexOf(query) != -1) {
                $(this).show();
                $(this).prev(':checkbox').show();
            } else {
                $(this).hide();
                $(this).prev(':checkbox').hide();
            }
        });
    });
}