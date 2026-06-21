import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Eye, EyeOff, Apple, ArrowRight } from "lucide-react";
import pcuLogo from "@/assets/pcu-logo.jpg";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });

  useEffect(() => {
    setMode(searchParams.get("mode") === "register" ? "register" : "login");
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register") {
      if (form.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      const success = await register(form.firstName, form.lastName, form.email, form.password);
      if (success) {
        toast.success("Registration successful!");
        navigate("/");
      } else {
        toast.error("Email already registered");
      }
    } else {
      const success = await login(form.email, form.password);
      if (success) {
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Invalid credentials");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 lg:p-8 bg-[#c89993] dark:bg-gray-900 transition-colors duration-300">

      <div className="bg-[#1c1820] w-full max-w-5xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-white/5">

        {/* Left Side: Image Layout */}
        <div className="relative hidden md:flex w-full md:w-[45%] bg-[#120f14] p-6 flex-col justify-between overflow-hidden m-4 rounded-3xl">
          <div className="absolute inset-0 z-0">
            {/* Using a dark landscape image to reflect the aesthetics from reference */}
            <img
              src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80"
              alt="Beautiful landscape"
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            />
            {/* Website theme color overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#8b4555]/30 to-[#120f14]/90"></div>
          </div>

          <div className="relative z-10 flex justify-between items-center">
            <Link to="/">
              <img src={pcuLogo} alt="PCU Logo" className="h-8 w-auto rounded-md bg-white p-1 opacity-90" />
            </Link>
            <Link to="/" className="text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/10 shadow-sm">
              Back to website <ArrowRight size={12} />
            </Link>
          </div>

          <div className="relative z-10 text-center pb-8 pt-20">
            <h3 className="text-2xl md:text-[1.6rem] leading-snug font-light text-white tracking-wide mb-6">
              Capturing Moments,<br />Creating Memories
            </h3>
            <div className="flex justify-center gap-1.5">
              <div className="h-[3px] w-4 bg-white/30 rounded-full"></div>
              <div className="h-[3px] w-4 bg-white/30 rounded-full"></div>
              <div className="h-[3px] w-7 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-[55%] p-8 md:p-12 lg:p-16 flex flex-col justify-center relative bg-[#1c1820] text-gray-100">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight mb-2 text-white">
              {mode === "login" ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-gray-400 text-sm mb-10">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setForm({ firstName: "", lastName: "", email: "", password: "" });
                }}
                className="text-white font-medium hover:underline transition-all"
              >
                {mode === "login" ? "Sign up" : "Log in"}
              </button>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <input
                      type="text"
                      required
                      placeholder="First name"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-white/10 rounded-lg bg-white/5 text-white placeholder:text-gray-500 focus:border-[#8b4555] focus:ring-1 focus:ring-[#8b4555] focus:outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="w-1/2">
                    <input
                      type="text"
                      required
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-white/10 rounded-lg bg-white/5 text-white placeholder:text-gray-500 focus:border-[#8b4555] focus:ring-1 focus:ring-[#8b4555] focus:outline-none transition-all text-sm"
                    />
                  </div>
                </div>
              )}

              <div>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border border-white/10 rounded-lg bg-white/5 text-white placeholder:text-gray-500 focus:border-[#8b4555] focus:ring-1 focus:ring-[#8b4555] focus:outline-none transition-all text-sm"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder={mode === "login" ? "Enter your password" : "Create a password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 border border-white/10 rounded-lg bg-white/5 text-white placeholder:text-gray-500 focus:border-[#8b4555] focus:ring-1 focus:ring-[#8b4555] focus:outline-none transition-all text-sm pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {mode === "register" && (
                <div className="flex items-center gap-2 pt-2 pb-1">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="accent-[#8b4555] bg-white/10 border-white/20 h-3.5 w-3.5 cursor-pointer rounded-sm"
                  />
                  <label htmlFor="terms" className="text-xs text-gray-400 cursor-pointer select-none">
                    I agree to the <span className="text-white hover:underline">Terms & Conditions</span>
                  </label>
                </div>
              )}

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#8b4555] hover:bg-[#733543] text-white font-medium rounded-lg transition-colors text-sm shadow-md hover:shadow-lg"
                >
                  {mode === "login" ? "Log in" : "Create account"}
                </button>
              </div>
            </form>

            <div className="mt-8 flex items-center justify-center">
              <div className="flex-1 border-t border-white/5"></div>
              <span className="px-4 text-[11px] font-medium text-gray-500">
                {mode === "login" ? "Or log in with" : "Or register with"}
              </span>
              <div className="flex-1 border-t border-white/5"></div>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="flex-1 py-2.5 px-4 bg-transparent hover:bg-white/5 border border-white/10 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                <span className="text-xs font-medium text-white">Google</span>
              </button>
              <button className="flex-1 py-2.5 px-4 bg-transparent hover:bg-white/5 border border-white/10 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Apple size={16} className="fill-current text-white pb-[1px]" />
                <span className="text-xs font-medium text-white">Apple</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

