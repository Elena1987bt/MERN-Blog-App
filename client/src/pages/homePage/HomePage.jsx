import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import './homePage.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [loading, setLoading] = useState(false);

  const url = 'https://node-mern-blog-app.herokuapp.com/api/posts';
  console.log(search);
  useEffect(() => {
    let fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url}${search}`);
        setPosts(response.data.posts);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [search]);

  // console.log(posts);
  return (
    <>
      <Header />
      <div className="home">
        {loading ? (
          <h1 style={{ margin: '0 auto' }}>Loading...</h1>
        ) : (
          <Posts posts={posts} />
        )}
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
