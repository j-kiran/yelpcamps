var express =require("express");
var app =  express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgrounds=[
        {name :"salomon creek",image:"https://www.photosforclass.com/download/pixabay-1149402?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f7c67ba0eab3b9_960.jpg&user=Free-Photos"},
        {name :"clouds rest",image:"https://www.photosforclass.com/download/flickr-6017748144"},
        {name :"missapia",image:"https://www.photosforclass.com/download/pixabay-1846142?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f7c67ba0eab3b9_960.jpg&user=Pexels"},
        {name :"jissapark",image:"https://www.pexels.com/photo/bonfire-surrounded-with-green-grass-field-1061640/"
}

        ];

app.get("/", function(req,res){
    res.render("landing");
    });
    
app.get("/campground", function(req,res){
        res.render("campgrounds",{ campgrounds:campgrounds });
});

app.post("/campground", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image }
    campgrounds.push(newCampground);
    res.redirect("/campground");
});

app.get("/campground/new", function(req,res){
    res.render("new");
})

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("yelpcamp server has started");
});