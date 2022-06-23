import React from 'react'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import Index from './pages/Index/Index'
import './App.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Setting from './pages/Setting/Setting'
import UserInfo from './pages/UserInfo/UserInfo'
import CreatArticle from './pages/CreatArticle/CreatArticle'

export default function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/index" component={Index}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/setting" component={Setting}></Route>
          <Route path="/user" component={UserInfo}></Route>
          <Route path="/newArticle" component={CreatArticle}></Route>
          <Redirect from='/' to='/index'></Redirect>
        </Switch>
      </HashRouter>
    </div>
  )
}
