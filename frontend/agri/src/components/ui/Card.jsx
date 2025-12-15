export default function Card({ title, children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {title && <h2 className="text-2xl font-bold text-green-800 mb-6">{title}</h2>}
      {children}
    </div>
  );
}