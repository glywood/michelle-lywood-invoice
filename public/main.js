var config = {
  apiKey: "AIzaSyBjIVk8zx-CAjvoR2YGCU39AqcG_hoUHiU",
  authDomain: "invoice.michellelywood.com",
  databaseURL: "https://michelle-lywood-invoice-9c2f4.firebaseio.com",
  projectId: "michelle-lywood-invoice-9c2f4",
  storageBucket: "michelle-lywood-invoice-9c2f4.appspot.com",
  messagingSenderId: "1030423588553"
};
firebase.initializeApp(config);

$(document).ready(function() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $("#login-screen").hide();
      $("#main-screen").show();
      $("#user-name").text(user.displayName);
      fetchAuthToken();
    } else {
      $("#login-screen").show();
      $("#main-screen").hide();
    }
  });

  $("#login-button").on("click", function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).catch(function(error) {
      alert("Sign-in failed. " + error);
    });
  });

  $("#logout-button").on("click", function() {
    firebase.auth().signOut().catch(function(error) {
      alert(error);
    });
  });


  var fetchAuthToken = function() {
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('/settings/' + userId + '/authtoken').once('value').then(function(snapshot) {
      var authtoken = snapshot.val();
      if (authtoken !== null) {
        $("#authtoken").val(authtoken);
        fetchInvoiceList();
      }
    }).catch(function(error) {
      alert(error);
    });
  };

  $("#save-authtoken").on("click", function() {
    var userId = firebase.auth().currentUser.uid;
    var authtoken = $("#authtoken").val();
    firebase.database().ref('/settings/' + userId + '/authtoken').set(authtoken).then(function() {
      fetchInvoiceList();
    }).catch(function(error) {
      alert(error);
    });
  });

  var fetchInvoiceList = function() {
  };
});
