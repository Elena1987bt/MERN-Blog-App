import './topbar.css';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/context';

const TopBar = () => {
  const [{ user }, dispatch] = useAppContext();
  const PF = 'https://node-mern-blog-app.herokuapp.com/public/uploads/';
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-f"></i>
        <i className="topIcon fab fa-twitter"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li
            className="topListItem"
            onClick={() =>
              dispatch({
                type: 'LOG_OUT',
                payload: null,
              })
            }
          >
            {user && 'LOG OUT'}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings" className="link">
            <img
              src={
                user.profilePic
                  ? PF + user.profilePic
                  : 'https://www.seekpng.com/png/full/428-4287240_no-avatar-user-circle-icon-png.png'
              }
              alt="Profile"
              className="topImg"
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
};

export default TopBar;
