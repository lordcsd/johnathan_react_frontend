import { ShoppingCart } from "@mui/icons-material"
import { useContext } from "react"
import { RootContext } from "../contexts/rootContext"
import useTickets from "../hooks/useTickets"

function TicketCard({ details, idInCart, addToCart, removeFromCart }) {
    const { _id, title, desc, price, availability, duration, imageUrl } = details
    return <div className="rounded-md bg-white">
        <div>
            <img src={imageUrl} className="w-full h-60 object-cover rounded-t-md" alt={title} />
        </div>
        <div className=" p-3">
            <div className="flex text-xs items-center justify-between">
                <div className="flex">
                    <div className="p-2 bg-slate-100 mr-1 rounded text-slate-700">
                        <p>Price: </p>    <b>₦{price}</b>
                    </div>
                    <div className="p-2 bg-slate-100 mr-1 rounded text-slate-700">
                        <p>Available:</p> <b>{availability} Spaces</b>
                    </div>
                    <div className="p-2 bg-slate-100 mr-1 rounded text-slate-700">
                        <p>Duration:</p> <b>{duration} days</b>
                    </div>
                </div>
                <ShoppingCart
                    onClick={() => idInCart ? removeFromCart(_id) : addToCart(details)}
                    className={`m-2
                ${!idInCart && 'text-slate-500'}
                ${idInCart && 'text-green-600'}
                `} />
            </div>
            <div className="">
                <p className="text-2xl font-bold">{title}</p>
                <p>{desc}</p>
            </div>
        </div>
    </div>
}

export default function Tickets() {
    const { data, isError, loading } = useTickets()


    const tickets = data?.data?.tickets || []

    const {
        axiosConfig,
        userCart,
        addToCart,
        removeFromCart
    } = useContext(RootContext)

    const idsInCart = userCart.map(ticket => ticket._id)

    return <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-3">
        {
            tickets &&
            tickets.map((_ticket, _index) =>
                <TicketCard
                    key={_index}
                    details={_ticket}
                    idInCart={idsInCart.includes(_ticket._id)}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            )
        }
    </div>
}