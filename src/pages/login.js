import { useContext, useState } from "react";
import { validateSignUp, validLogin } from "../utils/validateAuth";
import NavBar from "../components/header";
import { RootContext } from "../contexts/rootContext";
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const loginFields = [
    {
        placeholder: "Enter Email",
        name: 'email',
        type: 'text'
    },
    {
        placeholder: "Enter Password",
        name: 'password',
        type: 'text'
    },
]

const signUpFields = [
    ...loginFields,
    {
        placeholder: "Enter confirm Password",
        name: 'confirmPassword',
        type: 'text'
    },
    {
        placeholder: "Enter your name",
        name: 'name',
        type: 'text'
    },
    {
        placeholder: "Enter your age",
        name: 'age',
        type: 'number'
    },
    {
        placeholder: "Enter Phone number",
        name: 'phone',
        type: 'text'
    },

]

export default function Login() {

    const [state, setState] = useState({
        login: true,
        showPasswords: false,
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        age: 0,
        phone: "",
        gender: 'Male',
        errors: []
    })

    const { axiosConfig, user, updateUser } = useContext(RootContext)

    const [cookies, setCookies, removeCookie] = useCookies(['cookie-name'])
    const navigate = useNavigate()

    const switchAction = () => setState({ ...state, login: !state.login, errors: [] })
    const switchShowPassword = () => setState({ ...state, showPasswords: !state.showPasswords })
    const handleInputs = (e) => {
        let errors = []
        const { email, password, confirmPassword, name, phone, age, login } = state;
        if (
            (email && password && login) ||
            (email && password && confirmPassword && name && phone && age && !login)
        ) {
            errors = validInputs();
        }
        setState({
            ...state,
            [e.target.name]: e.target.value,
            errors
        })
    }

    const validInputs = () => {
        const { email, password, confirmPassword, name, phone, age, login } = state;
        if (login) return validLogin(email, password)
        if (!login) return validateSignUp(email, password, confirmPassword, name, age, phone)
    }

    const loginOrSignUp = async () => {
        const { email, password, name, phone, age, login, gender } = state;
        const errors = validInputs();
        if (errors.length) return setState({ ...state, errors })
        try {
            await setState({ ...state, error: [] })
            if (login) {
                const { data: loggedInUser } = await axiosConfig().post('/api/users/login', { email, password })
                for (let field in loggedInUser) {
                    setCookies(field, loggedInUser[field], { path: "/" })
                }
                const { isAdmin, _id, activeTickets, notifications, token } = loggedInUser
                updateUser({
                    ...user,
                    isAdmin,
                    _id,
                    activeTickets,
                    notifications,
                    email: loggedInUser.email,
                    name: loggedInUser.name
                })
                navigate("/dashboard")
            }
            if (!login) {
                const { data: signedUpUser } = await axiosConfig()
                    .post(
                        "/api/users/signUp",
                        { email, name, age, gender, phone, password }
                    )
                for (let field in signedUpUser) {
                    setCookies(field, signUpFields[field], { path: "/" })
                }
                switchAction()
            }
        } catch (err) {
            console.log('auth error: ', err)
            
            toast('Auth Error')
        }
    }

    return <main className=" bg-slate-100 h-screen min-h-screen">
        <NavBar />
        <div className="flex justify-center items-center min-h-full">

            <div className="m-2 sm:m-2 md:m-6 lg:m-10 lg:w-1/2 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-2xl pb-2">{state.login ? 'Login' : "Sign Up"}</p>
                <div>
                    {(state.login ? loginFields : signUpFields)
                        .map(({ name, placeholder, type }, index) => {
                            type = ['password', 'confirmPassword'].includes(name) && !state.showPasswords
                                ? 'password' : type
                            return <input
                                key={index}
                                placeholder={placeholder}
                                onChange={handleInputs}
                                name={name}
                                type={type}
                                className="border-black border-solid border-2 border-opacity-50 outline-none my-3 p-2 w-full h-12 rounded-md" />
                        })}
                </div>

                {!state.login &&
                    <div className="my-3"><label>Choose Gender</label>
                        <div className="flex items-center justify-between w-40" value={state.gender}>
                            <label>Male</label>
                            <input type='radio' value='Male' checked={state.gender === "Male"} name="gender" onChange={handleInputs} />
                            <label>Female</label>
                            <input type='radio' value='Female' checked={state.gender === "Female"} name="gender" onChange={handleInputs} />
                        </div>
                    </div>
                }

                <div>
                    {state.errors.map((_error, _index) => {
                        return <p key={_index} className="text-red-500">{_error}</p>
                    })}
                </div>

                <div className="flex flex-wrap justify-between items-center">
                    <div>
                        <button
                            className="bg-slate-300 p-2 rounded-sm shadow-md  my-2"
                            onClick={switchAction}>
                            {state.login
                                ? "Please click here to create a new account if you don't already have!"
                                : "If you already have an account, click here to login!"}
                        </button>
                        <button
                            className={`${!state.showPasswords ? 'bg-red-300' : 'bg-green-300 '} rounded-sm shadow-md p-2 outline-none my-2 md:ml-2`}
                            onClick={switchShowPassword}
                        >{state.showPasswords ? 'Hide Passwords' : 'Show Passwords'}</button>
                    </div>
                    <button
                        onClick={loginOrSignUp}
                        className="bg-blue-500 text-white font-bold p-2 rounded">
                        {state.login ? 'Login' : "SignUp"}
                    </button></div>
            </div>
        </div>
        <ToastContainer
            position="top-right"
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
    </main >
}