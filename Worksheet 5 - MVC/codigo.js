class Nota {
    constructor (titulo, texto) {
        var d = new Date();
        this.horaCreacion = d.getHours() + "h:" + d.getMinutes() + "min";
        this.titulo = titulo;
        this.texto = texto;
    }
}

class Vista {
    creaInterfaz (hora, vista, controlador) {
        var body = document.body;
        var div = document.createElement ("div");
        
        //div.innerHTML = hora;
        //body.appendChild(div);
        
        var bot = document.createElement ("button");
        var saltoLinea = document.createElement ("hr");
        controlador.funcionBoton(bot);
        
        bot.innerHTML = "Crear Nota";
        body.appendChild(bot);
        body.appendChild(saltoLinea);
    }
    
    dibujarNota (nota) {
        var body = document.body;
        
        var div = document.createElement ("div");
            div.setAttribute("style", "width: 100px; height: 100px; background-color: yellow; margin: 15px; float: left;");
        
        var divTit = document.createElement ("div");
        //divTit.innerHTML = nota.horaCreacion;
            divTit.setAttribute("style", "padding-left:25px ;background-color: #D2D300;");
            divTit.innerHTML = nota.titulo;
            //display: inline-block;
        
        var img = document.createElement ("img");
        img.setAttribute("src", "esquina.png");
        img.setAttribute("style", "width: 10px; height: 10px; float: right;");
        img.addEventListener("mouseover", function() {
            var w = 10;
            var h = 10;
            var that = this;
                
            var int = setInterval (function () {
                w++; that.style.width=w;
                h++; that.style.height=h;
                if (w == 18) {clearInterval (int);}
            }, 20);
            //this.style.width='18px'; this.style.height='18px' });
        });
        
        
        img.addEventListener("mouseout", function() {
            var w = 18;
            var h = 18;
            var that = this;
                
            var int = setInterval (function () {
                w--; that.style.width=w;
                h--; that.style.height=h;
                if (w == 10) {clearInterval (int);}
            }, 20);
            //this.style.width='10px'; this.style.height='10px' });
        });       
        
        divTit.appendChild(img);
        div.appendChild(divTit);
        body.appendChild(div);
    }
}

class Controlador {
    constructor () {
        this.m = new Nota ();
        this.v = new Vista ();
        
        this.cont = 0;
    }
    
    usarVista (controlador) {
        this.v.creaInterfaz (this.m.horaCreacion, this.v, controlador);
    }
    
    funcionBoton (boton) {
        var that = this;
        boton.addEventListener("click", function () {
            that.crearNota ();
        });
    }
    
    crearNota () {
        this.nota = new Nota ("NOTA", "Prueba");
        this.v.dibujarNota (this.nota);
    }
    
    confEsquina (){
        //Metodo para añadir eventos a la imagen de la esquina.
    }
}

window.onload = function () {
    control = new Controlador ();
    control.usarVista (control);
}