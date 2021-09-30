import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import SinglePagePost from '../../components/singlePagePost/SinglePagePost';
import './singlePage.css';

const SinglePage = () => {
  const { postId } = useParams();
  // console.log(postId);
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const url = 'https://node-mern-blog-app.herokuapp.com/api';
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${url}/posts/${postId}`);
        setPost(response.data.post);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [postId]);
  console.log(post);
  return (
    <div className="singlePage">
      {loading ? (
        <h1 style={{ margin: '100px auto' }}>Loading</h1>
      ) : (
        <SinglePagePost post={post} />
      )}
      <Sidebar />
    </div>
  );
};

export default SinglePage;
