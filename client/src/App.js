import React from 'react';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MyPost from './pages/MyPost'
import Members from './pages/Members'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import UserPage from './pages/UserPage';
import SetAvatar from './pages/SetAvatar';
import PostDetail from './pages/PostDetail'

class App extends React.Component {

  render(){
    return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}></Route> 
          <Route path="/user/:username" component={UserPage}></Route>
          <Route path="/setavatar/:username" component={SetAvatar}></Route>
          <Route path="/mypost" component={MyPost}></Route>
          <Route path="/post/:pid" component={PostDetail}></Route>
          <Route path="/members" component={Members}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/signin" component={SignIn}></Route>
        </Switch>
      </div>
    </Router>
  );
  }
  
}

export default App;
