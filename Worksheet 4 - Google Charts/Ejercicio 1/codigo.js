//Se ejecuta cuando se cargue el paquete
window.onload = function () {
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(dibujarGraficos);
    google.charts.load('upcoming', {'packages': ['geochart']});
    google.charts.setOnLoadCallback(dibujarMapa);
}

function dibujarGraficos () {
    var datos = google.visualization.arrayToDataTable([
        ["Partido", "2016"],
        ["PP", 137],
        ["PSOE", 85],
        ["Podemos", 71],
        ["Ciudadanos", 32],
        ["ERC", 9],
        ["CDC", 8],
        ["PNV", 5],
        ["CCA", 1],
    ]);
    
    var opciones = {
        //orientation: 'vertical'
        hAxis: {
            title: "PARTIDOS"
        },
        
        vAxis: {
            title: "MILLONES"
        }
    };
    
    var bar = new google.visualization.ColumnChart(document.getElementById('graficoBar'));
    
    var pie = new google.visualization.PieChart(document.getElementById('graficoPie'));
    
    bar.draw(datos, opciones);
    pie.draw(datos);
}

function dibujarMapa () {
    var datos = google.visualization.arrayToDataTable([
        ["País", "Millones de visitantes"],
        ["France", 85],
        ["United States", 70],
        ["Spain", 61],
        ["China", 56],
        ["Italy", 48],
        ["Turkey", 38],
        ["Germany", 31],
        ["United Kingdom", 31],
        ["Russia", 28],
    ]);
    
    var bar = new google.visualization.GeoChart(document.getElementById('graficoGeo'));
    
    bar.draw(datos);
    
}


    