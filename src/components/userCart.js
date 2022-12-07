import { useContext, useState } from "react";
import { RootContext } from "../contexts/rootContext";
import ReactModal from "react-modal";
import { PaystackButton } from "react-paystack";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { configConstants } from "../common/constants";
import { Check } from "@mui/icons-material";

const ActionsEnum = {
  CLEAR_CART: "CLEAR_CART",
};

export default function UserCart() {
  const { axiosConfig, userCart, clearUserCart, removeFromCart } =
    useContext(RootContext);

  const [cookies, setCookies, removeCookie] = useCookies(["cookie-name"]);
  const { name, email, phone, _id } = cookies;

  const [state, setState] = useState({
    promptOpen: false,
    promptPurpose: null,
    ticketIds: [],
    totalCost: 0,
  });

  useEffect(() => {
    setState({
      ...state,
      ticketIds: !userCart ? [] : userCart.map((ticket) => ticket._id),
      totalCost: userCart.length
        ? userCart
            .map((ticket) => ticket.price)
            .reduce((acc, price) => acc + price)
        : 0,
    });
  }, [userCart]);

  const toggleModal = (promptPurpose) => {
    setState({ ...state, promptOpen: !state.promptOpen, promptPurpose });
  };

  const paymentDetails = () => {
    return {
      email,
      amount: state.totalCost * 100, //in naira
      metadata: {
        name,
        phone,
        userId: _id,
        ticketIds: state.ticketIds,
      },
      publicKey: configConstants.paystack.test.publicKey,
      text: "Checkout Tour Tickets",
      onSuccess: () =>
        alert("Thanks for doing business with us! Come back soon!!"),
      onClose: () => alert("Wait! You need this oil, don't go!!!!"),
    };
  };

  return (
    <div>
      {userCart.map((ticket, index) => {
        const { title, desc, price, _id } = ticket;
        console.log({ ticket });
        return (
          <div key={index} className="bg-white p-2 mb-2 rounded-md">
            <div className="flex justify-between">
              <p className="text-xl font-bold">{title}</p>
              <p>N{price}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>{desc}</p>
              <button
                className="text-sm border border-red-500 text-red-500 rounded p-1"
                onClick={() => removeFromCart(_id)}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
      {userCart.length > 0 && (
        <div className="rounded bg-slate-700 p-2 text-white flex justify-between">
          <p>Total</p>
          <p>{state.totalCost}</p>
        </div>
      )}
      {userCart.length > 0 && (
        <div className="  text-white flex justify-end">
          <button
            onClick={() => toggleModal(ActionsEnum.CLEAR_CART)}
            className="rounded border border-red-500 text-red-500  mt-2 mr-2 p-1 text-sm"
          >
            Clear cart
          </button>
          <PaystackButton
            {...paymentDetails()}
            className="rounded bg-green-500 mt-2 p-1 text-sm"
          />
        </div>
      )}
      {userCart.length === 0 && (
        <div className="rounded bg-orange-500 p-2 text-white flex justify-between">
          <p>
            Your cart is empty, please go to tickets page and add tickets to
            cart
          </p>
        </div>
      )}

      <ReactModal
        isOpen={state.promptOpen}
        onRequestClose={toggleModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="flex flex-col justify-between h-full text-slate-700">
          <div></div>

          <h1 className="text-3xl text-center">
            {state.promptPurpose === ActionsEnum.CLEAR_CART
              ? "Are you sure you want clear your shopping cart?"
              : ""}
          </h1>
          <div className="flex justify-around">
            <button
              onClick={() => {
                clearUserCart();
                toggleModal(null);
              }}
              className="bg-red-500 text-white p-2 font-bold rounded w-20"
            >
              Yes
            </button>
            <button
              onClick={() => toggleModal(null)}
              className="bg-green-500 text-white p-2 font-bold rounded w-20"
            >
              close
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}
