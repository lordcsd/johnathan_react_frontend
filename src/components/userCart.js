import { useContext } from "react"
import { RootContext } from "../contexts/rootContext"

export default function UserCart() {
    const {
        axiosConfig,
        userCart,
    } = useContext(RootContext)

    const totalCost = userCart.length
        ? userCart
            .map(ticket => ticket.price)
            .reduce((acc, price) => acc + price)
        : 0

    return <div>
        {userCart.map((ticket, index) => {
            const { title, desc, price } = ticket
            return <div
                key={index}
                className="bg-white p-2 mb-2 rounded-md">
                <div className="flex justify-between">
                    <p className="text-2xl font-bold">{title}</p>
                    <p>N{price}</p>
                </div>
                <p>{desc}</p>
            </div>
        })}
        {
            userCart.length > 0 &&
            <div className="rounded bg-slate-700 p-2 text-white flex justify-between">
                <p>Total</p>
                <p>{totalCost}</p>
            </div>
        }
        {
            userCart.length > 0 &&
            <div className="  text-white flex justify-end">
                <button className="rounded bg-green-500 mt-2 p-2">
                    Checkout
                </button>
            </div>
        }
        {
            userCart.length === 0 &&
            <div className="rounded bg-orange-500 p-2 text-white flex justify-between">
                <p>Your cart is empty, please go to tickets page and add tickets to cart</p>
            </div>
        }
    </div>
}