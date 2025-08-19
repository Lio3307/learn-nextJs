"use client"

import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";

import { db, auth } from "../../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      alert("Input filed cannot empty!");
      return;
    }

    if(password.length < 6){
      alert("Password at least 6 character length")
      return
    }

    try {
      setIsLoading(true);
      const userCredit = await createUserWithEmailAndPassword(auth, email, password)

      const docRef = doc(db, "Users", userCredit.user.uid);
      await setDoc(docRef, {
        fullName: fullName,
        email: email,
        password: password,
      });
      alert("Successfully registered user!");
      setFullName("");
      setEmail("");
      setPassword("");
      window.location.href = "/notes";
    } catch (error) {
      throw new Error(`Cannot registered user : ${error}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="w-full max-w-md border-1 border-white backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-hite mb-6">
          Create Account
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Full Name
            </label>
            <input
              value={fullName}
              onChange={(e) => {
                e.preventDefault();
                setFullName(e.target.value);
              }}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSignIn();
            }}
            type="submit"
            className={`w-full py-2 bg-sky-600 text-white font-semibold rounded-xl shadow-md ${
              isLoading
                ? "cursor-not-allowed"
                : "cursor-pointer hover:bg-sky-700"
            } transition`}
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-sky-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
