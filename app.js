const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const PostController = require('./controllers/postControllers');
const PageController = require('./controllers/pageController');

const app = new express();

//Database connection
const db =
  'mongodb+srv://<username>:<password>@cluster0.t3mey.mongodb.net/cleanblog-test-db?retryWrites=true&w=majority';
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Template Engine
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.get('/', PostController.getAllPost);
app.get('/about', PageController.getAboutPage);
app.get('/posts/:id', PostController.getPost);
app.get('/add', PageController.getAddPage);
app.post('/addpost', PostController.createPost);
app.get('/post/edit/:id', PageController.getEditPage);
app.put('/post/:id', PostController.updadePost);
app.delete('/post/:id', PostController.deletePost);

const port = process.env.PORT||5000.;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
