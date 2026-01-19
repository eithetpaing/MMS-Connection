"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let valid = true;

        setEmailError("");
        setPasswordError("");

        if (!email) {
          setEmailError("Email is required");
          valid = false;
          } else if (!/\S+@\S+\.\S+/.test(email)) {
              setEmailError("Email is not valid");
              valid = false;
              }

        if (!password) {
          setPasswordError("Password is required");
          valid = false;
          } else if (password.length < 6) {
              setPasswordError("Password is incorrect");
              valid = false;
              }

        if (!valid) return;
          router.push("/dashboard");
              // Below this is a code for testing purpose only.
          if (email !== "test@gmail.com" || password !== "123456") {
              setPasswordError("Email or password is incorrect");
               return;
            }
              // Above this is a code for testing purpose only.
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-white/30">
      <form onSubmit={handleSubmit}
        className="flex flex-col items-center border border-gray-300 min-h-screen w-90 lg:w-xl lg:my-10 bg-white/30 dark:bg-black dark:text-white">
        {/* Head */}
        <div className="flex flex-col items-center py-5">
          <h1 className="font-bold text-2xl pt-3">Login to your account</h1>
          <p className="text-gray-500 text-sm">
            Enter your email and password below to log in
          </p>
        </div>
        <hr className="w-full my-5 border-gray-300" />
        {/* Input fields */}
        <div className="mx-auto my-5 space-y-4">
          {/* Email */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@gmail.com"
              className={`mt-1 w-50 lg:w-sm p-3 text-sm border rounded
                ${emailError ? "border-red-500" : "border-gray-300"}`}/>
                {
                  emailError && (<p className="text-red-500 text-xs">{emailError}</p>)
                }
          </div>
          {/* Password */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`mt-1 w-50 lg:w-sm p-3 text-sm border rounded
                ${passwordError ? "border-red-500" : "border-gray-300"}`}/>
                {
                passwordError && (<p className="text-red-500 text-xs">{passwordError}</p>)
                }
            <a href="#" className="underline text-sm text-center">
              Forget Password?
            </a>
          </div>
        </div>
        <hr className="w-full my-5 border-gray-300" />
        {/* Login Button */}
        {/* Privacy Policy Checkbox */}
        <div className="flex flex-col items-center justify-center w-full mt-5 px-10 space-y-4">
          <div className="items-start lg:flex-row space-x-2">
            <input id="privacy" type="checkbox"
              className=" mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="privacy"
              className="text-sm text-gray-600 leading-5">
              I agree to the{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>{" "}and{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
            </label>
          </div>
          <button type="submit"
            className="w-50 lg:w-sm bg-blue-600 hover:bg-blue-900 text-white font-medium py-4 rounded-md">
              Login
          </button>
        </div>
        {/* Sign up link */}
        <p className="text-gray-500 text-sm mt-5 mb-5">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-blue-600 underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
