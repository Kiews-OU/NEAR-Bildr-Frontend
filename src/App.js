import { Route } from "react-router-dom"
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import './assets/css/style.css'
import { store } from './store'
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
    </Provider>
  );
}

export default App;
