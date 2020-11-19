const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

//Initialize Apps
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.options('*', cors());
app.use(fileUpload());
//Keys
const dbURI = require('./config/globalkeys').mongoDBURI;
const port = process.env.PORT || 5100;
const server = app.listen(port, () => console.log("Server berjalan di http://localhost:" + port));
const io = require('socket.io').listen(server);

//Koneksi MongooDB
mongoose.connect(
    dbURI,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
    })
    .then(() => console.log("Koneksi MongoDB berhasil"))
    .catch(error => console.log("Koneksi MongoDB Gagal ("+error+")"));

    // Assign socket object to every request
app.use(function (req, res, next) {
    req.io = io;
    next();
});

//Routes
const users = require('./routes/user.route');
const upload = require('./routes/upload.route');
const projectList = require('./routes/project.route');
const proposal = require('./routes/proposal.route');
const review = require('./routes/review.route');
const chat = require('./routes/chat.route');

//MainApps
app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/upload", upload);
app.use("/api/projectList", projectList);
app.use("/api/proposal", proposal);
app.use("/api/userReview", review);
app.use("/api/chat", chat);


