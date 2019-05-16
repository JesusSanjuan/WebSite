/*Validacion de todos los campos cambio a colores y mostrar textos de la fusion*/
    (function () {
        'use strict';
    window.addEventListener('load', function () {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
            //form.classList.add('was-feedback');
        }, false);
    });
}, false);
})();
/*Validacion de todos los campos cambio a colores y mostrar textos*/
   
/* Validacion del campo Inversion */
const number = document.querySelector('.number');

function formatNumber (n) {
	return n.replace(/\D/g, "")
                        .replace(/([0-9])([0-9]{2})$/, '$1.$2')
                        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
}
number.addEventListener('keyup', (e) => {
	const element = e.target;
	const value = element.value;
  element.value = formatNumber(value);
});
/* Validacion del campo Inversion */

/* Validacion del campo Flujo Neto de Efectivo */
const number2 = document.querySelector('.number2');

function formatNumber2 (n) {
	return n.replace(/\D/g, "")
                        .replace(/([0-9])([0-9]{2})$/, '$1.$2')
                        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
}
number2.addEventListener('keyup', (e2) => {
	const element2 = e2.target;
	const value2 = element2.value;
  element2.value = formatNumber2(value2);
});
/* Validacion del campo Flujo Neto de Efectivo */

/* Validacion del campo Valor de Salvamento*/
const number3 = document.querySelector('.number3');

function formatNumber3(n) {
    return n.replace(/\D/g, "")
        .replace(/([0-9])([0-9]{2})$/, '$1.$2')
        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
}
number3.addEventListener('keyup', (e3) => {
    const element3 = e3.target;
    const value3 = element3.value;
    element3.value = formatNumber3(value3);
});
/* Validacion del campo Valor de Salvamento*/

/* Validacion del campo TMAR*/
const number4 = document.querySelector('.number4');

function formatNumber4(n) {
    return n.replace(/\D/g, "")
        .replace(/([0-9])([0-9]{2})$/, '$1.$2')
        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
}
number4.addEventListener('keyup', (e4) => {
    const element4 = e4.target;
    const value4 = element4.value;
    element4.value = formatNumber4(value4);
});
/* Validacion del campo TMAR*/

/* Validacion del campo PLAZO*/
var validacion;
$('#n').keyup(function (event) {
    var valor = $("#select").val();
    var n = $("#n").val();  

    if (n.length === 0) {
        $("#prueba").addClass("invalid-feedback");
        var tipo;
        switch (valor) {
            case "1":
                tipo = "meses";
                break;
            case "2":
                tipo = "a�os";
                break;
            default:
                break;
        }
        $('#prueba').text('Por favor ingrese el plazo en '+ tipo);
        $('#prueba').show();
    } else {
        $('#prueba').hide();
    }
        switch (valor)
        {
            case "1":
                if (n < 601) {
                    $('#popover').attr('data-original-title', "De meses a�os");
                    var anios = n / 12;
                    $('#popover').attr('data-content', "Los meses ingresados son equivalentes en a�os a: " + anios);
                    $("#popover").popover('update');
                    $("#popover").popover("show");
                }
                else {
                    $('#popover').attr('data-original-title', "Verifique..");
                    $('#popover').attr('data-content', "Unicamente se puede ingresar la cantidad de 1 a 600 meses (50 a�os)");
                    $("#popover").popover('update');
                    $("#popover").popover("show");
                    $("#n").val("");
                }
                break;
            case "2":
                validacion = /^([0-9]{3,})$/;
                $("#n").val(formatNumber5(n));
                if (validacion.test(n) === true) {                    
                    $('#popover').attr('data-original-title', "Verifique..");
                    $('#popover').attr('data-content', "Unicamente se puede ingresar la cantidad de 1 a 99 a�os");
                    $("#popover").popover('update');
                    $("#popover").popover("show");                     
                }                
                break;
            default:
                break;
        }

});
function formatNumber5(n) { 
    return n.replace(/\D/g, "")    
        .replace(validacion, "");    
}

$('[data-toggle="popover"]').popover();// Hacer que aparesca el popover al pasar el cursor

$("#select").change(function () {  //Estrar datos y del campo de texto y luego aplicar  validacion y mostrar popper en caso de errror
    var valor = $(this).val();
    switch (valor)
    {        
        case "1":
            $("#n").removeAttr('disabled');
            $("#n").attr("placeholder", "Ingrese el plazo del proyecto");
            $("#n").val('');  
            $('#popover').attr('data-original-title', "Toma en cuenta!");
            $('#popover').attr('data-content', "Solo se permitira ingresar la cantidad de 1 a 1200 meses");
            $("#popover").popover('update');           
            $("#popover").popover("show");                
            break;
        case "2":
            $("#n").removeAttr('disabled');
            $("#n").attr("placeholder", "Ingrese el plazo del proyecto");
            $("#n").val('');
            $('#popover').attr('data-original-title', "Toma en cuenta!");
            $('#popover').attr('data-content', "Solo se permitira ingresar la cantidad  de 1 a 99 a�os");           
            $("#popover").popover('update');
            $("#popover").popover("show");                
            break;
        default:
            $("#popover").popover("hide"); 
            $("#n").attr('disabled', 'disabled');
            $("#n").attr("placeholder", "Seleccione primero el tipo de plazo");
            $("#n").val('');
            $('#prueba').hide();
            break;
    }    
});
/* Validacion del campo PLAZO*/



$("#Button1").click(function () {
    alert("click button");
});

