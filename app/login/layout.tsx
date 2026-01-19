import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
  description: "Login to your account",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-100">
      {children}
    </main>
  );
}
