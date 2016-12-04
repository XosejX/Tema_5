function aumentarLista () {
    var lista = document.getElementById ("lista");
    
    var nuevaEntrada = document.createElement ("li");
    
    var t = document.createTextNode ("Nueva entrada");
    nuevaEntrada.appendChild (t);
    lista.appendChild(nuevaEntrada);
}