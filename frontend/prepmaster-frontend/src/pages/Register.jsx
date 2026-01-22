import { useState } from "react";
import { registerUser } from "../services/authApi";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await registerUser(form);
      setMsg(res.data.message || "Registered ✅");
      navigate("/");
    } catch (err) {
      setMsg(err.response?.data?.message || "Register failed ❌");
    }
  };

  return (
    <div className="container-app">
      <div className="min-h-[85vh] grid place-items-center">
        <div className="w-full max-w-md card p-8 relative overflow-hidden">
          {/* glow effect */}
          <div className="absolute -top-24 -right-24 h-64 w-64 bg-indigo-600/30 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-emerald-600/20 blur-3xl rounded-full" />

          <div className="relative">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Create account 🚀
            </h2>
            <p className="text-white/60 mt-2">
              Register and start solving questions smartly.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="text-sm text-white/70">Name</label>
                <input
                  name="name"
                  placeholder="Sujal Nimkarde"
                  value={form.name}
                  onChange={handleChange}
                  className="input mt-2"
                />
              </div>

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
                Register
              </button>
            </form>

            {msg && (
              <p className="mt-4 text-sm text-emerald-400 font-semibold">
                {msg}
              </p>
            )}

            <p className="mt-6 text-white/60 text-sm">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
