export default function Button({ children, type = "button", variant = "primary", loading = false, ...props }) {
  const variants = {
    primary: "bg-green-600 hover:bg-green-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    outline: "bg-white border-2 border-green-600 text-green-600 hover:bg-green-50",
  };

  return (
    <button
      type={type}
      disabled={loading}
      className={`px-6 py-3 rounded-lg font-medium transition duration-200 disabled:opacity-70 ${variants[variant]} ${props.className || ''}`}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}