
function loadAssetTb(pn,fld) {

    var uri = "/GetAssetView?id=" + fld + "&ty=TBL";
    loadComponent(uri, pn);


}

function loadAssetGrpName(pn, fld, grpNm) {

    var uri = "/GetAssetView?id=" + fld + "&ty=GRPNM&nm="+grpNm;
    loadComponent(uri, pn);

}


function loadAssetGrps(pn, fld) {

    var uri = "/GetAssetView?id=" + fld + "&ty=GRP";
    loadComponent(uri, pn);

}


function viewxml(id,fn) {

    showGlobLdr = true;
    var uri = "/GetAssetCodeView?id=" + encodeURIComponent(id) + "&fn=" + encodeURIComponent(fn);
    loadjsn(uri, showxml);

}
function viewfxml(id, fn) {

    showGlobLdr = true;
    var uri = "/GetAssetCodeView?id=" + encodeURIComponent(id) + "&fn=" + encodeURIComponent(fn) +"&fx=fl";
    loadjsn(uri, showxml);

}

function showxml(obj) {

    showGlobLdr = false;
    $('#pnAsset').hide();
    $('#vwXML').show();

   
    $('#vwXML').html(obj.vw);
    ReloadPrism();
}

function closeXmlPn() {
    $('#pnAsset').show();
    $('#vwXML').hide();

}