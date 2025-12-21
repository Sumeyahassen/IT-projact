import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden font-serif ">

      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="lg:ml-64 flex flex-col min-h-screen mt-10">

        {/* Fixed Navbar */}
        <Navbar />

        {/* IMPORTANT: pt-16 MUST match navbar height */}
        <main className="pt-16 p-4 md:p-8 flex-1 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
