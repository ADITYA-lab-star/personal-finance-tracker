// src/pages/Signup.tsx
import { useState } from "react";
import { signInWithGoogle, signUpWithEmail, signInWithEmail } from "../services/auth";

export default function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setLoading(true);
      await signUpWithEmail({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      // redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      setError(mapFirebaseError(err?.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    try {
      setLoading(true);
      await signInWithGoogle();
      window.location.href = "/dashboard";
    } catch (err) {
      setError(mapFirebaseError(err?.code));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    setError(null);
    try {
      setLoading(true);
      await signInWithEmail(form.email.trim(), form.password);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(mapFirebaseError(err?.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* top bar */}
      <div className="w-full bg-blue-600 text-white flex justify-between items-center px-6 py-3">
        <h1 className="text-xl font-bold">Financly.</h1>
        <button className="text-white">Dashboard</button>
      </div>

      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <h2 className="text-center text-xl font-semibold mb-6">
            Sign Up On <span className="text-blue-600 font-bold">Financly.</span>
          </h2>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleEmailSignup}>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={form.fullName}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 p-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="JohnDoe@gmail.com"
                value={form.email}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 p-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Your Password"
                value={form.password}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 p-2"
                minLength={6}
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 p-2"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-blue-500 text-blue-500 py-2 rounded-md hover:bg-blue-50 transition disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Signup With Email"}
            </button>
          </form>

          <div className="my-4 text-center text-gray-500">Or</div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Connecting…" : "Sign in with Google"}
            </button>

            <button
              type="button"
              onClick={handleEmailSignIn}
              disabled={loading}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-md border hover:bg-gray-200 transition disabled:opacity-60"
            >
              Sign in with Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapFirebaseError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "Email already in use.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/user-not-found":
      return "No account found with that email.";
    case "auth/popup-closed-by-user":
      return "Popup closed before completing sign-in.";
    default:
      return "Something went wrong. Please try again.";
  }
}
