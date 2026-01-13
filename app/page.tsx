// import { ComponentExample } from "@/components/component-example";

import Link from "next/link";

export default function Page() {
  return (


    <header className="w-80 text-xs lg:w-4xl">
      <nav className="flex items-center justify-end gap-5">
        <Link href="/login"
          className="inline-block border border-transparent hover:border-gray-300 hover:bg-blue-400 dark:hover:border-white/10 px-8 py-3">
          Log in
        </Link>
        <Link href="/register"
          className="inline-block border border-gray-300 hover:bg-blue-400 px-8 py-3 dark:border-white/10">
          Register
        </Link>
        <Link href="/dashboard"
          className="inline-block border border-gray-300 hover:bg-blue-400 px-8 py-3 dark:border-white/10">
          Dashboard
        </Link>
      </nav>
    </header>

  );
}