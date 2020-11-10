import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Segment, Loader, Dimmer, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Comments from './Comments';

function PostDetail() {
  const {postId} = useParams()
  const [post, setPost] = useState(null)

  useEffect(()=>{
    getData()
  },[postId])

  const getData = async () => {
    const data = await axios.get(`/api/v1/posts/${postId}`);
    setPost(data.data)
  }

  // Check if there is a post
  if(!post){
    return (
      <Segment>
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      </Segment>
    )
  }



  return (
    <>
    <Header as='h1'>{post.title}</Header>
    <Segment vertical>
      <Header size='small'>
        {post.author}
      </Header>
        { post.content.split('\n').map((paragraph,i) => {return <p key={i}>{paragraph}</p>} )}
        <Comments />
        <Link to='/'>Back</Link>         
    </Segment>
    
    </>
  )
}

export default PostDetail
