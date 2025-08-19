"use client"

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";

const Login = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleLogin = async () => {
    if(!email.trim() || !password.trim()){
      alert("Input field cannot empty")
      return
    }
    if(password.length < 6){
      alert("Password at least 6 length character")
      return
    }

    try {
      setIsLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      setIsLoading(false)
      setPassword("")
      setEmail("")
      alert("Login successfulyy")
      window.location.href = "/"
    } catch (error) {
      throw new Error(`Cannot login : ${error}`);
      
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md  border-1 border-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-white mt-2">Please sign in to continue</p>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email Address
            </label>
            <input
            value={email}
            onChange={(e) => {
              e.preventDefault()
              setEmail(e.target.value)
            }}
              id="email"
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
            value={password}
            onChange={(e) => {
              e.preventDefault()
              setPassword(e.target.value)
            }}
              id="password"
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>


          <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleLogin()
          }}
            type="submit"
            className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            {isLoading ? "Sign In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-white mt-8">
          Don’t have an account?{" "}
          <a href="signup" className="text-sky-600 hover:underline font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
