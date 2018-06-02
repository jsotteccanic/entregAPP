'use strict';
var btn = document.getElementById('btnEntregado');
var nroEntrega = document.getElementById('nroEntrega');

btn.addEventListener("click",()=>{
    alert("se entregó satisfactoriamente el paquete nro :" + nroEntrega.value);
})