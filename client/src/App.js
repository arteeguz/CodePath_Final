import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import { Link } from 'react-router-dom'
import PostDetails from './pages/PostDetails';
import Footer from './components/Footer';  

const App = () => {
  const element = useRoutes([
    {
      path: "/",
      element:<ReadPosts/>
    },
    {
      path:"/edit/:id",
      element: <EditPost />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    { path: '/post/:id', 
      element: <PostDetails  /> 
    }
  ]);

  return (
    <div className="App">
      <div className="header">
        <h1>Neighborhood Threads & Listings</h1>
        <Link to="/"><button className="headerBtn">Home</button></Link>
        <Link to="/new"><button className="headerBtn">New Post</button></Link>
      </div>
      {element}
      <Footer /> 
    </div>
  );
}

export default App;