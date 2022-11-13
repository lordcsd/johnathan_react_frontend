import { useState } from "react";
import { RootContext } from "./contexts/rootContext";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import axios from "axios";
import { CookiesProvider } from "react-cookie"

const baseURL = 'http://localhost:3001/api'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />
  },
]);

function App() {
  const [state, setState] = useState({
    userCart: [],
    bearerToken: ""
  })

  let axiosConfig = () => axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${state.bearerToken}`,
    },
  })

  const setBearerToken = (token) => {
    setState({ ...state, bearerToken: token })
  }

  return (

    <CookiesProvider>
      <RootContext.Provider
        value={{ axiosConfig, setBearerToken, }}>
        <RouterProvider router={router} />
      </RootContext.Provider>
    </CookiesProvider>
  );
}

export default App;
