var admin = require("firebase-admin");

var serviceAccount = require("./service_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "files");

const getInvitations = async () => {
  const invitations = firestore.collection('rsvp')
  var snapshot = await invitations
    .where('rsvp', '==', 'Ya')
    // .orderBy('id')
    .get();
  if (snapshot.empty) {
    console.log('No matching documents!');
    return;
  }

  snapshot.forEach(doc => {
    console.log(doc.data()['email']);
  });
}

getInvitations();


// fs.readdir(directoryPath, function(err, files) {
//   if (err) {
//     return console.log("Unable to scan directory: " + err);
//   }

  //TODO: to bulk set document from json file to firestore
  // files.forEach(function(file) {
  //   var lastDotIndex = file.lastIndexOf(".");

  //   var menu = require("./files/" + file);
  //   menu.forEach(function(obj) {
  //     firestore
  //       .collection(file.substring(0, lastDotIndex))
  //       .doc(obj.id.toString())
  //       .set(obj)
  //       .then(function(docRef) {
  //         console.log("Document written");
  //       })
  //       .catch(function(error) {
  //         console.error("Error adding document: ", error);
  //       });
  //   });
  // });

// });

