import { Link, useParams} from 'react-router-dom'

const PostPage = ({posts,handleDelete}) => {
  const {id} = useParams();
 
  const post = posts && posts.find(post => (post.id).toString() === id);
  
  return (
    <main className='PostPage'>
      <article className='post'>
        {post && <> 
          <h2>{post.title}</h2>
          <p className='postDate'>{post.datetime}</p>
          <p className='postBody'>{post.body}</p>
          <button className= "deleteButton" onClick={()=>handleDelete(post.id)}> Delete Post</button>
  </> }

  {!post && <> 
    <h2> post not found</h2>
    <p><Link to='/'> visit homepage</Link></p>
  </> } 
  </article>
  </main>
  )
}

export default PostPage
