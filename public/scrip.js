//Initialize Firebase

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCbGE0Udjmrs2c7Y6l52XO49skTH8VIn88",
  authDomain: "soaa-d26f8.firebaseapp.com",
  databaseURL: "https://soaa-d26f8.firebaseio.com",
  projectId: "soaa-d26f8",
  storageBucket: "soaa-d26f8.appspot.com",
  messagingSenderId: "875749411300" };

firebase.initializeApp(config);
var db = firebase.firestore();

// Disable deprecated features
db.settings({
timestampsInSnapshots: true
});

var storage = firebase.storage();
var pic =''

//function to save file
function previewFile() {
  

  var file = document.getElementById("files").files[0];
  console.log(file);

  var storageRef = firebase.storage().ref();

  //dynamically set reference to the file name
  var thisRef = storageRef.child('license/'+file.name);
console.log(thisRef);

  //put request upload file to firebase storage
  thisRef.put(file).then(function (snapshot) {
    console.log('5555');
     //get request to get URL for uploaded file
  thisRef.getDownloadURL().then(function(url) {
      // Insert url into an <img> tag to "download"
      console.log(url);
      pic=url


      add(pic)

    }).catch(function(error) {
    
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break;
    
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
    
        case 'storage/canceled':
          // User canceled the upload
          break;
    
        
    
        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
      }
    });
  });

 

}


function add(pic){
  var typecar = document.getElementById('typecar').value
  var typepeplo = document.getElementById('typepeplo').value
  var name = document.getElementById('name').value
  var lastname = document.getElementById('lastname').value
  var stuid = document.getElementById('stuid').value
  var collect = document.getElementById('collect').value
  var major = document.getElementById('major').value
  var year = document.getElementById('year').value
  var carnumber = document.getElementById('carnumber').value
  var provide = document.getElementById('provide').value
  var brand = document.getElementById('brand').value
  var email = document.getElementById('email').value
console.log(typecar);

  
  console.log(pic);
  
  var img=pic;
  var obj = JSON.parse('{ "img":"'+img+'","typecar":"'+typecar+'","typepeplo":"'+typepeplo+'","name":"'+name+'","lastname":"'+lastname+'","stuid":"'+stuid+'","collect":"'+collect+'","major":"'+major+'","year":"'+year+'","carnumber":"'+carnumber+'","provide":"'+provide+'","brand":"'+brand+'","email":"'+email+'"}');
console.log(obj);


db.collection("user").add(obj)
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
  location.reload();
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});
  
}
//# sourceURL=pen.js