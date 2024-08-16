var isValid=true;


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

function validateTel() {

    var intlNumber = "";
    var telInput = $("#txttel");
    intlNumber = telInput.intlTelInput("getNumber");
    var ctData = telInput.intlTelInput("getSelectedCountryData");


    $("#phone").val(intlNumber);
    $("#telCountryCode").val(ctData.dialCode);

    Page_IsValid = true;
    isValid = telInput.intlTelInput("isValidNumber")

    if (intlNumber == null || intlNumber.trim() == "" || isValid == false) {
        telInput.addClass("errBrd");
        isValid = false;
        Page_IsValid = false;
        $('#errTel').removeClass("hide");
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