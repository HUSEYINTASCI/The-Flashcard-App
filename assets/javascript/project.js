var usrip;
var lan;
var lon;

// News
let news =
  "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b4538a852bc8449fa32e9a53991b4b2f";

$.ajax({
  url: news,
  method: "GET",
  success: function(n) {
    console.log(n);
    $(document).ready(function() {
      $.getJSON("https://api.ipify.org?format=json", function(data) {
        console.log(data.ip);
        usrip = data.ip;

        let ip =
          "http://api.ipstack.com/" +
          usrip +
          "?access_key=b13a49c64eaabd6cbc27cb45d6e1c8d2";

        $.ajax({
          url: ip,
          method: "GET",
          success: function(p) {
            console.log(p);
            $("#ip").prepend($("<p>").text("City = " + p.city));

            $("#ip").prepend($("<p>").text("Ip Adress = " + p.ip));
            lan = p.latitude;
            lon = p.longitude;
            $("#ip").prepend($("<p>").text("Ip latitude = " + lan));
            $("#ip").prepend($("<p>").text("Ip longitude = " + lon));
          }
        });
      });

      $("#r1").prepend(
        $(
          "<img src=" +
            n.articles[0].urlToImage +
            " width=" +
            "200px" +
            " height=" +
            "100px" +
            ">"
        ),
        $("<div>").text(n.articles[0].title),
        $(
          "<a href=" +
            n.articles[0].url +
            " target=" +
            "_blank" +
            " rel=" +
            "noopener noreferrer" +
            ">link</a>"
        )
      );
      $("#r2").prepend(
        $(
          "<img src=" +
            n.articles[1].urlToImage +
            " width=" +
            "200px" +
            " height=" +
            "100px" +
            ">"
        ),
        $("<div>").text(n.articles[1].title),
        $(
          "<a href=" +
            n.articles[1].url +
            " target=" +
            "_blank" +
            " rel=" +
            "noopener noreferrer" +
            ">link</a>"
        )
      );
      $("#r3").prepend(
        $(
          "<img src=" +
            n.articles[2].urlToImage +
            " width=" +
            "200px" +
            " height=" +
            "100px" +
            ">"
        ),
        $("<div>").text(n.articles[2].title),
        $(
          "<a href=" +
            n.articles[2].url +
            " target=" +
            "_blank" +
            " rel=" +
            "noopener noreferrer" +
            ">link</a>"
        )
      );
      $("#r4").prepend(
        $(
          "<img src=" +
            n.articles[3].urlToImage +
            " width=" +
            "200px" +
            " height=" +
            "100px" +
            ">"
        ),
        $("<div>").text(n.articles[3].title),
        $(
          "<a href=" +
            n.articles[3].url +
            " target=" +
            "_blank" +
            " rel=" +
            "noopener noreferrer" +
            ">link</a>"
        )
      );
    });
  }
});



var firebaseConfig = {
  apiKey: "AIzaSyDEvybQhM7ZXpG9EgEPS7mp1VRVDyEx1dA",
  authDomain: "flashcard-5e3f1.firebaseapp.com",
  databaseURL: "https://flashcard-5e3f1.firebaseio.com",
  projectId: "flashcard-5e3f1",
  storageBucket: "",
  messagingSenderId: "638770178723",
  appId: "1:638770178723:web:06c3d146958e504c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

 