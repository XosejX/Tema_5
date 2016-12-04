function añadirInput () {
    var formulario = document.getElementById ("form");
    var nInput = document.createElement ("input");
    var tipo = document.createAttribute ("type");
    
    tipo.value = "file";
    nInput.setAttributeNode(tipo);
    
    formulario.appendChild(nInput);
}
