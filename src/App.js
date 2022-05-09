import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import './assets/css/style.css'
import { store } from './store'
import { Provider } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import AuthRoute from "./AuthRoute";
import { Home } from "./pages/Home";
import { SearchCourse } from "./pages/SearchCourse";

function App() {
  return (
    <Provider store={store}>
      <AuthRoute path="/login">
        <Login />
      </AuthRoute>
      <AuthRoute path="/register">
        <Register />
      </AuthRoute>
      <PrivateRoute path="/search-courses/:query">
        <SearchCourse />
      </PrivateRoute>
      <PrivateRoute exact path="/">
        <Home />
      </PrivateRoute>
    </Provider>
  );
}

export default App;
