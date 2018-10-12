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
// Campground.create(
//      {
//          name: "Granite Hill", 
//          image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//          description: "This is a huge granite hill, no bathrooms.  No water. Beautiful granite!"
         
//      },
//      function(err, campground){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED CAMPGROUND: ");
//           console.log(campground);
//       }
//     });
    

    
app.get("/", function(req,res){
    res.render("landing");
    });
    
app.get("/campground", function(req,res){
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
                    res.render("campground/index",{ campground:allCampgrounds });
        }
    });
});

app.post("/campground", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;

    var newCampground = {name:name, image:image, description:description};
     Campground.create(newCampground, function(err, newlyCreated){
         if(err){
             console.log(err);
         }else{
                res.redirect("campground/index");
             
         }
     });
});

app.get("/campground/new", function(req,res){
    res.render("campground/new");
});
//====================comment==========================

app.get("/campground/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
        console.log(err);
    }else{
             console.log(foundCampground);
            res.render("campground/show",{campground:foundCampground});
        }
    
    });
});
app.get("/campground/:id/comment/new",isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log("err");
        }else{
                res.render("comment/new", { campground:campground });
            
        }
    });
});

app.post("/campground/:id/comment", function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campground");
        }else{
            Comment.create(req.body.comments,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campground/' + campground._id);
                }
            });
        }
    });
});
//=================Auth=====================================

app.get("/register", function(req,res){
    res.render("register");
});

app.post("/register",function(req,res){
    var newUser=new User({username : req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/campground");
            });
        }
    });
});

app.get("/login", function(req,res){
    res.render("login");
});

app.post("/login", passport.authenticate("local",
    {
        successRedirect  :"/campground",
        failureRedirect :"/login"
    }), function(req,res){
        
    });
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/campground");
});
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("yelpcamp server has started");
});