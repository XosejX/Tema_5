class BolaAleatoria {
    constructor (radio, posx, posy, vx, vy) {
        this.apariencia = radio;
        this.vx = parseInt(vx);
        this.vy = parseInt(vy);
        
        this.posx = posx;
        this.posy = posy;
    }
    
    creacion () {
        var selfx = this.vx;
        var selfy = this.vy;
        var selfr = this.apariencia;
        var svg = document.getElementById ("svg");
        var bolita = document.createElementNS ("http://www.w3.org/2000/svg", "circle");

        bolita.setAttribute ("r", this.apariencia);
        bolita.setAttribute ("cx", this.posx);
        bolita.setAttribute ("cy", this.posy);
        bolita.setAttribute ("fill", "black");

        svg.appendChild(bolita);
        this.desplBola (bolita, selfx, selfy, selfr);
    }
    
    desplBola (bola, selfx, selfy, selfr) {
        var x = bola.getAttribute("cx");
        var y = bola.getAttribute("cy");
        var listaColores = ["blue", "red", "green", "pink", "yellow", "orange", "purple", "brown"]
        
        setInterval(function(){
            if (y > (499-selfr) || y < (1+selfr)) {
                var posColorRandom = parseInt(Math.random() * 8);
                selfy = selfy * (-1);
                bola.style.fill=listaColores[posColorRandom];
            }
            if (x > (499-selfr) || x < (1+selfr)) {
                var posColorRandom = parseInt(Math.random() * 8);
                selfx = selfx * (-1);
                bola.style.fill=listaColores[posColorRandom];
            }
            
            x = parseInt(x) + selfx;
            y = parseInt(y) + selfy;
            
            bola.style.cx = x;
            bola.style.cy = y;
        }, 10);
    }
}

function crearBola () {
    var radio = parseInt(Math.random() * 10 + 10);
    var vx = parseInt(Math.random() * 5 + 1);
    var vy = parseInt(Math.random() * 5 + 1);
    var posx = parseInt(Math.random() * 450 + 20);
    var posy = parseInt(Math.random() * 450 + 20);
    
    obj = new BolaAleatoria (radio, posx, posy, vx, vy);
    obj.creacion ();
}