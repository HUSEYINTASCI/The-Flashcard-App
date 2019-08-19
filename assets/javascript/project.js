//User ip
var usrip;
// User city
var ucity;
// User Langitute
var lan;
// User Longitute
var lon;
// User question
var que;
//User Answer
var ans;
//For flash card user name
var owner;
//Uniqe id for creating flashcard
var id;
//User city
var userc;
// User name
var us;
//Classmate id
var classmateid;
//Flashcard question
var question;
//Flashcard Answer
var ansver;
//For Showing pools
const lspool = document.querySelector("#myflashcard");
//For Showing classmates
const userlist = document.querySelector("#userlist");
let uname; 
//for classmates flashcard
let own;
//Taking id
var lookid;
//Taking flashcard owner
var lookowner;
// News
//---------------------------------------------------------------------------------------------------------------------
let news = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b4538a852bc8449fa32e9a53991b4b2f";

$.ajax({
  url: news,
  method: "GET",                             ///<<<----  i use two ip api first taking just ip and other one searching ip
  success: function (n) {
    $(document).ready(function () {
      $.getJSON("https://api.ipify.org?format=json", function (data) {

        usrip = data.ip;


        //Searching ip adress
        //---------------------------------------------------------------------------------------------------------------------
        let ip = "https://api.ipdata.co/" + usrip + "?api-key=d6dc306b59bf5a5e8664d8274d85f60945a52fd90adbda82d73cc442";

        $.ajax({
          url: ip,
          method: "GET",
          success: function (p) {

            ucity = p.city;

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
      $("#r1").prepend($("<img src=" + n.articles[0].urlToImage + " width=" + "200px" + " height=" + "100px" + ">"), $("<div>").text(n.articles[0].title), $("<a href=" + n.articles[0].url + " target=" + "_blank" + " rel=" + "noopener noreferrer" + ">Read</a>"));
      $("#r2").prepend($("<img src=" + n.articles[1].urlToImage + " width=" + "200px" + " height=" + "100px" + ">"), $("<div>").text(n.articles[1].title), $("<a href=" + n.articles[1].url + " target=" + "_blank" + " rel=" + "noopener noreferrer" + ">Read</a>"));
      $("#r3").prepend($("<img src=" + n.articles[2].urlToImage + " width=" + "200px" + " height=" + "100px" + ">"), $("<div>").text(n.articles[2].title), $("<a href=" + n.articles[2].url + " target=" + "_blank" + " rel=" + "noopener noreferrer" + ">Read</a>"));
      $("#r4").prepend($("<img src=" + n.articles[3].urlToImage + " width=" + "200px" + " height=" + "100px" + ">"), $("<div>").text(n.articles[3].title), $("<a href=" + n.articles[3].url + " target=" + "_blank" + " rel=" + "noopener noreferrer" + ">Read</a>"));
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
    //--------------------------------------------------------------------------------------------------------------------
     // Deleting data
  $(document).on("click", "#delete", function () {
    var cn = confirm("Do you want to delete flashcard ?");
    if (cn == true) {

      if (lookowner == us) {
        data.collection("flashcardpool").doc(lookid).delete().then(function () {
          alert("Flashcard successfully deleted!");
          userc = userc - 1;
          data.collection("classmate").doc(user.uid).update({
            usercard: userc
        });
        
          closeForm();
        }).catch(function (error) {
          console.error("Error removing document: ", error);
        });
      } else {

        alert("You can delete just own question.");
      }

    } else {

    }

  });
  });
  //-------------------------------------------------------------------------------------------------------
  //    Classmates list

  function listclassmate(doc) {
    let li = document.createElement("li");
    let ucard = document.createElement("span");
        uname = document.createElement("span");
    own=doc.data().username;
    li.setAttribute("id", own);

    uname.textContent = doc.data().username;
    ucard.textContent = doc.data().usercard;


    li.appendChild(uname);
    li.appendChild(ucard);

    userlist.appendChild(li);


  }

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
  function listpool(doc) {
    let li = document.createElement("li");
    let queid = document.createElement("span");
    let owner = document.createElement("span");
    let flashque = document.createElement("span");

    li.setAttribute("id", doc.id);
    queid.textContent = doc.data().queid;
    owner.textContent = doc.data().owner;
    flashque.textContent=doc.data().que;
    li.appendChild(queid);
    li.appendChild(flashque);
    li.appendChild(owner);
    lspool.appendChild(li);


    // Show question
    queid.addEventListener("click", (e) => {
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute("id");
      lookid = e.target.parentElement.getAttribute("id");
      lookowner = doc.data().owner;
      document.querySelector("#create").style.display = "none";
      data.collection("flashcardpool").doc(id).get().then(doc => {

        question = $("#flsq").val(doc.data().que);
        ansver = $("#flsa").val(doc.data().ans.ans1);


      });
      openForm();
    });



  }
  //---------------------------------------------------------------------------------------------------------------------------------
  // List classmate query
  data.collection("classmate").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();

    changes.forEach(change => {
      if (change.type == "added") {
        listclassmate(change.doc);
      } else if (change.type == "removed") {
        let li = userlist.querySelector("[id=" + change.doc.id + "]");
        userlist.removeChild(li);
      }
    });
  });

  //---------------------------------------------------------------------------------------------------------------------------------

  // List my questions
  function shwmyflashcard() {
    data.collection("flashcardpool").where("owner", "==", us).onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == "added") {
          listpool(change.doc);
        } else if (change.type == "removed") {
          let li = lspool.querySelector("[id=" + change.doc.id + "]");
          lspool.removeChild(li);
        }
      });
    });
  }
  //---------------------------------------------------------------------------------------------------------------------------------

  // Show Pool function
  function shwpool() {
    data.collection("flashcardpool").orderBy("que").onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        if (change.type == "added") {
          listpool(change.doc);
        } else if (change.type == "removed") {
          let li = lspool.querySelector("[id=" + change.doc.id + "]");
          lspool.removeChild(li);
        }
      });
    });


  }
  //---------------------------------------------------------------------------------------------------------------------------------
  // Show My pool
  $("#showmypool").on("click", function () {
    $("#myflashcard").empty();
    shwmyflashcard();
  });


  //---------------------------------------------------------------------------------------------------------------------------------
  // Show  pool
  shwpool();
  $("#showpool").on("click", function () {
    $("#myflashcard").empty();
    shwpool();
  });

  //--------------------------------------------------------------------------------------------------------------------------------

  //Click user name listing user flashcards
  userlist.addEventListener("click", (e) => {
  $("#myflashcard").empty();
    e.stopPropagation();
    lookowner = e.target.parentElement.getAttribute("id");
   
   data.collection("flashcardpool").where("owner", "==", lookowner).onSnapshot(snapshot => {
    let changes = snapshot.docChanges();

    changes.forEach(change => {
      if (change.type == "added") {
        listpool(change.doc);
      } else if (change.type == "removed") {
        let li = lspool.querySelector("[id=" + change.doc.id + "]");
        lspool.removeChild(li);
      }
    });
  });

  });
   
  // -----------------------------------------------------------------------------------------------------------------------------
  
  //Input Searching classmates
    
  $(document).ready(function(){
    $("Input").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#userlist li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

  
  // -----------------------------------------------------------------------------------------------------------------------------
  
  // SignOut
  $("#signout").on("click", function () {
    uconnect.signOut().then(function () {
      window.location.href = "signin.html";
    }).catch(function (error) {
      console.log(error);
    });


  });

  //-------------------------------------------------------------------------------------------------------
  //Create Flashcard
  $("#create").on("click", function () {
 
    id = id + 1;
    userc = userc + 1;
 
    question = $("#flsq").val();
    ansver = $("#flsa").val();


    if (question == "") {
      alert("You can not create empty flashcard");

    } else {

      // Creating New Flashcard
      var docData = {
        queid: "Flashcard-" + id,
        que: question,
        city:ucity,
        owner: us,
        dateExample: firebase.firestore.Timestamp.fromDate(new Date()),
        ans: {
          ans1: ansver

        }
      };
      data.collection("flashcardpool").doc("Flashcard-" + id).set(docData).then(function () {
      });

      //Id Generator

      var idData = {
        qid: id

      };
      data.collection("uniqueid").doc("uid").set(idData).then(function () {
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

        alert("Flashcard successfully Created!");

    }
  });
 
 


});


//-----------------------------------------------------------------------------------------------------------------------
// Slide Show -----------------------------------------------------------------------------------------------------------
$("#slideshow > div:gt(0)").hide();

setInterval(function () {
  $("#slideshow > div:first")
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo("#slideshow");
}, 10000);

// Open and close flashcard Panel ---------------------------------------------------------------------------------------------------
function openForm() {
  $("#flsq").val("");
  $("#flsa").val("");
  document.querySelector("#pool").style.display = "none";
  document.querySelector("#flashcard").style.display = "block";
  document.querySelector("#acreate").style.display = "none";

  if (lookowner == us) {

    document.querySelector("#delete").style.display = "blok";
  } else {
    document.querySelector("#delete").style.display = "none";
  }


}

function closeForm() {
  document.querySelector("#pool").style.display = "block";
  document.querySelector("#flashcard").style.display = "none";

  // No time short way i will change
  location.reload();
  shwmyflashcard();
}

