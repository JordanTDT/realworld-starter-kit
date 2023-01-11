import logo from './logo.svg';
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import login from './views/Login/Login'
import index from './views/Index/index'
import newArticle from './views/NewArticle/newArticle'
import setting from './views/Setting/Setting'
import profile from './views/Profile/profile'
import './App.css';
import signup from './views/SignUp/Signup';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
export default function App(){
  return (
    <div className="App">
    <QueryClientProvider client={queryClient}>
    <HashRouter>
        <Switch>
          <Route path="/index" component={index}></Route>
          <Route path="/login" component={login}></Route>
          <Route path="/signup" component={signup}></Route>
          <Route path="/setting" component={setting}></Route>
          <Route path="/profile" component={profile}></Route>
          <Route path="/newArticle" component={newArticle}></Route>
          <Redirect from='/' to='/index'></Redirect>
        </Switch>
      </HashRouter>
    </QueryClientProvider>
     
    </div>
  );
}

