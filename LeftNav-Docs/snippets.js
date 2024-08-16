function SnippetPnl(el,bn) {


    var snp = "#snippet-" + el;
    var tbv = "#tbview-" + el;
    var tbh = "#tbhead-" + el;



    if ($(snp).hasClass("hide")) {

      
       /* $("#rtpush").removeClass("rtpush");*/
  
        $(bn).addClass("isActive");
        $(snp).addClass('col-md-6');
      
        $(tbv).removeClass('col-md-12');
        $(tbv).addClass('col-sm-6');
        $(tbv + " .vxml").addClass('hide');  
        $(tbh + " .vxml").addClass('hide');  
        $(tbv + " .vxmla").addClass('col-md-4');  
        $(tbv + " .vxmlb").addClass('col-md-8');  
        $(tbv + " .vxmla").removeClass('col-md-3');
        $(tbv + " .vxmlb").removeClass('col-md-6');  

        var ht = $(tbv).height() + 30;

        if (ht < 400) { ht = 400; }

        $(snp).height(ht);
        $('#pre-' + el).height(ht-30);
        $(snp).removeClass('hide');
     
     
        Prism.highlightAll();

    } else {

        $(snp).removeClass('col-md-6');
        $(snp).addClass('hide');
        $(tbv).removeClass('col-md-6');
        $(tbv).addClass('col-md-12');
        $(tbv + " .vxml").removeClass('hide');  
        $(tbh + " .vxml").removeClass('hide');  
        $(tbv + " .vxmla").removeClass('col-md-4');
        $(tbv + " .vxmlb").removeClass('col-md-8');  
        $(tbv + " .vxmla").addClass('col-md-3');
        $(tbv + " .vxmlb").addClass('col-md-6');  
     /*   $("#rtpush").addClass("rtpush");*/

        $(bn).removeClass("isActive");
    
    }

           
    
}