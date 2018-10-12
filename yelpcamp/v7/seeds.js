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
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
         
    },
    {
        name: "clouds rest", 
        image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
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