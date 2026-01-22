import { useEffect, useState } from "react";
import { getProgressStats, getSolvedQuestions } from "../services/progressApi";
import { Link } from "react-router-dom";

export default function Progress() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [stats, setStats] = useState(null);
  const [solved, setSolved] = useState([]);

  const fetchStats = async () => {
    try {
      const res = await getProgressStats(userId);
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSolved = async () => {
    try {
      const res = await getSolvedQuestions(userId);
      setSolved(res.data.solved || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchStats();
      fetchSolved();
    }
    // eslint-disable-next-line
  }, []);

  if (!userId) {
    return (
      <div className="container-app py-10">
        <div className="card p-10 text-center">
          <p className="text-white/70 text-lg">Please login first ❌</p>
          <Link
            to="/"
            className="inline-block mt-4 text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const totalSolved = stats?.totalSolved || 0;
  const topicWise = stats?.topicWise || [];

  // max for progress bars
  const maxTopicCount =
    topicWise.length > 0 ? Math.max(...topicWise.map((t) => t.count)) : 1;

  return (
    <div className="container-app py-8">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Progress Dashboard
          </h2>
          <p className="text-white/60 mt-2">
            Track your solved questions topic-wise.
          </p>
        </div>

        <Link
          to="/questions"
          className="text-indigo-400 hover:text-indigo-300 font-semibold"
        >
          ⬅ Back to Questions
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <div className="card p-6 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-60 w-60 bg-indigo-600/20 blur-3xl rounded-full" />
          <div className="relative">
            <p className="text-white/60 text-sm">Total Solved</p>
            <h3 className="text-4xl font-extrabold mt-2">{totalSolved}</h3>
            <p className="text-white/50 mt-1 text-sm">
              questions marked as solved ✅
            </p>
          </div>
        </div>

        <div className="card p-6 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-60 w-60 bg-emerald-600/15 blur-3xl rounded-full" />
          <div className="relative">
            <p className="text-white/60 text-sm">Top Topic</p>
            <h3 className="text-2xl font-extrabold mt-2">
              {topicWise[0]?._id || "N/A"}
            </h3>
            <p className="text-white/50 mt-1 text-sm">
              {topicWise[0]?.count || 0} solved in this topic
            </p>
          </div>
        </div>

        <div className="card p-6 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-60 w-60 bg-fuchsia-600/15 blur-3xl rounded-full" />
          <div className="relative">
            <p className="text-white/60 text-sm">Consistency</p>
            <h3 className="text-2xl font-extrabold mt-2">Keep Going 🚀</h3>
            <p className="text-white/50 mt-1 text-sm">
              solve daily for best placement prep
            </p>
          </div>
        </div>
      </div>

      {/* Topic wise bars */}
      <div className="card p-6 mt-6">
        <h3 className="text-xl font-extrabold">📌 Topic-wise Progress</h3>
        <p className="text-white/50 text-sm mt-1">
          Bars show solved count per topic.
        </p>

        <div className="mt-6 space-y-4">
          {topicWise.length > 0 ? (
            topicWise.map((t) => {
              const width = Math.round((t.count / maxTopicCount) * 100);
              return (
                <div key={t._id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">{t._id}</span>
                    <span className="text-white/60">{t.count}</span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-3 bg-indigo-600 rounded-full"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-white/60 mt-4">No progress yet ❌</p>
          )}
        </div>
      </div>

      {/* Solved List */}
      <div className="card p-6 mt-6">
        <h3 className="text-xl font-extrabold">✅ Solved Questions</h3>
        <p className="text-white/50 text-sm mt-1">
          List of questions you solved.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {solved.length > 0 ? (
            solved.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <h4 className="text-lg font-extrabold">
                  {item.questionId?.title}
                </h4>

                <div className="flex gap-2 mt-2 text-sm">
                  <span className="badge">{item.topic}</span>
                  <span className="badge">
                    {new Date(item.solvedAt).toLocaleDateString()}
                  </span>
                </div>

                {item.questionId?.link && (
                  <a
                    href={item.questionId.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    Open Question 🔗
                  </a>
                )}
              </div>
            ))
          ) : (
            <p className="text-white/60">No solved questions yet ❌</p>
          )}
        </div>
      </div>
    </div>
  );
}
