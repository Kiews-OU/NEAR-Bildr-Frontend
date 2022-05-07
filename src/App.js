import { Route } from "react-router-dom"
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import './assets/css/style.css'
import { store } from './store'
import { Provider } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import { Home } from "./pages/Home";

function App() {
  return (
    <Provider store={store}>

      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <PrivateRoute exact path="/">
        <Home />
      </PrivateRoute>
    </Provider>
  );
}

export default App;
