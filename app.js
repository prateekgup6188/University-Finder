var express        = require('express'),
    app            = express();
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override');

app.set("view engine","ejs");
app.use(express.static("public"));
app.set("port",process.env.PORT||8080);
console.log("Server is listening");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

const ar=require('./List');

const v=[];
const Countries = new Map();
ar.map((_,index)=>{
    v.push({
        "Country":ar[index].country,
        "University":ar[index].name
    });
    Countries.set(ar[index].country,1);
})

app.get('/',function(req,res){
    const countryList=[...Countries.keys()].sort();
    res.render("index",{CountryList:countryList});
});

app.post('/show',function(req,res){
    const name=req.body.country;
    const universities=[];
    for(let i in v){
        if(v[i].Country===name){
            universities.push(v[i].University);
        }
    }
    res.render("universities",{country:name,universities:universities});
})

app.listen(app.get("port"));