import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CountriesList() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 12;
  const router = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
        );
        const data = await res.json();
        data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common, undefined, {
            sensitivity: "base",
          })
        );
        setList(data);
      } catch (err) {
        console.error("Ma'lumotni olishda xatolik:", err);
      }
    }
    loadData();
  }, []);

  const totalPages = Math.ceil(list.length / limit);
  const shown = list.slice((page - 1) * limit, page * limit);

  return (
    <section className="min-h-screen bg-base-200 py-10 px-6">
      <h1 className="text-4xl text-center font-bold text-primary mb-10">
        🌎 Dunyo davlatlari
      </h1>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="btn btn-outline btn-primary"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          ⬅️ Oldingi
        </button>

        <span className="text-lg font-semibold text-neutral">
          {page} / {totalPages || 1}
        </span>

        <button
          className="btn btn-outline btn-primary"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Keyingi ➡️
        </button>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-8 pb-6">
        {shown.map((item) => (
          <article
            key={item.name.common}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition hover:scale-[1.02]"
            /* onClick removed so card itself is NOT clickable */
          >
            <figure className="h-44">
              <img
                src={item.flags.png}
                alt={item.name.common}
                className="h-full w-full object-cover rounded-t-xl"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title text-primary">{item.name.common}</h2>
              <p>🌍 {item.region}</p>
              <p>🏙️ {item.capital?.[0] || "Noma’lum"}</p>
              <p>👥 {item.population.toLocaleString()}</p>

              <div className="card-actions justify-end mt-3">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    router(`/country/${encodeURIComponent(item.name.common)}`)
                  }
                  aria-label={`Batafsil ${item.name.common}`}
                >
                  Batafsil
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
