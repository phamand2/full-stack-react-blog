var express = require('express');
var router = express.Router();
const db = require('../models')

/* GET ALL Posts */
// GET /api/vi/posts/
router.get('/', function(req, res) {
  db.Post.findAll()
  .then(posts => res.json(posts))
});


// Get 1 Post by ID
// GET /api/v1/posts/102
router.get('/:id', (req,res)=> {
  db.Post.findByPk(req.params.id)
  .then(post => {
    if(post){
      res.json(post)
    } else {
      res.status(404).json({
        error: 'Post not found'
      })
    }
  })
})

// Update Post
// PUT /api/v1/posts/101
router.put('/:id', (req,res)=>{
  if (!req.body || !req.body.author || !req.body.title || !req.body.content || !req.body.publish) {
    res.status(400).json({
      error: 'Enter all fields',
    });
    return;
  }
  db.Post.update({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    publish: req.body.publish
  }, {
    where: {
      id: req.params.id
    }
  })
  .then(updated => {
    if(updated && updated[0] === 1){
      res.status(202).json({
        success: 'Post Updated'
      })

    } else {
      res.status(404).json({
        error: 'Post not found'
      })
    }
  })
})




// Create new Post
// POST /api/v1/posts
router.post('/',(req,res)=>{
  if (!req.body || !req.body.author || !req.body.title || !req.body.content || !req.body.publish) {
    res.status(400).json({
      error: 'Enter all fields',
    });
    return;
  }
  db.Post.create({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    publish: req.body.publish

  })
  .then(post => {
    res.status(201).json(post)
  })
})



// Delete Post
// DELETE /api/v1/posts/101
router.delete('/:id', (req,res)=>{
  db.Post.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deleted => {
    if(deleted === 1) {
      res.status(202).json({
        success: 'Post deleted'
      })
    }
    else {
      res.status(404).json({
        error: 'post not found'
      })
    }
  })
})



// example URL:
// GET /api/v1/posts/102/comments
router.get('/:postId/comments', (req,res)=>{
  db.Comment.findAll({
    where: {
      PostId: req.params.postId
    }
  })
  .then(comments => {
    res.json(comments)
  })
})



// example URL:
// POST /api/v1/posts/102/comments
router.post('/:postId/comments', (req,res)=>{
  if (!req.body || !req.body.author || !req.body.content){
    res.status(400).json({
      error: 'Please include all required fields'
    })
    return;
  }

  db.Post.findByPk(req.params.postId)
  .then(post =>{
    if (!post){
      res.status(404).json({
        error: "Can't create comment for post that doesn't exist"
      })
    }  
    return post.createComment({
    author: req.body.author,
    content: req.body.content,
    approved: true
    })
  })
  .then(comment => {
    res.json({
      success: 'Comment added',
      comment: comment
    })
  })
})





module.exports = router;
