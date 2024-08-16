function feedbck() {

    var uri = "/apx/ShowFeebackFm";
    loadjsn(uri, pnVw);

}

function saveFeedback() {

    isValid = true;

    validateEl($('#user-feedback'));

    if (isValid) {
        var uri = "/apx/SaveFeeback";
        loadjsn(uri, fbkSaved);
    }
    

}


function pnVw(obj) {

    loader('hide');
    $('#pnPUC').html(obj.vw);
    $('#pnPU').show();
}

function fbkSaved(obj) {

    pnClose('#pnPU');
    Success();

}

function setfb(t) {

    if (t == 'LIKE') {

        $('#btn-like').addClass('active');
        $('#btn-dislike').removeClass('active');
        $('#fb-rating').val(1);

    } else {
        $('#btn-like').removeClass('active');
        $('#btn-dislike').addClass('active');
        $('#fb-rating').val(0);
    }

}