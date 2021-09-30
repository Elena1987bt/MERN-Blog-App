import { useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import { useAppContext } from '../../context/context';
import './settings.css';

const Settings = () => {
  const [{ user }, dispatch] = useAppContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(undefined);
  const [success, setSuccess] = useState(false);
  const PF = 'https://node-mern-blog-app.herokuapp.com/public/uploads/';
  const url = 'https://node-mern-blog-app.herokuapp.com/api';
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOADING' });
    const updatedUser = { userId: user._id, username, email, password };
    // console.log(file);

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updatedUser.profilePic = filename;
      // console.log(updatedUser);
      try {
        const res = await axios.post(`${url}/posts/uploads`, data);
        // console.log(res);
      } catch (err) {
        console.error('Error ', err);
      }
    }
    try {
      const res = await axios.put(`${url}/users/${user._id}`, updatedUser);
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data.user });
      setSuccess(true);
    } catch (err) {
      dispatch({ type: 'ERROR' });
      console.error(err);
    }
  };
  // DELETE ACCOUNT
  const deleteAccount = async () => {
    dispatch({ type: 'LOADING' });
    try {
      await axios.delete(`${url}/users/${user._id}`, {
        data: { userId: user._id },
      });
      dispatch({ type: 'DELETE_SUCCESS', payload: null });
      alert('Your account has been deleted!');
      window.location.replace(`${url}/posts`);
    } catch (err) {
      dispatch({ type: 'ERROR' });
      console.error(err);
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" onClick={deleteAccount}>
            Delete Account
          </span>
        </div>
        <form
          className="settingsForm"
          onSubmit={handleSubmit}
          autocomplete={false}
        >
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={
                !user.profilePic
                  ? 'https://www.seekpng.com/png/full/428-4287240_no-avatar-user-circle-icon-png.png'
                  : PF + user.profilePic
              }
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'none' }}
              className="settingsPPInput"
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user?.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user?.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="text"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
