var DTabla;

function RellenarTabla(Datos) {    
    DTabla = JSON.parse(JSON.stringify(Datos)); 

  
    for (var i = 0; i < DTabla.length; i++) {
        for (var j = 2; j < DTabla[i].length; j++) {
            var Dato = DTabla[i][j];
            var resultadoFormato = number_format(Dato, 2);
            var res;
            if (Dato != '')
            {            
                if (Dato < 0)
                {
                    var str1 = "$-";
                    res = str1.concat(resultadoFormato);
                }
                else
                {
                    var str2 = "$";
                    res = str2.concat(resultadoFormato);
                }
                DTabla[i][j] = res;
            }
        }
    }
}

function number_format(amount, decimals) {
    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0)
        return parseFloat(0).toFixed(decimals);

    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);

    var amount_parts = amount.split('.'),
        regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

    return amount_parts.join('.');
}

$(document).ready(function () {
    var table = $('#dataTableVAN').DataTable({
        language: {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ning�n dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "�ltimo",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
        createdRow: function (row, data, dataIndex) {
            if (data[6].replace(/[\$,]/g, '') * 1 > 1) {
                $(row).find('td:eq(6)').css("color", "red");
            }
        },
        data: DTabla
    });
});

function Modal(Resultado) {
    ResultadoVPN = JSON.parse(JSON.stringify(Resultado));
      
    $(document).ready(function () {
        var Texto,TextoEfecto,Textovelocidad,TextoRepticiones,Imagen,audio,audioP;
        if (ResultadoVPN > 0) {
            Texto = "<strong style='vertical - align: middle;'>Se recomienda aceptar la inversion</strong>";
            TextoEfecto = "pulse animated"; Textovelocidad = '2s'; TextoRepticiones = '5';
            Imagen = '<img src="../multimedia/correcto.gif" class="img-fluid tada animated infinite" width="100" height="100" alt="Responsive image"/>';
            audio = '<source type = "audio/mp3" src = "../multimedia/Aplausos.mp3" >';
        }
        else {
            Texto = "<strong style='vertical - align: middle;'>Se recomienda rechazar la inversion</strong>";
            TextoEfecto = "tada animated"; Textovelocidad = '4s'; TextoRepticiones = 'infinite';
            Imagen = '<img src="../multimedia/alerta.gif" class="img-fluid bounce animated infinite" width="100" height="100" alt="Responsive image"/>';
            audio = '<source type = "audio/mp3" src = "../multimedia/error.mp3" >';
        }        
        $('#myModal').modal({ show: true });
        $("#modalheader").css({
            "-webkit-animation-delay": "1s"
        });
        $('#imgmodal').html(Imagen);
        $('#texmodal').html(Texto);
        $('#texmodal').addClass(TextoEfecto); //otra manera de aplicar efectos
        $("#texmodal").css({
            "-webkit-animation-duration": Textovelocidad, //velocidad de efecto
            "-webkit-animation-delay": "2s", // Tiempo a esperar antes de empezar a  ejecutar animacion
            "-webkit-animation-iteration-count": TextoRepticiones,// Veces de repeticion de efecto
            "animation-iteration-count": TextoRepticiones//, // Veces de repeticion de efecto
           // "-webkit-animation": "mymove 1s; ", //Velocidad de la animacion
           // "animation": "mymove 1s;"//Velocidad de la animacion
        });    
        $('#audio').html(audio);        
        audioP = document.getElementById("audio");
        audioP.play();
        
        $('#cerrar').click(function () {
            audioP.pause();
            audioP.currentTime = 0;
            location.href = "#ResultadosFinales";
            $("#ResultadosVAN").css("display", "block");
            $('#ResultadosVAN').addClass("bounceInLeft animated");
            $("#ResultadosVAN").css({
                "-webkit-animation-delay": ".5s"
            }); 
        });
        $("#myModal").on('hide.bs.modal', function () {
            audioP.pause();
            audioP.currentTime = 0;             
            $("#ResultadosVAN").css("display", "block");
            $('#ResultadosVAN').addClass("bounceInLeft animated");
            $("#ResultadosVAN").css({
                "-webkit-animation-delay": ".5s"
            }); 
            location.href = "#ResultadosFinales";
        });
        
    });
}