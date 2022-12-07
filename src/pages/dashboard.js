import { useCookies } from "react-cookie"
import { useState } from "react"
import AccountSetting from "../components/accountSetting"
import Header from "../components/header"
import Overview from "../components/overview"
import UserActiveTickets from "../components/userActiveTickets"
import Tickets from "../components/tickets"
import UserCart from "../components/userCart"

const generalViews = {
    'Overview': <Overview />,
    "Account Setting": <AccountSetting />,
    "Tickets": <Tickets />
}


const adminViews = {
    ...generalViews,
}

const touristViews = {
    ...generalViews,
    "Cart": <UserCart />,
    "My Tickets": <UserActiveTickets />,
}

export default function Dashboard() {
    const [state, setState] = useState({
        presentScreen: "My Tickets"
    })

    const [cookies, setCookir, removeCookie] = useCookies(['cookie-name'])

    const subComponents = cookies['isAdmin'] === 'true' ? adminViews : touristViews;

    const presentScreen = subComponents[state.presentScreen]

    return <div className="bg-slate-200 min-h-screen">
        <Header showLoginButton={false} showLogout={true} />
        <nav className="flex justify-center flex-wrap bg-slate-700 ">
            {
                Object.keys(subComponents)
                    .map((_key, _index) =>
                        <button
                            key={_index}
                            onClick={() => setState({ ...state, presentScreen: _key })}
                            className={`p-1 m-1
                             ${state.presentScreen === _key
                                    ? "bg-green-500 text-white"
                                    : "bg-white text-slate-700"}
                                text-xs rounded-sm 
                             `}
                        >
                            {_key}
                        </button>
                    )
            }
        </nav>
        <section className="p-3 ">{presentScreen}</section>
    </div>
}