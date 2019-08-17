$(document).ready(function () {
    //Auth Database Connection
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
    var uconnect = firebase.auth();
    var data = firebase.firestore();


    //Signup button
    $("#signupbtn").click(function () {
        var username = $("#username").val();
        var email = $("#email").val();
        var password = $("#password").val();
        //Firebase creating user with email and password
        uconnect.createUserWithEmailAndPassword(email, password).then(add => {
            return data.collection("classmate").doc(add.user.uid).set({
                username: username,
                usercard: 0
            })
        }).then(() => {

            window.location.href = "index.html";

            //Catching Error
        }).catch(function (error) {
            alert(error.message);
        })

    })


})
// Going Sign in Html
$("#cls").on("click", function () {

    window.location.href = "signin.html";

});