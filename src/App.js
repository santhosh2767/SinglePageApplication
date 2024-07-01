import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import Nav from './Nav';
import Home from './Home';
import { format } from 'date-fns';
import { Route, Routes, useNavigate } from 'react-router-dom';

const defaultPosts = [
  { id: 1, title: "first post", dateTime: "01-11-23", body: "made my day happy developing" },
  { id: 2, title: "second post", dateTime: "01-11-23 & 11-11", body: "Learning New thing" },
  { id: 3, title: "third post", dateTime: "01-11-23 & 11-11", body: "Be Positive at any situation" },
  { id: 4, title: "fourth post", dateTime: "01-11-23 & 11-11", body: "Be consistent" }
];

function App() {
  const [posts, setPosts] = useState(() => {
    
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    return storedPosts || defaultPosts;
  });

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    const filteredResults = posts.filter(post =>
      post.body.toLowerCase().includes(search.toLowerCase()) ||
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;

    const dateTime = format(new Date(), "dd-MM-yy pp");

    const newPost = { id, title: postTitle, dateTime, body: postBody };

    const allPosts = [...posts, newPost];

    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }

  const handleDelete = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    navigate('/');
  }

  return (
    <div className='App'>
      <Header title="Mind Sharing" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path='/' element={<Home posts={searchResults} />} />

        <Route path='post'>
          <Route index element={<NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody} />}
          />
          <Route path=':id' element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        </Route>

        <Route path='about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
