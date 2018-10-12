var Campground = require("../models/campground");
var Comment = require("../models/comment"); 
var middlewareobj = {};
middlewareobj.checkCampgroundOwnership=function (req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            res.redirect("back");
        }else{
            // console.log(foundCampground.author.id);
            // console.log(req.user._id);
            if(foundCampground.author.id.equals(req.user._id)){
                    next(); 
            }else{
                res.redirect("back");
            }
        }
    });

    }else{
            res.redirect("back");
    }
};
middlewareobj.checkCommentOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err,foundComment){
            if(err){
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
};
middlewareobj.isLoggedIn=function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


module.exports = middlewareobj;