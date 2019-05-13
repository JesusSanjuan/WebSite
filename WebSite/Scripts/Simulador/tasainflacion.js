﻿$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "tasainflacion.aspx/extraerindices",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var valores = JSON.parse(data.d);
            var id_indice_base = valores[0];
            var id_base_nombres = valores[1];

            inicializacion(id_indice_base, id_base_nombres);
        },
        error: function (err) {
            console.log(err);
            console.log(err.responseText);
        }
    }).done(function (data) {
        //console.log(data);
    }).fail(function (data) {
        console.log("Error: " + data);
    });


   function inicializacion(x, y) {
   
    var options = [];
    //convertimos el array en json
    var result_ids_indice = JSON.parse(JSON.stringify(x));
    var result_descrip_indice_base = JSON.parse(JSON.stringify(y));
    var valor1 = "<option value='' class='dropdown-item' selected>Seleccione</option>";
    options.push(valor1);
    for (i = 0; i < result_ids_indice.length; i++)
    {
        var option;
        option = "<option value=" + result_ids_indice[i] + ">" + result_descrip_indice_base[i] + "</option>";
        //console.log(option);
        options.push(option);
    }

       $('#select_indice_base').html(options);
       $('#select_indice_base').selectpicker('refresh');
    }

    $('#select_indice_base.selectpicker').on('change', function () {//obtener datos cuando el periodo cambie
        var periodo_select = $("#select_indice_base.selectpicker").val();
        if (periodo_select.length === 0) {
            $('#pre_datos').css("display", "none"); 
        }
        else
        {
            $('#pre_datos').css("display", "block");
            consulta_inputs(periodo_select);
        }
        
        /* Limpia los demas campos posteriores */
        var op1 = [];
        op1.push("<option value='' class='dropdown-item' selected>Seleccione</option>");
        $('#select1').html(op1);
        $('#select2').html(op1);
        $('#select3').html(op1);
        $('#select1').prop("disabled", true);
        $('#select2').prop("disabled", true);
        $('#select3').prop("disabled", true);
        $('#select1').selectpicker('refresh');
        $('#select2').selectpicker('refresh');
        $('#select3').selectpicker('refresh');
        $("#Calculartasainfla").css('visibility', 'hidden');
        $('#Resultados').css("display", "none");
        $('#inf1').val("");
        $('#TPMI1').val("");
       /* Limpia los demas campos posteriores */

     
    });

    function consulta_inputs(id_indice_base)
    {        
            $.ajax({
                type: "POST",
                url: "tasainflacion.aspx/get_imputs_post",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                data: JSON.stringify({ id_indice_base: id_indice_base}),
                success: function (result) {
                    if (result.d === "")
                    {
                        $("#rango").html(' <h6> No hay datos aun para esta base intente con otro base distinta<h6>');
                        $('#pre_datos2').css("display", "none");
                    }
                    else
                    {
                    
                            var resultado = JSON.parse(result.d);                    
                            var inicio = resultado[0];
                            var fin = resultado[1];
                            var id_anio = resultado[2];
                            var anio = resultado[3];
                            var TF = inicio[1].concat(" ", inicio[0]," - ", fin[1]," ", fin[0]);
                            $("#rango").html(' <h6>' + TF + '<h6>');
                            $('#pre_datos2').css("display", "block");

                        var optionsAnio = [];
                        var valorAnio = "<option value='' class='dropdown-item' selected>Seleccione</option>";
                        optionsAnio.push(valorAnio);
                        for (i = 0; i < id_anio.length; i++) {
                            var option;
                            option = "<option value=" + id_anio[i] + ">" + anio[i] + "</option>";
                            //console.log(option);
                            optionsAnio.push(option);
                        }

                        $('#select').html(optionsAnio);
                        $('#select').selectpicker('refresh');
                    }

                },
                error: function (result) {
                    console.log(result.responseText);
                }

            }).done(function (data) {
              /*  $('#pre_datos2').smoothscroll({
                    duration: 4000,
                    easing: 'easeOutCirc',
                    offset: 0,
                    hash: true,
                });
                //location.href = "#pre_datos2";*/
                //console.log(data);
            }).fail(function (data) {
                console.log("Error: " + data);
            });
        
    }

    $('#select.selectpicker').on('change', function () {//obtener datos cuando el periodo cambie
        var id_periodo_select = $("#select.selectpicker").val();
        $("#Calculartasainfla").css('visibility', 'hidden');
        
        $('#Resultados').css("display", "none");
        $('#inf1').val("");
        $('#TPMI1').val("");
        $.ajax({
            type: "POST",
            url: "tasainflacion.aspx/get_imputs_post_anio",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            data: JSON.stringify({ id_periodo_select: id_periodo_select }),
            success: function (result) {

                $('#select1').prop("disabled", false);
                var meses = JSON.parse(result.d); 
                var optionsMeses = [];
                var valormes = "<option value='' class='dropdown-item' selected>Seleccione</option>";
                optionsMeses.push(valormes);

                $('#select2').html(optionsMeses);
                $('#select3').html(optionsMeses);
                $('#select2').selectpicker('refresh');
                $('#select3').selectpicker('refresh');

                for (i = 0; i < meses.length; i++) {
                    var option;
                    option = "<option value=" + meses[i].toLowerCase() + ">" + meses[i]+ "</option>";
                    optionsMeses.push(option);
                }

                $('#select1').html(optionsMeses);
                $('#select1').selectpicker('refresh');
            },
            error: function (result) {
                console.log(result.responseText);
            }

        }).done(function (data) {
            //console.log(data);
        }).fail(function (data) {
            console.log("Error: " + data);
        });
    });

    $('#select1.selectpicker').on('change', function () {//obtener datos cuando el periodo cambie
        var id_periodo_select_anio = $("#select.selectpicker").val();
        var id_periodo_select_mes = $("#select1.selectpicker").val();
        $("#Calculartasainfla").css('visibility', 'hidden');
        if (id_periodo_select_mes.length === 0) {
            id_periodo_select_anio = "";            
        }
        $('#Resultados').css("display", "none");
        $('#inf1').val("");
        $('#TPMI1').val("");
        $.ajax({
            type: "POST",
            url: "tasainflacion.aspx/get_imputs_post_anio_2",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            data: JSON.stringify({ id_periodo_select_anio: id_periodo_select_anio}),
            success: function (result) {          


                var resultados = JSON.parse(result.d); 
                var id_anios = resultados[0];
                var anios = resultados[1];                
                $('#select2').prop("disabled", false);

                var optionsMeses = [];
                var valormes = "<option value='' class='dropdown-item' selected>Seleccione</option>";
                optionsMeses.push(valormes);
                $('#select3').html(optionsMeses);


                $('#select3').selectpicker('refresh');
                 for (i = 0; i <anios.length; i++) {
                    var option;
                    option = "<option value=" + id_anios[i] + ">" + anios[i] + "</option>";
                    optionsMeses.push(option);
                }
                $('#select2').html(optionsMeses);
                $('#select2').selectpicker('refresh');
            },
            error: function (result) {
                console.log(result.responseText);
            }

        }).done(function (data) {
            //console.log(data);
        }).fail(function (data) {
            console.log("Error: " + data);
        });
    });

    $('#select2.selectpicker').on('change', function () {//obtener datos cuando el periodo cambie
        var id_periodo_select_anio = $("#select.selectpicker").val();
        var id_periodo_select_mes = $("#select1.selectpicker").val();
        var id_periodo_select_anio2 = $("#select2.selectpicker").val();
        $("#Calculartasainfla").css('visibility', 'hidden');
        $('#Resultados').css("display", "none");
        $('#inf1').val("");
        $('#TPMI1').val("");
        $.ajax({
            type: "POST",
            url: "tasainflacion.aspx/get_imputs_post_anio_3",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            data: JSON.stringify({ id_periodo_select_anio: id_periodo_select_anio,id_periodo_select_mes: id_periodo_select_mes, id_periodo_select_anio2: id_periodo_select_anio2 }),
            success: function (result) {
                var resultados = JSON.parse(result.d);
                $('#select3').prop("disabled", false);

                var optionsMeses = [];
                var valormes = "<option value='' class='dropdown-item' selected>Seleccione</option>";
                optionsMeses.push(valormes);
                for (i = 0; i < resultados.length; i++) {
                    var option;
                    option = "<option value=" + resultados[i].toLowerCase() + ">" + resultados[i] + "</option>";
                    optionsMeses.push(option);
                }
                $('#select3').html(optionsMeses);
                $('#select3').selectpicker('refresh');
            },
            error: function (result) {
                console.log(result.responseText);
            }

        }).done(function (data) {
            //console.log(data);
        }).fail(function (data) {
            console.log("Error: " + data);
        });

    });

    $('#select3.selectpicker').on('change', function () {//obtener datos cuando el periodo cambie
        
        var v4 = $("#select3.selectpicker").val();

        if (v4.length === 0) {
            $("#Calculartasainfla").css('visibility', 'hidden');
        }
        else {
            $("#Calculartasainfla").css('visibility', 'visible');
        }
        $('#Resultados').css("display", "none");
        $('#inf1').val("");
        $('#TPMI1').val("");

    });
    var myInput = document.getElementById('inf1');
    var myInput2 = document.getElementById('TPMI1');
    myInput.onpaste = function (e) {
        e.preventDefault();
    };
    myInput2.onpaste = function (e) {
        e.preventDefault();
    };
    /* myInput.oncopy = function (e) {
         e.preventDefault();
     };*/

    $('#Calculartasainfla').click(function () {
        var v1 = $("#select.selectpicker").val();
        var v2 = $("#select1.selectpicker").val();
        var v3 = $("#select2.selectpicker").val();
        var v4 = $("#select3.selectpicker").val();
        if (v1.length === 0 && v2.length === 0 && v3.length === 0 && v4.length === 0) {
            $('#myModal').modal({ show: true });
        }
        else {
                $.ajax({
                    type: "POST",
                    url: "tasainflacion.aspx/calcular_inflacion",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    data: JSON.stringify({ id_inpc_inicial: v1, id_inpc_inicial_mes: v2, id_inpc_final: v3, id_inpc_final_mes:v4 }),
                    success: function (result) {
                        var resultados = JSON.parse(result.d);               
                        $('#Resultados').css("display", "block");
                        $("#P1").html('<h6>Periodo Seleccionado:&nbsp; <strong>' + resultados[1] + ' ' + resultados[0] + ' a ' + resultados[3] + ' ' + resultados[2] + '</strong> </h6>');
                        $('#inf1').val(resultados[4]);                
                        $("#P2").html('<h6>Periodo Seleccionado:&nbsp; <strong>' + resultados[1] + ' ' + resultados[0] + ' a ' + resultados[3] + ' ' + resultados[2] + '</strong> </h6>');
                        $('#TPMI1').val("Aun no diponible el calculo");
                    },
                    error: function (result) {
                        console.log(result.responseText);
                    }

                }).done(function (data) {
                    //console.log(data);
                }).fail(function (data) {
                    console.log("Error: " + data);
                });
        }
    });

    /***************************/
    $('#alertSucces').hide();
    inicializarProyectos();

    function inicializarProyectos() {
        //cargamos los proyectos en el select
        $.ajax({
            type: "POST",
            url: "tasainflacion.aspx/cargar_proyectos",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                var resultados = JSON.parse(result.d);
                var options = [];
                for (var i = 0; i < resultados.length; i++) {
                    var option;
                    option = resultados[i];
                    options.push(option);

                }
                $('#proyectos.selectpicker').html(options);
                $('#proyectos.selectpicker').selectpicker('refresh');

                $('#proyectosINEGI.selectpicker').html(options);
                $('#proyectosINEGI.selectpicker').selectpicker('refresh');

            },
            error: function (result) {
                console.log(result.responseText);
            }

        }).done(function (data) {
            //console.log(data);
        }).fail(function (data) {
            console.log("Error: " + data);
        });

    }

    $('#Guardarinflacion').click(function () {
        $('#myModal').modal({ show: true });
    });

    $('#saveI').click(function () {
        var inflacion = $("#inf1").val();
        var inMensual = $("#TPMI1").val();
        if (inflacion != "" ) {//inflacion != "" && inMensual != ""

            var periodo = $("#P1").find("h6").find("strong").html();
            var proyectos = $('#proyectos.selectpicker').val();
           //GUardamos los datos en la tabla de indices
            $("#myModal").modal('hide');

        }
    });
    $('#saveINEGI').click(function () {
        var inflacion = $("#inflacion").val();
        var inMensual = $("#TPMI").val();
        if (inflacion != "") {//inflacion != "" && inMensual != ""

            var periodo = $("#periodoINEGI").val();
            var proyectos = $('#proyectosINEGI.selectpicker').val();
            //GUardamos los datos en la tabla de indices

            $('#alertSucces').show();

            setTimeout(
            function () {
                $("#alertSucces").modal('hide');
            }, 3000);
            

            

        }
    });

    
    

});