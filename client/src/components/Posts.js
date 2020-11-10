import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Header, Modal, Segment, Button, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


function Posts() {

  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publish, setPublish] = useState('')
  const [content, setContent] = useState('')


  useEffect(()=>{
    getData()
  },[])

  const getData = async () => {
    const data = await axios.get('/api/v1/posts');
    setPosts(data.data)
  }
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/v1/posts', {
      author: author,
      title: title,
      publish: publish,
      content: content
    })
    .then(res => {
      console.log(res.data)
      setOpen(false)
      setTitle('')
      setAuthor('')
      setPublish('')
      setContent('')
      // refresh the new the post
      setPosts(posts.concat(res.data))   
    })
    .catch(err => console.log(err))
  }



  return (
    <div>
      <Header as='h1'>Posts</Header>
      {posts.map((post) => {
        return <div key={post.id}>
          <Segment>
            <Header as='h2'>
              {post.title}
            </Header>
            <Header size='small'>
              {post.author}
            </Header>
            <p>{ post.content.slice(0, 200)}{ post.content.length > 200 && "..."}</p>
            <Link to={`/posts/${post.id}`}>Read More</Link>
          </Segment>
          </div>
      })}   
          <Modal
          trigger={<Button>Add New Post</Button>}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}       
          >
            <Modal.Header>Add a new Post</Modal.Header>
            <Modal.Content>
              <Form id='newPostForm'>
                <Form.Input required label='Title' type='text' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                <Form.Input required label='Author' type='text' value={author} onChange={(e) => { setAuthor(e.target.value) }} />
                <Form.Input required label='Publish Date' type='datetime-local' value={publish} onChange={(e)=>{setPublish(e.target.value)}} />
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

export default Posts
