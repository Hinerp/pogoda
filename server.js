//---------------boiler plate code
//https://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=6e2da3e5d9b9d3af615805a867be3808&units=metric
//http://openweathermap.org/img/wn/04d@2x.png

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const https = require("https");

//II
app.set("view engine", "ejs");

app.use(express.static("public"))

app.listen(3000, function () {
    console.log("sever started on port 3000");
});
//---------------------------------

app.get("/", function(req,res){
    // res.sendFile(__dirname+"/index.html");
    res.sendFile(`${__dirname}/index.html`);
})

//https://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=6e2da3e5d9b9d3af615805a867be3808&units=metric

const appid= "6e2da3e5d9b9d3af615805a867be3808";

function dajURL(miasto)
{
return `https://api.openweathermap.org/data/2.5/weather?q=${miasto}&appid=${appid}&units=metric`;
}

function dajURLIcon(ikona)
{
return `http://openweathermap.org/img/wn/${ikona}@2x.png`
}

app.post("/", function(req,res){
    var miasto=  req.body.miasto;
    var url= dajURL(miasto);

   


    https.get(url , function(response){

         response.on("data", function(data){
             const danePogody=  JSON.parse(data);
             const temp= danePogody.main.temp;
             const opis= danePogody.weather[0].description;
             const ikona= danePogody.weather[0].icon;

             const urlIkona= dajURLIcon(ikona);

            //  res.write(`<h1>Temperatura dla ${miasto} to ${temp} </h1>`);
            //  res.write(`<p> Opis ${opis} </p>`);
            //  res.write(`<img src="${urlIkona}">`);
            //  res.send();
            
            var dane={ 
                nazwaMiata:  miasto,
            temperatura:temp,
             description: opis,
            ikonaurl: urlIkona}
            
            
            res.render("response",dane)   
            
        });


    });


    
    
})


