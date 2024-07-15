const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require('body-parser');
const localauth = require("./middleware/localAuth");
const db = require("./config/database");

const authRoutes = require('./router/auth.router');
const router = require("./router/user.Router");
const catRouter = require('./router/category.router');
const subcatRouter = require('./router/subcategory.router');
const extraRouter = require('./router/extracategory.router');
const productRouter = require('./router/product.router');

const app = express();
const port = 8088;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());
localauth(passport);

app.use(router);

app.use('/category', catRouter);
app.use('/subcategory', subcatRouter);
app.use('/extracategory', extraRouter);
app.use('/product', productRouter);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/admin', (req, res) => {
  res.render('Pages/admin');
});

app.listen(port, () => {
  db();
  console.log(`Server running on port ${port}`);
});
