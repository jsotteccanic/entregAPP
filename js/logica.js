'use strict';
var btn = document.getElementById('btnEntregado');
var nroEntrega = document.getElementById('nroEntrega');
var camara = document.getElementById('cameraInput');
var preview = document.getElementById('imgShow');

camara.addEventListener('change',()=>{

    var file    = document.getElementById('cameraInput').files[0];
    var reader  = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
    }
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
});
btn.addEventListener("click",()=>{
    if(preview == ""){
        alert("Falta verificar");
    }else{
        alert("se entregó satisfactoriamente el paquete nro :" + nroEntrega.value);
    }
    
})