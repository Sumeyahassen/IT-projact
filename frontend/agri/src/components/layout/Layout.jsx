import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />  {/* Fixed sidebar on left */}
      <div className="flex-1 flex flex-col ml-64">  {/* ml-64 = margin-left 16rem (sidebar width) */}
        <Navbar />  {/* Navbar on top */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}