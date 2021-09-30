import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const url = 'https://node-mern-blog-app.herokuapp.com/api';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/categories`);
        setCategories(response.data.categories);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  // console.log(categories);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link className="link" to={`/`}>
              ALL
            </Link>
          </li>

          {categories.map((category) => (
            <li className="sidebarListItem" key={category._id}>
              <Link className="link" to={`/?category=${category.name}`}>
                {category.name.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
