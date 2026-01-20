"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    email: false,
    firstName: false,
    lastName: false,
    password: false,
    confirmPassword: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
        email: false,
        firstName: false,
        lastName: false,
        password: false,
        confirmPassword: false,
      };

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = true;
    }

    // Name validation
    if (/\d/.test(firstName)) {
      newErrors.firstName = true;
    }
    if (/\d/.test(lastName)) {
      newErrors.lastName = true;
    }

    // Password validation
    if (password.length < 6) {
      newErrors.password = true;
    }
    if (password !== confirmPassword || confirmPassword.length < 6) {
      newErrors.confirmPassword = true;
    }

    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-white/30">
      <form onSubmit={handleSubmit}
        className="flex flex-col items-center border border-gray-300 min-h-screen w-90 lg:w-xl lg:my-10 bg-white/30 dark:bg-black dark:text-white">
        {/* Head */}
        <div className="flex flex-col items-center py-5">
          <h1 className="font-bold text-2xl pt-3">Sign up for your account</h1>
          <p className="text-gray-500 text-sm">
            Enter your email, name and password below to register
          </p>
        </div>
        <hr className="w-full my-5 border-gray-300" />
        {/* Inputs */}
        <div className="flex flex-col items-center mx-auto my-5 space-y-4">
          {/* Email */}
          <div className='flex flex-col space-y-2'>
            <label htmlFor="email" 
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" value={email}
              onChange={(e) => {
                const val = e.target.value;
                setEmail(val);
                setErrors((prev) => ({ ...prev, email: !/\S+@\S+\.\S+/.test(val) }));
            }}
              placeholder={errors.email ? "please enter a valid email" : "you@gmail.com"}
              className={`mt-1 w-50 lg:w-sm p-3 text-sm border rounded
                  ${errors.email ? "border-red-500" : "border-gray-300"}`}/>
          </div>
          {/* First name */}
           <div className='flex flex-col space-y-2'>
            <label htmlFor="firstName"
              className="block text-sm font-medium text-gray-700">
              First Name
            </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => {
              const val = e.target.value;
              setFirstName(val);
              setErrors((prev) => ({ ...prev, firstName: /\d/.test(val) }));
          }}
            placeholder={errors.firstName ? "Please do not use number" : "John"}
            className={`mt-1 w-50 lg:w-sm p-3 text-sm border rounded
              ${errors.firstName ? "border-red-500" : "border-gray-300"}`}/>
          </div>
          {/* Last name */}
          <div className='flex flex-col space-y-2'>
           <label htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mt-4">
              Last Name
            </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => {
              const val = e.target.value;
              setLastName(val);
              setErrors((prev) => ({ ...prev, lastName: /\d/.test(val) }));
            }}
            placeholder={errors.lastName ? "Please do not use number" : "Doe"}
            className={`mt-1 w-50 lg:w-sm p-3 text-sm border rounded
              ${errors.lastName ? "border-red-500" : "border-gray-300"}`}/>
          </div>
          {/* Password */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Create Password
            </label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={password}
                onChange={(e) => {
                  const val = e.target.value;
                  setPassword(val);
                  setErrors((prev) => ({ ...prev, password: val.length < 6 }));
                }}
                placeholder={errors.password ? "password is too short" : "••••••••"}
                className={`mt-1 w-50 lg:w-sm p-3 pr-10 text-sm border rounded
                  ${errors.password ? "border-red-500" : "border-gray-300"}`}/>
                <button type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
          </div>
          {/* Confirm password */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700">
                Confirm Password
            </label>
            <div className="relative">
              <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword}
                onChange={(e) => {
                  const val = e.target.value;
                  setConfirmPassword(val);
                  setErrors((prev) => ({...prev,confirmPassword: val !== password || val.length < 6,}));
                }}
                placeholder={errors.confirmPassword ? "passwords do not match" : "••••••••"}
                className={`mt-1 w-50 lg:w-sm p-3 pr-10 text-sm border rounded
                          ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}/>
              <button type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>
        <hr className="w-full my-5 border-gray-300" />
        {/* Register */}
        <button
          type="submit"
          className="w-50 lg:w-sm bg-blue-600 hover:bg-blue-900 text-white font-medium py-4 rounded-md">
          Register
        </button>
        {/* Log in link */}
        <p className="text-gray-500 text-sm mt-5 mb-5">
          If you have an account,{" "}
          <Link href="/login" className="text-blue-600 underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
