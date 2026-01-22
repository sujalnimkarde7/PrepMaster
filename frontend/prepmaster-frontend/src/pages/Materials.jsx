import { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const SUBJECTS = ["OS", "DBMS", "CN", "OOP", "DSA"];
const TYPES = ["PDF", "Notes", "Video", "Link"];

export default function Materials() {
  const [materials, setMaterials] = useState([]);
  const [filters, setFilters] = useState({
    subject: "",
    topic: "",
    type: "",
  });

  const fetchMaterials = async (f = filters) => {
    try {
      const res = await API.get("/materials", { params: f });
      setMaterials(res.data.materials || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMaterials();
    // eslint-disable-next-line
  }, []);

  const setSubject = (sub) => {
    const updated = { ...filters, subject: filters.subject === sub ? "" : sub };
    setFilters(updated);
    fetchMaterials(updated);
  };

  const setType = (tp) => {
    const updated = { ...filters, type: filters.type === tp ? "" : tp };
    setFilters(updated);
    fetchMaterials(updated);
  };

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const apply = () => fetchMaterials(filters);

  const reset = () => {
    const f = { subject: "", topic: "", type: "" };
    setFilters(f);
    fetchMaterials(f);
  };

  const getTypeBadge = (type) => {
    if (type === "PDF") return "bg-indigo-500/15 text-indigo-300 border-indigo-500/30";
    if (type === "Video") return "bg-rose-500/15 text-rose-300 border-rose-500/30";
    if (type === "Notes") return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
    return "bg-yellow-500/15 text-yellow-300 border-yellow-500/30";
  };

  const total = useMemo(() => materials.length, [materials]);

  return (
    <div className="container-app py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Study Materials
          </h2>
          <p className="text-white/60 mt-2">
            Core subjects notes, PDFs and videos — all in one place.
          </p>
        </div>

        <Link
          to="/questions"
          className="text-indigo-400 hover:text-indigo-300 font-semibold"
        >
          ⬅ Back to Questions
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <div className="card p-6 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-60 w-60 bg-indigo-600/20 blur-3xl rounded-full" />
          <div className="relative">
            <p className="text-white/60 text-sm">Total Materials</p>
            <h3 className="text-4xl font-extrabold mt-2">{total}</h3>
            <p className="text-white/50 text-sm mt-1">
              resources available 📚
            </p>
          </div>
        </div>

        <div className="card p-6 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-60 w-60 bg-emerald-600/15 blur-3xl rounded-full" />
          <div className="relative">
            <p className="text-white/60 text-sm">Quick Tip</p>
            <h3 className="text-2xl font-extrabold mt-2">Revise Daily</h3>
            <p className="text-white/50 text-sm mt-1">
              1 topic per day = fast mastery 🚀
            </p>
          </div>
        </div>

        <div className="card p-6 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-60 w-60 bg-fuchsia-600/15 blur-3xl rounded-full" />
          <div className="relative">
            <p className="text-white/60 text-sm">Recommended</p>
            <h3 className="text-2xl font-extrabold mt-2">DBMS + OS</h3>
            <p className="text-white/50 text-sm mt-1">
              Most asked in interviews ✅
            </p>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="card p-6 mt-6">
        <h3 className="text-xl font-extrabold">Filters</h3>
        <p className="text-white/50 text-sm mt-1">
          Use chips or search topic name.
        </p>

        {/* Subject Chips */}
        <div className="mt-5 flex flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition border ${
                filters.subject === s
                  ? "bg-indigo-600 text-white border-indigo-400/40"
                  : "bg-white/5 hover:bg-white/10 border-white/10"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Type Chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition border ${
                filters.type === t
                  ? "bg-white/15 text-white border-white/20"
                  : "bg-white/5 hover:bg-white/10 border-white/10 text-white/80"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Topic Search */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            className="input md:col-span-2"
            placeholder="Search by topic (Deadlock, Indexing...)"
            name="topic"
            value={filters.topic}
            onChange={handleChange}
          />

          <div className="flex gap-2">
            <button className="btn-primary w-full" onClick={apply}>
              Apply
            </button>
            <button className="btn-dark w-full" onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        {materials.map((m) => (
          <div
            key={m._id}
            className="card p-6 relative overflow-hidden hover:border-white/20 transition"
          >
            <div className="absolute -top-24 -right-24 h-72 w-72 bg-indigo-600/15 blur-3xl rounded-full" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold">{m.title}</h3>
                  <p className="text-white/60 mt-2 text-sm flex gap-2 flex-wrap">
                    <span className="badge">{m.subject}</span>
                    <span className="badge">{m.topic}</span>
                  </p>
                </div>

                <span className={`badge border ${getTypeBadge(m.type)}`}>
                  {m.type}
                </span>
              </div>

              <a
                href={m.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Open Material 🔗
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {materials.length === 0 && (
        <div className="card p-10 mt-6 text-center">
          <p className="text-white/70 text-lg">No materials found ❌</p>
          <p className="text-white/50 mt-2 text-sm">
            Try reset filters or add more materials.
          </p>
        </div>
      )}
    </div>
  );
}
