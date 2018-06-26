'use strict';
// Instalar service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(function () { console.log('Service Worker Registered'); });
}
// lógica firebase
var config = {
    apiKey: "AIzaSyD7NQNdi05Ofl7yP4KzXfH1Y0KwpknILm0",
    authDomain: "entregapp-a840c.firebaseapp.com",
    databaseURL: "https://entregapp-a840c.firebaseio.com",
    projectId: "entregapp-a840c",
    storageBucket: "entregapp-a840c.appspot.com",
    messagingSenderId: "178726909498"
};

firebase.initializeApp(config);
var storage = firebase.storage();           // Elmacenamiento de contenido
var fire = firebase.firestore();            // Base de datos
var session = null;
//Session
document.getElementById('btnIniciar').addEventListener('click', (e) => {
    e.preventDefault();
    let correo = document.getElementById('correo').value;
    let pass = document.getElementById('password').value;
    let auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(correo, pass);
    promise.catch(e => console.log(e.message));
    comprobarSession();
});
document.getElementById('nroEntrega').addEventListener("change", (e) => {
    document.getElementById('direccion').innerText = e.target.options[e.target.selectedIndex].dataset.destino;
});
function comprobarSession() {
    firebase.auth().onAuthStateChanged(fbu => {
        if (fbu) {
            session = fbu;

            if (session.email == 'auditor@minag.com') {
                document.location.href = "./cliente.html";
            } else {
                $('#login').modal('hide');
                leerData();
            }
        } else {
            $('#login')
                .modal({
                    blurring: true,
                    closable: false
                })
                .modal('show');
        }
    });
}


// leer data
function leerData() {
    fire.collection("ticket").get().then(function (querySnapshot) {
        let select = document.getElementById('nroEntrega');
        select.innerHTML = '';
        let opt = document.createElement('option');
        opt.innerText = "Seleccione...";
        select.appendChild(opt);
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            if (session.email == doc.data().encargado && doc.data().entregado == false) {
                let opt = document.createElement('option');
                opt.value = doc.id;
                opt.dataset.destino = doc.data().destino;
                opt.innerText = doc.data().ordenServicio;
                select.appendChild(opt);
            }
        });
    });
}

// Logica de la página
var btn = document.getElementById('btnEntregado');
var nroEntrega = document.getElementById('nroEntrega');
var camara = document.getElementById('getImg');
var preview = document.getElementById('imgShow');
var div = document.getElementById('imgContainer');
camara.addEventListener('change', (e) => {
    let file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        preview.src = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
});

btn.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById('imgShow').src = "";
    div.className = 'ui segment active dimmer';
    if (preview.src != "" && nroEntrega.value != "") {
        var storageRef = firebase.storage().ref();
        e.preventDefault();
        var file = document.getElementById('getImg').files[0];
        var metadata = {
            'contentType': file.type
        };

        storageRef.child('images/' + file.name).put(file, metadata).then(function (snapshot) {
            snapshot.ref.getDownloadURL().then(function (url) {
                div.className = 'ui segment';
                document.getElementById('imgShow').src = "";
                if (actualizarRegistro(url)) {
                    alert('Se registro correctamente');
                    nroEntrega.value = "";
                }
            });
        }).catch(function (error) {
            console.error('Upload failed:', error);
        });
    } else {
        alert("Falta verificar");
        e.preventDefault();
        nroEntrega.focus();
    }
});

function actualizarRegistro(_url, ) {

    // Set the "capital" field of the city 'DC'

    let _id = document.getElementById('nroEntrega').value;
    return fire.collection("ticket").doc(_id).update({
        url: _url,
        fechaRecojo: new Date().toISOString().slice(0, 10),
        entregado: true
    })
        .then(function () {
            console.log("Document successfully updated!");
            // return true;
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            // return false;
        });
}
document.getElementById('salir').addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut();
});

// function obtenerDatosSession(correo) {
//     var valor = false;
//     fire.collection("personal").get().then(function (querySnapshot) {
//         querySnapshot.forEach(function (doc) {
//             console.log(doc.data().tipo + "|" + doc.data().correo);
//             console.log('Cliente' + "|" + document.getElementById('correo').value);
//             if (doc.data().tipo == 'Cliente' && doc.data().correo == correo) {
//                 valor == true;
//                     document.location.href = "./cliente.html";
//             }
//         });
//     });

// }
//Comprobar session
comprobarSession();