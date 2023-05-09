import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";

const SignUp = ({ setModalOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profession, setProfession] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      // Sends the user_id, email, and username to the backend
      await axios.post("https://musical-maamoul-dba19e.netlify.app//users/create/", {
        user_id: user.uid,
        email: email,
        username: username,
        profession: profession,
        location: location,
      });

      navigate("/home");
      setEmail("");
      setPassword("");
      setUsername("");
      setProfession("");
      setLocation("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-lg">
      {/* Header of SignUp  */}
      <div className="px-6 py-4 flex flex-row justify-between">
        <div>
          <p className="font-bold text-xl"> Sign Up</p>
          <span className="text-sm text-gray-700">It's quick and easy.</span>
        </div>
        <div onClick={() => setModalOpen(false)} className="text-gray-500">
          <AiOutlineCloseCircle className="w-8 h-8 cursor-pointer" />
        </div>
      </div>

      {/* Divider line */}
      <div className="border-b border-gray-200" />

      {/* Body of SignUp */}
      <form
        onSubmit={handleSubmit}
        className="text-gray1 flex flex-col items-center justify-center space-y-4 mt-4 px-6 pb-8 rounded-lg w-96 shadow-lg"
      >
        <input
          required
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="max-w-xl w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow-sm "
        />
        <input
          required
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="max-w-xl w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow-sm "
        />
        <input
          required
          type="text"
          placeholder="Profession"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          className="max-w-xl w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow-sm "
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="max-w-xl w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow-sm "
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="max-w-xl w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow-sm "
        />
        <button
          type="submit"
          className="max-w-xl text-center w-full px-4 py-2 bg-green-700 text-white font-semibold tracking-wider rounded-lg shadow-sm hover:bg-green-900 transition duration-150  cursor-pointer focus:outline-none"
        >
          Create new account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
