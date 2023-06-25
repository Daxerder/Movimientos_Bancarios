function crearTabla(data){
    const todasFilas = data.split(/\r?\n|\r/);
    let tabla = '<table  border="1" id="tabla2" cellpadding="2" cellspacing="0">';
    for (let fila = 0; fila <todasFilas.length; fila++){
        if (fila===0){
            tabla += '<thead>';
            tabla += '<tr>';
        }else{
            tabla += '<tr>';
        }
        const celdasFila = todasFilas[fila].split(',');
        if(celdasFila.length!=3){
            document.querySelector('#tipo_cambio').value = '';
            alert("Error al importar Tipo de Cambio")
            return;
        }
        for(let rowCell = 0; rowCell < celdasFila.length; rowCell++){
            if(fila===0){
                tabla += '<th>'+celdasFila[rowCell] +'</th>';
            }else{
                if(rowCell === 0){
                    tabla += '<td name="fecha">'+celdasFila[rowCell] +'</td>';
                }else if(rowCell === 1){
                    tabla += '<td name="venta">'+celdasFila[rowCell] +'</td>';
                }else{
                    tabla += '<td name="compra">'+celdasFila[rowCell] +'</td>';
                }
            }
        }
        if (fila ===0){
            tabla += '<tr>'+'<thead>'+'<tbody>';
        }else{
            tabla += '<tr>';
        }
    }
    tabla += '</tbody' + '<table>';

    document.querySelector('#container_cambio').innerHTML = tabla;
}
function leerArchivo(evt){
    let file = evt.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
        crearTabla(e.target.result)
    };
    reader.readAsText(file)
}

document.querySelector('#tipo_cambio').addEventListener('change',leerArchivo
    ,false);