window.onload = function () {
    google.charts.load('current', {packages: ['corechart']});
    
    var pp = 137;
    var ps = 85;
    var pd = 71;
    var ciu = 32;
    
    google.charts.setOnLoadCallback(function () {dibujarGraficos(pp, ps, pd, ciu)});
}

function dibujarGraficos (pp, ps, pd, ciu) {
    var datos = google.visualization.arrayToDataTable([
        ["Partido", "2016"],
        ["PP", pp],
        ["PSOE", ps],
        ["Podemos", pd],
        ["Ciudadanos", ciu],
    ]);
    
    var opciones = {
        //orientation: 'vertical'
        hAxis: {
            title: "PARTIDOS"
        },
        
        vAxis: {
            title: "MILLONES"
        },
        
        animation: {
            duration: 1000,
            easing: "out",
        }
    };
    
    var bar = new google.visualization.ColumnChart(document.getElementById('graficoBar'));
    bar.draw(datos, opciones);
    
    setTimeout (function () {
        datos = cambiaDatos (pp, ps, pd, ciu);
        bar.draw(datos, opciones);
    }, 2000);
}

function cambiaDatos (pp, ps, pd, ciu) {
    pp = pp + 50;
    ps = ps + 20;
    pd = pd + 35;
    ciu = ciu + 15;
    
    return google.visualization.arrayToDataTable([
        ["Partido", "2016"],
        ["PP", pp],
        ["PSOE", ps],
        ["Podemos", pd],
        ["Ciudadanos", ciu],
    ]);
}