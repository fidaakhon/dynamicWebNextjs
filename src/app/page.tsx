import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>practice for authentications</h1>
      <div className="flex flex-col items-center space-y-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign In
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign Up
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Profile
        </button>
      </div>

    </main>
  );
}
