var mongoose =require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

function seedDb(){
    Campground.remove(function(err){
        if(err){
            console.log(err);
        }else{
            console.log("campground removed");
        }
    });
}

var data = [
    {
        name: "Granite Hill", 
        image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
        description: "This is a huge granite hill, no bathrooms.  No water. Beautiful granite!"
         
    },
    {
        name: "clouds rest", 
        image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f7c87faeedb5bb_340.jpg",
        description: " No water. Beautiful clouds!"
    }    
];

    data.forEach(function(seed){
    Campground.create(seed, function(err, campground){
        if(err){
            console.log(err);
        }else {
            console.log("Added a campground");
            Comment.create(
                { text:"This place is great, but i wish there should be internet",
                  Author:"Holmes homer "
                },function(err, comment){
                    if(err){
                        console.log(err);
                    }else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Added comment");

                    }
                }
            );
        }
    });
});
module.exports = seedDb;