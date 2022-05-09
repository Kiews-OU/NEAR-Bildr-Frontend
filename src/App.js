import { Route } from "react-router-dom"
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import './assets/css/style.css'
import { store } from './store'
import { Provider } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import AuthRoute from "./AuthRoute";
import { Home } from "./pages/Home";

function App() {
  return (
    <Provider store={store}>
      <AuthRoute path="/login">
        <Login />
      </AuthRoute>
      <AuthRoute path="/register">
        <Register />
      </AuthRoute>
      <PrivateRoute exact path="/">
        <Home />
      </PrivateRoute>
    </Provider>
  );
}

export default App;
