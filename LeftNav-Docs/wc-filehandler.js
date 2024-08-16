
$(document).ready(function () {


});

var fts = ".jpg,.png,.js,.css,.gif,.txt,.text,.yml,.yaml,.html,.cshtml,.svg,.pdf,.json,.svg,.jfif,.xml,.xsd,.zip,.xsd,.jpeg,.docx,.xls,.rar,.log";

var dz;
function startDropZone() {

    SetFileUpl("#pnVw");

    document.onpaste = function (event) {
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (index in items) {
            var item = items[index];
            if (item.kind === 'file') {
                // adds the file to your dropzone instance
               dz.addFile(item.getAsFile())
            }
        }
        //return false;
    }
}


function SetFileUpl(drpzone) {

   $(drpzone).each(function () {

        let dropzoneControl = $(this)[0].dropzone;
        if (dropzoneControl) {
            dropzoneControl.destroy();
        }
    });

   

    $('#pnVw').removeClass('hide');
    $('#pnEd').addClass('hide');

    var msg = "Drop file here to upload "
    var hasError = false;

   $(drpzone).dropzone({
        url: "/filehandler/filesave",
        acceptedFiles: fts,
        parallelUploads: 1,
        autoDiscover: false,
        uploadMultiple: true,
        autoProcessQueue: true,
        previewsContainer: null, // Define the container to display the previews
        clickable: "#upfile",
        method: "post",
        dictDefaultMessage: msg,
        complete: function (file) {
            $('.dz-preview').html("");
            $(".drop-pan").removeClass("spnloading");
            if (!hasError) {

                Success();


            }
            file.previewElement.innerHTML = "";
        },
        accept: function (file, done) {

            let flx = $('#flslist').val();
         

            let fobj = flx.split('|');

            $.each(fobj, function (index, data) {
                if (data == file.name) {
                    $("#errDet").html('<i class="fa fa-exclamation-triangle"></i> Error File already uploaded');

                    $('.dz-preview').html("");
                    showErr();
                    hasError = true;
                 
                    return done("This file is not accepted!");
                }
            });
            if (flx != "") { flx = flx + "|"; }
            flx = flx + file.name;
            $('#flslist').val(flx);

            return done();

        },
        init: function () {
            this.on("addedfile", function () {
                closeErr('#cmserrpn');
                hasError = false;
                $(".drop-pan").addClass("spnloading");
            }),
                this.on("completemultiple", function () {
                   

                }),
                this.on("queuecomplete", function (file,response) {
                    var fld = $("#fld").val();
                    if (this.files[1] != null) {
                        this.removeFile(this.files);
                    }

                    if (!hasError) {

                        loadFls([fld]);
                    }
                    $('.dz-preview').html("");
                  

                }),
                this.on("sending", function (file, xhr, formData) {
                    var tkt = $("#ticketId").val();
                    
                    formData.append("ticketId", tkt);
                    //formData.append("site", site);
                }),
                this.on("success", function (file, response) {


                    let fn = response.filename;
                    let fl = file.name;
                    if (fn != fl) {
                        let flx = $('#flslist').val();
                        let result = flx.replace(file.name, response.filename);
                        $('#flslist').val(result);
                    }
                    

                }),
                this.on("error", function (file, response) {

                    if (response.errorVw != null) {
                        $("#errDet").html(response.errorVw);
                    } else {
                        $("#errDet").html('<i class="fa fa-exclamation-triangle"></i>Error File Upload Failed - ' + response);
                    }

                    
                    $('.dz-preview').html("");
                    showErr();
                    hasError = true;
                });
            dz = this;
        }

    });



}


function loadFls() {

    var uri = "/filehandler/filelist";
    loadjsn(uri, showFiles);

}

function showFiles(obj) {

    let ct=0
    let pp = "";
    let flx = "";
    if (obj.files.length > 0) {

        $.each(obj.files, function (index, data) {

            if (flx != "") { flx = flx + "|"; }
            flx = flx +  data.Name;

            if (ct > 0) {
                pp = pp + "<div class=\"row rw-pnc\"  onclick=\"delAttach('" + data.Name + "');\" >";
            } else {
                pp = pp + "<div class=\"row rw-pn\"  onclick=\"delAttach('" + data.Name + "');\" >";
            }
            
            pp = pp + "<div class=\"col-sm-1\"><i class=\"ti-file\"></i> </div>";
            pp = pp + "<div class=\"col-sm-9\">" + data.Name + "</div>";
            pp = pp + "<div class=\"col-sm-1\"><i class=\"ti-trash\"></i> </div>";
            pp = pp + "</div>";
            ct++;
        });
    };

    $("#flslist").val(flx);

    $("#fls").html(pp);

}


function delAttach(nm) {

    $.confirm({
        title: '<i class="fas fa-exclamation-triangle red"></i> Delete File ',
        content: 'Confirm to Remove this File.',
        buttons: {
            confirm: function () {

                let fls = $('#flslist').val();
                let flx = "";
                let fobj = fls.split('|');

                $.each(fobj, function (index, data) {

                    if (nm != data) {
                        if (flx != "") { flx = flx + "|"; }

                        flx = flx + data;
                    }
                  
                });

                $("#rmfile").val(nm);
                let uri = "/filehandler/rm";
                loadjsn(uri, silent);

                $('#flslist').val(flx);
                loadFls();

            },
            cancel: function () {

            }
        }

    });


    
    


}
