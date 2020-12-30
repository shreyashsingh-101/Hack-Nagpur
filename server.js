const express = require('express');
const firebase = require('firebase');
const http = require('http');
const port = 3000;
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet')
const Config = "./static/config.js"


var Comment = require('./models/comments');
var Thread = require('./models/threads');



app.set('view engine', 'ejs');
app.set('views', 'views');

mongoose.connect("mongodb+srv://SachinKumarGupta:testpasss@cluster0.hm3no.mongodb.net/forum", { useNewUrlParser: true });


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));


// Initialize Firebase
firebase.default.initializeApp(Config.firebaseConfig)




app.use(express.static(path.join(__dirname,'static')));



app.use(cors())



let authorized = true;

function checkAuth(req, res, next) {
  if (authorized) {
    next()
  } else {
    res.status(403).send('Unauthorized!')
    return
  }
}

app.use('/', checkAuth)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'Static/index.html'))
    console.log(!!firebase)
});

app.get("/forum.html",(req,res,next) => {
    Thread.find({}, (err, allThreads) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render("index",{docTitle: 'forum', thds: allThreads})
        }
    });
});

app.get("/comments/:id",(req, res, next) => {
    var id = req.params.id;
    console.log(id.length);
    Thread.findById(id).populate("comments").exec(function(err,foundThread) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("comments", {thd: foundThread});
        }
    })
});

app.post("/addComment/:id",(req, res, next) => {

    Thread.findById(req.params.id, (err, thread) => {
        if(err) {
            console.log(err);
        }
        else {
            let c = {comment: req.body.comment, author: req.body.author};
            Comment.create(c, (err, cmt) => {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log("COmment is "+cmt);
                    thread.comments.push(cmt);
                    thread.save();
                    res.redirect("/comments/"+req.params.id);
                }
                
            });
        }
    });

});

app.post("/addThread",(req, res, next) => {
    let thr = {title: req.body.title, description: req.body.description, category: req.body.category, author: req.body.author};
    Thread.create(thr, (err, thread) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Thread added");
        }
    }); 

    res.redirect("/forum.html");
});





app.listen(port,()=>{
    console.log("Server running.")
})

app.use(helmet.frameguard())





