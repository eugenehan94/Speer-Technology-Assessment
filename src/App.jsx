/* 
Looks like we can't use hooks b/c React is below 16.8

As per requirements:
1) Activity Feed (simple list of calls) - create component to GET API
2)Activity Detail(detail of a call) 
3)Archive(the final user should be able to archive (and unarchive) a call. 
Archived calls will no longer be displayed on the Activity Feed and 
should have a separate Archived Tab)
*/
import React from "react";
import ReactDOM from "react-dom";

/*Created components imports */
import ActivityFeed from "./components/ActivityFeed.jsx";
import ArchivedCalls from "./components/ArchivedCalls.jsx";
import CallerDetails from "./components/CallerDetails.jsx";
/*React router - use to switch from activity feed, archived calls and individual caller*/
import { HashRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/" component={ActivityFeed}></Route>
          <Route path="/archived" component={ArchivedCalls}></Route>
          <Route path="/caller/:id" component={CallerDetails}></Route>
        </Switch>
      </Router>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
