const firebaseConfig = {
    apiKey: "AIzaSyBUJf-jr2hjR6533uO6gEsUp-N56mHJcFI",
    authDomain: "proyecto2-cc3fe.firebaseapp.com",
    projectId: "proyecto2-cc3fe",
    storageBucket: "proyecto2-cc3fe.appspot.com",
    messagingSenderId: "935079138265",
    appId: "1:935079138265:web:3f8067fb12a25680efbfc8",
    measurementId: "G-1HRZX6463L"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='';
    document.getElementById("Input7").value='';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var color = document.getElementById("Input5").value;
    var dimensiones = document.getElementById("Input6").value;
    var peso = document.getElementById("Input7").value;
    var correo = document.getElementById("Input3").value;
    var provedor = document.getElementById("Input4").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var material = {
            id, //matricula:id
            nombre,
            color,
            dimensiones,
            peso,
            correo,
            provedor
        }

        //console.log(alumno);

        firebase.database().ref('Material/' + id).update(material).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

     document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
    
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Material');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(material){
    
    if(material!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = material.id;
        cell2.innerHTML = material.nombre; 
        cell3.innerHTML = material.color;
        cell4.innerHTML = material.dimensiones; 
        cell5.innerHTML = material.peso; 
        cell6.innerHTML = material.correo; 
        cell7.innerHTML = material.provedor; 
        cell8.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${alumno.id})">Eliminar</button>`;
        cell9.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+alumno.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Material/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Material/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(material){
    if(material!=null)
    {
        document.getElementById("Input1").value=material.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=material.nombre;
        document.getElementById("Input3").value=material.color;
        document.getElementById("Input6").value=material.dimensiones;
        document.getElementById("Input7").value=material.peso;
        document.getElementById("Input4").value=material.correo;
        document.getElementById("Input5").value=material.provedor;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Material");
    ref.orderByChild("provedor").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(material){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = material.id;
    cell2.innerHTML = material.nombre; 
    cell3.innerHTML = material.color;
    cell4.innerHTML = material.dimensiones; 
    cell5.innerHTML = material.peso; 
    cell6.innerHTML = material.correo;
    cell7.innerHTML = material.provedor;
     
   
}