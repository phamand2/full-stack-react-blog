var express = require('express');
var router = express.Router();
const db = require('../models')


// PUT /api/v1/comments/:commentId
router.put('/:commentId', (req,res)=>{
  if (!req.body || !req.body.author || !req.body.content || (!req.body.approved && req.body.approved !== false)  ) {
    res.status(400).json({
      error: 'Enter all fields',
    });
    return;
  }
  db.Comment.update({
    author: req.body.author,
    content: req.body.content,
    approved: req.body.approved !== 'false' ? true : false
    
  }, {
    where: {
      id: req.params.commentId
    }
  })
  .then(updated => {
    if(updated && updated[0] === 1){
      res.status(202).json({
        success: 'Comment Updated'
      })

    } else {
      res.status(404).json({
        error: 'Comment not found'
      })
    }
  })
})



// DELETE /api/v1/comments/:commentId
router.delete('/:commentId', (req,res)=>{
  db.Comment.destroy({
    where: {
      id: req.params.commentId
    }
  })
  .then(deleted => {
    if(deleted === 1) {
      res.status(202).json({
        success: 'Comment deleted'
      })
    }
    else {
      res.status(404).json({
        error: 'Comment not found'
      })
    }
  })
})



module.exports = router;
