"use client";

const page = () => {
  return (
    <div className='flex items-center justify-center flex-col min-h-screen font-bold'>
        {/*Forget Password Head */}
      <div className='mb-10 text-center'>
        <h1 className='text-4xl mb-5'>Forget Password Page</h1>
        <p className="mb-2">Please always remember your password.</p>
        <p className='text-xl'>I&apos;m too bore to write a beautiful page for you to change your password.</p>
      </div>
      {/* Test Email and Password */}
      <div className='text-center border border-gray-300 p-10 rounded-lg '>
        <p className='text-4xl'>Test Email and Password</p>
        <div>
          <p className='my-5 text-2xl'>Email: test@gmail.com</p>
          <p className='text-2xl'>Password: 123456</p>
        </div>
      </div>
    </div>
  )
}

export default page
