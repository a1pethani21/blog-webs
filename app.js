const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT || 3000

mongoose.connect("mongodb://localhost:27017/blog", { useNewUrlParser: true, useUnifiedTopology: true });


const composeSchema = {
    title: String,
    Post: String
}

const Post = mongoose.model("Post", composeSchema);

const homeStartingContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
const aboutStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis quam id nibh porttitor, a elementum ipsum porttitor. Duis sit amet venenatis mi, eu suscipit nulla. Maecenas sit amet dignissim mauris, id ullamcorper ex. Nulla eget arcu urna. Sed et felis laoreet, gravida dui faucibus, auctor purus. Proin volutpat velit id mauris vehicula laoreet. Phasellus id nibh vestibulum, posuere quam vitae, finibus nisl. Phasellus vestibulum diam sed gravida tincidunt.";
const contactStartingContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

app.set('view engine', 'ejs'); //FOR EJS
app.use(express.static("public")); //FOR CSS
app.use(bodyParser.urlencoded({ extended: true }));


const posts = []; // FOR GLOBAL INPU-T

app.get("/", function(req, res) {

    res.render("home", ({ startC: homeStartingContent, posts: posts }));
})
app.get("/about", function(req, res) {
    res.render("about", ({ startA: aboutStartingContent }));
})
app.get("/contact", function(req, res) {
    res.render("contact", ({ startContact: contactStartingContent }));
})
app.get("/compose", function(req, res) {
    res.render("compose");
})
app.post("/compose", function(req, res) {

    const post = new Post({
        title: req.body.inputTitle,
        Post: req.body.inputPost
    }); // PRINT IN HOME.EJS

    post.save();
    posts.push(post);
    res.redirect("/");
})
app.get("/posts/:userid", function(req, res) {
    const userID = _.lowerCase(req.params.userid); //use lodash lan.

    posts.forEach(function(post) {
        const storName = _.lowerCase(post.title) //for get post title


        if (userID === storName) {
            res.render("post", ({
                title: post.title,
                post: post.Post
            }))
        }
    });
})


app.listen(port, function() {
    console.log("server is start" + port);
})