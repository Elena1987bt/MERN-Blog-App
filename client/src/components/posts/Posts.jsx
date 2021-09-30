import React from 'react';
import SinglePost from '../singlePost/SinglePost';
import './posts.css';

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.length === 0 ? (
        <h1 style={{ margin: '0 auto' }}>No posts found</h1>
      ) : (
        posts.map((post) => <SinglePost post={post} key={post._id} />)
      )}
    </div>
  );
};

export default Posts;
