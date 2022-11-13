import { useState } from "react";
import { RootContext } from "./contexts/rootContext";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import DashBoard from "./pages/dashboard"
import axios from "axios";
import { CookiesProvider, useCookies } from "react-cookie"
import { baseURL } from "./common/constants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <DashBoard />
  },
]);

function App() {
  const [state, setState] = useState({
    userCart: [],
    bearerToken: "",
    user: {
      "isAdmin": false,
      "_id": "",
      "name": "",
      "email": "",
      "activeTickets": [],
      "notifications": []
    }
  })

  const [cookies] = useCookies(['cookie-name'])

  let axiosConfig = () => axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${cookies['token'] || ""}`,
    },
  })

  const user = state.user
  const updateUser = async (details) => {
    await setState({ ...state, user: details })
  }

  return (

    <CookiesProvider>
      <RootContext.Provider
        value={{ axiosConfig, user, updateUser }}>
        <RouterProvider router={router} />
      </RootContext.Provider>
    </CookiesProvider>
  );
}

export default App;
