﻿
$(document).ready(function () {

    $('#myTabContent, #myTabContent2').find('table').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        }
    });
    /****************TABLAS COSTOS****************/
    // Automatically add a first row of data
    $('.add_row').on('click', function () {
        var selector = $(this).parents('.tab-pane').attr("id");
        var t = $('#' + selector).find('table').DataTable();
        t.row.add([
           '',
           '0',
           '<i  class="fa fa-times fa-3 remove" aria-hidden="true"></i>'
        ]).draw(false);
        t.order([1, 'desc']).draw();

        $('#' + selector).find('table').find('td:last').prev().prev().addClass('previous');
        $('#' + selector).find('table').find('td:last').attr("data-editable", "false");
        $('#' + selector).find('table').editableTableWidget({ editor: $('<input class="form-control">') }).numericInputExample().find('.previous').focus();
        $(".na").html("");
       
    });
    //$('#myTabContent').find('table').find('td').on('change', function (evt, newValue) {

    $("body").on("change", "#myTabContent table td", function (evt, newValue) {
        var selector = $(this).parents('.tab-pane').attr("id");
        var t = $('#' + selector).find('table').DataTable()
        //console.log(newValue);
        t.cell(this).data(newValue).draw();
        t.order([1, 'desc']).draw();
    });

    /****** actvacion de pestañas **/
    $('#myTab li a').addClass('disabled');
    $('#myTab li:nth-child(1) a').tab('show');
    var nav = 1;

    $("body").on("click", ".continuar", function () {
        var selector = $(this).parents('.tab-pane').attr("id");
        $(".modal-content #selector").val(selector);
        $('#Continuacioncostos').modal({ show: true });
  
    });


    //$("body").on("click", ".save_data", function () {
    $("body").on("click", "#costo_continuar", function () {
        /*OBTENIENDO DATOS DE LAS FUNCOINES DE Table To JSON*/
       // var selector = $(this).parents('.tab-pane').attr("id");
        var selector = $('input#selector').val();
        var data = $('#' + selector).find('table').tableToJSON();
        //var myJsonString = JSON.stringify(data);
        //console.log(myJsonString);
        
        $.ajax({
            type: "POST",
            url: "costos.aspx/sendTable",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            data: JSON.stringify({ dataTabla: data }),
            success: function (result) {
                console.log(result);
            },
            error: function (result) {
                alert(result.responseText);
            }

        }).done(function (data) {
            //console.log(data);
        }).fail(function (data) {
            console.log("Error: " + data);
        });

        nav++;
        if (nav > 4) {
            nav = 1;
        }

        $('#myTab li:nth-child(' + nav + ') a').removeClass('disabled');
        $('#myTab li:nth-child('+nav+') a').tab('show');
        $('#myTab li:nth-child(' + (nav - 1) + ') a').addClass('disabled');

        
       
    });

    /****************TABLA AMORTIZACION****************/
    $("#amortTable").editableTableWidget({ editor: $('<input class="form-control">') }).numericInputExample().find('.previous').focus();
    $(".na").html("");

    $("body").on("click", "#MainContent_add_row", function () {
        var t = $("#amortTable").DataTable();
        t.row.add([
            '',
            '0',
            '',
            '0',
            '<i  class="fa fa-times fa-3 remove" aria-hidden="true"></i>'
        ]).draw(false);
        t.order([3, 'desc']).draw();
       
        $("#amortTable").find('td:last').prev().prev().prev().prev().addClass('previous');
        $("#amortTable").find('td').eq(0).addClass('previous');

        $("#amortTable").find('td:last').prev().prev().prev().addClass('costo');
        $("#amortTable").find('td').eq(1).addClass('costo');

        $("#amortTable").find('td:last').prev().prev().addClass('porct');
        $("#amortTable").find('td').eq(2).addClass('porct');

        $("#amortTable").find('td:last').attr("data-editable", "false");
        $("#amortTable").find('td').eq(3).attr("data-editable", "false");
        $("#amortTable").find('td:last').prev().attr("data-editable", "false");

        $("#amortTable").editableTableWidget({ editor: $('<input class="form-control">') }).numericInputExample().find('.previous').focus();
        $(".na").html("");

    });

    $("body").on("click", "#MainContent_guardar_amort", function () {
        /*OBTENIENDO DATOS DE LAS FUNCOINES DE Table To JSON*/
        var data = $("#amortTable").tableToJSON();
        var myJsonString = JSON.stringify(data);
       // console.log(myJsonString);


        $.ajax({
            type: "POST",
            url: "amortizacion.aspx/sendTableAmort",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            data: JSON.stringify({ dataTabla: data }),
            success: function (result) {
                console.log(result);
                $('#successA').modal({ show: true });
            },
            error: function (result) {
                alert(result.responseText);
            }

        }).done(function (data) {
            //console.log(data);
        }).fail(function (data) {
            console.log("Error: " + data);
        });

        

    });

    $("body").on("change", " #myTabContent2 table td", function (evt, newValue) {
        var selector = $(this).parents('.tab-pane').attr("id");
        var t = $('#' + selector).find('table').DataTable()
        //console.log(newValue);
        t.cell(this).data(newValue).draw();
        t.order([3, 'desc']).draw();

        var clase = $(this).attr("class");

        //CALCULAMOS EL PORCENTAJE DEL COSTO
        var rowIdx = t.cell(this).index().row;
        var data = t.row(rowIdx).data();
        if (clase == "costo") {
            if (data[2] !== "") {
                var costoFinal = (newValue * data[2]) / 100;
                //console.log('porcentaje--->' + data[2]);
                t.cell(rowIdx, 3).data(costoFinal).draw();
                t.order([3, 'desc']).draw();
            }

        }
        if (clase == "porct") {
            if (data[1] !== "") {
                var costoFinal = (data[1] * newValue) / 100;
                //console.log('porcentaje--->' + newValue);
                t.cell(rowIdx, 3).data(costoFinal).draw();
                t.order([3, 'desc']).draw();
            }
            
        }

        var column = t.column(3);

        $(column.footer()).html(
            column.data().map(parseFloat).reduce(function (a, b) {
                return a + b;
            })
        );

        $(".na").html("");

    });


/********************remover filas**************************/
    $("body").on("click", ".remove", function () {

        var selector = $(this).parents('.tab-pane').attr("id");
        var table = $('#' + selector).find('table').DataTable();

        table.row($(this).parents('tr')).remove().draw();

        $('#' + selector).find('table').find('td:last').prev().prev().addClass('previous');
        $('#' + selector).find('table').find('td:last').attr("data-editable", "false");
        $('#' + selector).find('table').editableTableWidget({ editor: $('<input class="form-control">') }).numericInputExample().find('.previous').focus();
        $(".na").html("");
    });



});

