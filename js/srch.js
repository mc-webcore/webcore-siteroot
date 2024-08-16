$(function () {


    setCityAutoComplete("#Dep");
    setCityAutoComplete("#Arr");

    setCityAutoComplete("#Dep1");
    setCityAutoComplete("#Arr1");

    setCityAutoComplete("#Dep2");
    setCityAutoComplete("#Arr2");

    setCityAutoComplete("#Dep3");
    setCityAutoComplete("#Arr3");


});


function setCityAutoComplete(h) {
   
    $(h).autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "/sandbox/GetAirports",
                data: JSON.stringify(request),
                dataType: "json",
                global: false,
                success: function (data) {
                    
                    $(h + 'err').addClass('hide');
                    response($.map(data, function (item) {

                        return {

                            label: item.LocationCode + ' ' + item.Description,
                            value: item.LocationCode,
                            code: item.LocationCode

                        }
                    }))

                },
                error: function (result) {
                    $(h + 'err').removeClass('hide');
                    $(h).addClass("ui-autocomplete-fail");
                    isValid = false;
                }
            });
        }, minLength: 2,
        //change: function (event, ui) {
        //    isAuto = false;
        //    validatecity(h);},
        select: function (event, ui) {
            var label = ui.item.code;
            var value = ui.item.code;
            $(this).val(ui.item.code); // display the selected text
           

        }
    });

    //$(h).on("autocompleteselect", function (event, ui) {
    //    $(this).val('');
    //    $(this).val(ui.item.code); // display the selected text
    //    isAuto = false;
    //});
}