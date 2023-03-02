const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/7212d300f8";
  const options = {
    method: "POST",
    auth: "myapikey:db84c3d6d36c6cf9d4d19b151d7c2b95-us21",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode == 200) {
      console.log("success");
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  //request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
});

//api key
// db84c3d6d36c6cf9d4d19b151d7c2b95-us21

//list id
// 7212d300f8
