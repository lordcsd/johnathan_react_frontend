import { Link } from "react-router-dom";

export default function NavBar({showLoginButton}) {
    return <nav className="bg-white">

        <div className="flex justify-between p-4 items-center">
            <h1 className="font-extrabold text-xl text-slate-700">Tourist-App</h1>
            <div className={`${!showLoginButton && 'opacity-0'}`}>
                <Link to='/login'>
                    <button className="bg-blue-500 text-white font-bold p-2 rounded">
                        login
                    </button>
                </Link>
            </div>

        </div>
        <div className="h-2 bg-black shadow-md"></div>
    </nav>
}