import { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../context/context';
import './writePostPage.css';

const WritePostPage = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(undefined);
  const [{ user }, dispatch] = useAppContext();

  const url = 'https://node-mern-blog-app.herokuapp.com/api';
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { username: user.username, title, desc };
    // console.log(file);
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.image = filename;
      // console.log(newPost);
      try {
        const res = await axios.post(`${url}/posts/uploads`, data);
        console.log(res);
      } catch (err) {
        console.error('Error ', err);
      }
    }
    try {
      const res = await axios.post(`${url}/posts`, newPost);
      console.log(res);
      window.location.replace(`post/` + res.data.post._id);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="write">
      {file ? (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      ) : (
        <img
          className="writeImg"
          src="https://images.pexels.com/photos/8250914/pexels-photo-8250914.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
        />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            autoFocus={true}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            type="text"
            autoFocus={true}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default WritePostPage;
