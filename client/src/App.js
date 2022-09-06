import { Route, Switch } from "react-router-dom"

import Landing from "./components/Landing/Landing";
import Cards from "./components/Cards/Cards"
import Details from "./components/Details/Details";
import Create from "./components/Create/Create"

import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/games" component={Cards} />
      <Route path="/games/:id" component={Details} />
      <Route exact path="/create" component={Create} />
    </Switch>
  );
}

export default App;
