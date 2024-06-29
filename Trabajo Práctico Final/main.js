
// Obtener todos los productos
var urlBase = 'https://api.yumserver.com/16710/products';
function obtenerProductos() {
    fetch(urlBase)
        .then(response => response.json())
        .then(mostrarProductos)
        .catch(error => console.log('Error:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    obtenerProductos(); 
  })
        
        function mostrarProductos(productos) {
            let resultadosElement = document.getElementById('resultados');
            if (!resultadosElement) {
                console.log('Elemento "resultados" no encontrado en el DOM.');
                return;
            }
        
            let html = '';
            for (let i = 0; i < productos.length; i++) {
                html += `
                    <div class="box">
                        <div class="product-txt">
                            <div id="lista">
                                <table>
                                    <tr>
                                        <td>ID</td><td><b>${productos[i].idcod}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Título</td><td><b>${productos[i].titulo}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Precio AR$</td><td>${productos[i].precioPeso}</td>
                                    </tr>
                                    <tr>
                                        <td>Precio U$D</td><td>${productos[i].precioDolar}</td>
                                    </tr>
                                    <tr>
                                        <td>Fecha</td><td>${productos[i].fecha}</td>
                                    </tr>
                                </table>
                                <button onclick="editarProducto('${productos[i].idcod}')">Editar</button>
                                <button onclick="borrarProducto('${productos[i].idcod}')">Borrar</button>                      
                            </div>
                        </div>
                    </div>`;
            }
            resultadosElement.innerHTML = html;
        }
        
    var ids = ['lista', 'nuevo-producto'];
    function Mostrar(id) {
        var elemento = document.getElementById(id);
        if (elemento.style.display === "none") {
            elemento.style.display = "block";
        } else {
            elemento.style.display = "none";
        }
    }
// Crear un nuevo producto
function CrearNuevoProducto(){
    let producto = {
        titulo: document.getElementById('titulo').value,
        precioPeso: document.getElementById('precioPeso').value,
        precioDolar:  document.getElementById('precioDolar').value,
        fecha:  document.getElementById('fecha').value
    };
    fetch(urlBase, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(producto)
    })
    .then(response => response.text())
    .then(function(data){
        if(data.trim() == "ok"){
            alert('se creo el producto con exito.');
            Mostrar('lista');
            obtenerProductos();
        }else{
            alert(texto);
        }
        console.log(data)
    })
    .catch(error => console.error('Error:', error));
}
//votones para ir a otras paginas
function redireccion(){
    location.href = "index2.html"
}
function redireccion2(){
    location.href = "index.html"
}
// Eliminar un producto 
function borrarProducto(idcod) { 
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
 
     if (confirmacion) {
         let producto2 = {
             idcod: idcod
         };
 
         fetch(urlBase, {
             method: 'DELETE',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(producto2)
         })
         .then(response => response.text())
         .then(data => console.log(data))
         .then(data => {
            Mostrar('lista'); 
            obtenerProductos(); 
         })
         .catch(error => console.error(error));
     } else {
         console.log("Operación de eliminación cancelada.");
     }
 }
//edision de producto
 function editarProducto(idcod) {
    fetch(`${urlBase}/${idcod}`)
        .then(response => response.json())
        .then(producto => mostrarFormularioEdicion(producto))
        .catch(error => console.error('Error al obtener el producto:', error));
 }
function mostrarFormularioEdicion(producto) {
    document.getElementById('edit-titulo').value = producto.titulo;
    document.getElementById('edit-precioPeso').value = producto.precioPeso;
    document.getElementById('edit-precioDolar').value = producto.precioDolar;
    document.getElementById('edit-fecha').value = producto.fecha;
    document.getElementById('edit-idcod').value = producto.idcod;
    Mostrar('editar-producto');
}
function guardarEdicion() {
    const data = {
        idcod: document.getElementById('edit-idcod').value,
        titulo: document.getElementById('edit-titulo').value,
        precioPeso: document.getElementById('edit-precioPeso').value,
        precioDolar: document.getElementById('edit-precioDolar').value,
        fecha: document.getElementById('edit-fecha').value
    };

    fetch(`${urlBase}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    .then(response => response.text())
    .then(data => {
        alert('Producto actualizado correctamente.');
        Mostrar('lista'); 
        obtenerProductos(); 
    })
    .catch(error => console.error('Error al actualizar el producto:', error));
}
