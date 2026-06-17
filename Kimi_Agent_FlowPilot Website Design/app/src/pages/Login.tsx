import { useState } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { Zap, ArrowLeft, Eye, EyeOff } from "lucide-react";

function getOAuthUrl() {
  const authUrl = new URL(`${import.meta.env.VITE_KIMI_AUTH_URL}/api/oauth/authorize`);
  authUrl.searchParams.set("client_id", import.meta.env.VITE_APP_ID);
  authUrl.searchParams.set("redirect_uri", `${window.location.origin}/api/oauth/callback`);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "profile");
  authUrl.searchParams.set("state", btoa(window.location.pathname));
  return authUrl.toString();
}

export default function Login() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Login form
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  // Register form
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    displayName: "",
  });

  const loginMutation = trpc.localAuth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("local_auth_token", data.token);
      window.location.href = "/";
    },
    onError: (err) => setError(err.message),
  });

  const registerMutation = trpc.localAuth.register.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("local_auth_token", data.token);
      window.location.href = "/";
    },
    onError: (err) => setError(err.message),
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate(loginForm);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    registerMutation.mutate({
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
      displayName: registerForm.displayName || undefined,
    });
  };

  const isPending = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <Zap className="w-6 h-6 text-[#E84545]" />
          <span className="text-xl font-semibold">FlowPilot</span>
        </div>

        <h1 className="text-2xl font-bold mb-2">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          {mode === "login"
            ? "Sign in to your account to continue."
            : "Get started with FlowPilot today."}
        </p>

        {/* OAuth Login */}
        <a
          href={getOAuthUrl()}
          className="flex items-center justify-center gap-2 w-full py-3 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors mb-6"
        >
          Sign in with Kimi OAuth
        </a>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-3 text-muted-foreground">
              or continue with username
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-[#E84545]/10 text-[#E84545] text-sm">
            {error}
          </div>
        )}

        {/* Forms */}
        {mode === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Username
              </label>
              <input
                type="text"
                required
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-sm bg-secondary rounded-lg border border-transparent focus:border-border focus:outline-none"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-secondary rounded-lg border border-transparent focus:border-border focus:outline-none pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Username *
              </label>
              <input
                type="text"
                required
                value={registerForm.username}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, username: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-sm bg-secondary rounded-lg border border-transparent focus:border-border focus:outline-none"
                placeholder="Choose a username"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Email *
              </label>
              <input
                type="email"
                required
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, email: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-sm bg-secondary rounded-lg border border-transparent focus:border-border focus:outline-none"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Display Name
              </label>
              <input
                type="text"
                value={registerForm.displayName}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    displayName: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 text-sm bg-secondary rounded-lg border border-transparent focus:border-border focus:outline-none"
                placeholder="Your display name (optional)"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={registerForm.password}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-secondary rounded-lg border border-transparent focus:border-border focus:outline-none pr-10"
                  placeholder="Min 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isPending ? "Creating account..." : "Create Account"}
            </button>
          </form>
        )}

        {/* Toggle */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => { setMode("register"); setError(""); }}
                className="text-foreground font-medium hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => { setMode("login"); setError(""); }}
                className="text-foreground font-medium hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
