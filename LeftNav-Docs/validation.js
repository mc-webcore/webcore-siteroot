var isValid = true;

function validateAllEl(pnl) {

    $( '.form-control[data-id]').each(function () {
                
        validateEl($(this));

    });

    
}

function validateGroup(pnl) {


    $(pnl).find('input').each(function () {

        var hasValidate = $(this).attr("data-validate");

        if (hasValidate == "1") {
            validateEl($(this));
        }

    });

}


function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function validateEmail(el) {

    let ml = el.val();

    if (!isEmail(ml)) {
        isValid = false;
        el.addClass("errBrd");
        return false;
    }
    else {
      el.removeClass("errBrd");
    }



}

function setErrEl(el) {
    el.addClass("errBrd");
}

function ClearErrEl(el) {
    el.removeClass("errBrd");
}


function validateEl(el) {

    if (el.val().trim() == "") {
        isValid = false;
        Page_IsValid = false;
        el.addClass("errBrd");
        return false;
    } else {
        el.removeClass("errBrd");
    }

    return true;
}

function validateTel(el,phn,ctcd,err) {

    if (el == null) { el = "#txttel"; }
    if (phn == null) { phn = "#phone"; }
    if (ctcd == null) { ctcd = "#telCountryCode"; }
    if (err == null) { err = "#errTel"; }

    var intlNumber = "";
    var telInput = $(el);
    intlNumber = telInput.intlTelInput("getNumber");
    var ctData = telInput.intlTelInput("getSelectedCountryData");


    $(phn).val(intlNumber);
    $(ctcd).val(ctData.dialCode);

    Page_IsValid = true;
    isValid = telInput.intlTelInput("isValidNumber")

    if (intlNumber == null || intlNumber.trim() == "" || isValid == false) {
        telInput.addClass("errBrd");
        isValid = false;
        Page_IsValid = false;
        $(err).removeClass("hide");
        return false;
    }

    return true;
}


function validateLen(el, minln, maxln) {

    var sl = $(el).val();

    if (sl.length < minln || sl.length > maxln) {
        isValid = false;
        Page_IsValid = false;
        $(el).addClass("errBrd");
        $(el + "-err").removeClass("hide");
        return false;
    } else {
        $(el).removeClass("errBrd");
        $(el + "-err").addClass("hide");
    }

    return true;

}


function validateChkBox(el,lbl) {

    var t1 = $(el).is(':checked');
    if (!t1) { isValid = t1; $(lbl).addClass("errBrd"); }
    

}


function validateSelct(el) {

    var vl = $(el).val();
    if (vl.trim() == "") {
        isValid = false;
        Page_IsValid = false;
        $(el).addClass("errBrd");
        return false;
    } else {
        $(el).removeClass("errBrd");
    }

    return true;
}

function validateMultiSel(el, ipt) {

    var vl = $(ipt).val();

    if (vl == "") {
        $(el + " :button.multiselect").addClass("errBrd");
        isValid = false;

    } else {
        $(el + " :button.multiselect").removeClass("errBrd");

    }

   


}

function validateUrl(el) {

    let uri = $(el).val();

    xValid = isValidUrl(uri);

    if (!xValid) {
        isValid = false;
        Page_IsValid = false;
        $(el).addClass("errBrd");
        return false;
    } else {
        $(el).removeClass("errBrd");
    }

    return true;

}



function isValidUrl(str) {
    const pattern = new RegExp(
        '^([a-zA-Z]+:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
    );
    return pattern.test(str);
}