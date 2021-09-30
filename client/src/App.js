import { useEffect } from 'react';
import TopBar from './components/topbar/TopBar';
import HomePage from './pages/homePage/HomePage';
import SinglePage from './pages/singlePage/SinglePage';
import WritePostPage from './pages/writePostPage/WritePostPage';
import Settings from './pages/settingsPage/Settings';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { useAppContext } from './context/context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [{ user }, dispatch] = useAppContext();
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  console.log(user);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/posts">
          <HomePage />
        </Route>
        <Route path="/write">{user ? <WritePostPage /> : <Login />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Login />}</Route>
        <Route path="/login">{user ? <HomePage /> : <Login />}</Route>
        <Route path="/register">{user ? <HomePage /> : <Register />}</Route>
        <Route path="/post/:postId">
          <SinglePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
