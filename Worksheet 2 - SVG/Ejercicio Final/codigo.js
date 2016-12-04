class Juego {
    crearTablero () {
        var bod = document.body;
        this.svg = document.createElementNS ("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute ("style", "border: 5px solid black;");
        this.svg.setAttribute ("height", "500");
        this.svg.setAttribute ("width", "500");
        this.svg.setAttribute ("xmlns", "http://www.w3.org/2000/svg");
        
        bod.appendChild (this.svg);
    }
    
    crearObjetos (nObj) {
        var arrayObj = [];
        
        this.bolita = new Bola (10, 1, -1);
        this.bolita.dibujar ();
        arrayObj.push (this.bolita);
        
        this.pala = new Raqueta ();
        this.pala.dibujar (this.svg);
        arrayObj.push (this.pala);
        
        this.bloques = [];
        var xBloc = 70;
        var yBloc = 50;
        
        for (var i=0; i<nObj; i++) {
            this.bloques[i] = "this.bloque" + i;
            
            if (xBloc < 371) {
                this.bloques[i] = new Ladrillo (xBloc, yBloc);
                this.bloques[i].dibujar (this.svg);
                xBloc = xBloc + 100;
                
            }
            else {
                xBloc = 70;
                yBloc = yBloc + 75;
                this.bloques[i] = new Ladrillo (xBloc, yBloc);
                this.bloques[i].dibujar (this.svg);
                xBloc = xBloc + 100;
            }
        }
        arrayObj.push (this.bloques);
        
        return arrayObj;
    }
    
    bucle (listaObj, objGame) {
        this.intervalo = setInterval(function(){
            listaObj[0].mover (listaObj[3].svg, listaObj[0], objGame);
            
            for (var i=0; i<listaObj[2].length; i++) {
                listaObj[2][i].detectarColisionCon (listaObj[0], i, listaObj[2], listaObj[1].raqueta);
            }
            
            listaObj[1].detectarColisionCon (listaObj[0].bolaSVG, listaObj[1].raqueta, listaObj[0]);
            
            if (listaObj[2].length == 0) {
                sound("v");
                objGame.stop ("¡¡¡VICTORIA!!!");
            }
        }, 1);
    }
    
    start (objGame, listaObj) {
        var b = document.getElementsByTagName ("body");
        b[0].addEventListener ("mousemove", function() {listaObj[1].mover(listaObj[1].raqueta)});
        
        this.bucle (listaObj, objGame);
        
        var btn = document.getElementsByTagName ("input");
        btn[0].value = "FINALIZAR JUEGO";
        btn[0].removeEventListener ("click", inicio);
        btn[0].addEventListener ("click", parar);
    }
    
    stop (final) {
        var stp = document.body;
        var svgS = document.getElementsByTagName ("svg");
        stp.removeChild (svgS[0]);
        
        var marq = document.createElement ("marquee");
        marq.setAttribute ("style", "font-size: 100; font-family: Jokerman; font-weight: bold;");
        marq.setAttribute ("scrollamount", "17");
        marq.innerHTML = final;
        
        stp.appendChild (marq);
        
        clearInterval (this.intervalo);     //Para el setInterval al finalizar la partida.
    }
}


class Bola {
    constructor (radio, vx, vy) {
        this.apariencia = radio;
        this.vx = parseInt(vx);
        this.vy = parseInt(vy);
        
        this.posx = parseInt(Math.random() * 100 + 200);
        this.posy = parseInt(Math.random() * 10 + 450);
    }
    
    dibujar () {
        this.bolaSVG = document.createElementNS ("http://www.w3.org/2000/svg", "circle");

        this.bolaSVG.setAttribute ("r", this.apariencia);
        this.bolaSVG.setAttribute ("cx", this.posx);
        this.bolaSVG.setAttribute ("cy", this.posy);
        this.bolaSVG.setAttribute ("fill", "red");

        game.svg.appendChild(this.bolaSVG);
    }
    
    mover (objMapa, bola, objGame) {
        this.detectarColisionCon (objMapa, bola, objGame);
        
        bola.bolaSVG.setAttribute ("cx", parseInt(bola.bolaSVG.getAttribute("cx")) + parseInt(bola.vx));
        bola.bolaSVG.setAttribute ("cy", parseInt(bola.bolaSVG.getAttribute("cy")) + parseInt(bola.vy));
        
    }
    
    detectarColisionCon (objMapa, bola, objGame) {
        var whT = objMapa.getAttribute ("width");   //Alto/Ancho de svg
        var htT = objMapa.getAttribute ("height");  
        
        var x = bola.bolaSVG.getAttribute("cx");        //Posicion X/Y y radio de circle
        var y = bola.bolaSVG.getAttribute ("cy");
        var r = parseInt(bola.bolaSVG.getAttribute ("r"));
        
        //Colisiones con la bola y el tablero
        if (y < (1+r)) {
            bola.vy = bola.vy * (-1);
            sound("b");
        }
        else if (x > (htT-r-1) || x < (1+r)) {
            bola.vx = bola.vx * (-1);
            sound("b");
        }
        else if (y > (whT-r-1)) {
            objGame.stop ("GAME OVER");
            sound ("m");
        }
    }
}


class Ladrillo {
    constructor (posx, posy) {
        this.posx = parseInt(posx);
        this.posy = parseInt(posy);
        this.width = 60;
        this.height = 10;
        
        this.variable = false;
    }
    
    dibujar (elemSvg) {
        this.ladrillo = document.createElementNS ("http://www.w3.org/2000/svg", "rect");
        this.ladrillo.setAttribute ("x", this.posx);
        this.ladrillo.setAttribute ("y", this.posy);
        this.ladrillo.setAttribute ("width", this.width);
        this.ladrillo.setAttribute ("height", this.height);
        this.ladrillo.setAttribute ("fill", "yellow");
        this.ladrillo.setAttribute ("stroke", "blue");
        this.ladrillo.setAttribute ("stroke-width", "5");
        
        elemSvg.appendChild(this.ladrillo);
        
        this.detectarPos ();
        
        return this.ladrillo;
    }
    
    detectarPos () {
        var x = this.posx;
        var y = this.posy;
        var w = this.width;
        var h = this.height;
        
        this.finalH = x + w;    //Final horizontal (x)
        this.principioH = x;    //Principio horizontal (x)
        this.principioV = y;    //Principio vertical (y)
        this.finalV = y + h;    //Final vertical (y)
    }
    
    
    detectarColisionCon (bola, nBloque, lBloques, eleRaqueta) {
        var x = parseInt(bola.bolaSVG.getAttribute("cx"));        //Posicion X/Y y radio de circle
        var y = parseInt(bola.bolaSVG.getAttribute ("cy"));
        var r = parseInt(bola.bolaSVG.getAttribute ("r"));

        /*  CONDICIONES PARA LOS LADOS DE LOS LADRILLOS */
        if (x == (this.finalH+r) && y > this.principioV-r && y < this.finalV+r) {
            bola.vx = bola.vx * (-1);     //lado derecha
            this.eliminarLadrillo (nBloque, lBloques, eleRaqueta);
        }
        else if (x == (this.principioH-r) && y > this.principioV-r && y < this.finalV+r) {
            bola.vx = bola.vx * (-1);     //lado izquierda
            this.eliminarLadrillo (nBloque, lBloques, eleRaqueta);
        }
        else if (y == (this.principioV-r) && x < this.finalH+r && x > this.principioH-r) {
            bola.vy = bola.vy * (-1);     //lado alto
            this.eliminarLadrillo (nBloque, lBloques, eleRaqueta);
        }
        else if (y == (this.finalV+r) && x < this.finalH+r && x > this.principioH-r) {
            bola.vy = bola.vy * (-1);     //lado bajo
            this.eliminarLadrillo (nBloque, lBloques, eleRaqueta);
        }
        
        /*  CONDICIONES PARA LAS ESQUINAS DE LOS LADRILLOS   */
        else if (x == this.principioH-r && y == this.principioV-r) {
            bola.vx = -1;
            bola.vy = -1;
            this.eliminarLadrillo (nBloque, lBloques, eleRaqueta);
        }
        else if (x == this.finalH+r && y == this.principioV-r) {
            bola.vx = 1;
            bola.vy = -1;
            this.eliminarLadrillo (nBloque, lBloques, eleRaqueta);
        }
        else if (x == this.principioH-r && y == this.finalV+r) {
            bola.vx = -1;
            bola.vy = 1;
            this.eliminarLadrillo (nBloque, lBloques, eleRaqueta);
        }
        else if (x == this.finalH+r && y == this.finalV+r) {
            bola.vx = 1;
            bola.vy = 1;
            this.eliminarLadrillo (nBloque, lBloques, eleRaqueta);
        }
        else if (this.variable) {
            var animaY = this.ladrillo.getAttribute ("y");
            var animaX = this.ladrillo.getAttribute ("x");
            var animaW = this.ladrillo.getAttribute ("width");
            
            this.ladrillo.setAttribute ("y", parseInt(animaY) + 1);
            this.ladrillo.setAttribute ("x", parseInt(animaX) + 1);
            this.ladrillo.setAttribute ("width", parseInt(animaW) - 2);
            
            if (animaW == 2) {
                var padre = document.getElementsByTagName("svg");
                padre[0].removeChild(this.ladrillo);
                lBloques.splice(nBloque, 1);
            }
        }
    }
    
    eliminarLadrillo (nBloque, lBloques, eleRaqueta) {
        var att = this.ladrillo.getAttribute ("stroke");
        
        if (att == "blue"){
            sound("cr");
            this.ladrillo.setAttribute ("stroke", null);
        }
        else {
            sound("l");
            this.finalH = this.principioH = this.principioV = this.finalV = -1;
            this.variable = true;
            
            var wRaqueta = eleRaqueta.getAttribute ("width");
            var posRaqueta = parseInt(eleRaqueta.getAttribute ("x"));
            
            eleRaqueta.setAttribute ("width", wRaqueta - 10);   //Al eliminar un ladrillo, la 
            eleRaqueta.setAttribute ("x", posRaqueta + 5);      //raqueta se encoge*/
        }
    }
}


class Raqueta {
    constructor () {
        this.width = 120;
        this.height = 7;
        this.px = 250 - this.width/2;
        this.py = 475;
    }
    
    dibujar (elemSvg) {
        this.raqueta = document.createElementNS ("http://www.w3.org/2000/svg", "rect");
        this.raqueta.setAttribute ("x", this.px);
        this.raqueta.setAttribute ("y", this.py);
        this.raqueta.setAttribute ("width", this.width);
        this.raqueta.setAttribute ("height", this.height);
        this.raqueta.setAttribute ("fill", "green");
        this.raqueta.setAttribute ("stroke", "black");
        this.raqueta.setAttribute ("stroke-width", "2");
        
        elemSvg.appendChild(this.raqueta);
        
        this.detectarPos ();
    }
    
    mover (eleRaqueta) { //COMPROBAR COMPROBAR COMPROBAR
        var punto = parseInt(eleRaqueta.getAttribute ("x"));
        var align = parseInt(eleRaqueta.getAttribute ("width"));
        
        eleRaqueta.setAttribute ("x", (event.clientX - (align / 2)) - 5);
    }
    
    detectarPos () {
        var x = this.px;        
        var y = this.py;
        var w = this.width;
        var h = this.height;
        
        this.finalH = x + w;    //Final horizontal (x)
        this.principioH = x;    //Principio horizontal (x)
        this.principioV = y;    //Principio vertical (y)
        this.finalV = y + h;    //Final vertical (y)
    }   //Mejorar con herencias
    
    detectarColisionCon (bolaSvg, eleRaqueta, objBola) {
        var x = parseInt(bolaSvg.getAttribute("cx"));        //Posicion X/Y y radio de circle
        var y = parseInt(bolaSvg.getAttribute ("cy"));
        var r = parseInt(bolaSvg.getAttribute ("r"));
        var wPala = parseInt(eleRaqueta.getAttribute ("width"));
        var xleftPala = parseInt(eleRaqueta.getAttribute ("x"));
        var xrightPala = xleftPala + wPala;
        var ytopPala = eleRaqueta.getAttribute ("y");
       
        if (y == (ytopPala-r) && x < xrightPala+r && x > xleftPala-r) {
            objBola.vy = objBola.vy * (-1);     //lado alto
            sound("p");
        }
    }
}


window.onload = function () {
    game = new Juego ();
    game.crearTablero ();
    var listaObj = game.crearObjetos (12);
    listaObj.push(game);
    
    var btn = document.getElementsByTagName ("input");
    btn[0].addEventListener ("click", function() {inicio (game, listaObj)});
}

function inicio (objGame, listaObj) {
    game.start (objGame, listaObj);
}

function parar () {
    game.stop ("NO TE RINDAS >.<");
}

function restart () {
    location.reload();
}

function sound (elem) {
    if (elem == "b") {
        var audio = document.getElementById ("sound");
        audio.pause (); //Para que no de errores si choca muy seguido con un esquina.
        audio.currentTime = 0;
        audio.play();
    }
    else if (elem == "m") {
        var dft = document.getElementById ("defeat");
        dft.play();
    }
    else if (elem == "l") {
        var bb = document.getElementById ("bb");
        bb.pause ();
        bb.currentTime = 0;
        bb.play();
    }
    else if (elem == "p") {
        var boing = document.getElementById ("boing");
        boing.play();
    }   
    else if (elem == "cr") {
        var barrera = document.getElementById ("barrera");
        barrera.pause ();
        barrera.currentTime = 0;
        barrera.play();
    }
    else if (elem == "v") {
        var vic = document.getElementById ("victoria");
        vic.play();
    }
}