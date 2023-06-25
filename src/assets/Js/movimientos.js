function tablamov(data){
    const todasFilas = data.split(/\r?\n|\r/);
    let fechas = document.getElementsByName('fecha');
    let venta = document.getElementsByName('venta');
    let compra = document.getElementsByName('compra');
    let tabla = '<table border="1" id="tabla2" cellpadding="2" cellspacing="0">';
    for (let fila = 0; fila <todasFilas.length; fila++){
        if (fila===0){
            tabla += '<thead>' + '<tr>';
        }else{
            tabla += '<tr id="fila'+fila+'">';
        }
        const celdasFila = todasFilas[fila].split(',');
        for(let rowCell = 0; rowCell < celdasFila.length; rowCell++){
            if(fila===0){
                tabla += '<th>'+celdasFila[rowCell] +'</th>';
                if(rowCell+1==celdasFila.length){
                    tabla += '<th colspan="2">'+ "" +'</th>';
                }
            }else{
                if(rowCell === 0){
                    tabla += '<td name='+rowCell+'>'+celdasFila[rowCell] +'</td>';
                }else if(rowCell === 2) {
                    tabla += '<td name='+rowCell+'>'+"PEN" +'</td>';
                }else if(rowCell === 3 && celdasFila[rowCell-1] === 'USD'){
                    for(let i = 0;i<fechas.length;i++){
                        if(celdasFila[0] === fechas[i].innerHTML){
                            let monto_soles = Math.round(celdasFila[rowCell]*Number(venta[i].innerHTML))
                            tabla += '<td name='+rowCell+'>'+monto_soles+'</td>';
                            break;
                        }
                    }
                }else{
                    tabla += '<td name='+rowCell+'>'+celdasFila[rowCell] +'</td>';
                    if(rowCell+1==celdasFila.length){
                        tabla += '<td>'+ '<button onclick = modificar('+fila+')>Modificar</button>' +'</td>';
                        tabla += '<td>'+ '<button onclick = eliminar('+fila+')>Eliminar</button>' +'</td>';
                    }
                }
            }
        }
        if (fila ===0){
            tabla += '</tr>'+'</thead>'+'<tbody>';
        }
    }
    tabla += '</tbody' + '</table>';
    document.querySelector('#container_movimiento').innerHTML = tabla;
}

function modificar(i){
    var c0 = document.getElementsByName("0")[i-1];
    var c1 = document.getElementsByName("1")[i-1];
    var c2 = document.getElementsByName("2")[i-1];
    var c3 = document.getElementsByName("3")[i-1];
    var c4 = document.getElementsByName("4")[i-1];

    var cambio = window.prompt("Fecha",c0.innerHTML);
    if(cambio!=null){
        c0.innerHTML = cambio;
    }
    cambio = window.prompt("Descripcion",c1.innerHTML);
    if(cambio!=null){
        c1.innerHTML = cambio;
    }
    cambio = window.prompt("Moneda",c2.innerHTML);
    if(cambio!=null){
        c2.innerHTML = cambio;
    }
    cambio = window.prompt("Monto",c3.innerHTML);
    if(cambio!=null){
        c3.innerHTML = cambio;
    }
    cambio = window.prompt("Codigo Unico",c4.innerHTML);
    if(cambio!=null){
        c4.innerHTML = cambio;
    }
}

function eliminar(i){
    try{
        var element = document.getElementById("fila"+i);
        element.remove();
        if(document.getElementById('tabla2').rows.length==1){
            document.querySelector('#container_movimiento').innerHTML = "";
            document.querySelector('#movimientos').value = '';
        }
    }
    catch{
        alert("error")
    }
    alert(document.getElementById('tabla2').rows.length);
}



function movimientos(evt){
    let seleccion = document.getElementsByName('fecha');
    if(seleccion.length != 0){
        let file = evt.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            tablamov(e.target.result);
        }
        reader.readAsText(file)
    }else{
        document.querySelector('#movimientos').value = '';
        alert("Importe primero el tipo de cambio");
    }
}


document.querySelector('#movimientos').addEventListener('change',movimientos
    ,false);