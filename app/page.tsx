// import { ComponentExample } from "@/components/component-example";

import { Bean } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (


    <div className="flex items-center justify-center flex-col min-h-screen dark:bg-white/30">
      <header className="border border-b-black text-xs w-full lg:w-4xl">
      <nav className="flex justify-between p-10">
        <div>
          <h2 className="text-2xl font-black text-[#006241] flex items-center gap-2 tracking-tight">
            <div className="bg-[#006241] p-1.5 rounded-full text-white"><Bean size={20} /></div>
              STAR CAFÉ
          </h2>
        </div>
        <div className="flex gap-5">
          <Link href="/login"
            className="inline-block border border-transparent font-bold hover:border-gray-300 hover:bg-[#F1F8F5] dark:hover:border-white/10 px-8 py-3">
              Log in
          </Link>
          <Link href="/register"
            className="inline-block border font-bold border-gray-300 hover:bg-[#F1F8F5] px-8 py-3 dark:border-white/10">
              Register
          </Link>
          {/* <Link href="/dashboard"
            className="inline-block border font-bold border-gray-300 hover:bg-[#F1F8F5] px-8 py-3 dark:border-white/10">
              Dashboard
          </Link> */}
        </div> 
      </nav>
      </header>
      {/* Main Content */}
      <div className="border border-b-black w-full lg:w-4xl">
        {/* Hero Section */}
        <section className="border border-b-black text-center py-20 px-6">
          <h1 className="text-4xl font-bold mb-4">Welcome to STAR CAFÉ ☕</h1>
          <p className="text-lg text-gray-600 mb-6">
            Fast, simple, and reliable point-of-sale system for modern cafés.
          </p>
          <p className="max-w-2xl mx-auto text-gray-500">
            STAR CAFÉ POS helps manage orders, payments, and daily sales efficiently.
            Designed for speed, accuracy, and ease of use for both staff and managers.
          </p>
        </section>
        {/* About Section */}
        <section className="border border-b-black py-16 px-6 bg-gray-50">
          <h2 className="text-2xl font-semibold text-center mb-6">
            About STAR CAFÉ POS
          </h2>
          <p className="max-w-3xl mx-auto text-center text-gray-600">
            STAR CAFÉ POS is a digital point-of-sale system created for café operations.
            It allows cashiers to process orders quickly, track sales records, and manage
            products in real time. This system is developed as a school project to
            demonstrate modern web technologies and real-world business solutions.
          </p>
        </section>
        {/* Features Section */}
        <section className="py-16 px-6">
          <h2 className="text-2xl font-semibold text-center mb-10">Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="border border-gray-300 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Fast Order Processing</h3>
              <p className="text-gray-600 text-sm">
                Take customer orders quickly and reduce waiting time.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="border border-gray-300 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Sales Tracking</h3>
              <p className="text-gray-600 text-sm">
                Monitor daily, weekly, and monthly sales with ease.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="border border-gray-300 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">User-Friendly Interface</h3>
              <p className="text-gray-600 text-sm">
                Simple and clean design for easy learning and use.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="border border-gray-300 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Secure System</h3>
              <p className="text-gray-600 text-sm">
                Protect data with authenticated user access.
              </p>
            </div>
          </div>
        </section>
      </div>            
      {/* Footer */}
      <footer className="text-center py-10 border-t text-sm text-gray-500">
        © 2026 STAR CAFÉ POS · School Project
      </footer>
    </div>

  );
}