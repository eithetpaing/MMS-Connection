
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
};

export default function Page() {
return (
    <div className='flex items-center justify-center min-h-screen bg-white dark:bg-white/30'>
      <form className='flex flex-col items-center  border border-gray-300 min-h-screen w-90 lg:w-xl lg:my-10 bg-white/30 dark:bg-black dark:text-white'>
        <div className='flex flex-col items-center py-5'>
          <h1 className='font-bold text-2xl pt-3'>Sign up for your account</h1>
          <p className='text-gray-500 text-sm'>Enter your email, name and password below to register</p>
        </div>
        <hr className='w-full my-5 border-gray-300'/>
                                    {/*input fields*/}
        <div className=" mx-auto my-5 space-y-4">
                                   {/* Email */}
          <div className='flex flex-col space-y-2'>
            <label htmlFor="email" 
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" id="email" placeholder="you@gmail.com"
              className="mt-1 w-50 lg:w-sm border border-gray-300  p-3  text-sm"/>
          </div>
          <div>
            <label htmlFor="firstName"
              className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input type="text" id="firstName" placeholder="John"
              className="mt-1 w-50 lg:w-sm border border-gray-300 p-3 text-sm"/>
            <label htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mt-4">
              Last Name
            </label>
            <input type="text" id="lastName" placeholder="Doe"
              className="mt-1 w-50 lg:w-sm border border-gray-300 p-3 text-sm"/>
          </div>
                                    {/* Password */}
          <div className='flex flex-col space-y-2'>
            <label htmlFor="password"
              className="block text-sm font-medium text-gray-700">
                Create Password
            </label>
            <input type="password" id="password" placeholder="••••••••"
              className="mt-1 w-50 lg:w-sm border border-gray-300 p-3 text-sm"/>
          </div>
           <div className='flex flex-col space-y-2'>
            <label htmlFor="password"
              className="block text-sm font-medium text-gray-700">
                Confirm Password
            </label>
            <input type="password" id="password" placeholder="••••••••"
              className="mt-1 w-50 lg:w-sm border border-gray-300 p-3 text-sm"/>
          </div>
        </div>
        <hr className='w-full my-5 border-gray-300'/>
                                    {/* Register Button */}
        <div className="flex flex-col items-center justify-center w-full mt-5 px-10 space-y-4">
                                    {/* Privacy Policy Checkbox */}
          <div className="items-start lg:flex-row space-x-2">
            <input id="privacy" type="checkbox"
              className=" mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
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
            className="w-50 lg:w-sm bg-blue-600 hover:bg-blue-900 text-white dark:bg-white dark:text-black font-medium py-4  rounded-md mt-1">
              Register
          </button>
        </div>
                                    {/* Sign up link */}
        <div>
          <p className='text-gray-500 text-sm mt-5 mb-5'>If you have an account, <Link href='/login' className='text-blue-600 underline'>Log in</Link></p>
        </div>
      </form>
    </div>
);
}