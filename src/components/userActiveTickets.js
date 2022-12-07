import { useCookies } from "react-cookie";
import useUserTickets from "../hooks/useUserTickets";
import { useState, useEffect } from "react";

const ActiveTicket = ({
  _id,
  title,
  desc,
  price,
  duration,
  date,
  paid_at,
  imageUrl,
}) => {
  const expires = new Date(+new Date(paid_at) + 1000 * 60 * 60 * 24 * duration);

  const bought_on = new Date(paid_at).toDateString();

  return (
    <div className="flex bg-white p-2 rounded">
      <div className="flex justify-center w-1/3 ">
        <img
          src={imageUrl}
          className="h-full object-cover w-full h-40 rounded"
          alt={title}
        />
      </div>
      <div className="ml-2 flex flex-col items-between justify-between text-xs w-2/3">
        <div className="w-1/2">
          <p className="font-bold">{title}</p>
          <p className="">{desc}</p>
        </div>
        <div className="w-1/2">
          <p>
            Duration: <b>{duration} days</b>
          </p>
          <p>
            Price: <b>N {price}</b>
          </p>
          <p>
            Bought on: <b>{bought_on}</b>
          </p>
          <p>
            Expires on:{" "}
            <b
              className={
                +expires > +new Date() ? "text-green-500" : "text-red-500"
              }
            >
              {expires.toDateString()}
            </b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function UserActiveTickets() {
  const paymentStates = { active: "ACTIVE", expired: "EXPIRED", all: "ALL" };

  const [state, setState] = useState({
    paymentStatus: paymentStates.all,
    tickets: [],
  });

  const [cookies] = useCookies(["cookie-name"]);
  const { _id } = cookies;
  const { data, isError, isLoading } = useUserTickets(_id);

  const filterData = (paymentStatus) => {
    if (data && data.payments) {
      let tickets = [];
      for (const payment of data.payments) {
        tickets = tickets
          .concat(payment.tickets)
          .map((ticket) => ({ ...ticket, paid_at: payment.paid_at }))
          .filter((ticket) => {
            const { duration, paid_at } = ticket;
            console.log({ paymentStatus });
            if (paymentStatus === paymentStates.active) {
              return (
                +new Date(paid_at) + 1000 * 60 * 60 * 24 * duration >
                +new Date()
              );
            }
            if (paymentStatus === paymentStates.expired) {
              return (
                +new Date(paid_at) + 1000 * 60 * 60 * 24 * duration <
                +new Date()
              );
            }
            return true;
          });
      }
      setState({ ...state, tickets, paymentStatus });
    }
  };

  useEffect(() => filterData(state.paymentStatus), [data]);

  const switchPaymentStateFilter = (e) => {
    const { name } = e.target;
    filterData(paymentStates[name.toLowerCase()]);
  };

  let tickets = [];

  return (
    <div>
      {isLoading && <p>My tickets loading....</p>}
      {isError && <p>Error getting tickets</p>}
      {data && data.payments.length === 0 && (
        <div>
          <p>Sorry You do not have any active tickts</p>
        </div>
      )}

      {data && data.payments.length > 0 && (
        <div className="h-10 flex justify-center mb-2">
          <button
            className="bg-red-500 rounded-sm h-10 mx-1 text-white text-xs w-12 p-1"
            name={paymentStates.expired}
            onClick={switchPaymentStateFilter}
          >
            Expired
          </button>
          <button
            className="bg-green-500 rounded-sm h-10 mx-1 text-white text-xs w-12 p-1"
            name={paymentStates.active}
            onClick={switchPaymentStateFilter}
          >
            Active
          </button>
          <button
            className="bg-yellow-500 rounded-sm h-10 mx-1 text-white text-xs w-12 p-1"
            name={paymentStates.all}
            onClick={switchPaymentStateFilter}
          >
            All
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.tickets.map((ticket, index) => (
          <ActiveTicket {...ticket} key={index} />
        ))}
      </div>
    </div>
  );
}
