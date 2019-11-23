var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

var users = require("./routes/api/user");
var profile = require("./routes/api/profile");
var posts = require("./routes/api/posts");

var app = express();

const db = require("./config/keys").mongoURI;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("mongoDB Connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

var port = process.env.PORT || 5000;

app.listen(port, () => console.log("Socially is Started"));
