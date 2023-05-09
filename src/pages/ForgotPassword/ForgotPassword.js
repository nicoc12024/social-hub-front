import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      console.log("Reset email sent");
    } catch (error) {
      console.log("Could not send reset email");
    }
  };

  return (
    <div>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
