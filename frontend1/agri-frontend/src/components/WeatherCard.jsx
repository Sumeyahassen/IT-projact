export default function WeatherCard({ data }) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-10 text-center hover:scale-105 transition">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">{data.name}</h3>
      {data.temp !== "N/A" ? (
        <>
          <p className="text-8xl font-bold text-orange-600 my-8">{data.temp}°C</p>
          <p className="text-2xl text-gray-700 capitalize">{data.desc}</p>
        </>
      ) : (
        <p className="text-red-600 text-2xl">No data</p>
      )}
    </div>
  );
}