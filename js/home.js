
function show(id,grp){
 
  $(grp).addClass('hide');
  $(id).removeClass('hide');
  
}

function showLDiv(id,grp,e) {
    $(grp).addClass('hide');
    $(id).removeClass('hide');
  	$('.cst li').removeClass('active');
    $(e).addClass('active');
    $(e).children('div').addClass('hide');
 }

function setpn(el){
  $(el).click();
}


$(function () { 
  
  $('a[href="#"]').click(function (e) {
    e.preventDefault();
   
});
  
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  e.target // newly activated tab
  e.relatedTarget // previous active tab
})
});