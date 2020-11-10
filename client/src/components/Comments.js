import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

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


  return (<>
      {comments.map((comment) => {
        return <div>{comment.content}</div>}
      )}
    </>
  )}

export default Comments
