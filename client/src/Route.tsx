import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Store from "./Store";
import { Dashboard, Chat } from "./Components/Pages";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/chat/:chatId">
          <Store>
            <Chat />
          </Store>
        </Route>
        <Route path="/users">
          <h1>This is "users" page.</h1>
        </Route>
      </Switch>
    </Router>
  );
};
