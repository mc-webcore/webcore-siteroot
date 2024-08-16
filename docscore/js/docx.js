
function ld(fl) {

    $("#page-wrapper").load(fl);
}

var editor;
var editor2;
$(function () { //DOM Ready


    function qsa(sel) {
        return Array.apply(null, document.querySelectorAll(sel));
    }
    qsa(".codeb").forEach(function (editorEl) {
        CodeMirror.fromTextArea(editorEl, {
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true,
            mode: { name: "xml", globalVars: true },


        });
    });


});

