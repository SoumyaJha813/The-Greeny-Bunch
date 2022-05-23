const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https= require("https");
const app=express(); //new instance of express

//app.use
app.use(express.static("public"));//inorder to use the static files
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res)
{
  res.sendFile(__dirname+"/signup.html");
});

app.post("/", function (req,res)
{
  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;

  //Batch subscription
  const data={
    'members': [ //1 subscriber at a time //key-value pair
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ],
  };

  const jsonData = JSON.stringify(data); //convert javaScript to string in format of json

  console.log(firstName,lastName,email);

  //making a request
  const url = "" //mailchimp end point - https://${dc}.api.mailchimp.com/3.0/lists/${listid}  dc=us1 listid = 03e306a88b

  const options = {
    method: "POST", //type of request we want to make
    auth: "" //Basic HTTP Authentication - string(username):api key
  }

  const request = https.request(url,options,function(response) //request to be sent to mailchimp server
  {


    response.on("data", function(data) //data we received from mailchimp server
    {
      console.log(JSON.parse(data))
      console.log(response.statusCode);
      var statusCode=response.statusCode;
      if(statusCode===200){
        //res.send("Success!!")
        res.sendFile(__dirname+"/success.html");
      }
      else{
        //res.send("Failure");
        res.sendFile(__dirname+"/failure.html");
      }
    });

  });

  request.write(jsonData); //sending request to mailchimp server
  request.end();

});


app.post("/failure", function(req,res)
{
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function()
{
  console.log("Server has started!");
});
