import { useState } from "react";
import { useCookies } from "react-cookie";
import ReactModal from "react-modal";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ showLoginButton, showLogout }) {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name'])
    const [state, setState] = useState({
        showModal: false
    })

    const navigate = useNavigate()
    const toggleModal = () => setState({ ...state, showModal: !state.showModal })

    const logout = () => {
        for (let field in cookies) {
            removeCookie(field)
        }
        navigate('/login')
    }

    return <nav className="bg-white">
        <ReactModal
            isOpen={state.showModal}
            onRequestClose={toggleModal}
            contentLabel="Example Modal"
            ariaHideApp={false}>
            <div className="h-full flex flex-col justify-around">

                <h1 className="text-5xl text-slate-700 text-center">
                    Are you sure you want logout?
                </h1>

                <div className="flex justify-around">
                    <button
                        onClick={logout}
                        className="bg-red-600 ml-3 text-white p-2 rounded font-bold w-20">Yes</button>

                    <button
                        className="bg-green-600 ml-3 text-white p-2 rounded font-bold w-20"
                        onClick={toggleModal}>

                        Cancel
                    </button>
                </div>
            </div>
        </ReactModal>
        <div className="flex justify-between p-4 items-center">
            <Link to='/'>
                <h1 className="font-extrabold text-xl text-slate-700">Tourist-App</h1>
            </Link>
            <div className="flex">
                <div className={`${showLoginButton ? "" : 'hidden'}`}>
                    <Link to='/login'>
                        <button className="bg-blue-500 text-white font-bold p-2 rounded">
                            login
                        </button>
                    </Link>

                </div>
                <div className={`${showLogout ? "" : 'hidden'}`}>
                    <button
                        onClick={toggleModal}
                        className="bg-red-500 text-white font-bold p-2 rounded">
                        Logout
                    </button>
                </div>
            </div>

        </div>
    </nav>
}