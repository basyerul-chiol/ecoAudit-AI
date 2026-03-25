import { useState } from "react";
import { useNavigate } from "react-router";
import { Leaf, Mail, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

export function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-6xl grid grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-4 rounded-2xl">
              <Leaf className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">EcoAudit AI</h1>
              <p className="text-gray-600">Smart Carbon Reporting</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Automated Carbon Footprint Tracking for Malaysian SMEs
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Upload utility bills, automatically calculate emissions using GHG Protocol standards, and generate bank-ready ESG reports.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-3xl font-bold text-[#1B5E20] mb-1">OCR</div>
              <p className="text-sm text-gray-600">Automated Data Extraction</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-3xl font-bold text-[#1B5E20] mb-1">GHG</div>
              <p className="text-sm text-gray-600">Protocol Compliant</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-3xl font-bold text-[#1B5E20] mb-1">ESG</div>
              <p className="text-sm text-gray-600">Bank-Ready Reports</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="bg-white rounded-3xl shadow-2xl p-10 border-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 mb-8">
            Sign in to your EcoAudit AI account
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 bg-gray-50 border-gray-200 focus:border-[#1B5E20] focus:ring-[#1B5E20] rounded-xl h-14"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 bg-gray-50 border-gray-200 focus:border-[#1B5E20] focus:ring-[#1B5E20] rounded-xl h-14"
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-[#1B5E20] hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-[#1B5E20] hover:bg-[#145214] text-white rounded-xl h-14 text-base"
            >
              Sign In
            </Button>

            {/* Create Account */}
            <div className="text-center pt-4">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-[#1B5E20] font-semibold hover:underline"
                >
                  Create SME Account
                </button>
              </p>
            </div>
          </form>
        </Card>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-sm text-gray-400">
        <p>© 2026 EcoAudit AI. Compliant with GHG Protocol Corporate Standard.</p>
      </div>
    </div>
  );
}
