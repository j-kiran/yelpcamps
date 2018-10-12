var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/catapp", { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
    name : String,
    age : Number
});

var cat = mongoose.model("cat", catSchema);

cat.create({
    name : "Rusty",
    age  :  8
},function(err,campground){
        if(err){
            console.log(err);
        }else{
            console.log("campground saved");
            console.log(campground);
            }
        });