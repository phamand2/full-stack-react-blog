import './App.css';
import Posts from './components/Posts';
import { Container, Header, Segment } from 'semantic-ui-react'
import {Switch, Route, Link, NavLink, Redirect} from 'react-router-dom'
import PostDetail from './components/PostDetail';
import React, { useState } from 'react';
import Home from './components/Home';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Container>
      <ul>
        <li><NavLink to="/home">Home</NavLink></li>
        { loggedIn && (
          <>
          <li><NavLink to="/posts">Posts</NavLink></li>
          </>
        )}
        { loggedIn
          ? (<li><button onClick={() => {setLoggedIn(false)}}>Log Out</button></li>)
          : (<li><button onClick={() => {setLoggedIn(true)}}>Log In</button></li>)
        }
        {
          !loggedIn ? <Redirect to='/home' /> : ''
        }
      </ul>

      <Segment vertical>
        <Switch>
          <Route path='/home' exact component={Home} />
          <Route path='/posts' exact component={Posts}  />
          <Route path='/posts/:postId' exact component={PostDetail} />
          <Route>
            <Segment vertical textAlign='center'>
              <Header>404 - Page not found</Header>
              <Link to='/'>Click here to return home</Link>
            </Segment>
          </Route>
          <Route>
          <Redirect to="/home" />
        </Route>
        </Switch>
      </Segment>
    </Container>
  );
}

export default App;
