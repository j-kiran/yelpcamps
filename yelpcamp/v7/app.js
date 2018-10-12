var express =require("express");
var app =  express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy=require("passport-local")
var Campground = require("./models/campgrounds");
var User = require("./models/user");
var seedDb = require("./seeds");
var Comment = require("./models/comment");

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes= require("./routes/index");



seedDb();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/yelp_camp");

//passport configuration
app.use(require("express-session")({
    secret:"once again rusty wins secret award",
    resave:false,
    saveUninitialized:false
}));
app.use (passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

    

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("yelpcamp server has started");
});