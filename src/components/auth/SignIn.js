import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import SignUp from "./SignUp";

const SignIn = ({ setSignUpModalActive }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  if (modalOpen) {
    setSignUpModalActive(true);
  } else {
    setSignUpModalActive(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/home");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      {/* Overlay */}
      {modalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20"></div>}
      <form
        onSubmit={handleSubmit}
        className="text-gray1  border-b border-b-gray-300  flex flex-col items-center justify-center space-y-4 pb-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="max-w-xl w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none  "
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="max-w-xl w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none  "
        />
        <button
          type="submit"
          className="max-w-xl text-xl w-full px-4 py-2 bg-indigo-500 text-white font-semibold tracking-wider rounded-md shadow-sm hover:bg-indigo-600 transition duration-150 focus:outline-none "
        >
          Log In
        </button>
      </form>

      {/* Popup SignUp  */}
      <div className="pt-4 px-4">
        <Popover className="z-20 relative" open={modalOpen}>
          <Popover.Button onClick={() => setModalOpen(true)}>
            <p
              type="submit"
              className="text-center w-full px-4 py-2 bg-green-700 text-white font-semibold tracking-wider rounded-md shadow-sm hover:bg-green-900 transition duration-150 cursor-pointer focus:outline-none "
            >
              Create new account
            </p>
          </Popover.Button>
          <Transition
            show={modalOpen}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel>
              <SignUp setModalOpen={setModalOpen} />
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </div>
  );
};

export default SignIn;
