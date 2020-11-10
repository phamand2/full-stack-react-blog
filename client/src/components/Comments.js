import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Header,Card } from 'semantic-ui-react'
import CommentsForm from './CommentsForm'

function Comments() {
  const {postId} = useParams()
  const [comments, setComments] = useState([])

  useEffect(()=>{
  getComment()
  }, [])


  const getComment = async () => {
    const data = await axios.get(`/api/v1/posts/${postId}/comments`)
    setComments(data.data)
    console.log(comments)
  }

  const deleteComment = (commentId) => {
    axios.delete(`/api/v1/comments/${commentId}`)
    const removeComment = comments.filter(comment => comment.id !== commentId)
    setComments(removeComment)
  }


  const addComment = (comment) => {
    setComments(comments.concat(comment))
  }

  return (
    <div>
      <Header as='h1'>Comments</Header>
      {comments.map((comment) => {
        return<div key={comment.id}>
          <Card>
            <Card.Content header={comment.author} />
            <Card.Content description={comment.content} />
            <Card.Content extra>
              {comment.createdAt}
            </Card.Content>
            <button onClick={() => deleteComment(comment.id)}>Remove</button>
          </Card> 
      </div>
      }
      )}
      <>
      <CommentsForm addComment={addComment}/> 
      </>
    </div>
  )}

export default Comments

