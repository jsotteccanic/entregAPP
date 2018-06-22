'use strict';
// login

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
var storage = firebase.storage();
var fire = firebase.firestore();
// agregar data

fire.collection("ticket").doc().set({
    destinatario: "MANGANO",
    destino: "Trujillo",
    documento: "PRESTAMOS DE MAQ",
    fechaEntrega: new Date().toISOString().substring(0, 10),
    fechaRecojo: new Date().toISOString().substring(0, 10),
    guiaRemision: "000-015",
    recibido: true,
    url: "null"
})
    .then(function () {
        console.log("Document successfully written!");
    })
    .catch(function (error) {
        console.error("Error writing document: ", error);
    });


// leer data
fire.collection("ticket").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(JSON.stringify(doc.data()));
    });
});
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

        // alert("se entregó satisfactoriamente el paquete nro :" + nroEntrega.value);
        // var auth = firebase.auth();
        var storageRef = firebase.storage().ref();
        e.preventDefault();
        var file = document.getElementById('getImg').files[0];
        var metadata = {
            'contentType': file.type
        };
        // Push to child path.
        // [START oncomplete]
        storageRef.child('images/' + file.name).put(file, metadata).then(function (snapshot) {


            // console.log('Uploaded', snapshot.totalBytes, 'bytes.');
            // console.log('File metadata:', snapshot.metadata);
            //  "<div class='ui text loader'>Loading</div>"
            // Let's get a download URL for the file.
            snapshot.ref.getDownloadURL().then(function (url) {
                // console.log('File available at', url);
                div.className = 'ui segment';
                // [START_EXCLUDE]                
                document.getElementById('imgShow').src = "";
                nroEntrega.value = "";
                alert('Se registro correctamente');
                // [END_EXCLUDE]
            });
        }).catch(function (error) {
            // [START onfailure]
            console.error('Upload failed:', error);
            // [END onfailure]
        });
        // [END oncomplete]


    } else {
        alert("Falta verificar");
        e.preventDefault();
        nroEntrega.focus();
    }

});

document.getElementById('btnIniciar').addEventListener('click', (e) => {
    e.preventDefault();
    let correo = document.getElementById('correo').value;
    let pass = document.getElementById('password').value;
    let auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(correo, pass);
    promise.catch(e => console.log(e.message));


});

firebase.auth().onAuthStateChanged(fbu => {
    if (fbu) {
        $('#login').modal('hide');
    } else {
        $('#login')
            .modal({
                blurring: true,
                closable: false
            })
            .modal('show');
        // .modal('hide');

        console.log("no logueado");
    }
});

document.getElementById('salir').addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut();
});