import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomeRouter from "./components/HomeRouter";
import reducer from "./components/reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";
import './index.css'

const initValue = {
  authentication: {},
  userData: {}
};

const store = createStore(reducer, initValue);

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <HomeRouter />
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
