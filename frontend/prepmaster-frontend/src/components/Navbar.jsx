import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/token";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItem = (to, label) => (
    <Link
      to={to}
      className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
        pathname === to ? "bg-indigo-600 text-white" : "hover:bg-white/10"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-md">
      <div className="container-app py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-indigo-600 grid place-items-center font-black">
            P
          </div>
          <div>
            <h1 className="text-lg font-extrabold leading-none">PrepMaster</h1>
            <p className="text-xs text-white/50">Placement Prep Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden md:flex gap-2">
                {navItem("/questions", "Questions")}
                {navItem("/progress", "Progress")}
                {navItem("/materials", "Materials")}
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-white/50">{user.email}</p>
                </div>

                <button onClick={handleLogout} className="btn-dark">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <button onClick={() => navigate("/")} className="btn-primary">
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
