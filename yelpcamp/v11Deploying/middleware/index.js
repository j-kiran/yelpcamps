var Campground = require("../models/campground");
var Comment = require("../models/comment"); 
var middlewareobj = {};
middlewareobj.checkCampgroundOwnership=function (req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            req.flash("error", "Campground not found");
            res.redirect("back");
        }else{
            // console.log(foundCampground.author.id);
            // console.log(req.user._id);
            if(foundCampground.author.id.equals(req.user._id)){
                    next(); 
            }else{
                req.flash("error", "you don't have Permission to do that");
                res.redirect("back");
            }
        }
    });

    }else{
                req.flash("error", "You need to be Logged In");
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
                          req.flash("error", "you don't have permission to do that");
                           res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
};
middlewareobj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "please login First!");
    res.redirect("/login");
};


module.exports = middlewareobj;