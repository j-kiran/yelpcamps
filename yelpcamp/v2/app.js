var express =require("express");
var app =  express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });

var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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
                    res.render("index",{ campground:allCampgrounds });
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
                res.redirect("/campground");
             
         }
     });
});

app.get("/campground/new", function(req,res){
    res.render("new");
});

app.get("/campground/:id", function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
        console.log(err);
    }else{
            res.render("show",{campground:foundCampground});
        }
    
    });
});

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("yelpcamp server has started");
});