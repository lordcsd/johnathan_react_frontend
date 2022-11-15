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
import { toast, ToastContainer } from "react-toastify";

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

  const { user, userCart } = state
  const updateUser = async (details) => {
    await setState({ ...state, user: details })
  }

  const addToCart = (ticket) => {
    toast(`"${ticket.title}" added to cart`)
    setState({ ...state, userCart: [...state.userCart, ticket] })
  }
  const removeFromCart = async (_id) => {
    const ticketToRemove = state.userCart.find(ticket => ticket._id === _id)
    toast(`"${ticketToRemove.title}" removed from cart`)
    const removedTicket = state.userCart.filter(ticket => ticket._id !== _id)
    setState({ ...state, userCart: removedTicket })
  }

  return (

    <CookiesProvider>
      <RootContext.Provider
        value={{ axiosConfig, user, updateUser, userCart, addToCart, removeFromCart }}>
        <RouterProvider router={router} />
      </RootContext.Provider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </CookiesProvider>
  );
}

export default App;
