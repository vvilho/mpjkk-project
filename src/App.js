import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import Profile from './views/Profile';
import BlogSingle from './views/BlogSingle';
import Logout from './views/Logout';
import BlogUpload from './views/BlogUpload';
import {MediaProvider} from './contexts/MediaContext';
import {Container} from '@material-ui/core';
import MyBlogPosts from './views/MyBlogPosts';
import Modify from './views/Modify';
import MeetingsSingle from './views/MeetingsSingle';
import MeetingsUpload from './views/MeetingsUpload';
import Meetings from './views/Meetings';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MediaProvider>
        <Container maxWidth="md">
          <Nav />
          <main style={{marginTop: 80, marginBottom: 40}}>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/meetings" exact component={Meetings}/>
              <Route path="/profile" component={Profile}/>
              <Route path="/blogsingle" component={BlogSingle}/>
              <Route path="/meetingssingle" component={MeetingsSingle}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/blogupload" component={BlogUpload}/>
              <Route path="/meetingsupload" component={MeetingsUpload}/>
              <Route path="/myblogposts" component={MyBlogPosts}/>
              <Route path="/modify" component={Modify}/>
            </Switch>
          </main>
        </Container>
      </MediaProvider>
    </Router>
  );
};

export default App;
