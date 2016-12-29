var wordpress = require( "wordpress" );

var client = wordpress.createClient({
    url: 'https://sitename.wordpress.com',
    username: "",
    password: ""
});

// return all Wordpress posts
exports.getPosts = function(callback) {
  client.getPosts(function( error, posts ) {
    if (error) {
      callback(error)
    }
    else {
      callback(posts)
    }
  })
}

// create Wordpress post
exports.createPost = function(body, callback) {
	client.newPost({
		title: body.title,
		content: body.content,
		status: "publish",
		termNames: {
			"category": ["Javascript", "Node"],
			"post_tag": ["api", "js"]
		}
	}, function( error, data ) {
		console.log( data );
		if (error) {
		  callback(error)
		}
		else {
		  callback(data)
		}
	})
}

// get Wordpress post by id
exports.getPost = function(postid, callback) {
  client.getPost(postid, function( error, post ) {
    if (error) {
      callback(error)
    }
    else {
      callback(post)
    }
  })
}

// edit Wordpress post by id
exports.putPost = function(postid, body, callback) {
	client.editPost(postid, {
		title: body.title,
		content: body.content,
		status: "publish",
		termNames: {
			"category": ["Javascript", "Node"],
			"post_tag": ["api", "js"]
		}
	}, function( error, data ) {
		console.log( data );
		if (error) {
		  callback(error)
		}
		else {
		  callback(data)
		}
	})
}

// delete Wordpress post by id
exports.deletePost = function(postid, callback) {
  client.deletePost(postid, function( error ) {
    if (error) {
      callback(error)
    }
  })
}
