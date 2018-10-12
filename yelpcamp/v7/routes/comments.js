var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");

router.get("/campground/:id/comment/new",isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log("err");
        }else{
                res.render("comment/new", { campground:campground });
            
        }
    });
});

router.post("/campground/:id/comment", function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campground");
        }else{
            Comment.create(req.body.comments,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    console.log("new comments user name will be:" + req.user.username);
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campground/' + campground._id);
                }
            });
        }
    });
});
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;