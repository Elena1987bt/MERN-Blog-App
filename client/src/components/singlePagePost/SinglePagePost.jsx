import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../../context/context';
import './singlePagePost.css';

const SinglePagePost = ({ post }) => {
  const [{ user }, dispatch] = useAppContext();
  const PF = 'https://node-mern-blog-app.herokuapp.com/public/uploads/';
  const url = 'https://node-mern-blog-app.herokuapp.com/api';
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [updateMode, setUpdateMode] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace(`/posts`);
    } catch (err) {
      console.error(err);
    }
  };
  const handleUpdate = async () => {
    try {
      await axios.put(`${url}/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(true);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.image ? (
          <img className="singlePostImg" src={PF + post.image} alt="" />
        ) : (
          <img
            className="singlePostImg"
            src="https://images.pexels.com/photos/8250914/pexels-photo-8250914.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt=""
          />
        )}
        {updateMode ? (
          <input
            type="text"
            autoFocus
            value={title}
            placeholder={post.title}
            className="singlePostTitleInput"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post.title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?username=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()} </span>
          {updateMode && (
            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
          )}
        </div>
        {updateMode ? (
          <textarea
            type="text"
            className="singlePostDescInput"
            placeholder={post.desc}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">
            {post.desc}
            <br />
            <br />
          </p>
        )}
      </div>
    </div>
  );
};

export default SinglePagePost;
