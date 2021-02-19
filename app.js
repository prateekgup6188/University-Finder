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
        "Country": ar[index].country,
        "University": ar[index].name,
        "Website": ar[index].web_pages[0],
        "State": ar[index].stateProvince
    });
    Countries.set(ar[index].country,1);
})

// Get Route for rendering landing page and showing list of countries
app.get('/',function(req,res){
    const countryList=[...Countries.keys()].sort();
    res.render("index",{CountryList:countryList});
});


// Post route for showing Universities in the selected country 
app.post('/show',function(req,res){
    const name=req.body.country;
    const universities=[];
    for(let i in v){
        if(v[i].Country===name){
            universities.push(
            {
                "name": v[i].University,
                "website": v[i].Website,
                "state": v[i].State
            });
        }
    }
    res.render("universities",{country:name,universities:universities});
})

app.listen(app.get("port"));