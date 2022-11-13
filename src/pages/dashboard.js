import { useCookies } from "react-cookie"
import { useState } from "react"
import AccountSetting from "../components/accountSetting"
import Header from "../components/header"
import Overview from "../components/overview"

const generalViews = {
    'Overview': <Overview />,
    "Account Setting": <AccountSetting />
}


const adminViews = {
    ...generalViews
}

const touristViews = {
    ...generalViews
}

export default function Dashboard() {
    const [state, setState] = useState({
        presentScreen: "Account Setting"
    })

    const [cookies, setCookir, removeCookie] = useCookies(['cookie-name'])

    const subComponents = cookies['isAdmin'] ? adminViews : touristViews;

    const presentScreen = subComponents[state.presentScreen]

    return <div className="bg-slate-200 min-h-screen">
        <Header showLoginButton={false} showLogout={true} />
        <nav className="flex justify-center bg-slate-700 ">
            {
                Object.keys(subComponents)
                    .map((_key, _index) =>
                        <button
                            key={_index}
                            onClick={() => setState({ ...state, presentScreen: _key })}
                            className={`p-2 m-1
                             ${state.presentScreen === _key
                                    ? "bg-green-500 text-white"
                                    : "bg-white text-slate-700"}
                                    text-lg rounded-md font-bold
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