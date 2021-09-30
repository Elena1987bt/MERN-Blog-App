import { Link } from 'react-router-dom';
import './singlePost.css';

const SinglePost = ({ post }) => {
  const PF = 'https://node-mern-blog-app.herokuapp.com/public/uploads/';

  return (
    <div className="post">
      {post.image ? (
        <img className="singlePostImg" src={PF + post.image} alt="" />
      ) : (
        <img
          className="singlePostImg"
          src="https://images.pexels.com/photos/8250914/pexels-photo-8250914.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
        />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((category) => (
            <span className="postCat">
              <a className="link" href="/posts?cat=Music">
                Music
              </a>
            </span>
          ))}
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
};

export default SinglePost;
