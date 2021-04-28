import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import Profile from './views/Profile';
import Logout from './views/Logout';
import {MediaProvider} from './contexts/MediaContext';
import {Container} from '@material-ui/core';
import MyBlogPosts from './views/MyBlogPosts';
import Modify from './views/Modify';
import BlogSingle from './views/BlogSingle';
import MeetingsSingle from './views/MeetingsSingle';
import FundingsSingle from './views/FundingsSingle';
import BlogUpload from './views/BlogUpload';
import MeetingsUpload from './views/MeetingsUpload';
import FundingsUpload from './views/FundingsUpload';

import Meetings from './views/Meetings';
import Fundings from './views/Fundings';

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
              <Route path="/fundings" exact component={Fundings}/>
              <Route path="/profile" component={Profile}/>
              <Route path="/blogsingle" component={BlogSingle}/>
              <Route path="/meetingssingle" component={MeetingsSingle}/>
              <Route path="/fundingssingle" exact component={FundingsSingle}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/blogupload" component={BlogUpload}/>
              <Route path="/meetingsupload" component={MeetingsUpload}/>
              <Route path="/fundingsupload" component={FundingsUpload}/>
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
