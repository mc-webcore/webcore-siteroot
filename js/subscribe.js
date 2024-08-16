function subscribe() {

    var smail = $("#subEmail").val();
    var uq = $('#uqId').val();
    isValid = true;

    $("#subEmail").removeClass("errBrd");
    $('#errEmail').addClass("hide");

    validateEl($('#subEmail'));
    validateEmail($('#subEmail'));

    if (isValid) {
        showGlobLdr = true;
        var uri = "/cmx/SubscribePageNotif?pg=PROD-UPDATES"
        loadjsn(uri, subDone,null,false,showErr);

    } else {
        $('#errEmail').removeClass("hide");
    }

}

function rqlogin() {

    $.confirm({
        title: 'LOGIN',
        columnClass: 'medium',
        content: 'Please Login to your account to Subscribe or Register if you do not have an account.',
        buttons: {
            login: function () {
                text: 'Hey there!', // text for button
                    window.open("/account/login?returnUrl=docs/revision-notices", "_self");


            },
            cancel: function () {

            }
        }

    });


}

function unSub() {


    $.confirm({
        title: 'UNSUBSCRIBE ?',
        columnClass: 'medium',
        content: 'Confirm you wish to UnSubscribe from NDC API Product Update Notifications.',
        buttons: {
            confirm: function () {


                showGlobLdr = true;
                var uq = $('#uqId').val();
                var uri = "/cmx/unSubscribePageNotif?pg=PROD-UPDATES"
                loadjsn(uri, unsubDone, null, false, showErr);


            },
            cancel: function () {

            }
        }

    });


}

function unsubDone(obj){

    $('#sublnk').removeClass("hide");
    $('#unsublnk').addClass("hide");
    pnClose('#pnSub');

}

function Resend() {

    var uq = $('#rtncode').val();
    var uri = "/cmx/ResendConfMail"
    loadjsn(uri, subDone, null, false, showErr);

}

function subDone(obj) {


    if (obj.success) {
        $('#pnSubAdd').addClass("hide");
        $('#pnSubMsg').removeClass("hide");

        $('#rtncode').val(obj.code);

        $("#subEmail").val('');
        $('#sublnk').addClass("hide");
        $('#unsublnk').removeClass("hide");
    }
}