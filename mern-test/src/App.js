import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css';

import AuthorList from '../src/component/authorList.component';
import AuthorDetail from './component/authorDetail.component';
import PostDetail from './component/postDetail.component';
import TopLiked from './component/topLiked.component';
import TopCommented from './component/topCommented.component';

function App() {
  const { loading } = useSelector(state => state.setting);
  return (
    <Router>
      <div className="App">

        <div className="outer">
          <div className="inner">
            <Switch>
              <Route exact path='/' component={AuthorList} />
              <Route path="/author_detail/:detail_id" component={AuthorDetail} />
              <Route path="/post_detail/:post_id" component={PostDetail} />
              <Route path="/top_liked" component={TopLiked} />
              <Route path="/top_commented" component={TopCommented} />
            </Switch>
          </div>
        </div>
        {
          loading && (
            <div className="d-flex justify-content-center loader">
              <div className="mask"></div>
              <div style={{ display: 'inline-block', position: "absolute", top: "50%", textAlign: 'center', zIndex: 4 }}>
                <div className="spinner-border" role="status" style={{ color: "#673AB7" }}>
                </div>
                <br />
                <span style={{ fontFamily: 'Montserrat-Regular', fontSize: '16px' }}>Loading</span>
              </div>
            </div>
          )
        }
      </div>
    </Router>
  );
}

export default App;
