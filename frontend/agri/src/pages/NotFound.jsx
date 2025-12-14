export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-800">404</h1>
        <p className="text-2xl mt-4">Page not found</p>
        <a href="/" className="text-green-600 hover:underline mt-4 inline-block">Go to Login</a>
      </div>
    </div>
  );
}