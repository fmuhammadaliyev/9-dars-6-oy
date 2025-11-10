import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CountryInfo() {
  const { name } = useParams();
  const nav = useNavigate();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await res.json();
        setInfo(data[0]);
      } catch (error) {
        console.error("API xatosi:", error);
      }
    }
    getData();
  }, [name]);

  if (!info)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="ml-3 text-xl text-primary">Ma’lumot yuklanmoqda...</p>
      </div>
    );

  return (
    <main className="min-h-screen bg-base-200 flex flex-col items-center py-10 px-6">
      <button
        onClick={() => nav("/")}
        className="btn btn-outline btn-primary mb-8 self-start"
      >
        ⬅️ Orqaga
      </button>

      <div className="card bg-base-100 shadow-2xl max-w-lg w-full">
        <figure className="px-10 pt-10">
          <img
            src={info.flags.png}
            alt={info.name.common}
            className="rounded-xl h-56 object-cover w-full"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h1 className="text-3xl font-bold text-primary">
            {info.name.common}
          </h1>
          <div className="divider"></div>

          <ul className="space-y-2 text-lg">
            <li>
              <span className="font-semibold">Rasmiy nomi:</span>{" "}
              {info.name.official}
            </li>
            <li>
              <span className="font-semibold">Poytaxt:</span>{" "}
              {info.capital?.[0] || "Noma’lum"}
            </li>
            <li>
              <span className="font-semibold">Region:</span> {info.region}
            </li>
            <li>
              <span className="font-semibold">Aholi:</span>{" "}
              {info.population.toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
