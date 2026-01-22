import { useState } from "react";
import { loginUser } from "../services/authApi";
import { setToken } from "../services/token";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await loginUser(form);

      setToken(res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMsg("Login Success ✅");
      navigate("/questions");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="container-app">
      <div className="min-h-[85vh] grid place-items-center">
        <div className="w-full max-w-md card p-8 relative overflow-hidden">
          {/* glow effect */}
          <div className="absolute -top-24 -right-24 h-64 w-64 bg-indigo-600/30 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-fuchsia-600/20 blur-3xl rounded-full" />

          <div className="relative">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Welcome back 👋
            </h2>
            <p className="text-white/60 mt-2">
              Login to continue your placement prep.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="text-sm text-white/70">Email</label>
                <input
                  name="email"
                  placeholder="sujal@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  className="input mt-2"
                />
              </div>

              <div>
                <label className="text-sm text-white/70">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="input mt-2"
                />
              </div>

              <button className="btn-primary w-full mt-2 text-lg">
                Login
              </button>
            </form>

            {msg && (
              <p className="mt-4 text-sm text-emerald-400 font-semibold">
                {msg}
              </p>
            )}

            <p className="mt-6 text-white/60 text-sm">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
