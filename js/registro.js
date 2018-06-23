var config = {
    apiKey: "AIzaSyD7NQNdi05Ofl7yP4KzXfH1Y0KwpknILm0",
    authDomain: "entregapp-a840c.firebaseapp.com",
    databaseURL: "https://entregapp-a840c.firebaseio.com",
    projectId: "entregapp-a840c",
    storageBucket: "entregapp-a840c.appspot.com",
    messagingSenderId: "178726909498"
};
firebase.initializeApp(config);

var fire = firebase.firestore();

// get datos
obtenerPersonal();
function obtenerPersonal() {
    let select = document.getElementById('asignar');
    fire.collection("personal").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            opt = document.createElement('option');
            opt.value = doc.data().correo;
            opt.innerText = doc.data().nombres;
            select.appendChild(opt);
        });
    });
}

function datosFormulario() {
    return objeto = {
        destinatario: document.getElementById('destinatario').value,
        destino: document.getElementById('destino').value,
        documento: document.getElementById('documento').value,
        fechaEntrega: document.getElementById('fechaRecojo').value,
        fechaRecojo: null,
        guiaRemision: document.getElementById('guiaRemision').value,
        recibido: false,
        encargado: document.getElementById('asignar').value,
        url: null,
        ordenServicio: document.getElementById('ordenServicio').value,
        entregado: false
    }
}
function guardar(e) {
    e.preventDefault();
    fire.collection("ticket").doc().set(datosFormulario())
        .then(function () {
            alert("Se registro correctamente");
            limpiar();
        })
        .catch(function (error) {
            alert("Error al guardar la información");
            limpiar();
        });
}

function limpiar() {
    document.getElementById('destinatario').value = '';
    document.getElementById('destino').selectedIndex = 0;
    document.getElementById('documento').value = '';
    document.getElementById('fechaRecojo').value = '';
    document.getElementById('guiaRemision').value = '';
    document.getElementById('asignar').selectedIndex = 0;
    document.getElementById('ordenServicio').value = '';
}
