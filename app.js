const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app=express();

app.use(express.static("public"));//inorder to use the static files

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res)
{
  res.sendFile(__dirname+"/signup.html");
});

app.post("/", function (req,res)
{
  var firstName=req.body.fname;
  var lastName=req.body.lname;
  var emailAdd=req.body.email;
  console.log(firstName,lastName,emailAdd);
});


app.listen(3000, function()
{
  console.log("Server has started!");
});
//api key
//1b98c332053580ff68158c7565133525-us14
