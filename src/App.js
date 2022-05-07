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
      <PrivateRoute path="/">
        <Home />
      </PrivateRoute>
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
    </Provider>
  );
}

export default App;
