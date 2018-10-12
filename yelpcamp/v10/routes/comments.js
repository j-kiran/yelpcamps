var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res){
    // find campground by id
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

//Comments Create
router.post("/campgrounds/:id/comments/",middleware.isLoggedIn,function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
                res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               campground.comments.push(comment);
               campground.save();
               console.log(comment);
                   req.flash("success", "Successfully added new comment");
                   res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});
router.get("/campgrounds/:id/comment/:comment_id/edit",middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err,foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
         }
    });
});
router.put("/campgrounds/:id/comment/:comment_id",middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }else{
           req.flash("success", "Successfully edited Comment");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
router.delete("/campgrounds/:id/comment/:comment_id",middleware.checkCommentOwnership, function(req,res){
        Comment.findByIdAndRemove(req.params.comment_id, function(err){
            if(err){
                res.redirect("back");
            }else{
                req.flash("success", "Deleted Comment");
                res.redirect("back");
            }
        });
});





module.exports = router;