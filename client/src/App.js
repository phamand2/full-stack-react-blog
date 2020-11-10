import './App.css';
import Posts from './components/Posts';
import { Container, Header, Segment } from 'semantic-ui-react'
import {Switch, Route, Link} from 'react-router-dom'
import PostDetail from './components/PostDetail';
import Comments from './components/Comments';

function App() {

  

  return (
    <Container>
      <Segment vertical>
        <Switch>
          <Route path='/' exact component={Posts} />
          <Route path='/posts/:postId' exact component={PostDetail} />
          {/* <Route path='/posts/:postId/comments' component={Comments} /> */}
          <Route>
            <Segment vertical textAlign='center'>
              <Header>404 - Page not found</Header>
              <Link to='/'>Click here to return home</Link>
            </Segment>
          </Route>
        </Switch>
      </Segment>
    </Container>
  );
}

export default App;
