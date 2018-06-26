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
;
fire.collection("ticket").onSnapshot(function(querySnapshot) {  
    let tbody = document.getElementById('tbReporte');  
        tbody.innerHTML ='';   
        querySnapshot.forEach(function(doc) {
            let tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${doc.data().ordenServicio}</td>
            <td>${doc.data().documento}</td>
            <td>${doc.data().destinatario}</td>
            <td>${doc.data().destino}</td>
            <td>${doc.data().fechaEntrega}</td>
            <td>${doc.data().fechaRecojo}</td>
            <td>${doc.data().guiaRemision}</td>
            <td>${doc.data().entregado}</td>
            <td><img src='${doc.data().url}' style='heigh:50px; width:50px;'/></td>`
            console.log(doc.data());
            tbody.appendChild(tr);
        });
        
            $('#example').DataTable();
        
    });
// get datos
function cerrarSessionCliente(e){
    e.preventDefault();
    firebase.auth().signOut();
    document.location.href="./index.html";
}

$('.ui.dropdown')
  .dropdown();