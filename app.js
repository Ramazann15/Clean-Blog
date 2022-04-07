const express = require('express');
const mongoose = require('mongoose');

const path =  require("path")
const ejs = require("ejs")

const Posts = require("./models/Posts")

const app = new express();

//Database connection
const db = "'mongodb://localhost/cleanblog-test-db"
mongoose.connect(db,{
  useNewUrlParser :true,
  useUnifiedTopology:true,
})

//Template Engine
app.set("view engine", "ejs")

//Middleware
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', async (req, res ) => {
  const posts = await Posts.find({})
  res.render("index",{
    posts
  })
});

app.get('/about', (req, res ) => {
  res.render("about")
});

app.get('/add', (req, res ) => {
  res.render("add_post")
});

app.post("/addpost", async(req,res)=>{
  await Posts.create(req.body)
  res.redirect("/")
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
