import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ForgotPassword = ({ setModalOpen }) => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setEmail("");
      setEmailSent(true);
      setTimeout(() => {
        setModalOpen(false);
      }, 3000);
    } catch (error) {
      console.log("Could not send reset email");
    }
  };

  return (
    <div className="bg-white rounded-lg">
      {/* Header of Reset Password */}
      <div className="px-6 py-4 flex flex-row justify-end">
        <div onClick={() => setModalOpen(false)} className="text-gray-500">
          <AiOutlineCloseCircle className="w-8 h-8 cursor-pointer" />
        </div>
      </div>

      {/* Divider line */}
      <div className="border-b border-gray-200" />

      {/* Body of Reset Password */}
      {!emailSent ? (
        <form
          onSubmit={handleSubmit}
          className="text-gray1 flex flex-col items-center justify-center space-y-4 mt-4 px-6 pb-8 rounded-lg w-96 shadow-lg"
        >
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="max-w-xl w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow-sm "
          />

          <button
            type="submit"
            className="max-w-xl text-center w-full px-4 py-2 bg-green-700 text-white font-semibold tracking-wider rounded-lg shadow-sm hover:bg-green-900 transition duration-150  cursor-pointer focus:outline-none"
          >
            Send Reset Link
          </button>
        </form>
      ) : (
        <div className="text-gray1 flex flex-col items-center justify-center mt-4 px-6 pb-8 rounded-lg w-96 shadow-lg">
          <p className="text-center text-green-700 font-semibold">
            Email sent, check your mailbox
          </p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
