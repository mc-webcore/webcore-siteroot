

function GetSummaryTbl(vw,typs,mn,vn,rw) {

      
        var dt = new Date();
        dt.setDate(dt.getDate() - mn);
        var d = DateToString(dt);
        var uri = '/getPageSummaries?m=' + 0 + '&typ=' + typs + '&vn=' + vn +'&d=' + d + "&rws=" + rw;
   
        loadjsn(uri, loadSummaryTbl, vw);
}


function GetPages(typs, vn, rw) {

    var d = $('#ddate1').val();
    var ed = $('#ddate2').val();

    
    var uri = '/getPages?m=' + 0 + '&typ=' + typs + '&vn=' + vn + '&d=' + d + "&rws=" + rw + "&ed=" + ed;

    loadjsn(uri, Success );
}



function getsumtb(vw, typs,vn, rw) {

    var d = $('#ddate1').val();
    var ed = $('#ddate2').val();

    var uri = '/getPageSummaries?m=' + 0 + '&typ=' + typs + '&vn=' + vn + '&d=' + d + "&rws=" + rw + "&ed="+ ed;

    loadjsn(uri, loadSummaryTbl, vw);

}




function loadSummaryTbl(obj,vw) {

    if (obj.vw.trim() == "") {
        $('#pnApiUpd').hide();
        $('#fpupdpn').hide();

    } else {
        $('#pnApiUpd').show();
        $('#fpupdpn').show();
    }

    $(vw).html(obj.vw);

    $('#ddate1').val(obj.sdt);
    $('#ddate2').val(obj.edt);

}