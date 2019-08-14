$(document).ready(function(){

    var firebaseConfig = {
        apiKey: "AIzaSyDEvybQhM7ZXpG9EgEPS7mp1VRVDyEx1dA",
        authDomain: "flashcard-5e3f1.firebaseapp.com",
        databaseURL: "https://flashcard-5e3f1.firebaseio.com",
        projectId: "flashcard-5e3f1",
        storageBucket: "",
        messagingSenderId: "638770178723",
        appId: "1:638770178723:web:06c3d146958e504c"
      };
  
      firebase.initializeApp(firebaseConfig);


      $("#loginBtn").click(function(){

        var email = $("#email").val();
        var password = $("#password").val();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(){
                window.location.href = "index.html";
            }).catch(function(error){
                alert(error.message);
        });


    });


$("#Sign").on("click",function(){

    window.location.href = "signup.html";

});



});