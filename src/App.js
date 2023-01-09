import logo from './logo.svg';
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import login from './views/Login/Login'
import index from './views/Index/index'
import newArticle from './views/NewArticle/newArticle'
import setting from './views/Setting/Setting'
import profile from './views/Profile/profile'
import './App.css';
import Signup from './views/SignUp/Signup';

export default function App(){
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path="/index" component={index}></Route>
          <Route path="/login" component={login}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/setting" component={setting}></Route>
          <Route path="/profile" component={profile}></Route>
          <Route path="/newArticle" component={newArticle}></Route>
          <Redirect from='/' to='/index'></Redirect>
        </Switch>
      </HashRouter>
    </div>
  );
}

