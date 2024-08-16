//$(function () {
//    setUrlSafeInput('#siteName');

//    selectCard('ONE', 'subs');
//});



function selectCard(el, grp, nm, pc) {


    var ctrl = $(".container").find('[data-grp="' + grp + '"]');

    ctrl.each(function () {
        $(this).find(".card").removeClass('selctd');
        $(this).find(".selctpn").hide();
    });

    $("#" + el).find('.card').addClass("selctd");
    $("#" + el).find('.selctpn').show();

    if (grp == 'subs') {
        $('#subsId').val(el);
        /*$('#selsub').html(el);*/
        $('#pk-name').html(nm);
        $('#pk-price').html(pc);
    }
    if (grp == 'catg') {
        $('#pkgId').val(el);

    }


}


function setUrlSafeInput(el) {

    $(el).on('keypress', function (event) {
        var regex = new RegExp("^[a-zA-Z0-9_-]*$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    });

}


function showpks() {

    
       loadpks();


        $('#subPln').addClass('hide');
        $('#subPks').removeClass('hide');

     
        isDirty = false;


}

function saveorder(r) {

    

    isValid = true;

    validateEl($('#siteName'));

    if (isValid) {
       
        var uri = '/join/saveorder';
        loadjsn(uri, sitesetup);
        //loadjsn(uri, setTree);

        isDirty = false;
    }

}


function sitesetup(obj) {
   
    $("#pnSites").addClass("hide");

    Success(obj, "New Site - Checkout.");
    loader('show')
    window.location.replace(obj.redirect);
   

}

function pnShow(obj) {

    $('#pnPUC').removeClass('tmPn');
    $('#pnPUC').addClass('exportpan')
    $('#pnPUC').html(obj.vw);
    $('.overlay').show();
    loader('hide');
}


function exportComplete() {

    pnClose('#pnPUC');
    loader('hide');
    Success();
}



function SiteRemoved(obj) {

    Success(obj, "Site has been removed.");

    window.location.reload();

}

function setCur(el) {

    var cur = $(el).find(":selected").text();
    var uri = host + "/viewpart/subscription/options?c=" + cur;
  
    loadjsn(uri, setPanel, '#subpn');
    
      
}

function loadpks() {

    var cur = $('#cur').find(":selected").text();
    var uri = "/join/SitePacks?c=" + cur;

    loadjsnAuth(uri, setVwPaks, '#sitpks');

}


function setVwPaks(obj, pnl) {
    $('#subPln').addClass('hide');
    $('#subPks').removeClass('hide');
    setPanel(obj, pnl);
    setUrlSafeInput('#siteName');
}

function setPanel(obj, pnl) {
    loader('hide');
    $(pnl).html(obj.PageContent.htmcontent);
}

function goback() {
    $('#subPln').removeClass('hide');
    $('#subPks').addClass('hide');
}


function mySubscription() {

    var uri = "/pay/mySubscriptions";
    loadjsn(uri, showAccount);

}
function showAccount(obj) {
    $('#pnEd').addClass('hide');
    $('#pnLayouts').addClass("hide");
    $('#pnVw').removeClass('hide');

    loader('hide');

    /*$('#pnVw').html(obj.vw);*/
    $('#mainVw').html(obj.vw);

}

function renewSub(s) {

    var uri = "/pay/renewSub?s=" + s;
    
    $('#pnVw').removeClass('hide');
    $('#pnEd').addClass('hide');
    loadjsn(uri, showSub);

}

function showSub(obj) {

    loader('hide');
    $("#pnVw").html(obj.vw);

}

function renewpay() {

    var uri = "/pay/saveSubOrder";
    loadjsn(uri, sitesetup);


}
function renewChkout(obj) {
    $("#pnSites").addClass("hide");

    Success(obj, "New Site Created.");
    loader('show')
    window.location.replace(obj.redirect);

}

function renew(s,nm,lv) {

    var uri = "/pay/renewOrder?s=" + s;
    loadjsn(uri, sitesetup);

}