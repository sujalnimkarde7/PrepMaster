import { useEffect, useMemo, useState } from "react";
import { getQuestions } from "../services/questionApi";
import { markSolved, getSolvedQuestions } from "../services/progressApi";
import { Link } from "react-router-dom";

export default function Questions() {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const userId = user?.id;

  const [questions, setQuestions] = useState([]);
  const [solvedSet, setSolvedSet] = useState(new Set());

  const [filters, setFilters] = useState({
    topic: "",
    company: "",
    difficulty: "",
  });

  const fetchQuestions = async () => {
    try {
      const res = await getQuestions(filters);
      setQuestions(res.data.questions || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSolved = async () => {
    try {
      const res = await getSolvedQuestions(userId);
      const solvedIds = res.data.solved.map((item) => item.questionId?._id);
      setSolvedSet(new Set(solvedIds));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
    if (userId) fetchSolved();
    // eslint-disable-next-line
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => fetchQuestions();

  const resetFilters = () => {
    const reset = { topic: "", company: "", difficulty: "" };
    setFilters(reset);
    setTimeout(() => {
      getQuestions(reset).then((res) => setQuestions(res.data.questions || []));
    }, 0);
  };

  const handleSolved = async (questionId) => {
    try {
      if (!userId) return alert("Login first ❌");

      await markSolved({ userId, questionId });
      setSolvedSet(new Set([...solvedSet, questionId]));
    } catch (err) {
      alert(err.response?.data?.message || "Error marking solved ❌");
    }
  };

  const getDifficultyBadge = (difficulty) => {
    if (difficulty === "Easy")
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
    if (difficulty === "Medium")
      return "bg-yellow-500/15 text-yellow-300 border-yellow-500/30";
    return "bg-rose-500/15 text-rose-300 border-rose-500/30";
  };

  const totalSolved = useMemo(() => solvedSet.size, [solvedSet]);

  return (
    <div className="container-app py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Questions Dashboard
          </h2>
          <p className="text-white/60 mt-2">
            Filter company/topic questions and track solved progress.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="card px-5 py-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 grid place-items-center text-indigo-300 font-black">
            ✅
          </div>
          <div>
            <p className="text-sm text-white/60">Solved Questions</p>
            <p className="text-2xl font-extrabold">{totalSolved}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-5 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            className="input"
            placeholder="Topic (Arrays, DP...)"
            name="topic"
            value={filters.topic}
            onChange={handleFilterChange}
          />
          <input
            className="input"
            placeholder="Company (Amazon, TCS...)"
            name="company"
            value={filters.company}
            onChange={handleFilterChange}
          />

          <select
            className="select"
            name="difficulty"
            value={filters.difficulty}
            onChange={handleFilterChange}
          >
            <option value="">Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <div className="flex gap-2">
            <button className="btn-primary w-full" onClick={applyFilters}>
              Apply
            </button>
            <button className="btn-dark w-full" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>

        {/* Extra Navigation */}
        

      {/* Questions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        {questions.map((q) => {
          const solved = solvedSet.has(q._id);

          return (
            <div
              key={q._id}
              className="card p-6 relative overflow-hidden hover:border-white/20 transition"
            >
              {/* glow */}
              <div className="absolute -top-20 -right-20 h-60 w-60 bg-indigo-600/20 blur-3xl rounded-full" />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-extrabold">{q.title}</h3>
                    <p className="text-white/60 mt-2 text-sm">
                      <span className="badge">{q.topic}</span>{" "}
                      <span className="badge">{q.company}</span>
                    </p>
                  </div>

                  <span
                    className={`badge border ${getDifficultyBadge(
                      q.difficulty
                    )}`}
                  >
                    {q.difficulty}
                  </span>
                </div>

                <a
                  href={q.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  Open Question 🔗
                </a>

                <div className="mt-5">
                  {solved ? (
                    <button
                      disabled
                      className="btn w-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 cursor-not-allowed"
                    >
                      ✅ Solved
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSolved(q._id)}
                      className="btn-primary w-full"
                    >
                      Mark as Solved
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {questions.length === 0 && (
        <div className="card p-10 mt-6 text-center">
          <p className="text-white/70 text-lg">No questions found ❌</p>
          <p className="text-white/50 mt-2 text-sm">
            Try resetting filters or adding new questions.
          </p>
        </div>
      )}
    </div>
  );
}
