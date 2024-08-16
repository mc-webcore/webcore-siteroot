$(document).ready(function () {

  
    var rn = getQueryParam('article-id');
    
  
    if (rn != null) {
        getNoteFromUri(rn);
        return false;
    }
  
    var yn = getQueryParam('yr');
   	
    if(yn==null){
      var dtx = new Date().getFullYear() 
      yn=dtx;}
     getnewsroom(yn);
  
});

function getQueryParam(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function getnote(id) {
    allowline = false;
    let dtb = $('#ftbl').val();
    dtb = dtb.replace('/', '~');
    $('#nwsldr').html("<h3>One Moment...</h3>");
    var uri = "/components/getjsn/news-item/" + dtb + "/0/article-id=" + id + "?usecache=Y";
 loadjsn(uri, showArticle);
  

}

function showNews(obj){
 	 if (obj != null) {
        $('#pnNews').html(obj.vw);
     }
}

function getnewsroom(id) {
    allowline = false;
    let dtb = $('#ftbl').val();
    dtb = dtb.replace('/', '~');
    $('#nwsldr').html("<h3>One Moment...</h3>");
    var uri = "/components/getjsn/news-main/" + dtb + "/0/yr=" + id + "?usecache=Y";

     loadjsn(uri, showNews);

}



function getNoteFromUri(nid) {
    // load from Uri full Note details
    getnote(nid);
}

function showArticle(obj) {

    if (obj != null) {
        $('#pnNews').html(obj.vw);
        
        stitle = $('#title').html();
        subtitle = $('#subtitle').html();

var doctitle="";
        if (obj.fragmentTable.PageTitle != "") { 
          
          $('#title').html(obj.fragmentTable.PageTitle); 
          doctitle = obj.fragmentTable.PageTitle
        }
        if (obj.fragmentTable.PageSubTitle != "") { 
          doctitle = doctitle + " - " +obj.fragmentTable.PageSubTitle;
          $('#subtitle').html("<h4>" + obj.fragmentTable.PageSubTitle + "</h4>"); }
       
        if (obj.fragmentTable.PageSubTitle2 != "") { $('#ssubtitle').html(obj.fragmentTable.PageSubTitle2); }

        if(doctitle!=""){
        	document.title=doctitle;
        }
    
    }

}