const express = require("express");
const mongoose = require('mongoose');
const app = express()
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users")
const tweets = require("./routes/api/tweets")
const bodyParser = require('body-parser');
const User = require("./models/User");
const passport = require("passport")
// const { emit } = require("nodemon");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

//routes on app object to listen to incoming request
app.get("/",(req,res)=> {
    const user = new User({
        handle: "emoney",
        email: "emoney@money.com",
        password:"money123"
    })
    user.save()
    res.send("What's Poppin!");

});

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users",users );
app.use("/api/tweets", tweets);

const port = process.env.PORT || 4000;

app.listen(port,() => console.log(`listening on port ${port}`))