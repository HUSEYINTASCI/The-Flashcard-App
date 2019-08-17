var usrip;
var lan;
var lon;
var que;
var ans;
var owner;
var id;
var qarr = []
var qarr2 = []
var userc;
var us;
var classmateid;
var sil;
var question;
var ansver;
// News
//---------------------------------------------------------------------------------------------------------------------
let news = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b4538a852bc8449fa32e9a53991b4b2f";

$.ajax({
  url: news,
  method: "GET",
  success: function (n) {
    console.log(n);
    $(document).ready(function () {
      $.getJSON("https://api.ipify.org?format=json", function (data) {
       
        usrip = data.ip;


        //Searching ip adress
        //---------------------------------------------------------------------------------------------------------------------
        let ip = "http://api.ipstack.com/" + usrip + "?access_key=b13a49c64eaabd6cbc27cb45d6e1c8d2";

        $.ajax({
          url: ip,
          method: "GET",
          success: function (p) {
            console.log(p);


            // ip information-------------------------------------------------------------------------------------------
            lan = p.latitude;
            lon = p.longitude;
            $("#ip").prepend($("<p>").text("Ip latitude: " + lan));
            $("#ip").prepend($("<p>").text("Ip longitude: " + lon));
            $("#ip").prepend($("<p>").text("City: " + p.city));
            $("#ip").prepend($("<p>").text("Ip Adress: " + p.ip));
            $("#ip").prepend($("<p>").text("Ip Information"));
          }
        });
      });
// news-------------------------------------------------------------------------------------------------------------------------------
      $("#r1").prepend($("<img src=" + n.articles[0].urlToImage + " width=" + "200px" + " height=" + "100px" + ">"), $("<div>").text(n.articles[0].title), $("<a href=" + n.articles[0].url + " target=" + "_blank" + " rel=" + "noopener noreferrer" + ">link</a>"));
      $("#r2").prepend($("<img src=" + n.articles[1].urlToImage + " width=" + "200px" + " height=" + "100px" + ">"), $("<div>").text(n.articles[1].title), $("<a href=" + n.articles[1].url + " target=" + "_blank" + " rel=" + "noopener noreferrer" + ">link</a>"));
      $("#r3").prepend($("<img src=" + n.articles[2].urlToImage + " width=" + "200px" + " height=" + "100px" + ">"), $("<div>").text(n.articles[2].title), $("<a href=" + n.articles[2].url + " target=" + "_blank" + " rel=" + "noopener noreferrer" + ">link</a>"));
      $("#r4").prepend($("<img src=" + n.articles[3].urlToImage + " width=" + "200px" + " height=" + "100px" + ">"), $("<div>").text(n.articles[3].title), $("<a href=" + n.articles[3].url + " target=" + "_blank" + " rel=" + "noopener noreferrer" + ">link</a>"));
    });
  }
});
//-----------------------------------------------------------------------------------------------------------------------------------
// Database connection
$(document).ready(function () {
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


// User Login---------------------------------------------------------------------------------------------------------
  uconnect.onAuthStateChanged(user => {
    if (user) {
      us = user.username;
      userc = user.usercard;

      data.collection("classmate").doc(user.uid).get().then(doc => {
        classmateid = user.uid;
        us = doc.data().username;
        userc = doc.data().usercard;
       
         
        // account info 
        $("#usr").prepend($("<p>").text("Hello " + us));




      });

    }
  });
  //-------------------------------------------------------------------------------------------------------
  //    Classmates list
   
  data.collection("classmate").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      var usrl = $("<li>").text(doc.data().username + "---" + doc.data().usercard);

      $("#userlist").prepend(usrl);
    });
  });






  //-------------------------------------------------------------------------------------------------------
  // Reading id
  var docRef = data.collection("uniqueid").doc("uid");

  docRef.get().then(function (doc) {
    if (doc.exists) {
      id = doc.data().qid;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });
  //-------------------------------------------------------------------------------------------------------

  //  Listed Pool
  //-------------------------------------------------------------------------------------------------------
  data.collection("flashcardpool").onSnapshot(function (querySnapshot) {

    querySnapshot.forEach(function (doc) {
      qarr.push(doc.data().owner + " --- " + doc.data().que);
      qarr2.push(doc.id);

    });


    var poolarr = [];
    for (var i = 0; i < qarr.length; i++) {
      poolarr.push("<div id=" + qarr2[i] + " class=" + "dque" + ">" + qarr[i] + '</div>');

    }
    $("#yy").append(poolarr);

  });
  //-------------------------------------------------------------------------------------------------------
  // data.collection("flashcardpool").where("owner", "==", us)
  // .get()
  // .then(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //         // doc.data() is never undefined for query doc snapshots
  //         console.log(doc.id, " => ", doc.data());
  //     });
  // })
  // .catch(function(error) {
  //     console.log("Error getting documents: ", error);
  // });


  // signOut
  $("#signout").on("click", function () {
    uconnect.signOut().then(function () {
      window.location.href = "signin.html";
    }).catch(function (error) {

    });


  });


  // Qestion select on the poll------------------------------------------------------------------------------
  $(document).on("click", ".dque", function () {
    var rp = $(this).attr("id");


    openForm();
    $("#create").css("display", "none");
    data.collection("flashcardpool").doc(rp).get().then(doc => {

      question = $("#flsq").val(doc.data().que);
      ansver = $("#flsa").val(doc.data().ans.ans1);


    });

  });

  //-------------------------------------------------------------------------------------------------------
  //Create Flashcard
  $("#create").on("click", function () {

    id = id + 1;
    userc = userc + 1;

    question = $("#flsq").val();
    ansver = $("#flsa").val();


    if (question == "" || ansver == "") {
      alert("You can not create empty flashcard");

    } else {



      // Creating New Flashcard
      var docData = {
        que: question,
        owner: us,
        dateExample: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),
        ans: {
          ans1: ansver

        }
      };
      data.collection("flashcardpool").doc("question" + id).set(docData).then(function () {
        console.log("Question successfully written!");
      });

      //Id Generator

      var idData = {
        qid: id

      };
      data.collection("uniqueid").doc("uid").set(idData).then(function () {
        console.log("New id value successfully written!");
      });

      //User flashcard counter

      var usercound = {
        username: us,
        usercard: userc

      };
      data.collection("classmate").doc(classmateid).set(usercound).then(function () {

      });

      //Questin and Answer Clear
      $("#flsq").val("");
      $("#flsa").val("");
      
      
      
    }
  });
  document.querySelector("#acreate").style.display = "none";

});
//-------------------------------------------------------------------------------------------------------



// Slide Show ------------------------------------------------------------------------------------------
$("#slideshow > div:gt(0)").hide();

setInterval(function () {
  $('#slideshow > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow');
}, 10000);

// Open flascard Panel ---------------------------------------------------------------------------------------
function openForm() {
  $("#flsq").val("");
  $("#flsa").val("");
  document.querySelector("#pool").style.display = "none";
  document.querySelector("#flashcard").style.display = "block";
  document.querySelector("#create").style.display = "block";
  
}

function closeForm() {
  document.querySelector("#pool").style.display = "block";
  document.querySelector("#flashcard").style.display = "none";
  
  // No time short way
  location.reload();
}

