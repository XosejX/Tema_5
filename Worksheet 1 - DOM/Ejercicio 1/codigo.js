function cEnlaces (enlaces) {
    //Cuenta el numero de enlaces.
    document.getElementById ("a").innerHTML = "Número de enlaces --> " + enlaces.length;
}

function muestraEnlace (enlaces) {
    //Hay que separar el enlace en / para coger el ultimo elemente que será el enlace que queremos.
    var enlace = enlaces[enlaces.length - 2].href;
    var listaEnlaces = enlace.split("/");
    document.getElementById ("b").innerHTML = "Dirección penúltimo enlace --> " + listaEnlaces[listaEnlaces.length - 1];
}

function nEnlaces (enlaces) {
    //Número de enlaces que enlazan a Google.
    var cont = 0;
    for (var i=0; i<enlaces.length; i++) {
        var enlace = enlaces[i].href;
        var listaEnlaces = enlace.split("/");
        if (listaEnlaces[listaEnlaces.length - 1] == "www.google.es") {
            cont++;
        }
    }
    document.getElementById ("c").innerHTML = "Número de enlaces a Google --> " + cont;
}

function hijos () {
    //Cuenta los hijos del tercer párrafo
    var parrafos = document.getElementsByTagName ("p");
    var p3o = parrafos[2].children;
    document.getElementById ("d").innerHTML = "Número de enlaces del tercer párrafo --> " + p3o.length;
}

window.onload = function () {
    var enlaces = document.getElementsByTagName ("a");
    cEnlaces (enlaces);
    muestraEnlace (enlaces);
    nEnlaces (enlaces);
    hijos ();
}