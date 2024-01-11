const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));


app.get("/", function(req,res){

    res.sendFile(__dirname + "/src/signup.html");
});

app.post("/", function(req, res){
    const email = req.body.email ;
    
    const data = {
        members: [{
            email_address: email,
        }]
    };
     
    const jsondata= JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/345f7fdbba"
    const option =  {
        method: "POST",
        auth: "nishank:e6d0873dbae9d5eee9ba982cb1dfb4d8-us14"
    };

    const requ = https.request(url, option, function(response){
      
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/src/success.html");
        }else{

            res.sendFile(__dirname + "/src/failure.html");
        }

    });


    requ.write(jsondata);
    requ.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 5000, function(){
    console.log("listening to port 5000");
});


//e6d0873dbae9d5eee9ba982cb1dfb4d8-us14
//345f7fdbba