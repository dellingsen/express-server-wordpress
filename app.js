var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var posts = require('./api/services/posts');

// Use Express web app framework for routing
var app = express();

app.use(logger('dev'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cookieParser());
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for posts

// route middleware that will happen on every request
app.use(function(req, res, next) {
  // continue doing what we were doing and go to the route
  next();
});


// Define application routes

//Sample Wordpress REST API

// Create endpoint /posts for POST
app.post('/api/posts', function(req, res) {
  posts.createPost(req.body, function (out) {
    res.json(out)
  })
})

// Create endpoint /posts for GET
app.get('/api/posts', function(req, res) {
  posts.getPosts(function (out) {
    res.json(out)
  })
})

// Create endpoint /posts/:post_id for PUT
app.put('/api/posts/:postid', function(req, res) {
  posts.putPost(req.params.postid, req.body, function (out) {
    res.json(out)
  })
})

// Create endpoint /posts/:post_id for GET
app.get('/api/posts/:postid', function(req, res) {
  posts.getPost(req.params.postid, function (out) {
    res.json(out)
  })
})

// Create endpoint /posts/:post_id for DELETE
app.delete('/api/posts/:postid', function(req, res) {
  posts.deletePost(req.params.postid, function (out) {
    res.json(out)
  })
})

app.delete('/api/posts', function(req, res) {
  posts.deleteAll(function (out) {
    res.json(out)
  })
})


//Create Http Server to listen for requests to routes
var server = app.listen(4000, function () {
  console.log('Listening on port', server.address().port)
})

module.exports = app;
