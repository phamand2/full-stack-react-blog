import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Modal, Button, Form } from 'semantic-ui-react'
import { useParams } from 'react-router-dom';

function CommentsForm({addComment}) {
  const [comments, setComments] = useState([])
  const [open, setOpen] = useState(false)
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const {postId} = useParams()


  useEffect(()=>{
    getComment()
    }, [])
  
  
    const getComment = async () => {
      const data = await axios.get(`/api/v1/posts/${postId}/comments`)
      setComments(data.data)
      console.log(comments)
    }

    const handleFormSubmit = (e) => {
      e.preventDefault();
      axios.post(`/api/v1/posts/${postId}/comments`, {
        author: author,
        content: content
      })
      .then(res => {
        console.log(res.data)
        setOpen(false)
        setAuthor('')
        setContent('')
        // refresh the new comment
        addComment(res.data.comment)   
      })
      .catch(err => console.log(err))
    }

  return (
    <div>
      <Modal
          trigger={<Button>Add New Comments</Button>}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}       
          >
            <Modal.Header>Add Comment</Modal.Header>
            <Modal.Content>
              <Form id='newPostForm'>
                <Form.Input required label='Author' type='text' value={author} onChange={(e) => { setAuthor(e.target.value) }} />
                <Form.TextArea required label='Content' value={content} onChange={(e) => { setContent(e.target.value) }}/>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button positive onClick={handleFormSubmit} form='newPostForm'>Submit</Button>
            </Modal.Actions>           
          </Modal>   
    </div>
  )
}

export default CommentsForm
