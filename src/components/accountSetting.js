import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { RootContext } from "../contexts/rootContext";

const inputs = [
  {
    placeholder: "Enter Name",
    name: "name",
    type: "text",
  },
  {
    placeholder: "Enter Phone number",
    name: "phone",
    type: "text",
  },
  {
    placeholder: "Enter old Password",
    name: "oldPassword",
    type: "password",
  },
  {
    placeholder: "Enter Password",
    name: "newPassword",
    type: "password",
  },
  {
    placeholder: "Confirm Password",
    name: "confirmPassword",
    type: "password",
  },
];

export default function AccountSetting() {
  const { axiosConfig, user, updateUser } = useContext(RootContext);
  const [cookies, setCookies, removeCookie] = useCookies(["cookie-name"]);

  const [state, setState] = useState({
    _id: cookies["_id"] || "",
    name: cookies["name"] || "",
    phone: cookies["phone"] || "",
    newPassword: "",
    oldPassword: "",
    confirmPassword: "",
    showPassword: false,
    promptPurpose: "DELETE", //UPDATE
    promptOpen: false,
    promptResponse: false,
  });

  const navigate = useNavigate();

  const handleInputs = async (e) => {
    await setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const toggleModal = (e) =>
    setState({
      ...state,
      promptOpen: !state.promptOpen,
      ...(e && { promptPurpose: e.target.name }),
    });

  const deleteAccount = () => {
    toggleModal();
    axiosConfig()
      .post("/api/users/delete")
      .then((res) => {
        navigate("/login");
      })
      .catch((err) =>
        toast("Error Removing account", {
          position: "bottom-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "light",
        })
      );
  };

  const updateAccount = () => {
    toggleModal();
    const { name, age, phone, oldPassword, newPassword, confirmPassword } =
      state;
    if (!name || !phone || !oldPassword || !newPassword || !confirmPassword) {
      return toast("Please complete form", {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
    }
    axiosConfig()
      .patch("/api/users", { name, age, phone, oldPassword, newPassword })
      .then((res) => {
        return toast("Update Successful");
      })
      .catch((err) => {
        const unprocessibleErrors = err.response.data.errors;
        if (unprocessibleErrors) {
          unprocessibleErrors.forEach((_error) => {
            toast(_error);
          });
        } else {
          toast("Something when wrong!!");
        }
      });
  };

  return (
    <div>
      <ReactModal
        isOpen={state.promptOpen}
        onRequestClose={toggleModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="flex flex-col justify-between h-full text-slate-700">
          <div></div>

          <h1 className="text-3xl text-center">
            {state.promptPurpose === "DELETE"
              ? "Are you sure you want to delete your account?"
              : "Are you sure you want to update your details?"}
          </h1>
          <div className="flex justify-around">
            <button
              onClick={
                state.promptPurpose === "DELETE" ? deleteAccount : updateAccount
              }
              className="bg-red-500 text-white p-2 font-bold rounded w-20"
            >
              Yes
            </button>
            <button
              onClick={toggleModal}
              className="bg-green-500 text-white p-2 font-bold rounded w-20"
            >
              close
            </button>
          </div>
        </div>
      </ReactModal>
      <div className="flex flex-col justify-center">
        <div className="m-2 sm:m-2 md:m-6 lg:m-10 bg-white p-4 rounded-lg shadow-lg">
          <div>
            {inputs.map(({ name, placeholder, type }, index) => {
              type =
                ["password", "confirmPassword", "oldPassword"].includes(name) &&
                !state.showPasswords
                  ? "password"
                  : type;
              return (
                <input
                  key={index}
                  placeholder={placeholder}
                  onChange={handleInputs}
                  name={name}
                  type={type}
                  value={state[name]}
                  className="border-black border-solid border-2 border-opacity-50 outline-none my-3 p-2 w-full h-12 rounded-md"
                />
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              onClick={toggleModal}
              name="UPDATE"
              className="bg-orange-600 ml-3 text-white p-2 rounded font-bold"
            >
              Update
            </button>

            <button
              name="DELETE"
              className="bg-red-600 ml-3 text-white p-2 rounded font-bold"
              onClick={toggleModal}
            >
              Delete Account
            </button>
          </div>
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
    </div>
  );
}
