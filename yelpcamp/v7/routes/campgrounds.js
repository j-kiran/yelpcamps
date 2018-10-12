   var express = require ("express");
   var router = express.Router();
   var Campground = require("../models/campgrounds");

   
   
router.get("/campground", function(req,res){
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
                    res.render("campground/index",{ campground:allCampgrounds });
        }
    });
});

router.post("/campground", function(req,res){
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

router.get("/campground/new", function(req,res){
    res.render("campground/new");
});
//====================comment==========================

router.get("/campground/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
        console.log(err);
    }else{
             console.log(foundCampground);
            res.render("campground/show",{campground:foundCampground});
        }
    
    });
});
module.exports = router;