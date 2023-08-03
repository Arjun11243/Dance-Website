// const { urlencoded } = require("body-parser");
const express=require("express");
// const fs=require("fs");
const path=require("path");
const app=express();
const port=80;
var mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/contactDance",{useNewUrlParser: true});
const bodyparser=require('body-parser');

//Define Mongoose Scheme
var contactSchema=new mongoose.Schema({
    Name:String,
    Age: String,
    Gender:String,
    Email:String,
    Phone:String,
    Address:String
})

var Contact=mongoose.model('Contact',contactSchema);

// Express Specific Stuff
app.use('/static',express.static('static')); //For Serving Static Files
app.use(express.urlencoded());

app.set('view_engine','pug') //Set the template Engine as pug
app.set('views',path.join(__dirname,'views')) //Set the views Directory

app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render("home.pug",params);
});

app.get('/contact',(req,res)=>{
    const params={ }
    res.status(200).render("contact.pug",params);
});

app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("item has not been saved to the database");
    });
    // res.status(200).render("contact.pug");
})

app.listen(port,()=>{
    console.log(`Application started successfully on port ${port}`);
});